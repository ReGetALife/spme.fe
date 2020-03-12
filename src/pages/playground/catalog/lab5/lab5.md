# 实验五：查看VVDS内容实验

## 实验目的

能够打印出VVDS的内容。

## 实验结果

实验后，学生应该掌握：

- 会打印VVDS内容。
- 了解IDCAMS实用程序中的PRINT命令的用法。

## 实验指导

使用IDCAMS实用程序中的PRINT命令。

>[详细指导](http://www.doc88.com/p-9925261346401.html)

## 实验要求

完成实验报告

## 步骤1：打印VVDS内容。

```
//PNTVVDS JOB ,'USER',NOTIFY=&SYSUID                                      
//STEP1 EXEC PGM=IDCAMS                                                 
//SYSPRINT DD SYSOUT=A                                                  
//VVDS  DD DSN=SYS1.VVDS.Vvolser,DISP=SHR,                              
// UNIT=3390,VOL=SER=volser                                   
//SYSIN DD *                                                            
      PRINT INFILE(VVDS) -                                              
      CHARACTER COUNT(10)                                               
/*
```
>JCL解释：使用IDCAMS程序，打印出SYS1.VVDS.Vvolser的信息                   

 ## 步骤2：在SDSF中查看打印结果，理解VVDS中存放的数据内容

>提示：在SD.SF中，直接在对应的作业结果左边使用"S"命令，或者先使用"?"命令，然后找到输出结果，再使用"S"命令




