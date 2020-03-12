# 实验 6：显示数据集信息实验

实验目的：教学生如何使用 LISTDSI 函数
实验结果：实验后，学生应该掌握
如何使用 LISTDSI 函数
实验介绍：本实验为可选实验
实验步骤：

## 步骤 1 编写 REXX 程序 QUERYDS，以数据集名字作为程序的输入参数，程序需要显示数据集的

如下信息：
a. 记录格式（Record format）
b. 记录长度（Logical record length）
c. 最近访问时间（Last reference date）
d. 新建空间需求及设备类型（Allocation space and units of allocation）
e. 使用的空间大小（Allocation used）
f. SMS 参数：Data Class, Management Class, Storage Class
g. 数据集类型（PDS/PDSE/顺序数据集/其他）
h. 如果是顺序数据集，显示文件前 10 行数据