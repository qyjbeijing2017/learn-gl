import { mat4, quat, vec3 } from 'gl-matrix';

export class Transform {
    position = vec3.create();
    rotation = quat.create();
    scale = vec3.fromValues(1, 1, 1);

    get forward() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(0, 0, -1), this.rotation);
        return direction;
    }

    get right() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(1, 0, 0), this.rotation);
        return direction;
    }

    get up() {
        const direction = vec3.create();
        vec3.transformQuat(direction, vec3.fromValues(0, 1, 0), this.rotation);
        return direction;
    }

    set forward(value: vec3) {
        quat.rotationTo(this.rotation, vec3.fromValues(0, 0, -1), value);
    }

    set right(value: vec3) {
        quat.rotationTo(this.rotation, vec3.fromValues(1, 0, 0), value);
    }

    set up(value: vec3) {
        quat.rotationTo(this.rotation, vec3.fromValues(0, 1, 0), value);
    }

    set localEulerAngles(value: vec3) {
        quat.fromEuler(this.rotation, value[0], value[1], value[2]);
    }

    get worldMatrix() {
        const matrix = mat4.create();
        mat4.fromRotationTranslationScale(matrix, this.rotation, this.position, this.scale);
        return matrix;
    }

    get viewMatrix() {
        const matrix = mat4.create();
        mat4.invert(matrix, this.worldMatrix);
        return matrix;
    }

    lookAt(target: vec3) {
        const direction = vec3.create();
        vec3.sub(direction, target, this.position);
        vec3.normalize(direction, direction);
        quat.rotationTo(this.rotation, vec3.fromValues(0, 0, -1), direction);
    }
}