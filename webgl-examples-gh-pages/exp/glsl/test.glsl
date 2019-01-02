#version 120

struct SomeStruct {
  bool d;
  vec2 someVec2;
};

void main() {
uniform SomeStruct u_someThing;
}

//var someThingActiveLoc = gl.getUniformLocation(someProgram, "u_someThing.d"); 获取
//var someThingSomeVec2Loc = gl.getUniformLocation(someProgram, "u_someThing.someVec2");