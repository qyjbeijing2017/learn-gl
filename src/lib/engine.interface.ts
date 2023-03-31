import { Camera } from "./camera";
import GameObject from "./game-object";

export interface IEngine {
    stopped: boolean;
    gl: WebGL2RenderingContext;
    startTime: number;
    objects: GameObject[];
    mainCamera: Camera;
}