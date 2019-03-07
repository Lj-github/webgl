//在这写 再copy 代码中

//函数  一次函数  y = -x + b  || b 就是 u_index 需要全都使用 float
precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
uniform float customUniform;
uniform float u_index;// 0-100 float  现在 先分成 50块 先写死
uniform float  u_PosX;
uniform float  u_PosY;
void main(void) {
vec2 uvs = vTextureCoord.xy;
vec4 fg = texture2D(uSampler, vTextureCoord);
    float count = 50.0;
    float y = uvs.y;
    float x = uvs.x;
    float ww = 0.05;//宽度 或者 直径
    if ((y < u_PosY&& y>(u_PosY-ww)) && (x < u_PosX&&x>(u_PosX-ww))){
        fg.rgba = vec4(0.0,0.0,0.0,0.0);
    }else{
        fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;
    }
//fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;
    gl_FragColor = fg * vColor;
}