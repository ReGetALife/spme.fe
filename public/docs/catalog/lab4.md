# 实验四：连接和断开Catalog实验

## 实验目的

会连接和断开用户编目（User Catalog）和主Catalog

## 实验结果

实验后，学生应该掌握：

- 会断开用户编目（User Catalog）
- 会连接用户编目（User Catalog）和主Catalog
- 了解IDCAMS实用程序中的EXPORT DISCONNECT/IMPORT CONNECT命令的用法。

## 实验指导

使用IDCAMS实用程序中的EXPORT DISCONNECT/IMPORT CONNECT命令。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

![](/img/catalog/lab4/1.png)

## 实验要求

完成实验报告

## 步骤1：断开用户编目（User Catalog）和主Catalog的连接。

```

//EXPDIS JOB ,’USER’,NOTIFY=&SYSUID
//EXPDISC EXEC PGM=IDCAMS 
//SYSPRINT DD SYSOUT=* 
//SYSIN DD *
   EXPORT yourid.CATALOG.UCAT DISCONNECT 
/*
```
>JCL解释：使用IDCAMS程序，断开"youid.CATALOG.UCAT"和主编目的连接                 

 ## 步骤2：验证是否断开成功

#### 查看断开的用户编目是否存在

```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT USERCATALOG ENTRIES(yourid.CATALOG.UCAT) ALL                                      
/*
```
>JCL解释：执行IDCAMS程序，列出用户编目"yourid.CATALOG.UCAT"的所有信息

#### 查看断开的用户编目的别名是否存在

```
//LSTALIAS JOB ,'USER',NOTIFY=&SYSUID
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
   LISTCAT ALIAS ENTRIES(youridA) ALL  
/*  
```
>JCL解释：使用IDCAMS程序，查看别名为"youindA"的编目的所有信息

## 步骤3：连接用户编目（User Catalog）和主Catalog，并创建对应的别名。

```
//IMPCON JOB ,’USER’,NOTIFY=&SYSUID
//IMPRTCON EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=* 
//SYSIN DD *
 IMPORT CONNECT –  
 OBJECTS((yourid.CATALOG.UCAT –
 DEVICETYPE(3390) – 
 VOLUMES(volser))) -
 CATALOG(MASTERV.CATALOG)

 DEFINE ALIAS -                                                    
      (NAME(youridA) -                                                    
      RELATE(yourid.CATALOG.UCAT)) 
/*
```
>JCL解释：使用IDCAMS程序，将"youid.CATALOG.UCAT"与主编目连接，然后定义"yourid.CATALOG.UCAT"的别名"youridA"

## 步骤4：验证是否连接成功

#### 查看断开的用户编目是否存在

```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT USERCATALOG ENTRIES(yourid.CATALOG.UCAT) ALL                                      
/*
```
>JCL解释：执行IDCAMS程序，列出用户编目"yourid.CATALOG.UCAT"的所有信息

#### 查看断开的用户编目的别名是否存在

```
//LSTALIAS JOB ,'USER',NOTIFY=&SYSUID
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
   LISTCAT ALIAS ENTRIES(youridA) ALL  
/*  
```
>JCL解释：使用IDCAMS程序，查看别名为"youindA"的编目的所有信息

## 步骤5：新建以youridA打头的数据集并编辑其内容，看看是否成功，思考为什么？

>提示：到P.3.2创建数据集，名字模式为youridA.***