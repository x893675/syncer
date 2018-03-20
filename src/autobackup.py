#!/usr/bin/python
## coding=utf-8 # vim ts=4

import os
import time
import ConfigParser
from shutil import make_archive

CONFIG_FILE_NAME = "autobackup.ini"



class MyConfigParser(ConfigParser.ConfigParser):
    def convertToDict(self):
        dct = dict(self._sections)
        for key in dct:
            dct[key] = dict(dct[key])
        return dct
        

def loadConf():
    cfg = MyConfigParser()
    cfg_path = os.path.join(os.getcwd(), CONFIG_FILE_NAME)
    try:
        cfg.read(cfg_path)
        return cfg.convertToDict()

    except BaseException, msg:
        print ("open %s failed!" %cfg_path)
        print msg

def backGameSave(conf):
    thistime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()).replace(' ','-').replace(':','-')
    for key in conf:
        src = conf[key]['src']
        if os.path.isdir(src):
            target = src.split(os.sep)[-1] + "-" + thistime
            bak = os.path.join(conf[key]['bak'], target)
            make_archive(bak, "zip", src)
        else:
            print ("%s is not exist!" %src)


def main():
    conf = loadConf()
    if conf:
        backGameSave(conf)
    else:
        print CONFIG_FILE_NAME + " is empty!"

if __name__ == "__main__":
    main()
