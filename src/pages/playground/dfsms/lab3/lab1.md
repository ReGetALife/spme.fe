# 实验3：提交实验：创建一个简单的 SMS 环境实验

**实验目的：** 构建一个简单的DFSMS配置

**实验结果：** 实验后，学生应该掌握

- 能够查看系统参数库如SYS1.PARMLIB成员，获取SMS启动信息

- 创建CDS数据集

- 创建一个简单的DFSMS配置并将其激活

**实验介绍：**

**实验要求：** 完成实验报告

## 实验步骤


**步骤 1**在SDSF面板中执行系统命令/D SMS，查看系统的SMS库信息

**步骤 2** 新建一个SCDS：**yourid**.SMS.SCDS，它是LDS类型的VSAM数据集。示例代码如下，其中**yourid**为用户ID，VOLSER为盘卷名。

![img](/img/dfsms/lab3/step2.png)

==【备注：同济主机环境中[DSNAME]为IBMUSER.SMS.LIB(DEFCDS)，VOLSER为USER02，这些参数可以咨询本地系统管理员】==


**步骤 3** 以SA模式登陆ISMF（参考实验2）


**步骤 4** 为SCDS创建一个基本配置

（1）在ISMF主面板上选择‘8  Control Data Set’，回车

（2）在‘CDS APPLICATION SELECTION’面板上输入CDS名字为**yourid**.SMS.SCDS，选择‘2. Define’，如下图示，然后回车

![img](/img/dfsms/lab3/step4.2.png)

（3）在‘SCDS BASE ALTER’面板上输入相应的参数，如下图，回车

![img](/img/dfsms/lab3/step4.3.png)

(4) 接着在‘SCDS BASE DEFINE’面板上选择“1 Add”选项，输入系统名称，如下图， 回车，然后按“F3”保存后退出。至此，SMS 的 SCDS 库配置完毕。

![img](/img/dfsms/lab3/step4.4.png)

==【备注:同济主机环境中系统名称为 S0W1，其他系统会不同，这些参数可以咨询本地系统管理员】==

**步骤 5** 在ISMF主面板上选择‘4  Data Class’，创建3个Data Class，要求如下

（1）第1个Data Class，名为‘DCSDS’，用来创建顺序数据集，某些参数如下图所示，其他参数取默认值。输入完参数之后，**直接点****ESC****键退出即可自动保存**。

![img](/img/dfsms/lab3/step5.1.png)

（2）第2个Data Class，名为‘DCPDS’，用来创建分区数据集，某些参数如下图所示，其他参数取默认值。输入完参数之后，**直接点****ESC****键退出即可自动保存**。

![img](/img/dfsms/lab3/step5.2.png)

（3）第3个Data Class，名为‘DCKSDS’，用来创建KSDS数据集，某些参数如下图所示，其他参数取默认值。输入完参数之后，**直接点****ESC****键退出即可自动保存**。

![img](/img/dfsms/lab3/step5.3.png)


**步骤 6** 在ISMF主面板上选择‘5  Storage Class’，创建一个Storage Class，名为‘SCTEST’，所有参数取默认值。输入完参数之后，**直接点****ESC****键退出即可自动保存**。


**步骤 7** 在ISMF主面板上选择‘3  Management Class’，创建一个Management Class，名为‘MCTEST’，所有参数取默认值。输入完参数之后，**直接点****ESC****键退出即可自动保存**。


**步骤 8** 在ISMF主面板上选择‘6  Storage Group’，然后选择‘2  Define’创建一个POOL类型的Storage Group，名为‘SGTEST’。输入完参数之后，**直接点****ESC****键退出即可自动保存**。


**步骤 9** 通过在‘STORAGE GROUP APPLICATION SELECTION’面板上选择‘5. Volume’在SGTEST中填加一个或多个DASD卷（具体卷名可以参考实验2步骤10系统的SMS卷）

![img](/img/dfsms/lab3/step9.png)


**步骤 10**  创建ACS Routine，包括DATACLAS，STORCLAS，MGMTCLAS和STORGRP，详细步骤如下

（1）创建一个分区数据集或者扩展分区数据集，取名为‘**yourid**.SMS.ACS’

（2）在**yourid**.SMS.ACS创建一个Data Class ACS Routine成员，取名DC，实现根据数据集的LLQ将不同的Data Class赋给数据集，参考代码如下

![img](/img/dfsms/lab3/step10.2.png)

（3）在**yourid**.SMS.ACS创建一个Storage Class ACS Routine成员，取名SC，实现根据数据集的HLQ，决定是否对数据集赋予Storage Class，即是否对数据集进行SMS管理，参考代码如下

![img](/img/dfsms/lab3/step10.3.png)

（4）在**yourid**.SMS.ACS创建一个Management Class ACS Routine成员，取名MC，实现根据数据集的SC对数据集赋值MC，参考代码如下

![img](/img/dfsms/lab3/step10.4.png)

（5）在**yourid**.SMS.ACS创建一个Storage Group ACS Routine成员，取名SG，实现根据数据集的SC对数据集赋值SG，参考代码如下

![img](/img/dfsms/lab3/step10.5.png)


**步骤 11**  Translate上面创建的ACS Routine，将ACS Routine源代码翻译为目标代码，保存在SCDS中。详细操作如下

（1）在ISMF主选项面板上选择‘7  Automatic Class Selection’回车

（2）然后在‘ACS APPLICATION SELECTION’面板上输入CDS的名字，然后选择‘2. Translate’，如下图示，回车

![img](/img/dfsms/lab3/step11.2.png)

（3）然后在‘TRANSLATE ACS ROUTINES’面板上，在相应栏目输入SCDS和ACS数据集的名字，在‘ACS Source Member’栏目输入‘SC’，回车，你将会看到TRANSLATE的结果，确保TRANSLATE成功

**备注：yourid.LIST****数据集的属性：顺序数据集，RECFM=FBA****，LRECL=133****，BLKSIZE=266**

![img](/img/dfsms/lab3/step11.3.png)

（4）重复上步，将‘ACS Source Member’改为‘DC’，回车，确保TRANSLATE成功

（5）重复上步，将‘ACS Source Member’改为‘MC’，回车，确保TRANSLATE成功

（6）重复上步，将‘ACS Source Member’改为‘SG’，回车，确保TRANSLATE成功

**步骤 12**  在完成Translate工作后，应该选择下图中的‘3.Validate’对ACS Routine及其所用到的Construct进行验证，确保成功

![img](/img/dfsms/lab3/step12.png)


**步骤 13**  创建一个分区数据集**yourid.SMS**.TEST，用来测试ACS Routine。测试刚刚创建的DFSMS配置，操作步骤如下

（1）在ISMF主选项面板上选择‘7  Automatic Class Selection’，回车

（2）然后在‘ACS APPLICATION SELECTION’面板上，输入CDS名字，选择‘4. Test’，回车

![img](/img/dfsms/lab3/step13.2.png)

（3）接着在‘ACS TEST SELECTION’面板上，输入测试ACS Routine的库名和成员名，选择‘1. DEFINE’，如下图示，最后回车

![img](/img/dfsms/lab3/step13.3.png)

（4）在紧接着出现的‘ACS TEST CASE DEFINE’面板上，输入拟分配的数据集的名字‘DSN’等信息，然后回车，系统将呈现测试结果

​ A: 输入数据集**yourid**.TEST.SDS，测试结果如何？（如下）

![img](/img/dfsms/lab3/step13.4.png)

​ B: 新建测试用例CASE2，输入数据集**yourid**.TEST.PDS，测试结果如何？

​
​ C: 新建测试用例CASE3，输入数据集**yourid**.TEST.KSDS，测试结果如何？


如果上述测试结果正确无误，你将可以在测试环境中使用该配置。

**步骤 14**   把步骤13的测试内容以批处理方式执行，提交作业，作业模板如下。

![img](/img/dfsms/lab3/step14.1.png)

==【备注：同济主机环境中[DSNAME]为IBMUSER.SMS.LIB(REPORT)，可以咨询本地系统管理员】==

提示：该作业需要事先创建yourid.TEST.ISPTABL数据集，数据集格式参见如下，可以在3.2面板中创建。

![img](/img/dfsms/lab3/step14.2.png)

![img](/img/dfsms/lab3/step14.3.png)

1）  Submit JCL作业，确保作业的返回码不大于4。

2）  在SDSF;ST面板中找到作业，在作业左侧使用XD命令把作业内容输出到数据集（yourid.SMS.REPORT）中。

3）  最后通过FTP工具（比如FileZilla）把数据集（yourid.SMS.REPORT）下载到本地**提交到服务器**。


**步骤 15**   **（一般情况下因为权限原因无法执行该步骤，建议跳过）** 激活你所创建编辑的SCDS，可以采用菜单激活，详细步骤如下

（1）在ISMF主选项面板选择‘8  Control Data Set’，回车

（2）在‘CDS APPLICATION SELECTION’面板上输入要激活的SCDS，选择‘5. Activate’，回车，系统将激活你所指定的SCDS，如果有任何问题，可以求助系统管理员

![img](/img/dfsms/lab3/step15.png)


**步骤 16**  **（跳过该步骤）** 验证上面的操作是否成功

（1）使用系统命令‘D SMS’显示已经激活的SMS配置的相应信息

​
（2）使用系统命令‘D SMS,SG(ALL),LISTVOL’显示已经激活的配置中的Storage Group的相应信息

​
（3）在ISPF主选项面板的命令栏中输入‘3.2’进入‘Data Set Utility’面板，在此新建数据集，看你配置的SMS是否在起作用？

A: 创建数据集**yourid**.TEST.SDS，在‘Allocate New Data Set’面板上不给任何参数，回车，看数据集是否分配成功，数据集的类型是什么？DCB属性呢？数据集分配在了哪个盘卷上？思考为什么？

​
B: 创建数据集**yourid**.TEST.PDS，在‘Allocate New Data Set’面板上不给任何参数，回车，看数据集是否分配成功，数据集的类型是什么？DCB属性呢？数据集分配在了哪个盘卷上？思考为什么？

​
C: 创建数据集**yourid**.TEST.KSDS，在‘Allocate New Data Set’面板上不给任何参数，回车，看数据集是否分配成功，数据集的类型是什么？数据集分配在了哪个盘卷上？思考为什么？

**步骤 17**  总结本次实验体会及建议

​
​
​


