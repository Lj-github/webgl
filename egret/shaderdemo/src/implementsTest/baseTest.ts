interface test {
    idd :number,
    ss:string
}
class BaseTest extends egret.HashObject implements test{
    idd:number
    ss:string
    constructor() {
        super()
    }
}
abstract   class aaa  extends egret.HashObject{
    constructor(){
        super()
    }
    protected abstract sss():void
    protected abstract ddd():void
}
class fds extends aaa implements test{
    idd:number
    ss:string
    constructor(){
        super()
    }
    sss(){}
    ddd(){}
}
/// extend
class exp2 extends fds{
    constructor(){
        super()
        super.ddd()
        super.sss()
    }
}

class ds {
    constructor(test){
       console.log(test)
    }

}
class ds2 extends egret.HashObject{
    constructor(test){
       super()
       console.log(test)
    }

}
class exp3 extends ds{
    constructor(){
        super("d")
    }
}
class exp4 extends ds2{
    constructor(){
        super("ds2")
    }
}
