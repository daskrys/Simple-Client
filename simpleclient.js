import { io } from 'https://cdn.jsdelivr.net/npm/socket.io-client@4.7.4/+esm';

      const glitchURL = "https://scratched-cyclic-washer.glitch.me";
      const socket = io(glitchURL);

      let clientState = {
        myPlayerId: undefined,
      }
      let gameState = {
        'whoseTurn': 1,
      };

      socket.on('connect', () => {
          console.log('connected to server');
      });

      socket.on('player_number', (uniqueId) => {
        console.log({uniqueId});
        clientState.myPlayerId = 1+(uniqueId%2);
        updateDisplay();
      });
      
      socket.on('current_game_state', (updatedGameState) => {
        console.log({updatedGameState});
        gameState = updatedGameState;
        updateDisplay();
      })

      socket.on('disconnect', () => {
        console.log('disconnected from server');
      });

      console.log("hello");

      function updateDisplay() {
        document.getElementById("clientStateDisplay").innerHTML =
          JSON.stringify(clientState);
        document.getElementById("gameStateDisplay").innerHTML =
          JSON.stringify(gameState);
      }


      function handleClick(playerId) {
//         if (gameState.whoseTurn != playerId) {
//           console.log(`ignoring click from ${playerId} becuse it is not their turn`);
//           return;
//         }
        
//         if (clientState.myPlayerId != playerId) {
//           console.log(`ignoring click from ${playerId} becuse it is not their button`);
//           return;
//         }

        console.log(`{playerId} clicked their button`);
        gameState[playerId] = 1 + (gameState[playerId] | 0);
        socket.emit('updated_game_state', gameState);
        updateDisplay();
      }

      window.handleClick = handleClick;