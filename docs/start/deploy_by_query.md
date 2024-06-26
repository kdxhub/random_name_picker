---
title: "快速部署"
---
<small><a href="../">←返回目录</a> | <a href="https://kdxhub.github.io/random_name_picker/">查看项目示例</a> </small><br>

> 相较于其它方案，这并不是一个好主意。

## 你将需要
* 支持直链的文件存储站点
* 一点点的JS编辑知识

## 准备点名表
1. 下载`list.js`([Github](https://kdxhub.github.io/random_name_picker/list.js) | [Gitee](https://gitee.com/kdXiaoyi/random_name_picker/blob/master/list.js))
2. 使用任一**除WPS或Microsoft Word**外的编辑器打开 <br>推荐的编辑器：[在线VSCode](https://vscode.dev) / [安卓-MT管理器](https://mt2.cn/)
3. 根据注释修改对应点名表与星级 （**必须使用英文标点**）
```js
//数组name定义名字，即显示结果名
const name = ["姓名1", "姓名2", …];
//数组star定义星级，仅支持3/4/5星，不在范围内取最近
//若超出星级则取最近值，数组长度不等报错
const star = [星级1, 星级=2, …];

// …… more
```

> 您也可以使用[list.js生成工具](//kdxhub.github.io/random_name_picker/config-spawn.html)来可视化生成配置文件。

## 上传并引用
事实上，RNP支持引用外部list.js资源。<br>
```url
https://kdxhub.github.io/random_name_picker/index.html?list=<src>
```

因此，请找到任一可以提供直链的站点，将编辑后的`list.js`上传。<br>
之后将上述URL的`<src>`修改为对应文件链接即可。