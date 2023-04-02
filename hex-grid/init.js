// const mainCanvas = new Canvas(document.getElementById('canvas'));
// const overlayCanvas = new Canvas(document.getElementById('canvas-overlay'));
const tilesSpriteSheet = document.getElementById('tiles');

const map = [
  Array.of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
  Array.of(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
  Array.of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
]

Promise.all([fetch('./hexes.png'), fetch('./background.jpg')])
  .then(res => {
    return Promise.all(res.map(res => res.blob()));
  })
  .then(async ([sprites, background]) => {
    // const url = await URL.createObjectURL(sprites);
    // const img = document.getElementById('img');
    // img.src = url;
    // mainCanvas.drawImageL(img, 0, 0, 0, 100, 100, 100, 100, 100, 100)
    
    // drawHex(gridCenterPoint, 'RED', 5);
    // mainCanvas.drawImage(await createImageBitmap(background), 0, 0);
  })

const htmlDiv = document.getElementById('coordinates');
const CANVAS_WIDTH = /*mainCanvas.getBoundingClientRect().width ||*/ 1200;
const CANVAS_HEIGHT = /*mainCanvas.getBoundingClientRect().height ||*/ 800;
const TILE_WIDTH = 80;
const BORDER_SIZE = 1;
const HEX_ORIGIN = new Hex(0, 0, 0);
const HEX_BORDER_COLOR = '#bb86fc';
const HEX_FILL_COLOR = '#363636';
const HOVER_COLOR = '#ffffff14';
const SELECTED_COLOR = '#000';
const OBSTACLE_COLOR = '#FFFFFF66';
const userInput = {};
const gridCenterPoint = { x: 0, y: 0 }
const onMouseMove = throttle(handleMouseMove, 50);
const onKeyDown = throttle(handleKeyDown, 100);

// document.body.addEventListener('mousemove', handleMouseMove);
// document.body.addEventListener('mousedown', handleMouseClick);
// document.body.addEventListener('keydown', handleKeyDown);
// document.body.addEventListener('keyup', handleKeyUp);

let prevSelected;
let selectedHex = HEX_ORIGIN;
let offsetX = 0;
let offsetY = 0;
const tileDimensions = getTileDimensions(TILE_WIDTH);
let horizontalTilesForScreen = Math.round(CANVAS_WIDTH / (tileDimensions.width * 4));
let verticalTilesForScreen = Math.round(CANVAS_HEIGHT / (tileDimensions.vertDistance * 4));
// console.log(tileDimensions)
// console.log(`horizontal: ${horizontalTilesForScreen}, vertical: ${verticalTilesForScreen}`);

let firstDraw = true;
// drawGrid(CANVAS_WIDTH, CANVAS_HEIGHT);
function drawGrid(totalWidth = CANVAS_WIDTH, totalHeight = CANVAS_HEIGHT) {
  // const tileDimensions = getTileDimensions(TILE_WIDTH);
  // const { vertDistance, horizontalDistance } = tileDimensions;
  // const xLeftSide = Math.round(gridCenterPoint.x / horizontalDistance);
  // const xRightSide = Math.round((totalWidth - gridCenterPoint.x) / horizontalDistance);
  // const yTopSide = Math.round(gridCenterPoint.y / vertDistance);
  // const yBottomSide = Math.round((totalHeight - gridCenterPoint.y) / vertDistance);
  // console.log({ xLeftSide, xRightSide, yTopSide, yBottomSide })
  
  let counter = 1;
  for (let x = 0; x < map.length; x++) {
    if (x % 2 === 0)
      counter++;
    for (let y = 0; y < map[x].length; y++) {
      drawHexIfInsideViewport(new Hex(y - counter, x, null, y), tileDimensions, totalWidth, totalHeight);
  
      // if (firstDraw) {
      //   createClickable(new Hex(y - counter, x, null, y));
      // }
    }
  }
  firstDraw = false;
}

function createClickable(hex) {
  const el = document.createElement('p');
  el.classList.add('linkToHex');
  const point = hexToPoint(hex);
  let clicked = false;
  el.onclick = e => {
    console.log(hex)
    clicked ? fillHex(point, HEX_FILL_COLOR, overlayCanvas) : fillHex(point, '#f4f796', overlayCanvas);
    clicked = !clicked;
    clicked ? el.classList.add('clicked') : el.classList.remove('clicked');
  }
  const arrIndexes = hexToMapArrayIndexes(hex);
  el.innerHTML = `q: ${hex.q}, r: ${hex.r}, s: ${hex.s}, x: ${Math.round(point.x)}, y: ${Math.round(point.y)}.
                  [ ${arrIndexes} ]; ${map[arrIndexes[1]][arrIndexes[0]]}`
  
  htmlDiv.append(el);
}

i = 0;

function drawHexIfInsideViewport(hex, hexParams, totalWidth, totalHeight, canvas = mainCanvas) {
  const { horizontalDistance, vertDistance } = hexParams;
  const centerPoint = hexToPoint(hex, gridCenterPoint);
  
  drawHex(centerPoint, HEX_BORDER_COLOR, BORDER_SIZE);
  // If the drawing allows negatives, must add additional check
  if (centerPoint.x < totalWidth + (2 * TILE_WIDTH) && centerPoint.y < totalHeight + (2 * TILE_WIDTH)) {
    fillHexBasedOnNumber(centerPoint, hex);
  }
}

function fillHexBasedOnNumber(point, hex) {
  const el = hexToMapArray(hex);
  switch (el) {
    case 0:
      fillHex(point, HEX_FILL_COLOR);
      break;
    case 1:
      fillHex(point, '#d3c0fd');
      break;
    case 3:
      fillHex(point, '#d3c0fd');
      break;
    case 9:
      fillHex(point, '#d3c0fd');
      break;
    default:
      break;
  }
}

function drawHex(centerPoint, color, width, canvas = mainCanvas) {
  for (let i = 0; i <= 5; i++) {
    let start = getHexCornerCoordinates(centerPoint, i);
    let end = getHexCornerCoordinates(centerPoint, i + 1);
    
    canvas.drawLine(start, end, color, width);
  }
}

function fillHex(centerPoint, color, canvas = mainCanvas) {
  canvas.beginPath();
  let start = getHexCornerCoordinates(centerPoint, 0, TILE_WIDTH - BORDER_SIZE / 2);
  canvas.moveTo(start)
  for (let i = 1; i <= 5; i++) {
    let end = getHexCornerCoordinates(centerPoint, i, TILE_WIDTH - BORDER_SIZE / 2);
    
    canvas.lineTo(end);
  }
  canvas.closePath();
  canvas.fill(color);
  // canvas.drawImage(tilesSpriteSheet, 0, 0, 54, 57, centerPoint.x + tileDimensions.width / 4 - 10, centerPoint.y + tileDimensions.height - 2, tileDimensions.width * 4, tileDimensions.height * 4);
}

function hexToPoint(hex, origin = gridCenterPoint) {
  const x = TILE_WIDTH * (Math.sqrt(3) * hex.q + Math.sqrt(3) / 2 * hex.r) + origin.x;
  const y = TILE_WIDTH * (3. / 2 * hex.r) + origin.y;
  return new Point(x, y);
}

function hexToMapArrayIndexes(hex) {
  return [hex.arrQ, hex.r];
}

function hexToMapArray(hex) {
  const [x, y] = hexToMapArrayIndexes(hex);
  return map[y][x];
}

function getHexCornerCoordinates({ x: centerX, y: centerY }, i, width) {
  let angleDeg = 60 * i - 30;
  let angleRad = Math.PI / 180 * angleDeg
  return new Point(
    centerX + (width || TILE_WIDTH) * Math.cos(angleRad),
    centerY + (width || TILE_WIDTH) * Math.sin(angleRad));
}

function getTileDimensions(tileWidth) {
  const height = tileWidth / 2;
  const width = Math.sqrt(3) / 2 * height;
  const vertDistance = height * 3 / 4;
  const horizontalDistance = width;
  return {
    width, height, vertDistance, horizontalDistance
  }
}

function pixelToHex(pixelCoordinates) {
  const { x, y } = pixelCoordinates;
  const { x: offsetX, y: offsetY } = gridCenterPoint;
  let q = (Math.sqrt(3) / 3 * (x - offsetX) - (y - offsetY) / 3) / TILE_WIDTH
  let r = (y - offsetY) * 2 / 3 / TILE_WIDTH
  return new Hex(q, r);
}

function cubeRound(hex) {
  
  let q = Math.round(hex.q)
  let r = Math.round(hex.r)
  let s = Math.round(hex.s)
  
  const qDiff = Math.abs(q - hex.q)
  const rDiff = Math.abs(r - hex.r)
  const sDiff = Math.abs(s - hex.s)
  
  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s
  } else if (rDiff > sDiff) {
    r = -q - s
  } else {
    s = -q - r
  }
  
  return new Hex(q, r, s);
}

function cubeDirection(direction) {
  const availableDirections = [
    new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
    new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
  ];
  
  return availableDirections[direction]
}

function cubeAdd(hex1, hex2) {
  return new Hex(hex1.q + hex2.q, hex1.r + hex2.r, hex1.s + hex2.s);
}

function cubeSubtract(hex1, hex2) {
  return new Hex(hex1.q - hex2.q, hex1.r - hex2.r, hex1.s - hex2.s)
}

function cubeDistance(hex1, hex2) {
  const vec = cubeSubtract(hex1, hex2);
  // or: (abs(hex1.q - hex2.q) + abs(hex1.r - hex2.r) + abs(hex1.s - hex2.s)) / 2
  return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2
}

function interpolateLinear(start, end, t) {
  return start * (1.0 - t) + end * t;
}

// Alternative to 'interpolateLinear'
function linearInterpolation(a, b, t) {
  return a + (b - a) * t;
}

function cubeInterpolation(hexA, hexB, t) {
  return new Hex(
    interpolateLinear(hexA.q, hexB.q, t),
    interpolateLinear(hexA.r, hexB.r, t),
    interpolateLinear(hexA.s, hexB.s, t));
}

function getCubeNeighbour(hex, direction) {
  return cubeAdd(hex, cubeDirection(direction));
}

function calculateCubesBetween(hex1, hex2) {
  const distance = cubeDistance(hex1, hex2)
  const results = []
  for (let i = 0; i <= distance; i++) {
    results.push(cubeRound(cubeInterpolation(hex1, hex2, 1.0 / distance * i)))
  }
  return results;
}

function getAllNeighbours(hex) {
  const neighbours = [];
  for (let i = 0; i < 6; i++) {
    const cubeNeighbour = getCubeNeighbour(hex, i);
    const mapVal = hexToMapArray(cubeNeighbour);
    if (mapVal !== 1) {
      neighbours.push(cubeNeighbour);
    }
  }
  
  return neighbours;
}

function hexEquals(hex1, hex2) {
  return hex1.q === hex2.q && hex1.r === hex2.r && hex1.s === hex2.s;
}

let prevPath = [];

function handleMouseClick(e) {
  const offsetX = e.pageX - mainCanvas.getBoundingClientRect().left;
  const offsetY = e.pageY - mainCanvas.getBoundingClientRect().top;
  const { q: y, r: x, s: z } = cubeRound(pixelToHex({ x: offsetX, y: offsetY }));
  const hex = new Hex(y, x, z);
  selectedHex = hex;
  //
  // // right click
  // if (e.button === 2) {
  //   const prevObstacleIndex = obstacles.findIndex(({ q, r, s }) => q === y && r === x && s === z);
  //   if (prevObstacleIndex >= 0) {
  //     obstacles.splice(prevObstacleIndex, 1);
  //     fillHex(hexToPoint(hex), HEX_FILL_COLOR);
  //   } else {
  //     obstacles.push(hex);
  //     fillHex(hexToPoint(hex), OBSTACLE_COLOR)
  //   }
  // } else {
  //   const currentPath = aStar(selectedHex, hex);
  //   fillHex(hexToPoint(hex), SELECTED_COLOR)
  //   currentPath.forEach(h => {
  //     // if (!hexEquals(h, hex)) {
  //     fillHex(hexToPoint(h), '#ff000055', overlayCanvas);
  //     // }
  //   })
  //
  //   prevPath.forEach(h => {
  //     fillHex(hexToPoint(h), HEX_FILL_COLOR);
  //   });
  //   prevPath = currentPath;
  //   selectedHex = hex;
  // }
  
  // calculateCubesBetween(new Hex(0, 0, 0), hex)
  //   .forEach(hex => {
  //     fillHex(hexToPoint(hex), 'red');
  //   });
  
  
  /*for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      fillHex(hexToPoint(getCubeNeighbour(hex, i)), color, overlayCanvas);
    }, i * 200);
  }*/
}

let cubesToDraw = [];

function handleMouseMove(e) {
  const { left, top, width, height } = overlayCanvas.getBoundingClientRect();
  const cursorOffsetX = e.pageX - left;
  const cursorOffsetY = e.pageY - top;
  let { q: y, r: x, s: z } = cubeRound(pixelToHex({ x: cursorOffsetX, y: cursorOffsetY }));
  let currentHex = new Hex(y, x, z);
  if (cursorOffsetX > CANVAS_WIDTH - 20) {
    userInput[39] = true;
  } else if (cursorOffsetX < 20) {
    userInput[37] = true;
  } else if (cursorOffsetY < 20) {
    userInput[38] = true;
  } else if (cursorOffsetY > CANVAS_HEIGHT - 20) {
    userInput[40] = true;
  } else {
    userInput[39] = false;
    userInput[37] = false;
    userInput[38] = false;
    userInput[40] = false;
  }
  // let currentHex = new Hex(y, x, z);
  // overlayCanvas.clear();
  /*const tilesBetween =*/
  
  cubesToDraw = calculateCubesBetween(selectedHex, currentHex);
  // cubesToDraw = aStar(selectedHex, currentHex);
  // const tilesBetween = aStar(selectedHex, currentHex);
  // cubesToDraw.forEach(hex => {
  //   fillHex(hexToPoint(hex, gridCenterPoint), HOVER_COLOR, overlayCanvas)
  // })
}

function handleKeyDown(e) {
  userInput[e.keyCode] = true;
  /*switch (e.keyCode)
    case 38 : up
    case 40 : down
    case 39 : right
    case 37 :left */
}

function handleKeyUp(e) {
  userInput[e.keyCode] = false;
}

function heuristic(hex1, hex2) {
  let d1 = Math.abs(hex2.q - hex1.q);
  let d2 = Math.abs(hex2.r - hex1.r);
  let d3 = Math.abs(hex2.s - hex1.s);
  return d1 + d2 + d3;
}

function aStar(start, end) {
  start.f = 0;
  start.g = 0;
  start.h = 0;
  const path = [];
  const openSet = [start];
  const closedSet = [];
  let i = 0;
  
  while (openSet.length > 0) {
    i++;
    if (i > 10000) {
      console.log(openSet)
      break;
    }
    //assumption lowest index is the first one to begin with
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];
    
    if (hexEquals(current, end)) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("DONE!", i);
      // return the traced path
      return path.reverse();
    }
    
    //remove current from openSet
    openSet.splice(lowestIndex, 1);
    //add current to closedSet
    closedSet.push(current);
    
    const neighbors = getAllNeighbours(current);
    
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      
      if (!closedSet.includes(neighbor)) {
        let possibleG = current.g + 1;
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleG >= neighbor.g) {
          continue;
        }
        
        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }
  }
  
  //no solution by default
  return [];
}

function update(progress) {
  if (userInput[37]) {
    gridCenterPoint.x += 5;
  }
  if (userInput[39]) {
    gridCenterPoint.x -= 5;
  }
  if (userInput[40]) {
    gridCenterPoint.y -= 5;
  }
  if (userInput[38]) {
    gridCenterPoint.y += 5;
  }
}

function draw() {
  overlayCanvas.clear();
  mainCanvas.clear();
  drawGrid();
  for (let j = 0; j < cubesToDraw.length; j++) {
    fillHex(hexToPoint(cubesToDraw[j]), HOVER_COLOR, overlayCanvas);
  }
}

let lastRender = 0

function loop(timestamp) {
  const progress = timestamp - lastRender
  
  update(progress)
  draw()
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

// window.requestAnimationFrame(loop)


/* OLD_GRID_DRAW */
// function drawGrid(totalWidth, totalHeight) {
//   const tileDimensions = getTileDimensions(TILE_WIDTH - BORDER_SIZE);
//   const { vertDistance, horizontalDistance } = tileDimensions;
//   const xLeftSide = Math.round(gridCenterPoint.x / horizontalDistance);
//   const xRightSide = Math.round((totalWidth - gridCenterPoint.x) / horizontalDistance);
//   const yTopSide = Math.round(gridCenterPoint.y / vertDistance);
//   const yBottomSide = Math.round((totalHeight - gridCenterPoint.y) / vertDistance);
//   console.log({ xLeftSide, xRightSide, yTopSide, yBottomSide })
//   let counter = 0;
//   for (let i = 0; i <= yBottomSide; i++) {
//     i % 2 === 0 && i !== 0 && counter++;
//     for (let j = -xLeftSide; j <= xRightSide; j++) {
//       drawHexIfInsideViewport(new Hex(i - counter, j), tileDimensions, totalWidth, totalHeight);
//     }
//   }
//
//   counter = 0;
//   for (let i = -1; i >= -yTopSide; i--) {
//     i % 2 !== 0 && counter++;
//     for (let j = -xLeftSide; j <= xRightSide; j++) {
//       drawHexIfInsideViewport(new Hex(i + counter, j), tileDimensions, totalWidth, totalHeight);
//     }
//   }
// }

