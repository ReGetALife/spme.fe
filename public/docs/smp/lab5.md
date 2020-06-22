## 实验 5: APPLY 实验

**实验目的**：部署软件到 Target Library 中。之后可以接受（Accept）软件，也可以对软件进行 Restore

**实验结果**：实验后，学生应该掌握

- 如何 APPLY 软件。

**实验指导**：使用 GIMSMP 实用程序中的 APPLY 命令。

**实验步骤：**

## 步骤**1** 

检查下面的数据集里面是否有内容。

![image-20200615171246261](/img/smp/lab5/1.png)

## 步骤2

预备执行 APPLY，把软件部署到 Target Library 中，使软件生效。使用“CHECK”检查是否有错误。

```
//APLY   JOB CLASS=A,MSGCLASS=A,MSGLEVEL=(1,1), 
//      NOTIFY=&SYSUID
//APPLY  EXEC PGM=GIMSMP,REGION=0M
//SMPCSI DD DSN=yourId.TDMF.SMP.CSI,
//       DISP=OLD
//SMPCNTL DD *
  SET BOUNDARY(TZONE).
  APPLY SELECT(HGTD530)
        BYPASS(HOLDSYS,HOLDUSER)
        CHECK
        COMPRESS(ALL).
/*
```

>**注释：**
>
>HOLDSYS 意思是，跟特定系统的 reason ID 相关的 SYSMOD 在 APPLY 的时候将不会被 挂起而直接被 SMP/E 处理。如果缺省，则所有的 SYSMOD 都会被 SMP/E 直接处理。
>
> HOLDUSER,跟特定用户的 reason ID 相关的 SYSMOD 在 apply 的时候将不会被挂起而直接 被 SMP/E 处理。如果缺省，则所有的 SYSMOD 都会被 SMP/E 直接处理。

## 步骤3

如果上述步骤无误，删除 CHECK， 执行 APPLY。

## 步骤4

如果上述步骤执行成功，在 3.4 面板中再次查看目标库中是否已经有软件内容。

![image-20200615171712207](/img/smp/lab5/2.png)



## 步骤5

作业成功后，使用 LIST 命令查看各类 ZONE 中的内容，重点观察 SMPLIST 中的 GLOBAL ZONE 和 TARGET ZONE 中具体增加了哪些内容。

```
SET BDY(GLOBAL). 
LIST ALLZONES.
```

![image-20200615171756930](/img/smp/lab5/3.png)

![image-20200615171822879](/img/smp/lab5/4.png)