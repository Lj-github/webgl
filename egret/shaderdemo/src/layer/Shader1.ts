
class Shader1 extends eui.Component{
    constructor(){
        super()
        this.initUI()
    }
    private initUI(){

         let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";

        var fragmentSrc2 = [
            "precision lowp float;",

            "varying vec2 vTextureCoord;",
            // "varying vec4 vColor;",

            "uniform float time;",
            "uniform sampler2D uSampler;",

            "void main() {",
            "vec3 p = (vec3(vTextureCoord.xy,.0) - 0.5) * abs(sin(time/10.0)) * 50.0;",
            "float d = sin(length(p)+time), a = sin(mod(atan(p.y, p.x) + time + sin(d+time), 3.1416/3.)*3.), v = a + d, m = sin(length(p)*4.0-a+time);",
            "float _r = -v*sin(m*sin(-d)+time*.1);",
            "float _g = v*m*sin(tan(sin(-a))*sin(-a*3.)*3.+time*.5);",
            "float _b = mod(v,m);",
            "float _a = 1.0;",
            "if(_r < 0.1 && _g < 0.1 && _b < 0.1) {",
            "_a = 0.0;",
            "}",
            "gl_FragColor = vec4(_r * _a, _g * _a, _b * _a, _a);",
            "}"
        ].join("\n");

        let customFilter2 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc2,
            {
                time: 0
            }
        );

        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter2]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter2.uniforms.time += 0.008;
            if (customFilter2.uniforms.time > 1) {
                customFilter2.uniforms.time = 0.0;
            }
        }, this);
       
    }

    

}

