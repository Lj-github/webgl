
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    shader:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        //this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        this.sprite.setScale(2.5)
        //gl.getActiveAttrib()






        let fragmentSrc1 =
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +

            "uniform float customUniform;\n" +

            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";

        var fragmentSrc2 = [
            "precision lowp float;",
            "varying vec2 vTextureCoord;",
            // "varying vec4 vColor;",
            "uniform float time;",
            "uniform sampler2D uSampler;",

            "void main() {",
            "vec3 p = (vec3(vTextureCoord.xy,.0) - 0.5) * abs(sin(time/10.0)) * 50.0;",
            "float d = sin(length(p)+time), a = sin(mod(atan(p.y, p.x) + time + sin(d+time), 3.1416/3.)*3.), v = a + d, m = sin(length(p)*4.0-a+time);",
            "float _r = -v*sin(m*sin(-d)+time*.1);",
            "float _g = v*m*sin(tan(sin(-a))*sin(-a*3.)*3.+time*.5);",
            "float _b = mod(v,m);",
            "float _a = 1.0;",
            "if(_r < 0.1 && _g < 0.1 && _b < 0.1) {",
            "_a = 0.0;",
            "}",
            "gl_FragColor = vec4(_r * _a, _g * _a, _b * _a, _a);",
            "}"
        ].join("\n");

        let fragmentSrc3 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform vec2 center;",
            "uniform vec3 params;", // 10.0, 0.8, 0.1"
            "uniform float time;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float dist = distance(uv, center);",

            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",

            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",

            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");

        let fragmentSrc4 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform float lineWidth;",
            "uniform float offset;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float modPart = mod(vTextureCoord.y, lineWidth);",
            "float solidPart = (1.0 - offset) * lineWidth;",

            "if(modPart > solidPart) {",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "} else {",
            "gl_FragColor = vec4(0., 0., 0., 0.);",
            "}",


            "}"
        ].join("\n");

        var vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var grayShaderFragment =
            "precision lowp float;\n"
            + "varying vec4 v_fragmentColor; \n"
            + "varying vec2 v_texCoord; \n"
            + "void main() \n"
            + "{ \n"
            + "    vec4 c = texture2D(CC_Texture0, v_texCoord); \n"
            + "    gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b); \n"
            +"     gl_FragColor.w = c.w ; \n"
            + "}";


        var vsh = "\n" +
            "attribute vec4 a_position;\n" +
            "attribute vec2 a_texCoord;\n" +
            "attribute vec4 a_color;\n" +
            "varying vec4 v_fragmentColor;\n" +
            "varying vec2 v_texCoord;\n" +
            "void main()\n" +
            "\n{\n" +
            "   gl_Position = CC_PMatrix * a_position;\n" +
            "   v_fragmentColor = a_color;\n" +
            "   v_texCoord = a_texCoord;\n" +
            "}";

        //TexCoords的值是（0,0）到（1,1）


        var fsh = "\n" +
            "varying vec2 v_texCoord;\n" +
             "uniform float u_radius;\n"+

            "void main()\n" +
            "\n{\n" +
            "   float radius = u_radius;\n"+
            "   vec2 coord = v_texCoord;\n" +
            "   coord.x += (sin(coord.y * 8.0 * 3.1415926 + radius*3.1415926 *1000.0) / 30.0  )   ;\n" +
            "   vec2 uvs = coord.xy;\n" +
            "   gl_FragColor = texture2D(CC_Texture0, coord);\n" +
            "}";




        this.graySprite(this.sprite,vsh,fsh)
        this.schedule(this.run1,0.1);

        return true;
    },
    createSprit:function(){
        var sprite = new cc.Sprite(res.HelloWorld_png);
        sprite.attr({
        x: cc.winSize.width / 2,
        y: cc.winSize.height / 2
        });
        this.addChild(sprite, 0);
        sprite.setScale(2.5)
        return sprite
    },


    time : 0,
    dt:0,
    run1 :function(delta){
        this.dt += delta;
       // if(this.dt>3.14){this.dt-= 3.14;}
        if (this.sprite){
            this.time += delta;
            this.shader.use();
            var dd = 0.003 *(Math.cos(this.dt))

            this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_radius'), 0.003 * this.dt );
            // this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_lightness'), Math.abs(Math.sin(2 * this.dt)));
            this.shader.updateUniforms();
            if (this.dt >=5){
                this.sprite.removeFromParent()
                this.sprite = this.createSprit()
                this.unschedule(this.run1)
                this.shader = null
            }
        }
    },
    graySprite : function (sprite,vertexSrc,grayShaderFragment)
    {
        if (sprite) {
            var shader = new cc.GLProgram();//cc.GLProgram.create("gray.vsh", "gray.fsh");
            shader.retain();
            //this.shader.initWithVertexShaderByteArray(_default_vert, _black_white_frag);
            // shader.init(res.gray_vsh, res.gray_fsh);
            shader.initWithVertexShaderByteArray(vertexSrc, grayShaderFragment);

            shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            //shader.addAttribute(cc.UNIFORM_TIME_S, cc.UNIFORM_SINTIME);

            shader.link();
            shader.updateUniforms();
            sprite.setShaderProgram(shader);
            window.SSS = sprite
            this.shader = shader;
        }
    },




});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TapWater();
        this.addChild(layer);
    }
});

