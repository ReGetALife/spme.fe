# 实验环境介绍

## 一、 实验环境权限及其他说明

* RACF需要支持“ENHANCEDGENERICNAMING”
* RACFLAB组需要事先创建好
* 实验账号需要是 RACFLAB 组的 group special 用户
* 实验账号要能够在RACFLAB组下建新组
* 实验账号要能够新建RACF用户
* 本实验中yourid指用户的实验账号，通常以数字结束，“xx”表示实验账号的最后两位数字

管理员可以参考执行下面的 RACF 命令来配置所需要 RACF 实验环境。

```
SETR EGN
ADDGROUP RACFLAB SUPGROUP(...)
CO yourid GROUP(RACFLAB) SPECIAL ALU yourid CLAUTH(USER)
```

...