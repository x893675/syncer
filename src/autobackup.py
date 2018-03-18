#!/usr/bin/python
## coding=utf-8 # vim ts=4

import os
from shutil import make_archive
import json
import time

CONFIG_FILE_NAME = "autobackup.json"


def loadConf():
    cfg = os.path.join(os.getcwd(), CONFIG_FILE_NAME)
    try:
        with open(cfg, "r") as f:
            paths = json.loads(f.read())
        return paths
    except BaseException, msg:
        print ("open %s failed!" %cfg)
        print msg

def backGameSave(paths):
    thistime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()).replace(' ','-').replace(':','-')
    for path in paths['path']:
        src = path['src']
        target = src.split(os.sep)[-1] + "-" + thistime
        bak = os.path.join(path['bak'],target)
        if os.path.isdir(src):
            make_archive(bak, "zip", src)
        else:
            print ("%s is not exist!" % src)
            continue
        """try:
            if not os.path.isdir(bak):
                shutil.copytree(src, bak)
        except BaseException, msg:
            print msg"""

def main():
    paths = loadConf()
    backGameSave(paths)

if __name__ == "__main__":
    main()
