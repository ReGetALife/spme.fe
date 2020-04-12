# 实验一 系统命令执行

## 步骤 1 交互方式执行命令

进入 SDSF 中，在命令行输入系统命令，如 /D SMS，回车，观察命令返回结果。

## 步骤 2 JCL 方式执行命令

任选 10 个 Display 命令执行，采用 JCL 方式执行观察其结果，示例代码如下：

```
//MVSTRY JOB CLASS=A,MSGLEVEL=(1,1),MSGCLASS=H,
// NOTIFY=yourid
//SDSF EXEC PGM=SDSF         
//ISFOUT DD SYSOUT=*         
//ISFIN DD *                                    
  /D SMS                                       
/*                           
```

从 JCL 运行 SDSF 命令需要相应的权限，可运行如下 RACF 命令授予权限：

```
PE GROUP.ISFSPROG.SDSF CLASS(SDSF) ID(yourid) ACCESS(READ)
SETROPTS RACLIST(SDSF) REFRESH
```

## 附录：系统常用命令

### APF(Authorized Program Facility)、LINKLST 命令

![](/img/mvs/lab1/apf.jpg)

### CF(Coupling Facility)命令 

![](/img/mvs/lab1/cf.jpg)

### Console 命令 

![](/img/mvs/lab1/console.jpg)

### DUMP 命令 

![](/img/mvs/lab1/dump.jpg)

### GRS(Global Resource Serialization)命令 

![](/img/mvs/lab1/grs.jpg)

### IODF(Input/Output Definition File)命令 

![](/img/mvs/lab1/iodf.jpg)

### IOS 命令

![](/img/mvs/lab1/ios.jpg)

### JES2 命令 

![](/img/mvs/lab1/jes2_1.jpg)
![](/img/mvs/lab1/jes2_2.jpg)

### LLA(Library Lookaside)命令 

![](/img/mvs/lab1/lla.jpg)

### LOGGER 命令 

![](/img/mvs/lab1/logger.jpg)

### LOGREC 命令 

![](/img/mvs/lab1/logrec.jpg)

### LPA(Link Pack Area)命令 

![](/img/mvs/lab1/lpa.jpg)

### OMVS 命令 

![](/img/mvs/lab1/omvs_1.jpg)
![](/img/mvs/lab1/omvs_2.jpg)
![](/img/mvs/lab1/omvs_3.jpg)
![](/img/mvs/lab1/omvs_4.jpg)

### OPERLOG 命令 

![](/img/mvs/lab1/operlog.jpg)

### RACF 命令 

![](/img/mvs/lab1/racf.jpg)

### RMF 命令 

![](/img/mvs/lab1/rmf.jpg)

### RRS 命令 

![](/img/mvs/lab1/rrs.jpg)

### SMF(System Management Facility)命令 

![](/img/mvs/lab1/smf.jpg)

### SMS(Storage Management Subsystem)命令

![](/img/mvs/lab1/sms.jpg)

### SSI(Subsystem Interface)命令 

![](/img/mvs/lab1/ssi.jpg)

### TCP/IP 命令 

![](/img/mvs/lab1/tcpip_1.jpg)
![](/img/mvs/lab1/tcpip_2.jpg)

### VTAM(Virtual Telecommunications Access Method)命令 

![](/img/mvs/lab1/vtam.jpg)

### WLM(Workload Manager)命令 

![](/img/mvs/lab1/wlm.jpg)

### XCF(Cross-system Coupling Facility)命令 

![](/img/mvs/lab1/xcf_1.jpg)
![](/img/mvs/lab1/xcf_2.jpg)

### 设备地址命令 

![](/img/mvs/lab1/device_address.jpg)

### 通道命令 

![](/img/mvs/lab1/pipe_1.jpg)
![](/img/mvs/lab1/pipe_2.jpg)

### 系统启动信息及其它命令 

![](/img/mvs/lab1/system_boot_info.jpg)


