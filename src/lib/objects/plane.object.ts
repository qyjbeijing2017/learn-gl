import GameObject from "../game-object"
import { createStanderMaterial } from "../materials/stander.material";
import Mesh from "../mesh";

export const createPlaneObect = (gl: WebGL2RenderingContext) => {
    const obj = new GameObject();
    const arrays = {
        position: {
            numComponents: 3,
            data: [
                -1, -1, 0,
                -1, 1, 0,
                1, -1, 0,
                1, 1, 0,
            ],
        },
        normal: {
            numComponents: 3,
            data: [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
            ],
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,
                1, 3, 2,
            ],
        },
    };
    obj.mesh = new Mesh(gl, arrays);
    obj.material = createStanderMaterial(gl);
    return obj;
}