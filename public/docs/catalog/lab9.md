# 实验九：删除用户编目（User Catalog）实验

## 实验目的

能够删除自己创建的用户编目（User Catalog）

## 实验结果

试验后，学生应该掌握：

- 会删除用户编目（User Catalog）
- 了解IDCAMS实用程序中的DELETE命令的用法。

## 实验指导

使用IDCAMS实用程序中的DELETE命令。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 实验步骤

## 步骤 1：取消编目中所有数据集的编目

```
//DELETE   JOB MSGLEVEL=(1,1),NOTIFY=&SYSUID       
//STEP1    EXEC PGM=IDCAMS                         
//SYSPRINT DD  SYSOUT=*                            
//SYSIN    DD  *                                   
  DELETE youridA.TEST NOSCRATCH                    
/*              
```
>JCL解释:使用IDCAMS实用程序，取消掉数据集youridA.TEST的编目
>提示：若之前定义的用户编目下还存在别的数据集，都要像这样取消掉

## 步骤 2: 删除用户编目（User Catalog）

```
//DELCAT JOB MSGLEVEL=(1,1),NOTIFY=&SYSUID                    
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=A                                                  
//SYSIN DD *                                                            
  DELETE yourid.CATALOG.UCAT  USERCATALOG
/*
```
>JCL解释:使用IDCAMS实用程序，删除掉用户编目yourid.CATALOG.UCAT
>提示：若该用户编目下还存在数据集，删除将无法成功
>提示：删除用户编目的同时会将其别名一起删除

## 步骤 3: 验证删除是否成功

```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT USERCATALOG ENTRIES(yourid.CATALOG.UCAT) ALL                                      
/*
```
>JCL解释：执行IDCAMS程序，列出用户编目"yourid.CATALOG.UCAT"的所有信息
 

