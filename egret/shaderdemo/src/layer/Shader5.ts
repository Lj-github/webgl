
class Shader5 extends eui.Component{
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
   let fragmentSrc =
            "precision lowp float;\n" +

            "varying vec2 vTextureCoord;\n" +

            "uniform float width;\n" +
            "uniform float height;\n" +

            "void main(void) {\n" +
            "vec4 fg;\n" +
            "if(mod(floor(vTextureCoord.x / width) + floor(vTextureCoord.y / height), 2.0) == 0.0) {" +
            "fg = vec4(1,1,1,1);" +
            "}" +
            "else {" +
            "fg = vec4(0,0,0,1);" +
            "}" +
            "gl_FragColor = fg;\n" +
            "}";



        let size = 50;
        let filter = new egret.CustomFilter(vertexSrc, fragmentSrc, { width: size / 640, height: size / 1000 });

        let inc = 1;

        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [filter];
        this.addEventListener(egret.Event.ENTER_FRAME, () => {

            size += inc;
            if (size >= 80) {
                inc = -1;
            }
            if (size <= 50) {
                inc = 1;
            }
            filter.uniforms.width = size / 640;
            filter.uniforms.height =  size / 1000 ;
        }, this);

    }



}

