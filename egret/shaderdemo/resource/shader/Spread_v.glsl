//attribute vec2 aVertexPosition;
//attribute vec2 aTextureCoord;
//attribute vec2 aColor;
//uniform vec2 projectionVector;
//varying vec2 vTextureCoord;
//varying vec4 vColor;
//const vec2 center = vec2(-1.0, 1.0);
//void main(void) {
//    gl_Position =  vec4((aVertexPosition / projectionVector) + center , 1.0, 1.0);
//    vTextureCoord = aTextureCoord;
//    vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
//}


attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec2 aColor;
varying   vec2 vTextureCoord;
uniform vec2 projectionVector;
uniform   mat4 mvpMatrix;
uniform   float u_z;
const vec2 center = vec2(-1.0, 1.0);
void main(void){
	vTextureCoord = aTextureCoord;
	vec2 pos = (aVertexPosition / projectionVector) + center ;
	gl_Position   =  mvpMatrix * vec4((aVertexPosition / projectionVector) + center ,1.0 , 1.0);
}
