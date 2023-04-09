# 项目容器化

服务容器化是什么？

服务容器化是一种将应用程序及其依赖项打包到一个可移植的容器中的方法 💻📦。

这种方法的好处包括：

- ✨ 提高应用程序的可移植性、可靠性和可扩展性 

- 💰 降低部署和维护成本

容器化的好处不仅局限于这些，还包括：

- 🚀 加快构建、测试和部署应用程序的速度 

- 👨‍💻 更轻松地管理和维护基础架构

因此，服务容器化是一种非常有用的技术 💪，它可以使开发人员和 IT 运营人员更加轻松地工作。

## 容器化目录设置

当前以python的项目为例之作为示例，当然其他语言也可以根据内容的原理进行改造成适配自己使用的容器化方案。

按照下图在项目根目录中添加Dockerfile、DockerCommit.sh文件

![](/1_docker_built_project.assets/服务容器化.drawio.png)



## Dockerfile

> 该文件为DockerCommit.sh中docker build命令的依赖，当执行docker buil是，默认使用Dockerfile指定的内容及步骤去构建一个镜像

通过Dockerfile构建镜像：

文件名：Dockerfile

```dockerfile
# <镜像名称> 使用的基础镜像名称
FROM <镜像名称>
# 作者名称
MAINTAINER <author>
# 设置工作目录
WORKDIR /app
# 将当前文件夹下的所有文件拷贝到 /app 目录下
COPY . /app
# 将当前文件夹下的所有文件拷贝到 /app 目录下
EXPOSE <port>
# 启动容器后，在容器内部执行 “/bin/sh” 即后续命令使用shell命令行解释器
CMD /bin/sh
```

## DockerCommit.sh

> 该文件将打包docker镜像，以及推送镜像的步骤，通过shell脚本合并成一个文件，简化步骤

文件名：DockerCommit.sh，实质是一个shell脚本：

```shell
#!/bin/sh
# -e表示在脚本执行过程中，只要有任何一个命令执行失败，就立即退出整个脚本；set -x表示在执行脚本时，会将执行的每一行命令及其参数都打印出来，方便调试
set -ex
# <ip:port> 填写目标仓储，比如自己搭建的docker仓储
DOCKER_REGISTRY=<ip:port>
# 获取版本参数可不传，不传默认版本号为latest,
# 传参方式示例：./DockerCommit.sh 1.0.1
if [[ -z "$1" ]]; then
        version="latest"
else
        version=$1
fi
sudo docker build -q --force-rm -t $DOCKER_REGISTRY/docker-name:$version ./
sudo docker push $DOCKER_REGISTRY/docker-name:$version
```

## 具体步骤

代码改写完并提交验证后，执行

```shell
./DockerCommit.sh <versionId>
```

> 需要将 versionId 替换为自己项目的版本号

执行完毕后，即可构建并推送镜像至仓储

## 容器编排&管理

除了容器的构建，我们还需要关注，容器的编排与管理，平时工作中使用较多的是rancher，以下对rancher做一个介绍。

Rancher是一个非常好用的容器管理平台，它具有以下功能和优点：

- 🌟 **多云支持**：Rancher可以在多个云平台上部署容器化应用程序，如AWS、Azure、Google Cloud等，用户可以轻松地在不同的云平台之间迁移应用程序。
- 🌟 **直观易用的界面**：Rancher提供了直观、易用的Web界面，用户可以使用它来创建、部署、管理容器、集群和应用程序。
- 🌟 **高可用性和灵活性**：Rancher具有高可用性和灵活性，可以轻松地扩展和管理Kubernetes集群，自动管理容器的故障恢复，确保应用程序始终可用。
- 🌟 **安全性**：Rancher提供了多层安全措施，如网络隔离、访问控制和审计日志等，可以帮助用户轻松管理容器的安全性。
- 🌟 **日志和监控**：Rancher提供了内置的日志和监控工具，用户可以实时监控和管理容器和应用程序的性能和状态。
- 🌟 **多种编排平台支持**：Rancher支持多种编排平台，如Kubernetes、Docker Swarm、Mesos和Cattle等，使用户可以选择最适合他们的编排平台。
- 🌟 **自定义**：Rancher提供了许多自定义选项，用户可以根据自己的需求定制他们的容器环境。

总之，Rancher是一个**功能强大**、**易用**和**灵活**的**容器管理平台**，可以帮助用户更轻松地构建、部署和管理容器化应用程序。