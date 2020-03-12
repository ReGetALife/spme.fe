# 实验 3：REXX 程序间调用实验 I

实验目的：教学生如何进行 REXX 程序间的调用
实验结果：实验后，学生应该掌握
一种 REXX 程序之间的调用方法
实验介绍：本实验将编写新的 REXX 程序，在其中调用前面实验 6 步骤 2 中的 AVG 程序
实验步骤：

## 步骤 1 编写新的 REXX 程序 MAVG 来调用实验 6 步骤 2 中的 AVG 程序，以实现以下功能：

[1] 执行 MAVG 的格式为 %MAVG problem:problem:problem: .....
[2] Problem 之间用“：”隔开，调用 AVG 程序对每个 Problem 的参数进行求平均值的处理
例如，MAVG 程序的一个有效示例如下：

![](/img/rexx/lab2/8.1.png)