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
        return _super.call(this) || this;
    }
    NodeShaderBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var exml = "\n        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\"> <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> </e:Skin>";
        this.list = new eui.List(); //创建新的列表对象  直接在这配置完事
        this.list.dataProvider = new eui.ArrayCollection(NodeShaderBtn.listData); //设计列表的index数以及每一项的内容
        this.addChild(this.list);
        this.list.itemRendererSkinName = exml;
        this.list.selectedIndex = 0;
    };
    NodeShaderBtn.listData = ["Shader0", "Shader1", "Shader2", "Shader3", "Shader4", "Shader5", "Shader6"];
    return NodeShaderBtn;
}(eui.Component));
__reflect(NodeShaderBtn.prototype, "NodeShaderBtn");
