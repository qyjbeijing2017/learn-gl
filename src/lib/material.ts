import * as twgl from 'twgl.js';
import { v4 } from 'uuid';
import standerVt from "./materials/stander.vert?raw"
import standerFt from "./materials/stander.frag?raw"

export interface MaterialOptions {
    vs: string;
    fs: string;
    uniforms: any;
}

export default class Material{
    readonly uuid = v4();
    readonly uniforms: { [key: string]: any };

    setFloat(name: string, value: number) {
        this.uniforms[name] = value;
    }

    setVec2(name: string, value: [number, number]) {
        this.uniforms[name] = value;
    }

    setVec3(name: string, value: [number, number, number]) {
        this.uniforms[name] = value;
    }

    setVec4(name: string, value: [number, number, number, number]) {
        this.uniforms[name] = value;
    }

    setMat4(name: string, value: Float32Array) {
        this.uniforms[name] = value;
    }

    programInfo: twgl.ProgramInfo;
    constructor(private readonly gl: WebGLRenderingContext, options?: Partial<MaterialOptions>) {
        this.uniforms = options?.uniforms ?? {};
        this.programInfo = twgl.createProgramInfo(gl, [options?.vs ?? standerVt, options?.fs ?? standerFt]);
    }
}