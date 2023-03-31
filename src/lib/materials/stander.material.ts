import Material from "../material"
import standerVt from "./stander.vert?raw"
import standerFt from "./stander.frag?raw"

export const createStanderMaterial = (gl: WebGLRenderingContext) => {
    return new Material(gl, {
        vs: standerVt,
        fs: standerFt,
        uniforms: {}
    })
}