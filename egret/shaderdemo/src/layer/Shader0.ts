class Shader0 extends eui.Component {
    constructor() {
        super()
        this.initUI()
    }

    private initUI() {
        //
        //  let vertexSrc =
        //     "attribute vec2 aVertexPosition;\n" +
        //     "attribute vec2 aTextureCoord;\n" +
        //     "attribute vec2 aColor;\n" +
        //
        //     "uniform vec2 projectionVector;\n" +
        //
        //     "varying vec2 vTextureCoord;\n" +
        //     "varying vec4 vColor;\n" +
        //
        //     "const vec2 center = vec2(-1.0, 1.0);\n" +
        //
        //     "void main(void) {\n" +
        //     "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
        //     "   vTextureCoord = aTextureCoord;\n" +
        //     "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
        //     "}";
        // let fragmentSrc1 =
        //     "precision lowp float;\n" +
        //     "varying vec2 vTextureCoord;\n" +
        //     "varying vec4 vColor;\n" +
        //     "uniform sampler2D uSampler;\n" +
        //
        //     "uniform float customUniform;\n" +
        //
        //     "void main(void) {\n" +
        //     "vec2 uvs = vTextureCoord.xy;\n" +
        //     "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
        //     "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
        //     "gl_FragColor = fg * vColor;\n" +
        //     "}";
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            //"   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";


        var fragmentSrc1 = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            // "fg.rgb +=vColor.rgb;\n" +
            "float alp =1.0-uvs.y;\n" +
            "fg.a=alp;\n" +
            "fg.rgb+=vColor.rgb;\n" +
            "fg.r=fg.r*alp;\n" +
            "fg.g=fg.g*alp;\n" +
            "fg.b=fg.b*alp;\n" +
            "gl_FragColor = fg ;\n" +
            "}";

        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0
            }
        );

        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter1]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter1.uniforms.customUniform += 0.1;
            if (customFilter1.uniforms.customUniform > Math.PI * 2) {
                customFilter1.uniforms.customUniform = 0.0;
            }
        }, this);

    }


}

