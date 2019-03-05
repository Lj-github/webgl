//在这写 再copy 代码中

//函数  一次函数  y = -x + b  || b 就是 u_index 需要全都使用 float
precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;

uniform float customUniform;
uniform float u_index;// 0-100 float  现在 先分成 50块 先写死
void main(void) {
vec2 uvs = vTextureCoord.xy;
vec4 fg = texture2D(uSampler, vTextureCoord);
    float count = 50.0;
    //float u_index = 50.0;//传过来的 位置
    float ww =  100.0;//一共 的 宽度

    float index = floor(u_index/(100.0/count));
    float b = u_index; //*  (100.0/count);//单位 100.0 / count

    float y_now = uvs.y;//floor(uvs.y * count);
    float y_base = uvs.x * -1.0+ b;
    if (y_now<y_base){
        fg.rgba = vec4(0.0,0.0,0.0,0.0);
    }else{
        fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;
    }
//fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;
    gl_FragColor = fg * vColor;
}