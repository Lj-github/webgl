class NodeShaderBtn extends eui.Component {
    static listData = ["Shader0","Shader1","Shader2","Shader3","Shader4","Shader5","Shader6"]
    list:eui.List
    constructor(){
        super()

    }

    protected createChildren() {
        super.createChildren();
        var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> </e:Skin>`;


        this.list = new eui.List();//创建新的列表对象  直接在这配置完事
        this.list.dataProvider = new eui.ArrayCollection(NodeShaderBtn.listData);//设计列表的index数以及每一项的内容
        this.addChild(this.list);
        this.list.itemRendererSkinName = exml;
        this.list.selectedIndex = 0

    }

}

