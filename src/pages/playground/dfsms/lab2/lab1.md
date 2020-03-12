# 实验2：使用 ISMF 命令实验（可选）

**实验目的：** 练习使用ISMF命令

**实验结果：** 实验后，学生应该掌握

- 如何使用FILTER和SORT命令
- 在数据集列表中如何针对某个数据集执行ISMF的行命令
- 在数据集列表中如何针对所有数据集执行ISMF的主命令

**实验介绍：**

**实验要求：** 完成实验报告

## 实验步骤

**步骤** **1**	在ISMF帮助面板中仔细阅读FILTER命令，步骤如下

（1）	在ISMF主选项面板上按F1进入ISMF帮助面板

（2）	在命令行执行INDEX命令，回车

（3）	然后再命令行输入F，回车，寻找FILTER命令的帮助主题

（4）	查看如下帮助主题的具体内容

        a.	FILTER overview  (data set)       ———— 选择‘6’
        b.	FILTER command	                  ———— 选择‘4’
        c.	FILTER CLEAR command          	  ———— 选择‘3’



**步骤** **2**	使用ISMF数据集应用程序，查看系统中所有以**yourid**作为HLQ的编目数据集，注意选择‘Acquire Data from Volume’为‘Y’。 

（1）	记录下列表中显示的数据集个数

（2）	使用FIND命令查看特定的属性列，如使用FIND 11可以查看第11个属性列‘DS ORG’。



**步骤** **3**	使用FILTER命令帮助回答以下问题
（1）	有多少数据集是顺序数据集（DS ORG=PS）？

==**HINT：FILTER (11) EQ PS**== 

（2）	数据集的名字等于或多于3段的有几个？

==**HINT：FILTER CLEAR         FILTER (2) EQ ‘\*.\*.\*.\*\*’**==



**步骤** **4**	输入‘FILTER 4 LT 50’，看看列表发生什么变化？
（1）	该命令的作用是什么？



**步骤** **5**	学习使用HIDE命令和RESHOW命令

使用HIDE行命令可以从列表中隐藏某个数据集，也可以使用Hnnnnn行命令隐藏从该数据集往后的‘nnnnn’条数据集信息。使用RESHOW主命令可以恢复隐藏的数据集。请完成如下操作。

（1）	隐藏全部数据集，然后恢复显示？        

（2）	隐藏除了前2个数据集的其它数据集，然后恢复显示？        

提示：行命令在数据集列表中的‘LINE OPERATOR’列输入；主命令在命令行输入



**步骤** **6**	使用ISMF帮助学习使用VIEW命令。
（1）	使用‘VIEW 3 4 10’，看看显示列表有何变化。        
（2）	使用‘VIEW *’，再看看显示列表有何变化。 
   

**步骤** **7**	练习使用CATLIST行命令，当使用CATLIST行命令时，系统将会执行IDCAMS实用程序的LISTCAT功能。
（1）	使用CATLIST行命令查看列表中某个顺序或分区数据集，该数据集所在的盘卷是什么？其编目信息存放在那个目录中？         

（2）	使用CATLIST行命令查看列表中某个VSAM数据集，该VSAM数据集的数据部分叫什么？索引部分叫什么（如果存在的话）？是哪种类型的VSAM数据集？各部分所在的盘卷是什么？

**步骤** **8**	练习使用SORT命令，进入VOLUME应用程序面板，实用SORT命令帮助回答以下问题。
（1）	哪一个VOLUME空闲空间所占的比例最小？        

（2）	哪一个VOLUME可用的分区（EXTENT）数目最多？        

（3）	哪一个VOLUME拥有最大的分区？        



**步骤** **9**	在ISMF主选项面板中选择‘4  Data Class’，查看‘Active’配置中的‘Data Class’的信息。
（1）	‘Active’配置中定义了几个‘Data Class’？        

（2）	有没有一个‘Data Class’可以用来新建一个记录长度为80的分区数据集？如果没有请在后面的实验中自己定义一个。


**步骤** **10**	使用DISPLAY行命令，查看上个步骤显示的 ‘Data Class’的具体内容。           

**步骤** **11**	在ISMF主选项面板中选择‘5  Storage Class’，查看‘Active’配置中的‘Storage Class’的信息。使用DISPLAY行命令，查看每个‘Storage Class’的具体内容。           

**步骤** **12**	在ISMF主选项面板中选择‘6  Storage Group’，查看‘Active’配置中的‘Storage Group’信息。使用LISTVOL行命令，查看每个‘Storage Group’中的盘卷信息。           

**步骤** **13**	在ISMF主选项面板中选择‘8  Control Data Set’，查看活动的CDS基本配置信息（名字为‘Active’），参数如下图，回车。

![img](/img/dfsms/lab2/step13.png)

（1）	配置中默认的‘Management Class’是什么？        



**步骤** **14**	在ISMF主选项面板中选择‘3  Management Class’，查看‘Active’配置中的‘Management Class’的信息。使用DISPLAY行命令，查看上个步骤中得到的CDS基本配置中默认MC的内容。

**步骤** **15**	总结本次实验体会及建议