class Point {
  x;
  y;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Hex {
  q;
  r;
  s;
  
  constructor(q, r, s, arrQ) {
    this.q = q;
    this.r = r;
    this.s = s || -q -r;
    this.arrQ = arrQ || q;
  }
}

class Canvas {
  canvas;
  ctx;
  clientRect;
  
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // this.ctx.scale(1.5, 1.5);
  }
  
  drawLine(from, to, color, width) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color || '#000000';
    this.ctx.lineWidth = width || 1;
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
  
  drawImageL(...args) {
    this.ctx.drawImage(...args)
  }
  
  drawImage(img, x, y) {
    return this.ctx.drawImage(img, x, y);
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.getBoundingClientRect().width, this.getBoundingClientRect().height);
  }
  
  beginPath() {
    this.ctx.beginPath();
  }
  moveTo(to) {
    this.ctx.moveTo(to.x, to.y);
  }
  lineTo(to) {
    this.ctx.lineTo(to.x, to.y);
  }
  
  closePath() {
    return this.ctx.closePath();
  }
  
  fill(color) {
    this.ctx.fillStyle = color || '#000000';
    this.ctx.fill()
  }
  
  drawImage(img, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, hexWidth, hexHeight) {
    this.ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, hexWidth, hexHeight);
  }
  
  writeAtCoordinates(center, hex, color) {
    this.ctx.fillStyle = color || '#000000';
    this.ctx.font = `${TILE_WIDTH / 6}px serif`
    this.ctx.fillText(`x: ${hex.q}, y: ${hex.r}`, center.x - TILE_WIDTH / 2, center.y);
    this.ctx.fillText(`z: ${hex.s}`, center.x - TILE_WIDTH / 4, center.y + 25);
    // this.ctx.fillText(`x: ${hex.q}, y: ${hex.r}, z: ${hex.s}`, center.x - 25, center.y);
    // const size = (hex.q.toString() + hex.r.toString()).length
    // this.ctx.fillText('[', center.x - 13 - size, center.y);
    // this.ctx.fillText(hex.q, center.x + 8, center.y);
    // this.ctx.fillText(hex.r, center.x - 8, center.y);
    // this.ctx.fillText(hex.s, center.x - size, center.y + 15);
    // this.ctx.fillText(']', center.x + 19 + size, center.y);
  }
  
  getBoundingClientRect() {
    if (!this.clientRect) {
      this.clientRect = this.canvas.getBoundingClientRect();
    }
    
    return this.clientRect;
  }
}