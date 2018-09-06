// Generated by CoffeeScript 1.12.7
var TapWater;

TapWater = function() {};

TapWater.prototype.init = function() {
  this.ctor = cc.Layer.extend({
    sprite: null,
    time: 0,
    dt: 0,
    ctor: function(params) {
      var helloLabel, size;
      this._super();
      size = cc.winSize;
      helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
      helloLabel.x = size.width / 2;
      helloLabel.y = size.height / 2 + 200;
      this.sprite = new cc.Sprite(res.HelloWorld_png);
      this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2
      });
      this.addChild(this.sprite, 0);
      return this.sprite.setScale(2.5);
    },
    onEnter: function() {
      var _that, _this;
      this._super();
      _that = this;
      cc.loader.loadTxt(res.fragmentWather, function(x, fragmentWather) {
        return cc.loader.loadTxt(res.vertex, function(x, vertex) {
          return _that.initShader(vertex, fragmentWather);
        });
      });
      console.log(5);
      _this = this;
      this._listener_base = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        onTouchBegan: function(selTouch, event) {
          return _this.onTouchBegan(selTouch, event);
        },
        onTouchMoved: function(selTouch, event) {
          return _this.onTouchMoved(selTouch, event);
        },
        onTouchEnded: function(selTouch, event) {
          return _this.onTouchEnded(selTouch, event);
        },
        onTouchCancelled: function(selTouch, event) {
          return _this.onTouchCancelled(selTouch, event);
        }
      });
      this._listener_base._setFixedPriority(1);
      return cc.eventManager.addListener(this._listener_base, this);
    },
    onTouchBegan: function() {
      console.log("onTouchBegan", this.__classId);
      return true;
    },
    onTouchMoved: function() {
      return true;
    },
    onTouchEnded: function() {
      console.log("onTouchEnded", this.__classId);
      return true;
    },
    onTouchCancelled: function() {
      return true;
    },
    initShader: function(v, f) {
      this.graySprite(this.sprite, v, f);
      return this.schedule(this.run1, 1 / 60);
    },
    createSprit: function() {
      var sprite;
      sprite = new cc.Sprite(res.HelloWorld_png);
      sprite.attr({
        x: cc.winSize.width / 2,
        y: cc.winSize.height / 2
      });
      sprite.setScale(2.5);
      return sprite;
    },
    run1: function(delta) {
      this.dt += delta;
      if (this.sprite) {
        this.shader.use();
        if (this.time > 1) {
          this.time = 0.0;
        }
        this.time += 0.01;
        this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName("time"), this.time);
        return this.shader.updateUniforms();
      }
    },
    graySprite: function(sprite, vertexSrc, grayShaderFragment) {
      var shader;
      if (sprite) {
        shader = new cc.GLProgram();
        shader.retain();
        shader.initWithVertexShaderByteArray(vertexSrc, grayShaderFragment);
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        shader.link();
        shader.updateUniforms();
        sprite.setShaderProgram(shader);
        this.shader = shader;
        this.shader.setUniformLocationWith2f(this.shader.getUniformLocationForName('center'), 0.5, 0.5);
        return this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('params'), 10, 0.8, 0.1);
      }
    },
    cleanup: function() {
      this._super();
      return this.unscheduleAllCallbacks();
    }
  });
};

TapWater.prototype.get = function(cb, cbTarget, params) {
  this.init();
  return new this.ctor(params);
};
