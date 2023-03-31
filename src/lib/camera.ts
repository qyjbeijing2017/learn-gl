import { mat4 } from "gl-matrix";
import GameObject from "./game-object";

export class Camera extends GameObject {
    private _fov = 45;
    private _near = 0.1;
    private _far = 100;
    private _width = 1920;
    private _height = 1080;
    
    setScreenDimensions(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get fov() {
        return this._fov;
    }

    set fov(value: number) {
        this._fov = value;
    }

    get near() {
        return this._near;
    }

    set near(value: number) {
        this._near = value;
    }

    get far() {
        return this._far;
    }

    set far(value: number) {
        this._far = value;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get projectionMatrix() {
        const matrix = mat4.create();
        mat4.perspective(matrix, this._fov, this._width / this._height, this._near, this._far);
        return matrix;
    }
}