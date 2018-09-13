 let vsh = "\n" +
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec4 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main()\n" +
              "\n{\n" +
                "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +  //
                "  vColor = aColor;\n" +
                " vTextureCoord = aTextureCoord;\n" +
              "}"
let fsh =
    "precision lowp float;\n" +
    "varying vec2 vTextureCoord;\n" +
    "varying vec4 vColor;\n" +
    "uniform sampler2D uSampler;\n" +
    "uniform float u_radius;\n"+
    "uniform float u_alpha;\n"+
    "void main()\n" +
    "\n{\n" +
    "   float radius = u_radius;\n"+
    "   vec2 coord = vTextureCoord;\n" +
    "   coord.y += (sin(coord.x * 8.0 * 3.1415926 + radius*3.1415926 *10.0) / 30.0  );\n" +
    //"   vec2 uvs = coord.xy;\n" +
   // "   gl_FragColor = texture2D(uSampler, coord) ;\n" +
    "   vec4 textureColor = texture2D(uSampler, coord);\n" +
    "   gl_FragColor = vec4(textureColor.rgb ,textureColor.a * u_alpha) ;\n" +
    "}"
// this.customFilter = new egret.CustomFilter(
//     vsh,
//     fsh,
//     {
//         u_radius: 0.003 * 0.1,
//         u_alpha:0.01
//     }
// );