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
var NodeShaderBtn = (function (_super) {
    __extends(NodeShaderBtn, _super);
    function NodeShaderBtn() {
        var _this = _super.call(this) || this;
        var listData = ["item1", "item2", "item3", "item4", "item5"];
        var list = new eui.List(); //创建新的列表对象  直接在这配置完事
        list.dataProvider = new eui.ArrayCollection(listData); //设计列表的index数以及每一项的内容
        _this.addChild(list);
        return _this;
    }
    return NodeShaderBtn;
}(eui.Component));
__reflect(NodeShaderBtn.prototype, "NodeShaderBtn");
