# -*- coding: utf-8 -*-
# @Time    : 2018/9/5 下午3:11
#  coffee -bc test.coffee
#  全部目录 coffee -c -b -o script/ coffee/   前面是输出  后面的输入  mlgbd

#  将src下的所有js文件写入加载json
import os
import json
import sys


def GetFileList(dir, fileList):
    newDir = dir
    if os.path.isfile(dir):
        fileList.append(dir.decode('utf-8'))
    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            newDir = os.path.join(dir, s)
            GetFileList(newDir, fileList)
    return fileList


def getFileStrLen(path):
    if path:
        return path.decode('utf-8').__len__()


try:
    # 获取当前路径

    # 先生成 js coffee -c -b  -o script/ coffee/
    os.system("coffee -c -b  -o script/ coffee/")

    path = sys.path[0] + "/script"
    allJsList = GetFileList(path, [])
    if allJsList:
        with open("project.json", 'r') as f:
            oldJson = json.loads(f.read().encode('utf8'))
            newJson = oldJson
            newJson["jsList"] = []
            for jsfil in allJsList:
                newJson["jsList"].append(jsfil[getFileStrLen(sys.path[0]) + 1:])
            with open("project.json", 'w') as f:
                json.dump(newJson, f)

except NameError:
    pass

