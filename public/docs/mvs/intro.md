# 实验环境说明

## 实验环境权限及其他说明

- 实验账号要能够执行“/D……”型的 MVS 命令
- 实验账号要能够编辑系统过程库“VENDOR.PROCLIB”
- 实验账号要能够执行 JCL 作业
- 本实验中 yourid 指用户的实验账号，通常以数字结束，“xx”表示实验账号的最后两位数字
- 实验账号要能够执行“/S……”命令启动过程，管理员可以参考如下 RACF 语句来授权。

```
PE MVS.MCSOPER.* CLASS(OPERCMDS) ID(yourid) ACC(READ)
RDEFINE OPERCMDS MVS.START.STC.yourid* UACC(NONE)
PE MVS.START.STC.yourid* CLASS(OPERCMDS) ID(yourid) ACC(UPDATE)
SETR RACLIST(OPERCMDS) REFRESH
```
