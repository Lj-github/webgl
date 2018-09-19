class Sound extends egret.DisplayObjectContainer {
    public url:string
    public constructor(url) {
        super();
        this.url = url
        this.once(egret.Event.ADDED_TO_STAGE,this.startLoad,this);
    }
    public startLoad():void {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        var request:egret.URLRequest = new egret.URLRequest(this.url);
        loader.load(request);
    }
    public onLoadComplete(event:egret.Event):void {
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        var sound:egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
        var channel = this.soundChannel;
        channel = sound.play(this.position,-1);
        console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.soundChannel = channel;
    }
    public sound:egret.Sound;
    public soundChannel:egret.SoundChannel;
    public position = 0
    public onOff(){
        if(this.soundChannel ){
            //调用soundChannel对象的stop方法停止播放音频
            this.position = this.soundChannel.position
            this.soundChannel.stop();
            this.soundChannel = null;
        }else {
            this.soundChannel =  this.sound.play(this.position,-1);
        }
    }
    public onSoundComplete(event:egret.Event):void {
        console.log("onSoundComplete");
    }
    $onRemoveFromStage(){
        this.soundChannel.stop();
        this.soundChannel = null;
        this.sound = undefined
        this.position = undefined
        this.url = undefined
    }
}