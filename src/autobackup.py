#!/usr/bin/python
## coding=utf-8 # vim ts=4

import os
import shutil
import json
import time

CONFIG_FILE_NAME = "autobackup.json"


def loadConf():
    cfg = os.path.join(os.getcwd(), CONFIG_FILE_NAME)
    paths = {}
    try:
        with open(cfg, "r") as f:
            paths = json.loads(f.read())
        return paths
    except IOError:
        print ("open %s failed!" %cfg)

def backGameSave(paths):
    thistime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()).replace(' ','-').replace(':','-')
    for path in paths['path']:
        src = path['src']
        target = src.split(os.sep)[-1] + "-" + thistime
        bak = os.path.join(path['bak'],target)
        if not os.path.isdir(src):
            print ("%s is not exist!" %src)
        try:
            if not os.path.isdir(bak):
                shutil.copytree(src, bak)
        except BaseException, msg:
            print msg

def main():
    paths = loadConf()
    backGameSave(paths)

if __name__ == "__main__":
    main()
