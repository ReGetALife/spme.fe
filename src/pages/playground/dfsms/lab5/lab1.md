# 实验5：SMS系统命令实验（可选）

**实验目的：** 教授学生使用SMS相关命令

**实验结果：** 实验后，学生应该掌握

- 使用命令确定VOLUME当前的SMS状态

- 使用命令确定Storage Group当前的SMS状态

- 使用命令改变SMS管理的卷的状态

- 使用命令改变SMS管理的Storage Group的状态

**实验介绍：**

**实验要求：** 完成实验报告

## 实验步骤

**步骤 1** 执行SMS系统命令‘D SMS’，浏览下图，回答问题

![img](/img/dfsms/lab5/step1.png)

（1） SMS使用的SCDS，ACDS，COMMDS控制数据集均是什么？

**步骤 2** 执行SMS系统命令‘D SMS,SG(**storage group name**)’，（本例中使用了PRIMARY，你在做实验的时候请选择之前实验中创建的**storage group**，以下各步骤同）浏览下图，回答问题

![img](/img/dfsms/lab5/step2.png)

（2） 该Storage Group在哪几个系统中可用？状态如何？

**步骤 3** 执行SMS系统命令‘D SMS,SG(ALL)’，浏览下图，回答问题

![img](/img/dfsms/lab5/step3.png)

（3） SMS中一共有几个Storage Group，他们可以用在哪几个系统中？状态如何？

**步骤 4** 执行SMS系统命令‘D SMS,SG(**storage group name**),LISTVOL’，浏览下图，回答问题

![img](/img/dfsms/lab5/step4.png)

（1） 该Storage Group中有哪些盘卷？

**步骤 5** 执行SMS系统命令‘D SMS,VOL(**volume name**)’，（本例中使用了DMTP17，你在做实验的时候请选择之前步骤中显示的某个**volume**，以下各步骤同）浏览下图，回答问题

![img](/img/dfsms/lab5/step5.png)

（1） 该卷可以在哪些系统中使用？状态如何？

**步骤 6** 执行SMS系统命令‘V SMS,VOL(**volume name**),DISABLE,N’，更改指定VOLUME的状态，浏览下图，回答问题

![img](/img/dfsms/lab5/step6.png)

（1） 该VARY命令的作用是什么？

**步骤 7** 执行SMS系统命令‘D SMS,SG(**storage group name**),LISTVOL’，浏览下图，回答问题

![img](/img/dfsms/lab5/step7.png)

（1） 如果系统目前只有该Storage Group（本例中采用了PRIMARY）可用，那么哪些盘卷可以用来分配新的数据集？

**步骤 8** 执行SMS系统命令‘V SMS,SG(**storage group name**),DISABLE,N’，浏览下图，回答问题

![img](/img/dfsms/lab5/step8.png)

（1） 目前SMS的Storage Group又发生了一些变化，如果系统目前仍然只有该Storage Group（本例中采用了PRIMARY）可用，那么哪些盘卷可以用来分配新的数据集？

**步骤 9** 执行SMS系统命令‘D SMS,VOL(**volume name**)’，浏览下图，回答问题

![img](/img/dfsms/lab5/step9.png)

（1） 该卷在SMS下的状态如何？

**步骤 10**  执行SMS系统命令‘V **unit address**,OFFLINE’（本例中设备地址为E9D，以下同）和‘DS S, **unit address**’，浏览下图，回答问题

![img](/img/dfsms/lab5/step10.png)

（1） 为什么该设备不被SMS管理？

**步骤 11**  执行SMS系统命令‘D SMS,VOL(**volume name**)’（本例中卷为DMTP17），浏览下图，回答问题

![img](/img/dfsms/lab5/step11.png)

（1） 为什么UNIT参数是空的？
（2） 该卷的SMS状态是什么？
（3） 该卷目前可以用来新建数据集吗？

**步骤 12**  执行下面一系列的SMS命令，浏览下图，回答问题


![img](/img/dfsms/lab5/step12.png)

（1） 上图中重新上线的卷的SMS状态是什么？
（2） 该卷目前可以用来新建数据集吗？

**步骤 13**  执行下面‘DS P, **unit address**’命令，浏览下图，回答问题


![img](/img/dfsms/lab5/step13.png)

（1） 哪些路径(PATH)可以用来访问该设备地址？

**步骤 14**  执行下面‘DS S, **unit address**’命令，浏览下图，回答问题

![img](/img/dfsms/lab5/step14.png)

（2） 该设备是由SMS控制的？

**步骤 15**  总结本次实验体会及建议
