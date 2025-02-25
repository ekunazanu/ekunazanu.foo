const canvas = document.getElementById('fractalCanvas');
const gl = canvas.getContext('webgl');

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
    precision mediump float;
    uniform float u_time;
    
    void main() {
        vec2 z = gl_FragCoord.xy / vec2(600, 600) * 4.0 - 2.0;
        vec2 c = vec2(0.7885 * cos(u_time), 0.7885 * sin(u_time));
        int iterations = 0;
        
        for (int i = 0; i < 100; i++) {
            float x = z.x * z.x - z.y * z.y + c.x;
            float y = 2.0 * z.x * z.y + c.y;

            if (x * x + y * y > 4.0) break;
            z = vec2(x, y);
            iterations++;
        }
        
        float color = 1.0 - float(iterations) / 100.0;
        gl_FragColor = vec4(color, color, color, 1.0);
    }
`);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
]), gl.STATIC_DRAW);

function render(time) {
    canvas.width = 600;
    canvas.height = 600;
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    gl.useProgram(program);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    gl.uniform1f(timeUniformLocation, time * 0.0005);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
