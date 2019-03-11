/////应该是只有内部的 一点 有 梯形效果
//precision lowp float;
//varying vec2 vTextureCoord;
//varying vec4 vColor;
//uniform sampler2D uSampler;
//uniform float u_radius;
//uniform float u_alpha;
//uniform float u_posx;
//uniform float u_posy;
//void main()
//{
//    float radius = u_radius;
//    vec2 coord = vTextureCoord;
//    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;
//    float scale = l *0.01+1.0;
//    float fanwei = 0.4;//上下的 范围
//    float prop = 0.9;//上底 / 下底
//    if(coord.x > (u_posx-fanwei/2.0) &&coord.x < (u_posx+fanwei/2.0) && coord.y < (u_posy+fanwei/2.0) &&coord.y > (u_posy-fanwei/2.0)) { //区间内
////      coord.x = coord.x * scale;
////      coord.y = coord.y * scale;
//        float yy =(coord.y - (u_posy-fanwei/2.0))/fanwei;//0-1
//        float scale_x = (1.0-prop)*yy + prop;//
//        if(coord.x < u_posx){
//            coord.x= u_posx -((u_posx-coord.x)*(scale_x));
//        }else{
//             coord.x= u_posx+((coord.x-u_posx )*(scale_x));
//        }
//        vec4 test = vec4(1.0,0.0,0.0,1.0); //边红一点  有点效果
//        gl_FragColor = texture2D(uSampler, coord) * test;
//    }else{
//        gl_FragColor = texture2D(uSampler, coord) ;
//    }
//}

//
////整体 梯形效果
//precision lowp float;
//varying vec2 vTextureCoord;
//varying vec4 vColor;
//uniform sampler2D uSampler;
//uniform float u_radius;
//uniform float u_alpha;
//uniform float u_posx;
//uniform float u_posy;
//void main()
//{
//    float radius = u_radius;
//    vec2 coord = vTextureCoord;
//    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;
//    float scale = l *0.01+1.0;
//    coord.x = coord.x * scale;
//    coord.y  = coord.y * scale;
//    coord.x = coord.x +(0.25*coord.y-0.25);
//    coord.x = coord.x/((coord.y+1.0)/2.0);
//    if(coord.x > 1.0|| coord.x<0.0){
//        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
//    }else {
//        gl_FragColor = texture2D(uSampler, coord) ;
//    }
//}




//伪3d 效果 近大远小
//precision lowp float;
//varying vec2 vTextureCoord;
//varying vec4 vColor;
//uniform sampler2D uSampler;
//uniform float u_radius;
//uniform float u_alpha;
//uniform float u_posx;
//uniform float u_posy;
//void main()
//{
//    float z = 0.2;
//    float radius = u_radius;
//    vec2 coord = vTextureCoord;
//
//    if(coord.x > 1.0|| coord.x<0.0){
//        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
//    }else {
//        gl_FragColor = texture2D(uSampler, coord) ;
//    }
//}



precision mediump float;

uniform sampler2D texture;
varying vec2      vTextureCoord;

void main(void){
	vec4 smpColor = texture2D(texture, vTextureCoord);
	gl_FragColor  = smpColor ;
}
