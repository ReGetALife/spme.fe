# 实验八：提交实验

## 实验目的

验证之前有关用户编目（User Catalog）的操作无误

## 实验结果

试验后，学生应该掌握：

- 查看数据集的用户编目（User Catalog）信息

## 实验指导

使用IDCAMS实用程序中的LISTCAT命令。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 实验步骤

## 步骤 1：查看youridA.test数据集信息

```
//youridR JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT ENT(youridA.test) ALL                                      
/*
```



 

