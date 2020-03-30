# 实验二：创建别名实验

## 实验目的

创建一个别名

## 实验结果

实验后，学生应该掌握：

- 了解别名的搜索机制。
- 创建新的别名
- 了解IDCAMS实用程序中的DEFINE ALIAS的语法。

## 实验指导

使用IDCAMS实用程序中的DEFINE ALIAS命令创建一个用户编目（User Catalog）。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 步骤1：提交以下JCL作业，创建一个新的别名。

```
//DEFALIAS JOB ,'USER',NOTIFY=&SYSUID
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
      DEFINE ALIAS -                                                    
      (NAME(youridA) -                                                    
      RELATE(yourid.CATALOG.UCAT)) 
/*  
```
>JCL解释：使用IDCAMS程序，为编目"yourid.CATALOG.UCAT"定义一个叫做“youridA"的别名                   

 ## 步骤2：使用LISTCAT ALIAS ALL命令查看新的别名是否存在

```
//LSTALIAS JOB ,'USER',NOTIFY=&SYSUID
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=*                                                  
//SYSIN DD *                                                            
   LISTCAT ALIAS ENTRIES(youridA) ALL  
/*  
```
>JCL解释：使用IDCAMS程序，查看别名为"youindA"编目的所有信息

## 步骤3：使用P.3.2创建以youridA打头的数据集youridA.test