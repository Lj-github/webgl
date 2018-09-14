interface waterFilter3_uniforms {
    center:{x:number,y:number}
    params: { x: number, y:number, z: number},
    time: number

}
class TapWater extends eui.Component{
    allTime :Array<number> = function (count) {
        var ar = []
        while (count>0){
            ar.push(0.01)
            count--
        }
        return ar
    }(10)
    constructor(){
        super()
        this.initUI()
        //this.scaleX = this.scaleY  = 0.8
    }
    private initUI(){

        // todo  egret 貌似对 shader 支持的还不够
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
                time: 0,
                // v:[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]
            }
        );
        let sky = Main.createBitmapByName("bg_jpg");
        sky.touchEnabled = true    // bitmap  必须设置 true  才能点击事件？
        this.addChild(sky);
        sky.filters = [waterFilter3]
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            let canRun  = false
            for (let i  in this.allTime){
                if ( this.allTime[i] > 0 ){
                    canRun = true
                    this.allTime[i] += 0.01
                    if (this.allTime[i] >=1){
                        this.allTime[i] = 0.0
                    }
                }
            }
            if (canRun){
                waterFilter3.uniforms.v =  this.allTime

            }

            // waterFilter3.uniforms.time += 0.01;
            // if (waterFilter3.uniforms.time > 1) {
            //     return
            //    // waterFilter3.uniforms.time = 0.0;
            // }
        }, this);
        //egret.web.EgretWebGLAttribute()



        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
            let x = Math.abs(e.stageX - sky.x )/sky.width
            let y = Math.abs(e.stageY - sky.y )/sky.height
            //修改水纹起始位置
            waterFilter3.uniforms.center.x = x
            waterFilter3.uniforms.center.y = y


            console.log("水波起始位置(百分比) ===> x : " +x + " y : " + y )
            //
            // if (waterFilter3.uniforms.time > 1) {
            //     waterFilter3.uniforms.time = 0.0;
            // }
            //this.allTime.push(0.0001)
            //this.addNewTime()



        }, this)
    }

    addNewTime(){
        this.allTime.unshift(0.0001)
        this.allTime.pop()
    }


}

