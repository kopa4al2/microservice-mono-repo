function start() {
  const canvas = document.querySelector('#canvas');
  const gl = canvas.getContext('webgl2');
  
  gl.clearColor(0.4, 0, 0, 0.7);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  const shaderProgram = createProgram(gl, vertexShaderSource, fragmentShaderCode);
  
  const programInfo = {
    canvas,
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };
  
  
  let then = 0;

// Draw the scene repeatedly
  function render(now) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;
    
    drawScene(gl, programInfo);
    
    // requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}

function drawScene(gl, programInfo) {
  gl.viewport(0, 0, programInfo.canvas.width, programInfo.canvas.height)
  gl.clearColor(0.0, 0.0, 0.0, 0.5);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const vertices = [];
  const radius = .2
  const q = Math.sqrt(Math.pow(radius,2) - Math.pow((radius/2),2));
  gl.useProgram(programInfo.program);
  
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      vertices.push(x);
      vertices.push(y);
      vertices.push(x + radius);
      vertices.push(y);
      vertices.push(x + (radius/2));
      vertices.push(y+q);
      vertices.push(x-(radius/2));
      vertices.push(y+q);
      vertices.push(x - radius);
      vertices.push(y);
      vertices.push(x-(radius/2));
      vertices.push(y-q);
      vertices.push(x + (radius/2));
      vertices.push(y-q);
      vertices.push(x + radius);
      vertices.push(y);
    }
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      gl.STATIC_DRAW);
  
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
    vertices.length = 0;
  }
  
  /*
  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  const offset = 0; // how many bytes inside the buffer to start from
  
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(arr),
    gl.STATIC_DRAW);
  
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);*/
}

const vertexShaderSource = `
  attribute vec2 aVertexPosition;

  void main() {
    gl_Position = vec4(aVertexPosition, 0.0, 2.0);
  }
`;

const fragmentShaderCode = `
  void main() {
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
  }
`;

function createProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
  // Create the shader program
  
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
    console.log(gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  
  // Send the source to the shader object
  
  gl.shaderSource(shader, source);
  
  // Compile the shader program
  
  gl.compileShader(shader);
  
  // See if it compiled successfully
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

window.onload = start;