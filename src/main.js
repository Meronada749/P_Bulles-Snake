/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 * Modified by : Meron Essayas, 01.09.2025
 * Description : Point d'entrée principal du jeu. Il initialise le jeu, configure les paramètres, et contrôle le cycle de rendu
 */

import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//const box = 20;
//const gameSpeed = 200;
let box;
let gameSpeed;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle
let paused = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    togglePause(); //Appuyez sur Espace → appelle togglePause().
  } else {
    direction = handleDirectionChange(event, direction);
  }
});

async function loadConfig() {
  try {
    const response = await fetch('config.json');
    if (!response.ok) throw new Error('Failed to load config');
    const config = await response.json();
    box = config.box; //20 pixels à partir du fichier de configuration
    gameSpeed = config.gameSpeed; //gameSpeed à partir du fichier de configuration
    startGame(); // démarrer uniquement après le chargement de la configuration
  } catch (error) {
    console.error('Error loading config:', error);
  }
}

// async function submitScore(playerName, playerScore) {
//   try {
//     const response = await fetch("http://localhost:3000/scores", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: playerName, score: playerScore })
//     });
//     const topScores = await response.json();
//     renderLeaderboard(topScores); // optional: show leaderboard
//   } catch (err) {
//     console.error("Error submitting score:", err);
//   }
// }

// function renderLeaderboard(scores) {
//   const leaderboardContainer = document.getElementById("leaderboard");
//   if (!leaderboardContainer) return;

//   leaderboardContainer.innerHTML = "<h3>Top 5 Scores</h3>" +
//     scores.map((s, i) => `<p>${i+1}. ${s.name} - ${s.score}</p>`).join("");
// }

// (async () => {
//     await submitScore(playerName || "Anonymous", score);
// })();

function togglePause() {
  paused = !paused;
  if (paused) {
    clearInterval(gameInterval); //arrête la boucle du jeu (le serpent arrête de bouger)
    drawPausedMessage(); //affiche « PAUSED » sur la toile.
  } else {
    gameInterval = setInterval(draw, gameSpeed); //redémarre la boucle de jeu à la vitesse définie.
  }
}

function drawPausedMessage() {
 // Atténuer légèrement l'arrière-plan
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // noir semi-transparent
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner le texte « En pause » au centre
  ctx.font = "40px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // blanc semi-transparent
  ctx.textAlign = "center";
  ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {
  moveSnake(snake, direction, box); // Déplacement en premier

  // Vérifie collisions avec corps et murs
  if (
    checkCollision(snake[0], snake) ||
    checkWallCollision(snake[0], canvas, box)
  ) {
    clearInterval(gameInterval); // Arrêter le jeu en cas de collision
    // const playerName = prompt("Game Over! Enter your name:"); // ask player name
    // await submitScore(playerName || "Anonymous", score); // submit score
    alert("Game Over! Your score is " + score);
    return; // Sortir de la fonction draw pour arrêter le jeu
  }

  //verifier si la tete du serpent est sur la meme position que la nourriture
  if (snake[0].x === food.x && snake[0].y === food.y) {
    const tail = snake[snake.length - 1]; //dernier segment du serpent (sa queue).
    snake.push({ x: tail.x, y: tail.y }); //Ajoute un nouveau segment au serpent à la position de la queue.
    food = generateFood(box, canvas); //Génère un nouvel aliment
    score += 1;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas avant de redessiner
  drawScore(ctx, score);
  drawFood(ctx, food, box);
  drawSnake(ctx, snake, box);
}

//startGame();
loadConfig(); // Pour démarrer le jeu, commencez par charger la configuration.