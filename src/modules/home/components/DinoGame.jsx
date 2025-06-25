import { useState, useEffect, useRef, useCallback } from 'react';
import suelo from '@img/dino-game/suelo.png';
import dino from '@img/dino-game/uli-saltarín.png';
import cactus1 from '@img/dino-game/cactus1.png';
import cactus2 from '@img/dino-game/cactus2.png';
import nube from '@img/dino-game/nube.png';
import { Box, Typography } from '@mui/material'

export const DinoGame = () => {
  // Game state
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Refs for game elements
  // const gameRef = useRef(null);
  const dinoRef = useRef(null);
  const containerRef = useRef(null);
  const floorRef = useRef(null);
  
  // Game variables refs
  const gameStateRef = useRef({
    time: new Date(),
    deltaTime: 0,
    floorY: 22,
    velY: 0,
    impulse: 900,
    gravity: 2500,
    dinoPosX: 42,
    dinoPosY: 22,
    floorX: 0,
    sceneVel: 1280/3,
    gameVel: 1,
    stopped: false,
    jumping: false,
    timeUntilObstacle: 2,
    timeObstacleMin: 0.7,
    timeObstacleMax: 1.8,
    obstacles: [],
    timeUntilCloud: 0.5,
    timeCloudMin: 0.7,
    timeCloudMax: 2.7,
    clouds: [],
    cloudVel: 0.5,
    animationId: null
  });

  // Game phase based on score
  const getGamePhase = () => {
    if (score >= 20) return 'noche';
    if (score >= 10) return 'tarde';
    if (score >= 5) return 'mediodia';
    return '';
  };

  // Initialize game
  const initGame = useCallback(() => {
    const state = gameStateRef.current;
    state.time = new Date();
    state.stopped = false;
    state.jumping = false;
    state.dinoPosY = state.floorY;
    state.velY = 0;
    state.floorX = 0;
    state.gameVel = 1;
    state.obstacles = [];
    state.clouds = [];
    state.timeUntilObstacle = 2;
    state.timeUntilCloud = 0.5;
    setScore(0);
    setGameOver(false);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const state = gameStateRef.current;
    
    if (state.stopped) return;
    
    state.deltaTime = (new Date() - state.time) / 1000;
    state.time = new Date();
    
    // Update dinosaur
    moveDinosaur();
    
    // Update floor
    moveFloor();
    
    // Update obstacles and clouds
    updateObstacles();
    updateClouds();
    
    // Detect collisions
    detectCollision();
    
    // Apply gravity
    state.velY -= state.gravity * state.deltaTime;
    
    // Schedule next frame
    state.animationId = requestAnimationFrame(gameLoop);
  }, []);

  // Move dinosaur
  const moveDinosaur = () => {
    const state = gameStateRef.current;
    const dino = dinoRef.current;
    
    if (!dino) return;
    
    state.dinoPosY += state.velY * state.deltaTime;
    
    if (state.dinoPosY < state.floorY) {
      touchFloor();
    }
    
    dino.style.bottom = state.dinoPosY + 'px';
  };

  // Touch floor
  const touchFloor = () => {
    const state = gameStateRef.current;
    const dino = dinoRef.current;
    
    if (!dino) return;
    
    state.dinoPosY = state.floorY;
    state.velY = 0;
    
    if (state.jumping) {
      dino.classList.add('dino-corriendo');
    }
    state.jumping = false;
  };

  // Move floor
  const moveFloor = () => {
    const state = gameStateRef.current;
    const floor = floorRef.current;
    const container = containerRef.current;
    
    if (!floor || !container) return;
    
    state.floorX += calculateDisplacement();
    floor.style.left = -(state.floorX % container.clientWidth) + 'px';
  };

  // Calculate displacement
  const calculateDisplacement = () => {
    const state = gameStateRef.current;
    return state.sceneVel * state.deltaTime * state.gameVel;
  };

  // Jump function
  const jump = useCallback(() => {
    const state = gameStateRef.current;
    const dino = dinoRef.current;
    
    if (!dino || state.dinoPosY !== state.floorY) return;
    
    state.jumping = true;
    state.velY = state.impulse;
    dino.classList.remove('dino-corriendo');
  }, []);

  // Update obstacles
  const updateObstacles = () => {
    const state = gameStateRef.current;
    const container = containerRef.current;
    
    if (!container) return;
    
    // Create new obstacles
    state.timeUntilObstacle -= state.deltaTime;
    if (state.timeUntilObstacle <= 0) {
      createObstacle();
    }
    
    // Move existing obstacles
    state.obstacles = state.obstacles.filter(obstacle => {
      if (obstacle.posX < -obstacle.element.clientWidth) {
        obstacle.element.remove();
        gainPoints();
        return false;
      } else {
        obstacle.posX -= calculateDisplacement();
        obstacle.element.style.left = obstacle.posX + 'px';
        return true;
      }
    });
  };

  // Create obstacle
  const createObstacle = () => {
    const state = gameStateRef.current;
    const container = containerRef.current;
    
    if (!container) return;
    
    const obstacle = document.createElement('div');
    container.appendChild(obstacle);
    obstacle.className = Math.random() > 0.5 ? 'cactus cactus2' : 'cactus';
    
    const obstacleObj = {
      element: obstacle,
      posX: container.clientWidth
    };
    
    obstacle.style.left = container.clientWidth + 'px';
    state.obstacles.push(obstacleObj);
    
    state.timeUntilObstacle = state.timeObstacleMin + Math.random() * (state.timeObstacleMax - state.timeObstacleMin) / state.gameVel;
  };

  // Update clouds
  const updateClouds = () => {
    const state = gameStateRef.current;
    const container = containerRef.current;
    
    if (!container) return;
    
    // Create new clouds
    state.timeUntilCloud -= state.deltaTime;
    if (state.timeUntilCloud <= 0) {
      createCloud();
    }
    
    // Move existing clouds
    state.clouds = state.clouds.filter(cloud => {
      if (cloud.posX < -cloud.element.clientWidth) {
        cloud.element.remove();
        return false;
      } else {
        cloud.posX -= calculateDisplacement() * state.cloudVel;
        cloud.element.style.left = cloud.posX + 'px';
        return true;
      }
    });
  };

  // Create cloud
  const createCloud = () => {
    const state = gameStateRef.current;
    const container = containerRef.current;
    
    if (!container) return;
    
    const cloud = document.createElement('div');
    container.appendChild(cloud);
    cloud.className = 'nube';
    
    const cloudObj = {
      element: cloud,
      posX: container.clientWidth
    };
    
    cloud.style.left = container.clientWidth + 'px';
    cloud.style.bottom = 100 + Math.random() * 170 + 'px';
    state.clouds.push(cloudObj);
    
    state.timeUntilCloud = state.timeCloudMin + Math.random() * (state.timeCloudMax - state.timeCloudMin) / state.gameVel;
  };

  // Gain points
  const gainPoints = () => {
    const state = gameStateRef.current;
    const newScore = score + 1;
    setScore(newScore);
    
    // Increase game speed based on score
    if (newScore === 5) {
      state.gameVel = 1.5;
    } else if (newScore === 10) {
      state.gameVel = 2;
    } else if (newScore === 20) {
      state.gameVel = 3;
    }
  };

  // Detect collision
  const detectCollision = () => {
    const state = gameStateRef.current;
    const dino = dinoRef.current;
    
    if (!dino) return;
    
    for (let obstacle of state.obstacles) {
      if (obstacle.posX > state.dinoPosX + dino.clientWidth) {
        break;
      } else {
        if (isCollision(dino, obstacle.element, 10, 30, 15, 20)) {
          endGame();
          return;
        }
      }
    }
  };

  // Check collision
  const isCollision = (a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
      ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
      (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
      ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
      (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
  };

  // End game
  const endGame = () => {
    const state = gameStateRef.current;
    const dino = dinoRef.current;
    
    if (!dino) return;
    
    state.stopped = true;
    dino.classList.remove('dino-corriendo');
    dino.classList.add('dino-estrellado');
    setGameOver(true);
    
    if (state.animationId) {
      cancelAnimationFrame(state.animationId);
    }
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    initGame();
    gameLoop();
  };

  // Restart game
  const restartGame = () => {
    const state = gameStateRef.current;
    
    // Clean up existing obstacles and clouds
    state.obstacles.forEach(obstacle => obstacle.element.remove());
    state.clouds.forEach(cloud => cloud.element.remove());
    
    // Reset dino classes
    const dino = dinoRef.current;
    if (dino) {
      dino.classList.remove('dino-estrellado');
      dino.classList.add('dino-corriendo');
    }
    
    initGame();
    gameLoop();
  };

  // Handle keydown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!gameStarted) {
          startGame();
        } else if (gameOver) {
          restartGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, jump]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const state = gameStateRef.current;
      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
      }
    };
  }, []);

  return (


    <Box sx={{ minHeight: '100vh', bgcolor: 'amber.900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        {/* Contenedor principal del juego */}
        <Box
          ref={containerRef}
          sx={{
            position: 'relative',
            width: '920px',
            height: '280px',
            overflow: 'hidden',
            transition: 'background-color 1s',
            bgcolor:
              getGamePhase() === 'mediodia'
                ? 'pink.100'
                : getGamePhase() === 'tarde'
                ? 'red.200'
                : getGamePhase() === 'noche'
                ? 'purple.200'
                : 'orange.100',
            backgroundImage: 'linear-gradient(to bottom, #a7f3d0, transparent)', // from-emerald-200 to-transparent
          }}
        >
          {/* Piso */}
          <Box
            ref={floorRef}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '200%',
              height: '42px',
              backgroundRepeat: 'repeat-x',
              backgroundImage: `url(${suelo})`,
              backgroundSize: '50% 42px',
            }}
          />
    
          {/* Dinosaurio */}
          <Box
            ref={dinoRef}
            sx={{
              position: 'absolute',
              bottom: '22px',
              left: '42px',
              width: '84px',
              height: '84px',
              zIndex: 10,
              backgroundImage: `url(${dino})`,
              backgroundSize: '336px 84px',
              backgroundRepeat: 'repeat-x',
              backgroundPositionX: '0px',
            }}
            className="dino dino-corriendo"
          />
    
          {/* Puntaje */}
          <Typography
            sx={{
              position: 'absolute',
              top: '5px',
              right: '15px',
              textAlign: 'right',
              color: 'orange.700',
              fontWeight: 'bold',
              fontSize: '1.875rem', // text-3xl = 30px aprox
              fontFamily: 'monospace',
              zIndex: 20,
            }}
          >
            {score}
          </Typography>
        </Box>
    
        {/* Pantalla de Game Over */}
        {gameOver && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 30,
            }}
          >
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography sx={{ fontSize: '2.25rem', fontWeight: 'bold', mb: 2 }}>GAME OVER</Typography>
              <Typography sx={{ fontSize: '1.25rem', mb: 1 }}>Score: {score}</Typography>
              <Typography sx={{ fontSize: '1rem' }}>Press SPACE to restart</Typography>
            </Box>
          </Box>
        )}
    
        {/* Pantalla de Inicio */}
        {!gameStarted && !gameOver && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 30,
            }}
          >
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography sx={{ fontSize: '2.25rem', fontWeight: 'bold', mb: 2 }}>DINOSAUR GAME</Typography>
              <Typography sx={{ fontSize: '1rem' }}>Press SPACE to start</Typography>
            </Box>
          </Box>
        )}
      </Box>

    
      
      <style jsx>{`
        .dino-corriendo {
          animation: animarDino 0.25s steps(2) infinite;
        }
        
        .dino-estrellado {
          background-position-x: -252px !important;
        }
        
        .cactus {
          width: 46px;
          height: 96px;
          position: absolute;
          bottom: 16px;
          z-index: 5;
          background: url(${cactus1}) no-repeat;
        }
        
        .cactus2 {
          width: 98px;
          height: 66px;
          background: url(${cactus2}) no-repeat;
        }
        
        .nube {
          width: 92px;
          height: 26px;
          position: absolute;
          z-index: 0;
          background: url(${nube}) no-repeat;
          background-size: 92px 26px;
        }
        
        @keyframes animarDino {
          from {
            background-position-x: -84px;
          }
          to {
            background-position-x: -252px;
          }
        }
      `}</style>
    </Box>
  );
};

export default DinoGame;