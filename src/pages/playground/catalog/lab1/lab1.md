# 实验一 创建用户编目（User Catalog）实验

## 实验目的

创建一个用户编目

## 实验结果

实验后，学生应该掌握：

- 绘制Catalog结构
- 创建新的用户编目（User Catalog）
- 了解IDCAMS实用程序中的DEFINE USERCATALOG的语法。

## 实验指导

使用IDCAMS实用程序中的DEFINE USERCATALOG命令创建一个用户编目（User Catalog）。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 步骤1 :提交以下JCL作业，创建一个新的用户编目（User Catalog） 

```
//DEFCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
       DEFINE USERCATALOG -                                             
       (NAME(yourid.CATALOG.UCAT) -  
   CYLINDER(1, 1) -                                  
       VOLUMES(volser))                                          
/*
```
>JCL解释：执行IDCAMS程序，在"volser"卷定义一个名字为"yourid.CATALOG.UCAT"的用户编目文件

## 步骤2 :作业成功后，使用LISTCAT USERCATALOG查看新的用户编目（User Catalog）是否存在。

```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT USERCATALOG ENTRIES(yourid.CATALOG.UCAT) ALL                                      
/*
```
>JCL解释：执行IDCAMS程序，列出用户编目"yourid.CATALOG.UCAT"的所有信息
