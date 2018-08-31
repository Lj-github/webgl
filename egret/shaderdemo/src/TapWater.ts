
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
            {
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
        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            waterFilter3.uniforms.time += 0.2;
            if (waterFilter3.uniforms.time > 1) {
                waterFilter3.uniforms.time = 0.0;
            }
        }, this)
    }
    onTouch(){
        console.log("touch")

    }

}