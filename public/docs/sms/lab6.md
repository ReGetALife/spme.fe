# 实验6：空间管理实验

**实验目的：** 盘卷的空间管理

**实验结果：** 实验后，学生应该掌握

- 释放数据集的空闲空间（Release）

- 磁盘碎片空间整理（Defrag）

- 压缩分区数据集PDS（Compress）

**实验指导：** 借助ISMF，生成JCL作业，提交作业完成空间管理的实验

**实验要求：** 完成实验报告

## 实验步骤

**步骤 1**     进入3.4查看某一盘卷的空间占用情况，比如查看盘卷VL9004如下。

![img](/img/dfsms/lab6/step1.png)

**步骤 2**     记录盘卷的空间使用情况。比如VL9004的空间占用情况如下。

![img](/img/dfsms/lab6/step2.png)

**步骤 3**     进入ISMF->2 VOLUME，查看盘卷列表。如下。

![img](/img/dfsms/lab6/step3.png)

**步骤 4**     在选中的盘卷前面输入”Defrog”,”Release”,”Compress”，生成JCL作业，提交作业。（**注意：**执行JCL作业时指定REGION=0K，示例：//STEP1  EXEC  PGM=ADRDSSU,REGION=0K ）

![img](/img/dfsms/lab6/step4.png)

**步骤 5**     盘卷空间成功释放之后，进入3.4，重新观察盘卷，记录空间使用情况并对比。

![img](/img/dfsms/lab6/step5.1.png)

![img](/img/dfsms/lab6/step5.2.png)

**步骤 6**     总结本次实验体会及建议