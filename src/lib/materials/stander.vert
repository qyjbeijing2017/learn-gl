#version 300 es

in vec4 position;
in vec4 normal;
in vec2 texcoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec4 v_position;
out vec4 v_normal;

void main() {
    v_position = position;
    v_normal = normal;
    gl_Position = projection * view * model * position;
}
