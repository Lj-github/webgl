/**** 期望实现 图片上  一个一个 小方块 消失的效果   ****/

class CleanShape extends eui.Component {
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
        //直接 没有 块状  只是一条线 分割
        let fragmentSrc1 = ''
        fragmentSrc1 = '//在这写 再copy 代码中\n' +
            '\n' +
            '//函数  一次函数  y = -x + b  || b 就是 u_index 需要全都使用 float\n' +
            'precision lowp float;\n' +
            'varying vec2 vTextureCoord;\n' +
            'varying vec4 vColor;\n' +
            'uniform sampler2D uSampler;\n' +
            '\n' +
            'uniform float customUniform;\n' +
            'uniform float u_index;// 0-100 float  现在 先分成 50块 先写死\n' +
            '\n' +
            'uniform float  u_PosX;\n' +
            'uniform float  u_PosY;\n' +
            '                \n' +
            '                \n' +
            'void main(void) {\n' +
            'vec2 uvs = vTextureCoord.xy;\n' +
            'vec4 fg = texture2D(uSampler, vTextureCoord);\n' +
            '    float count = 50.0;\n' +
            '    float y = uvs.y;\n' +
            '    float x = uvs.x ;\n' +
            '    if ((y < u_PosY&& y>(u_PosY-0.1)) && (x < u_PosX&&x>(u_PosX-0.1))){\n' +
            '        fg.rgba = vec4(0.0,0.0,0.0,0.0);\n' +
            '    }else{\n' +
            '        fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n' +
            '    }\n' +
            '//fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n' +
            '    gl_FragColor = fg * vColor;\n' +
            '}'

        let arr = []
        // for (var i = 0; i < 10000; i++) {
        //         arr.push(0.0)
        // }
        arr.length = 10000
        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0,
                u_PosX: 0.00,
                u_PosY: 0.00,
                u_arr: arr
            }
        );
        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter1]

        let w = egret.MainContext.instance.stage.stageWidth
        let h = egret.MainContext.instance.stage.stageHeight
        window["tete"] = sky
        sky.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
            console.log("x => ", e.stageX, " y=> ", e.stageY)
            let x = e.stageX
            let y = e.stageY
            // for (var i = 0; i < arr.length; i++) {
            //     if (!arr[i]) {
            //         arr[i] = x
            //         arr[i + 1] = y
            //         break
            //     }
            // }

            //0-2
            let d = new egret.Rectangle(0,0,w,h)
           // sky.texture.toDataURL('image/png',d)
            customFilter1.uniforms.u_PosX = 1.0 * x / w;
            customFilter1.uniforms.u_PosY = 1.0 * y / h;
            // customFilter1.uniforms.u_arr = arr

            // let pos = [x,y]
            // if(){
            //
            // }


        }, this)

        let pre = 10 //精度


        let vv = 100// shader 里面 目前先设置为 100 *100


    }
}

