/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 * Modified by : Meron Essayas, 01.09.2025
 * Description : Contient les fonctions pour initialiser le serpent, le déplacer, et le dessiner sur le canevas
 */

/**
 * Initialise le serpent au début du jeu.
 *
 * Cette fonction crée le serpent en tant que tableau contenant un seul segment,
 * positionné à une position de départ définie sur la grille.
 *
 * @returns {Array<{x: number, y: number}>} - Un tableau contenant un objet représentant la position du premier segment du serpent.
 */
function initSnake() {
  const snake = [{ x: 9 * 20, y: 6 * 20 }]; // Position initiale du serpent (9,6) sur une grille de 20x20 pixelsa
  return snake;
}

/**
 * Déplace le serpent dans la direction actuelle.
 *
 * Cette fonction calcule la nouvelle position de la tête du serpent en fonction
 * de la direction actuelle (gauche, haut, droite, bas). Le reste du corps du serpent
 * suit la tête. La fonction retourne un objet représentant la nouvelle position de la tête du serpent.
 *
 * @param {Array<{x: number, y: number}>} snake - Le tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {string} direction - La direction actuelle du mouvement du serpent ("LEFT", "UP", "RIGHT", ou "DOWN").
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la distance de déplacement du serpent.
 * @returns {{x: number, y: number}} - Un objet représentant les nouvelles coordonnées `x` et `y` de la tête du serpent après le déplacement.
 */
function moveSnake(snake, direction, box) {
    // Récupère la tête actuelle
  const head = snake[0];
  let newHead = { x: head.x, y: head.y };

  // Met à jour les coordonnées en fonction de la direction
  if (direction === "LEFT") {
    newHead.x -= box;
  } else if (direction === "UP") {
    newHead.y -= box;
  } else if (direction === "RIGHT") {
    newHead.x += box;
  } else if (direction === "DOWN") {
    newHead.y += box;
  }

  // Ajoute la nouvelle tête au début du tableau
  snake.unshift(newHead);

  // Supprime le dernier segment pour simuler le déplacement
  snake.pop();

  return newHead;
}

/**
 * Dessine le serpent sur le canvas.
 *
 * Cette fonction parcourt chaque segment du serpent et le dessine sur le canvas en utilisant
 * un rectangle coloré. La tête du serpent est dessinée dans une couleur différente des autres segments
 * pour la distinguer visuellement. Chaque segment est dessiné à sa position actuelle sur la grille,
 * avec une taille déterminée par la valeur de `box`.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {Array<{x: number, y: number}>} snake - Un tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la taille de chaque segment du serpent.
 */
function drawSnake(ctx, snake, box) {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "darkgreen" : "lightgreen"; // Couleur différente pour la tête et le corps
    ctx.fillRect(segment.x, segment.y, box, box);
  }); 
}

export { initSnake, moveSnake, drawSnake };
