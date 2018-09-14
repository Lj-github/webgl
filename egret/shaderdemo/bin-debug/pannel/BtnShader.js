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
var BtnShader = (function (_super) {
    __extends(BtnShader, _super);
    function BtnShader() {
        return _super.call(this) || this;
    }
    BtnShader.prototype.dataChanged = function () {
        if (this.data) {
        }
    };
    return BtnShader;
}(eui.ItemRenderer));
__reflect(BtnShader.prototype, "BtnShader");
