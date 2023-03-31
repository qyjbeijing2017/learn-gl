import GameObject from "../game-object"
import { createStanderMaterial } from "../materials/stander.material";
import Mesh from "../mesh";

export const creatCubeObject = (gl: WebGL2RenderingContext) => {
    const obj = new GameObject();
    const arrays = {
        position: {
            numComponents: 3,
            data: [
                -1, -1, -1,
                -1, -1, 1,
                -1, 1, -1,
                -1, 1, 1,
                1, -1, -1,
                1, -1, 1,
                1, 1, -1,
                1, 1, 1,
            ],
        },
        normal: {
            numComponents: 3,
            data: [
                -1, -1, -1,
                -1, -1, 1,
                -1, 1, -1,
                -1, 1, 1,
                1, -1, -1,
                1, -1, 1,
                1, 1, -1,
                1, 1, 1,
            ],
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,
                1, 3, 2,
                4, 6, 5,
                5, 6, 7,
                0, 2, 4,
                4, 2, 6,
                1, 5, 3,
                5, 7, 3,
                0, 4, 1,
                4, 5, 1,
                2, 3, 6,
                6, 3, 7,
            ],
        },
    };
    obj.mesh = new Mesh(gl, arrays);
    obj.material = createStanderMaterial(gl);
    return obj;
}