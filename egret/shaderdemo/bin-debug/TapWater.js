var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TapWater = (function (_super) {
    __extends(TapWater, _super);
    function TapWater() {
        var _this = _super.call(this) || this;
        _this.initUI();
        return _this;
    }
    TapWater.prototype.initUI = function () {
        //创建可点击的shader 点击水纹
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
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentWater = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",
            "uniform vec2 center;",
            "uniform vec3 params;",
            "uniform float time;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float dist = distance(uv, center);",
            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");
        var waterFilter3 = new egret.CustomFilter(vertexSrc, fragmentWater, {
            center: { x: 0.5, y: 0.5 },
            params: { x: 10, y: 0.8, z: 0.1 },
            time: 0
        });
        var sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true; // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [waterFilter3];
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            waterFilter3.uniforms.time += 0.01;
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this);
        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            waterFilter3.uniforms.time += 0.2;
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this);
    };
    TapWater.prototype.onTouch = function () {
        console.log("touch");
    };
    return TapWater;
}(eui.Component));
__reflect(TapWater.prototype, "TapWater");
