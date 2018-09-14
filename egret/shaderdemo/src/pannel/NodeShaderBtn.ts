class NodeShaderBtn extends eui.Component {
    list:eui.List
    constructor(){
        super()

        let listData = ["item1","item2","item3","item4","item5"]

        this.list =new eui.List();//创建新的列表对象  直接在这配置完事
        this.list.dataProvider = new eui.ArrayCollection(listData);//设计列表的index数以及每一项的内容
        this.addChild(this.list);
    }



}

