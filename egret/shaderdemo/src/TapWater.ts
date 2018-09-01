interface waterFilter3_uniforms {
    center:{x:number,y:number}
    params: { x: number, y:number, z: number},
    time: number

}
class TapWater extends eui.Component{
    constructor(){
        super()
        this.initUI()
    }
    private initUI(){
        //创建可点击的shader 点击水纹
        let vertexSrc = RES.getRes("vertex_glsl")
        console.log(vertexSrc)

        let fragmentWater = RES.getRes("fragmentWather_glsl")

        let waterFilter3 = new egret.CustomFilter(
            vertexSrc,
            fragmentWater,
            <waterFilter3_uniforms>{
                center: { x: 0.5, y: 0.5 },
                params: { x: 10, y: 0.8, z: 0.1 },
                time: 0
            }
        );
        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [waterFilter3]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            waterFilter3.uniforms.time += 0.01;
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this);
        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
            let x = Math.abs(e.stageX - sky.x )/sky.width
            let y = Math.abs(e.stageY - sky.y )/sky.height
            //修改水纹起始位置
            waterFilter3.uniforms.center.x = x
            waterFilter3.uniforms.center.y = y
            console.log("水波起始位置(百分比) ===> x : " +x + " y : " + y )

            //
            waterFilter3.uniforms.time += 0.2;
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this)
    }


}

