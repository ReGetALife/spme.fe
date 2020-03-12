# 实验七：查看所有别名和用户编目（User Catalog）实验

## 实验目的

查看系统中所有用户编目信息和别名信息

## 实验结果

试验后，学生应该掌握：

- 了解IDCAMS实用程序中的LISTCAT的语法。

## 实验指导

使用IDCAMS实用程序中的LISTCAT命令显示系统中所有的别名信息和用户编目信息

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 实验步骤

## 步骤 1：查看所有用户编目信息

```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT USERCATALOG ALL                                      
/*
```
>JCL解释：执行IDCAMS程序，列出所有用户编目信息

## 步骤 2：查看所有别名信息

```
//LSTALIAS JOB ,'USER',NOTIFY=&SYSUID
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
   LISTCAT ALIAS ALL  
/*  
```
>JCL解释：使用IDCAMS程序，查看所有别名信息







 

