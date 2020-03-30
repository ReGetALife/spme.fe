# 实验1：初次接触ISMF实验

**实验目的：** 初次登陆ISMF并练习使用ISMF帮助
 
**实验结果：** 实验后，学生应该掌握

- 登陆ISMF

- 通过选择相应的选项来访问ISMF的各种应用程序

- 使用ISMF的帮助

- 利用‘Data Set’和‘VOLUME’应用程序来显示特定的数据集和卷信息

**实验指导：** 首先熟悉使用ISMF帮助面板，然后能够根据帮助使用ISMF面板中提供的各种功能

**实验要求：** 完成实验报告
 
## 实验步骤

**步骤 1**     ISMF有2种用户使用模式，一种是普通终端用户（EU），另一种是存储管理员（SA），默认的是EU模式。为了在以下的实验中能够使用存储管理的功能，我们需要将模式更改为SA模式。操作如下。

（1）         在ISMF主选项面板上选择‘0  ISMF Profile’，回车

（2）         在‘ISMF PROFILE OPTION MENU’面板中选择‘0  User Mode Selection’，回车

（3）         在‘USER MODE ENTRY PANEL’面板中选择SA模式，回车

**步骤 2**     返回ISPF主选项菜单界面，重新选择**IS**进入ISMF的主选项菜单，系统将会如下图示。

![img](/img/dfsms/lab1/step2.png)

**步骤 3**     点击F1（HELP），在ISMF主选项菜单访问ISMF帮助，仔细阅读。

![img](/img/dfsms/lab1/step3.png)

**步骤 4**     首先选择‘4 GETTING AROUND IN HELP’，仔细阅读如何使用ISMF帮助面板。

![img](/img/dfsms/lab1/step4.png)

**步骤 5**     INDEX命令非常有用，你可以使用它快速定位到ISMF帮助面板中的任意一个帮助话题。具体操作是：首先在帮助面板上输入‘INDEX’命令，回车；然后选择你想要查看的一个话题，比如想要查看和‘Data Set’相关的话题，只需要在命令行输入‘D’，系统将自动定位到以‘D’打头的帮助话题，然后再通过选择具体的数字查看特定话题的帮助内容。

**步骤 6**     返回ISMF主选项面板，并选择‘1  Data Set’，进入数据集应用程序。创建一个列表，包含系统中所有以**yourid**作为HLQ的编目数据集。回车执行列表，回答问题。

![img](/img/dfsms/lab1/step6.png)

（1）         屏幕上显示的第一个条目是一个数据集吗？ 

 ==**HINT** **：查看第32****个属性列**==

（2）         以**yourid**作为HLQ的编目数据集一共有多少个？

 ==**HINT** **：观察屏幕右上角**==

（3）         哪些属性列是有内容的？这些属性列的信息是来自于VTOC还是CATALOG？ 

**步骤 7**     在3.4中观察你的数据集都在哪些盘卷中，选择一个卷上所有以**yourid**作为HLQ的数据集，继续步骤6，新建一个列表（如下图），执行列表，思考VTOC里存放着数据集的哪些信息？

![img](/img/dfsms/lab1/step7.png)

==【备注：同济主机盘卷信息[VOLSER]可以使用USER01，该参数值需要咨询本地系统管理员】==

比较步骤6和步骤7的结果，说说VTOC和CATALOG中存放数据集信息的差别。

**步骤 8**     和步骤6操作相同，只不过这次选中‘Acquire Data from Volume’，回车，查看结果。

（1）         一共显示了多少个数据集，属性列内容来自于哪里（VTOC/ CATALOG）？

![img](/img/dfsms/lab1/step8.png)

**步骤 9**     返回ISMF主选项面板，选择‘2  Volume’卷应用程序，然后选择‘1  DASD’，回车，进入下一个面板。使用帮助，了解如何使用该面板。

**步骤 10**  按照下图输入相应参数，显示系统中在线的SMS控制的所有盘卷。

![img](/img/dfsms/lab1/step10.png)


（1）         一共显示了多少个SMS卷？

**步骤 11**  要求显示系统中的所有SMS卷的详细信息，使用帮助查看‘VOLUME SELECTION ENTRY PANEL’面板上‘Acquire Physical Data’和‘Acquire Space Data’字段的功能。将这2个字段全部置为‘Y’，然后重新操作上个步骤。回答以下问题。

（1）         为了正确显示系统的非SMS管理的物理卷， ‘Storage Group Name’和‘CDS Name’字段如何赋值？

（2）         系统中一共有多少个Volume？

（3）         哪些盘卷有超过50%的Free Space？

**步骤 12**  总结本次实验体会及建议
