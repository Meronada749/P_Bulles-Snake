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

const box = 20;
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});


function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas avant de redessiner
  
  drawScore(ctx, score);
  drawFood(ctx, food, box); 
  drawSnake(ctx, snake, box);

  // Déplace le serpent
  moveSnake(snake, direction, box);

  // Check if snake eats food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
    food = generateFood(box, canvas);
    score += 1;
 }

}

startGame();
