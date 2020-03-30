# 实验 4：REXX 程序间调用实验 II

实验目的：教学生如何进行 REXX 程序间的调用
实验结果：实验后，学生应该掌握
一种 REXX 程序之间的调用方法
实验介绍：本实验将编写新的 REXX 程序，该程序可以调用前面实验中的任何一个程序
实验步骤：

## 步骤 1 编写新的 REXX 程序 MPROB 来调用前面实验中的任何一个程序，以实现以下功能：

[1] 执行 MPROB 的格式为 %MPROB execname problem:problem:problem: .....
[2] Problem 之间用“：”隔开，调用 execname 程序对每个 Problem 的参数相应处理
例如，MPROB 程序的一个有效示例如下：

![](/img/rexx/lab2/9.1.png)