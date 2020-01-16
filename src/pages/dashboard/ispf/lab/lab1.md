# ISPF 实验

## 实验内容

（1）创建一个分区数据集或者扩展分区数据集，取名为‘**yourid**.SMS.ACS’

（2）在**yourid**.SMS.ACS创建一个Data Class ACS Routine成员，取名DC，实现根据数据集的LLQ将不同的Data Class赋给数据集，参考代码如下

![img](/img/dfsms/lab3/step10.2.png)

（3）在**yourid**.SMS.ACS创建一个Storage Class ACS Routine成员，取名SC，实现根据数据集的HLQ，决定是否对数据集赋予Storage Class，即是否对数据集进行SMS管理，参考代码如下

![img](/img/dfsms/lab3/step10.3.png)

（4）在**yourid**.SMS.ACS创建一个Management Class ACS Routine成员，取名MC，实现根据数据集的SC对数据集赋值MC，参考代码如下

![img](/img/dfsms/lab3/step10.4.png)

（5）在**yourid**.SMS.ACS创建一个Storage Group ACS Routine成员，取名SG，实现根据数据集的SC对数据集赋值SG，参考代码如下

![img](/img/dfsms/lab3/step10.5.png)
