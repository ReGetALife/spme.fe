# 实验三：查看数据集所属的Catalog实验

## 实验目的

能够知道数据集属于哪个用户编目（User Catalog）。

## 实验结果

实验后，学生应该掌握：

- 能快速知道数据集属于哪个用户编目（User Catalog）。
- 了解IDCAMS实用程序中的LISTCAT命令的用法。

## 实验指导

使用IDCAMS实用程序中的LISTCAT命令。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 步骤1：查看指定数据集所属编目(方法二选一)。

#### 方法一：

直接在P.3.4界面进入的数据集列表下，在数据集的名字左边输入指令LISTC EN(/)（在此处不方便使用）

#### 方法二：
```
//LSTCATA JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
     LISTCAT ENT(data set name) ALL                                      
/*
```
>JCL解释：使用IDCAMS程序，列出名字为"data set name"的数据集所属编目               
