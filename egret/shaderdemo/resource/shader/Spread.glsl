///应该是只有内部的 一点 有 梯形效果


 precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
uniform float u_radius;
uniform float u_alpha;
uniform float u_posx;
uniform float u_posy;

void main()
{
    float radius = u_radius;
    vec2 coord = vTextureCoord;

    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;
    float scale = l *0.01+1.0;
    float fanwei = 0.2;
    if(coord.x > (u_posx-fanwei/2.0) &&coord.x < (u_posx+fanwei/2.0)  && coord.y < (u_posy+fanwei/2.0) &&coord.y < (u_posy+fanwei/2.0)) {
        coord.x = coord.x * scale;
        coord.y  = coord.y * scale;

        coord.x = coord.x +(5.0* (coord.y - (u_posx-fanwei/2.0))-5.0);
        //coord.x = coord.x/((coord.y+1.0)/2.0);


        gl_FragColor = texture2D(uSampler, coord) ;

    }else{
    gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
    }
//    if(coord.x > 1.0|| coord.x<0.0){
//        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
//    }else {
//        gl_FragColor = texture2D(uSampler, coord) ;
//    }
}




///整体 梯形效果


 precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
uniform float u_radius;
uniform float u_alpha;
uniform float u_posx;
uniform float u_posy;

void main()
{
    float radius = u_radius;
    vec2 coord = vTextureCoord;



    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;
    float scale = l *0.01+1.0;
    coord.x = coord.x * scale;
    coord.y  = coord.y * scale;
    coord.x = coord.x +(0.25*coord.y-0.25);
    coord.x = coord.x/((coord.y+1.0)/2.0);

    if(coord.x > 1.0|| coord.x<0.0){
        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
    }else {
        gl_FragColor = texture2D(uSampler, coord) ;
    }
}
