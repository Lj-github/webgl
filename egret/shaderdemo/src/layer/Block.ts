/**** 期望实现 图片上  一个一个 小方块 消失的效果   ****/

class Block extends eui.Component {
    constructor() {
        super()
        this.initUI()
    }

    private initUI() {

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
        let fragmentSrc1 =
      '//在这写 再copy 代码中\n' +
            '\n' +
            '//函数  一次函数  y = -x + b  || b 就是 u_index 需要全都使用 float\n' +
            'precision lowp float;\n' +
            'varying vec2 vTextureCoord;\n' +
            'varying vec4 vColor;\n' +
            'uniform sampler2D uSampler;\n' +
            '\n' +
            'uniform float customUniform;\n' +
            '//uniform int u_index;// 0-100 float  现在 先分成 50块 先写死\n' +
            'void main(void) {\n' +
            'vec2 uvs = vTextureCoord.xy;\n' +
            'vec4 fg = texture2D(uSampler, vTextureCoord);\n' +
            '    float count = 50.0;\n' +
            '    float u_index = 50.0;\n' +
            '    float ww =  100.0;//一共 的 宽度\n' +
            '\n' +
            '    //x 值\n' +
            '    float b = floor(u_index/(ww/count));\n' +
            '\n' +
            '    float y_now = floor(uvs.x * count);\n' +
            '    float y_base = uvs.x * -1.0+ b;\n' +
            '    if (uvs.y>y_base){\n' +
            '        fg.rgba = vec4(0.0,0.0,0.0,0.0);\n' +
            '    }else{\n' +
            '        fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n' +
            '    }\n' +
            '    gl_FragColor = fg * vColor;\n' +
            '}'
        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0,
                //u_index: 1
            }
        );
        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter1]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            customFilter1.uniforms.customUniform += 0.1;
            //customFilter1.uniforms.u_index += 1;
            if (customFilter1.uniforms.customUniform > Math.PI * 2) {
                customFilter1.uniforms.customUniform = 0.0;
            }
            // if (customFilter1.uniforms.u_index >= 100) {
            //     customFilter1.uniforms.u_index = 1
            // }
        }, this);
    }
}

