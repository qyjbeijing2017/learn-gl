import * as twgl from 'twgl.js';
import { Camera } from './camera';
import { IEngine } from './engine.interface';
import GameObject from './game-object';
import { creatCubeObject } from './objects/cube.object';


export const createEngine = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        throw new Error('WebGL2 not supported');
    }

    const cube = creatCubeObject(gl);

    const engine: IEngine = {
        stopped: false,
        gl,
        startTime: Date.now(),
        objects: [
            cube,
        ],
        mainCamera: new Camera(),
    };

    gl.clearColor(0, 0, 0, 1);

    engine.mainCamera.transform.position = [0, 0, 5];
    engine.mainCamera.transform.lookAt([0, 0, 0]);

    const render = () => {
        twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        engine.mainCamera.setScreenDimensions(gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);
        const viewMatrix = engine.mainCamera.transform.worldMatrix;
        const projectionMatrix = engine.mainCamera.projectionMatrix;
        engine.objects.forEach(object => {
            if(object.material && object.mesh) {
                const worldMatrix = object.transform.worldMatrix;
                const uniforms = Object.assign({}, object.material.uniforms, {
                    u_world: worldMatrix,
                    u_view: viewMatrix,
                    u_projection: projectionMatrix,
                });
                gl.useProgram(object.material.programInfo.program);
                twgl.setBuffersAndAttributes(gl, object.material.programInfo, object.mesh.bufferInfo);
                twgl.setUniforms(object.material.programInfo, uniforms);
                twgl.drawBufferInfo(gl, object.mesh.bufferInfo);
            }
        });

        if (!engine.stopped) {
            requestAnimationFrame(render);
        }
    };
    requestAnimationFrame(render);

    return () => {
        engine.stopped = true;
    }
}