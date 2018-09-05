# @Time    : 2018/9/5 下午7:25
#  水纹效果

TapWater = ->
  return
TapWater::init = ->
  @ctor = cc.Layer.extend(
    sprite:null
    time : 0
    dt:0
    ctor: (params) ->
      @_super()
      size = cc.winSize
      helloLabel = new cc.LabelTTF("Hello World", "Arial", 38)
      helloLabel.x = size.width / 2
      helloLabel.y = size.height / 2 + 200
      @sprite = new cc.Sprite(res.HelloWorld_png)
      @sprite.attr({
        x: size.width / 2,
        y: size.height / 2
      })
      this.addChild(@sprite, 0)
      this.sprite.setScale(2.5)
      _that = @
      cc.loader.loadTxt(res.fragmentWather,(x,fragmentWather)->
        cc.loader.loadTxt(res.vertex, (x,vertex)->
          _that.initShader(vertex,fragmentWather)))
      return true

    initShader:(v,f) ->
      this.graySprite(this.sprite,v,f)
      this.schedule(this.run1,1/60)
    createSprit:()->
      sprite = new cc.Sprite(res.HelloWorld_png)
      sprite.attr({
        x: cc.winSize.width / 2,
        y: cc.winSize.height / 2
      })
      sprite.setScale(2.5)
      return sprite


    run1:(delta)->
      @dt += delta
      if this.sprite
        this.shader.use();
        this.time = 0.0 if this.time >1
        this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName("time"),this.time)
        # web 开发时候 使用 setUniformLocationWith3f (  10,  0.8,  0.1 ) 这种的 cc.sys.isNative  使用  setUniformVec2 这种的 ({ x: 10, y: 0.8, z: 0.1 })
        this.shader.updateUniforms()
        #if this.dt >=5
#            // this.sprite.removeFromParent()
#            // this.sprite = this.createSprit()
#            // this.unschedule(this.run1)
#            // this.shader = null
    graySprite :(sprite,vertexSrc,grayShaderFragment)->
      if sprite
        shader = new cc.GLProgram()#cc.GLProgram.create("gray.vsh", "gray.fsh")
        shader.retain()
        shader.initWithVertexShaderByteArray(vertexSrc, grayShaderFragment)
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION)
        shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR)
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS)
        shader.link()
        shader.updateUniforms()
        sprite.setShaderProgram(shader)
        this.shader = shader
        this.shader.setUniformLocationWith2f(this.shader.getUniformLocationForName('center'), 0.5, 0.5  );
        this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('params'),  10, 0.8, 0.1 );

    onEnter : ->
      console.log(5)
  )
  return
TapWater::get = (cb, cbTarget, params) ->
  @init()
  return new @ctor(params)
