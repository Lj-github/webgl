//在这写 再copy 代码中
//和webgl  不一样  egret  好想 调整了位置  中心 为 左上角  0 ，0   右下角 是
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
    float count = 100.0;//一共 50 块
    float w = 2.0;//宽度是 2.0
    //先计算自己属于那一块
    float b_x = (w/count)*floor(uvs.x /(w/count)) + w/count;
    float b_y = (w/count)*floor(uvs.y /(w/count)) + w/count;
    float y_now = uvs.y;//floor(uvs.y * count);
    float y_base = b_x* -1.0+ u_index;
    if (b_y<y_base){
        fg.rgba = vec4(0.0,0.0,0.0,0.0);
    }else{
        fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;
    }
    gl_FragColor = fg * vColor;
}