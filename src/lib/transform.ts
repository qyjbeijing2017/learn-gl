import { mat4, quat, vec3 } from 'gl-matrix';

export class Transform {
    private _position = vec3.create();
    private _rotation = quat.create();
    private _scale = vec3.fromValues(1, 1, 1);

    get position() {
        return this._position;
    }

    get rotation() {
        return this._rotation;
    }

    get scale() {
        return this._scale;
    }

    set position(value: ArrayLike<number>) {
        this._position[0] = value[0];
        this._position[1] = value[1];
        this._position[2] = value[2];
    }

    set rotation(value: ArrayLike<number>) {
        this._rotation[0] = value[0];
        this._rotation[1] = value[1];
        this._rotation[2] = value[2];
        this._rotation[3] = value[3];
    }

    set scale(value: ArrayLike<number>) {
        this._scale[0] = value[0];
        this._scale[1] = value[1];
        this._scale[2] = value[2];
    }


    get forward() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(0, 0, -1), this._rotation);
        return direction;
    }

    get right() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(1, 0, 0), this._rotation);
        return direction;
    }

    get up() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(0, 1, 0), this._rotation);
        return direction;
    }

    set forward(value: vec3) {
        quat.rotationTo(this._rotation, vec3.fromValues(0, 0, -1), value);
    }

    set right(value: vec3) {
        quat.rotationTo(this._rotation, vec3.fromValues(1, 0, 0), value);
    }

    set up(value: vec3) {
        quat.rotationTo(this._rotation, vec3.fromValues(0, 1, 0), value);
    }

    set localEulerAngles(value: vec3) {
        quat.fromEuler(this._rotation, value[0], value[1], value[2]);
    }

    get worldMatrix() {
        const matrix = mat4.create();
        mat4.fromRotationTranslationScale(matrix, this._rotation, this._position, this._scale);
        return matrix;
    }

    get viewMatrix() {
        const matrix = mat4.create();
        mat4.invert(matrix, this.worldMatrix);
        return matrix;
    }

    lookAt(target: vec3) {
        const direction = vec3.create();
        vec3.sub(direction, target, this._position);
        vec3.normalize(direction, direction);
        quat.rotationTo(this._rotation, vec3.fromValues(0, 0, -1), direction);
    }
}