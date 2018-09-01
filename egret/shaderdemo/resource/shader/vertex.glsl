attribute vec2 aVertexPosition; // attribute变量是只能在vertex shader中使用的变量
attribute vec2 aTextureCoord;   //
attribute vec2 aColor;

uniform vec2 projectionVector;

varying vec2 vTextureCoord;
varying vec4 vColor;

const vec2 center = vec2(-1.0, 1.0);

void main(void) {
    gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.y);
}
