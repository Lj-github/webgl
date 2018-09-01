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
        var vertexSrc = RES.getRes("vertex_glsl");
        console.log(vertexSrc);
        var fragmentWater = RES.getRes("fragmentWather_glsl");
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
                return;
                // waterFilter3.uniforms.time = 0.0;
            }
        }, this);
        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var x = Math.abs(e.stageX - sky.x) / sky.width;
            var y = Math.abs(e.stageY - sky.y) / sky.height;
            //修改水纹起始位置
            waterFilter3.uniforms.center.x = x;
            waterFilter3.uniforms.center.y = y;
            console.log("水波起始位置(百分比) ===> x : " + x + " y : " + y);
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this);
    };
    return TapWater;
}(eui.Component));
__reflect(TapWater.prototype, "TapWater");
