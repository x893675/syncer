## 概述

本工具用与备份自己的游戏存档，在json文件中加入自己需要备份游戏存档目录和备份位置目录。

具体例子如下:

```json
{
	"path":[
		{
			"src":"/Users/hanamichi/work/autoBak/src1",
			"bak":"/Users/hanamichi/work/autoBak/dest1"
		},
		{
			"src":"/Users/hanamichi/work/autoBak/src2",
			"bak":"/Users/hanamichi/work/autoBak/dest2"
		}
	]
}
```

其中src为游戏存档目录

bak为备份位置存档

本工具用python编写，之后会加入可直接在windows上运行的二进制程序

**comming soon**….