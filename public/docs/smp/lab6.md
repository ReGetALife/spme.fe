## 实验 6: ACCEPT 实验

**实验目的**：接受软件到 Distribution Library 中。软件一旦接受（Accept），将无法 Restore。

**实验结果**：实验后，学生应该掌握

- 如何 ACCEPT 软件。

**实验指导**：使用 GIMSMP 实用程序中的 ACCEPT 命令。

**实验步骤：**

## 步骤**1** 

接受软件到 Distribution Library 中， 一旦接受，系统将不能够把该软件从 Target Library 中移除。

```
//ACCEPT JOB CLASS=A,MSGCLASS=A,MSGLEVEL=(1,1),
//         NOTIFY=&SYSUID
//STEP EXEC PGM=GIMSMP,REGION=0M
//SMPCSI DD DSN=yourId.TDMF.SMP.CSI,
//        DISP=OLD
//SMPCNTL DD *
  SET BOUNDARY(DZONE).
  ACCEPT SELECT(HGTD530)
         BYPASS(HOLDSYS,HOLDUSER)
         COMPRESS(ALL).
/*
```

## 步骤2

如果上述步骤无误，删除 CHECK， 执行 ACCEPT。



## 步骤3

如果上述步骤执行成功，在 3.4 面板中再次查看分配库中是否已经有软件内容。

![image-20200615172021000](/img/smp/lab6/1.png)



## 步骤4

作业成功后，使用 LIST 命令查看各类 ZONE 中的内容，重点观察 SMPLIST 中 DISTRIBUTION ZONE 中具体增加了哪些内容。

```
SET BDY(GLOBAL). 
LIST ALLZONES.
```



![image-20200615172807682](/img/smp/lab6/2.png)