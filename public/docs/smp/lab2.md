# 实验 2: RECEIVE 实验

**实验目的**：接受软件（包括软件的各类代码和控制语句）到 Global Zone 中，为后续的 Apply/Accept/Restore/Reject 等操 作做预备工作。

**实验结果**：实验后，学生应该掌握

- 如何 RECEIVE 软件。

**实验指导**：使用 GIMSMP 实用程序中的 RECEIVE 命令接受软件。

**实验步骤：**

## 步骤**1** 

提交以下 JCL 作业，接收软件：TDMF for z/OS Version 5 Release 3.0。

软件相关信息参见：[http://www-950.ibm.com/services/dms/en/support/tdmf/zos/v5/download530.html](http://www-950.ibm.com/services/dms/en/support/tdmf/zos/v5/download530.html) 。

> **注意 ：** 
>
> SMPPTFIN 为 软件安装控制语句， 数据集的 hlq 为 “ teacherId ”， 无需修改。 SMPCNTL 控制语句中 RFPREFIX(teacherId) 无需修改。



示范 JCL 作业：

```
//RCVE JOB CLASS=A,MSGCLASS=A,MSGLEVEL=(1,1), 
//         NOTIFY=&SYSUID
//RECEIVE EXEC PGM=GIMSMP,REGION=0M
//SMPCSI DD DSN=yourId.TDMF.SMP.CSI,
//       DISP=OLD
//SMPPTFIN DD DSN=IBMUSER.IBM.HGTD530.SMPMCS, 
//       DISP=SHR
//SMPHOLD DD DUMMY
//SMPCNTL DD *
  SET BOUNDARY(GLOBAL) .
  RECEIVE SELECT(HGTD530)  /* 1.下面注释 */
      SYSMODS              /* 2.下面注释 */
      RFPREFIX(IBMUSER)    /* 3.下面注释 */
      LIST .               /* 4.下面注释 */
/*

```



> **注释：**
>
> **注释1 : SELECT** 
>
> 指定将要接收的一个或多个 SYSMOD 的 ID.其它跟此 SYSMOD 相关的特征都将被接收。该命令还可以用来指定 FMIDSET，这是一个用来存放 FMIDs 的数据集。
>
>  **注释2 ：SYSMODS** 
>
> 指出来自 SMPPTFIN（是 SMSMOD 的源数据，存在于磁带或磁盘中）的数据应该被接收.如 果指定的是 HOLDDATA 说明要接收 HOLDDATA.
>
> **注释3：RFPREFIX** 
>
> 指定 RELFILE 文件(顾名思义，指的是实际的元件)的 HLQ 为 teacherId。 
>
> **注释4 ：LIST** 
>
> 指出SMP/E 将列出每个可用的 SYSMOD 的 MCS。



**说明：**

* RECEIVE 是第一个 SMP/E 用来处理 SYSMOD 的命令。它将数据读入全局区，SMPPTS,还有临时数据集 SMPTLIBS 为以后的处理做准备。
* teacherId.IBM.HHOP750.SMPMCS 是一个包含 MCS 语句的数据集，下面的图片对其中的内容做如下解释。

![image-20200615174805257](https://tva1.sinaimg.cn/large/007S8ZIlly1gft4baq6ggj30ji0batav.jpg)



## 步骤2

作业成功后，使用 LIST 命令查看 GLOBAL ZONE。重点观察 SMPLIST 中的 GLOBAL ZONE 增加了哪些内容

如图：

![image-20200615174846798](https://tva1.sinaimg.cn/large/007S8ZIlly1gft4bvse9oj30kq06kjsd.jpg)



![image-20200615174950813](https://tva1.sinaimg.cn/large/007S8ZIlly1gft4d0fflfj30ks0fqdii.jpg)