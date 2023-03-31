import * as twgl from 'twgl.js';
import { v4 } from 'uuid';

export default class Mesh {
    readonly uuid = v4();
    protected _bufferInfo: twgl.BufferInfo;

    get bufferInfo() {
        return this._bufferInfo;
    }

    createBufferInfo(arrays: twgl.Arrays) {
        this._bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
    }

    constructor(private readonly gl: WebGLRenderingContext, arrays?: twgl.Arrays) {
        this._bufferInfo = arrays ? twgl.createBufferInfoFromArrays(gl, arrays) :
            twgl.createBufferInfoFromArrays(gl, {
                position: [0, 0, 0],
                normal: [0, 0, 0],
                texcoord: [0, 0],
                indices: [0, 0, 0]
            });
    }
}