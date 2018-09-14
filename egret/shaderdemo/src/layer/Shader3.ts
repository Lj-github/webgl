
class  Shader3 extends eui.Component{
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

         let fragmentSrc4 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform float lineWidth;",
            "uniform float offset;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float modPart = mod(vTextureCoord.y, lineWidth);",
            "float solidPart = (1.0 - offset) * lineWidth;",

            "if(modPart > solidPart) {",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "} else {",
            "gl_FragColor = vec4(0., 0., 0., 0.);",
            "}",


            "}"
        ].join("\n");



        let customFilter4 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc4,
            {
                lineWidth: 0.1,
                offset: 0
            }
        );
        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter4]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {


            customFilter4.uniforms.offset += 0.01;
            if (customFilter4.uniforms.offset > 1) {
                customFilter4.uniforms.offset = 0.0;
            }
        }, this);

    }



}

