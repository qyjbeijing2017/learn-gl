#version 300 es

in vec4 position;
in vec4 normal;
in vec2 texcoord;

uniform mat4 u_world;
uniform mat4 u_view;
uniform mat4 u_projection;

out vec4 v_position;
out vec4 v_normal;

void main() {
    gl_Position = u_projection * u_view * u_world * position;
}
