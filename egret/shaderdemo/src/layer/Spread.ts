/**** 期望实现 图片上  一个一个 小方块 消失的效果   ****/

class Spread extends eui.Component {
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
        let fragmentSrc1 ='///应该是只有内部的 一点 有 梯形效果\n' +
            '\n' +
            '\n' +
            ' precision lowp float;\n' +
            'varying vec2 vTextureCoord;\n' +
            'varying vec4 vColor;\n' +
            'uniform sampler2D uSampler;\n' +
            'uniform float u_radius;\n' +
            'uniform float u_alpha;\n' +
            'uniform float u_posx;\n' +
            'uniform float u_posy;\n' +
            '\n' +
            'void main()\n' +
            '{\n' +
            '    float radius = u_radius;\n' +
            '    vec2 coord = vTextureCoord;\n' +
            '\n' +
            '    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;\n' +
            '    float scale = l *0.01+1.0;\n' +
            '    float fanwei = 0.2;\n' +
            '    if(coord.x > (u_posx-fanwei/2.0) &&coord.x < (u_posx+fanwei/2.0)  && coord.y < (u_posy+fanwei/2.0) &&coord.y < (u_posy+fanwei/2.0)) {\n' +
            '        coord.x = coord.x * scale;\n' +
            '        coord.y  = coord.y * scale;\n' +
            '\n' +
            '        coord.x = coord.x +(5.0* (coord.y - (u_posx-fanwei/2.0))-5.0);\n' +
            '        //coord.x = coord.x/((coord.y+1.0)/2.0);\n' +
            '        \n' +
            '        \n' +
            '        gl_FragColor = texture2D(uSampler, coord) ;\n' +
            '        \n' +
            '    }else{\n' +
            '    gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;\n' +
            '    }\n' +
            '//    if(coord.x > 1.0|| coord.x<0.0){\n' +
            '//        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;\n' +
            '//    }else {\n' +
            '//        gl_FragColor = texture2D(uSampler, coord) ;\n' +
            '//    }\n' +
            '}\n' +
            '\n'
        let customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0,
                u_posx: 0.5,
                u_posy: 0.5,
            }
        );
        let sky = Main.createBitmapByName("weew1_jpg");
        let w = egret.MainContext.instance.stage.stageWidth
        let h = egret.MainContext.instance.stage.stageHeight

        let gg = Main.createBitmapByName("bg_jpg");
        gg.x = w / 2
        gg.y = h / 2
        gg.width = 50
        gg.height = 100

        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [customFilter1]
        this.addChild(gg);
        window["tete"] = sky
        // sky.scaleX = sky.scaleY = 0.5;
        sky.anchorOffsetX = 1080 / 2
        sky.anchorOffsetY = 1920 / 2
        sky.x = 1080 / 4
        sky.y = 1920 / 4
        sky.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            // x y 0-1
            // console.log("x => ", e.stageX, " y=> ", e.stageY);
            // var x = e.stageX;
            // var y = e.stageY;
            // var d = new egret.Rectangle(0, 0, w, h);
            // customFilter1.uniforms.u_posx = 1.0 * x / 1080;
            // customFilter1.uniforms.u_posy = 1.0 * y / 1920;
            // sky.scaleX = sky.scaleY = 0.4 * ((1 - (y / 1920)) * 2 + 2);
            // //sky.x = -0.05 * ((1 - (y / h)) * 2 + 2) * 1080 / 2;
        }, this);
        customFilter1.uniforms.u_posx = 0.5
        let xxx = 0.002
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            // customFilter1.uniforms.u_posx += 0.002
            // customFilter1.uniforms.u_posy += xxx
            // if (customFilter1.uniforms.u_posy >= 1.0||customFilter1.uniforms.u_posy <= 0) {
            //     xxx = -xxx
            //     //  customFilter1.uniforms.u_posx += xxx
            //     // if (customFilter1.uniforms.u_posx >= 1||customFilter1.uniforms.u_posx <= 0) {
            //     //    xxx = -xxx
            //     // }
            // }
            // sky.scaleX = sky.scaleY = (2 - customFilter1.uniforms.u_posy);
            // console.log(sky.scaleX)
            // sky.x = (1 - customFilter1.uniforms.u_posx) * w * sky.scaleY
            // sky.y = (1 - customFilter1.uniforms.u_posy) * h * sky.scaleY //- 1920*0.5
        }, this);
    }
}

//
// '//函数  一次函数  y = -x + b  || b 就是 u_index 需要全都使用 float\n' +
//             'precision lowp float;\n' +
//             'varying vec2 vTextureCoord;\n' +
//             'varying vec4 vColor;\n' +
//             'uniform sampler2D uSampler;\n' +
//             'uniform float u_radius;\n' +
//             'uniform float u_alpha;\n' +
//             'uniform float u_posx;\n' +
//             'uniform float u_posy;\n' +
//             '\n' +
//             'void main()\n' +
//             '{\n' +
//             '    float radius = u_radius;\n' +
//             '    vec2 coord = vTextureCoord;\n' +
//             '    float l = pow((u_posx-coord.x) *(u_posx-coord.x)  + (u_posy-coord.y) *(u_posy-coord.y),0.5) ;\n' +
//             '    float scale = l *0.01+1.0;\n' +
//             '    coord.x = coord.x * scale;\n' +
//             '    coord.y  = coord.y * scale;\n' +
//             'coord.x = coord.x +(0.25*coord.y-0.25); \n' +
//             'coord.x = coord.x/((coord.y+1.0)/2.0); \n' +
//             '    if(coord.x > 1.0|| coord.x<0.0){\n' +
//             '        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;\n' +
//             '    }else {\n' +
//             '        gl_FragColor = texture2D(uSampler, coord) ;\n' +
//             '    }\n' +
//             '\n' +
//             '\n' +
//             '}\n' +
//             '\n' +
