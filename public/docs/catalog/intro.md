# 实验环境介绍

## 一、 实验环境权限及其他说明

* 实验账号要能够建立数据集
* 实验账号要能够执行JCL作业
* 实验中yourid指用户的实验账号，通常以数字结束，“xx”表示账号的最后两位数字
* 实验账号要能够更新系统主目录(Master Catalog)
```
PE MASTERCATALOG ID(yourid) ACC(UPDATE)
解释：赋予"ID"为"youid"的用户对"MASTERCATALOG"进行"UPDATE"的权限
```

## 二、 Catalog示意图

![](/img/catalog/intro/1.png)

## 三、 说明

在同济实验环境系统中，主Catalog和用户编目（User Catalog）的现状如下表（需要咨询本地的系统管理员）：

| 类型    | 名称                      |
| ------- | ------------------------ |
| 主Catalog | MASTERV.CATALOG     |
| 用户编目（User Catalog） | yourid.CATALOG.UCAT |

本实验环境中yourid均指你的TSO USER ID，volser为DASD盘卷序列号（可以咨询系统管理员），所有IDCAMS命令（即执行IDCAMS程序的JCL作业SYSIN下输入的命令）都可以在TSO命令的执行环境中直接执行。