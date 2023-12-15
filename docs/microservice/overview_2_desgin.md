---
title: 微服务设计
autoGroup-1: 微服务概览与治理
---

# 微服务设计

## API Gateway

### 垂直拆分

![](/overview_2_desgin.assets/micro_design_1.drawio.png)

我们进行了SOA服务化的架构演进，按照垂直功能进行了拆分，对外暴露了一批微服务，但是因为缺乏统一的出口面临了不少困难：

- **客户端到微服务直接通信，强耦合。**
- **需要多次请求，客户端聚合数据，工作量巨大，延迟高。**
- **协议不利于统一，各个部门间有差异，需要端来兼容。**
- **面向“端”的API适配，耦合到了内部服务。**
- **多终端兼容逻辑复杂，每个服务都需要处理。**
- **统一逻辑无法收敛，比如安全认证，限流。**

我们之前提到了工作模型，需要内聚模式配合。

### 统一协议

![](/overview_2_desgin.assets/micro_bff.drawio.png)

我们新增了一个 app-interface 用于统一的协议出口，在服务内进行大量的dataset join，按照业务场景设计粗粒度的API，给后续服务的演进带来很多优势：

- **轻量交互:协议精简，聚合。**
- **差异服务：数据剪裁及聚合、针对终端定制化API。**
- **动态升级：原有系统兼容升级，更新服务而非协议。**
- **沟通效率提升，写作模式演进为移动业务+网关小组。**

BFF 可以认为是一种适配服务，将后端的未付进行适配（主要包括集合）

### 单点故障

![](/overview_2_desgin.assets/micro_single_failed.drawio.png)

最致命的一个问题是整个app-interface 属于 single point of failure，严重的代码缺陷或者流量洪峰可能引发集群宕机。

- 单个模块会导致后续业务集成复杂度高，以及康威法则，单块的无线BFF和多团队之间就出现不匹配为题，团队之间沟通协调成本高，交付率低下。
- 很多横切面逻辑，比如安全认证，日志监控，限流熔断等。随着时间的推移，代码变得越来越复杂，技术债越堆越多。

### 通用功能服务层

![](/overview_2_desgin.assets/micro_api_gateway.drawio.png)

**跨横切面（Cross-Cutting Concerns）的功能，需要协调新的框架升级发版**（路由，认证，限流，安全），因此全部上沉，引入了 API Gateway，把业务集成度高的BFF层和通用功能服务层API Gateway 进行了分层处理。

在新的架构中，网关承担了重要的角色，他是解耦拆分和后续升级迁移的利器。在网关的配合下，单块BFF实现了解耦拆分，各业务线团队可以独立开发和交付各自的微服务，研发效率大大提升。另外，把跨横切面逻辑从BFF剥离到网关上去以后，BFF的开发人员可以更加专注业务逻辑交付，实现了**架构上的关注分离**（Separation of Concerns）。

**业务的流量实际为：**

**移动端 -> API Gateway -> BFF -> Mircoservice，在FE Web 业务中，BFF 可以是 nodejs 来做服务端渲染（SSR， Server-Side Rendering）,  注意这里忽略了上游的 CDN、4/7层负载均衡（ELB）**

## 微服务划分

### 通常划分

![](/overview_2_desgin.assets/micro_common_depart.drawio.png)

微服务架构时遇到的第一个问题就是如何划分微服务边界。在实际项目中通常会采用两种不同的划分服务边界，即通过业务只能（Business Capability）或是 DDD 的衔接上下文（Bounded Context）。

- Business Capability
  - 由公司内部不同部门提供的职能。例如客户服务部门提供客户服务的职能，财务部门提供财务相关的职能。
- Bounded Context
  - 限界上下文是 DDD 中用来划分不同业务边界的元素，这里业务边界的含义是“解决不同业务问题”的问题域和对应的解决方案域，为了解决某种类型的业务问题，贴近领域知识，也就是业务。

这本质上也促进了组织结构的演进：Service perteam

### CQRS划分

![](/overview_2_desgin.assets/micro_cqrs.drawio.png)

CQRS，将应用程序分为两部分：命令端和查询端。命令端处理程序创建，更新和删除请求，并在数据更改时发出事件。查询端通过针对一个或多个物化视图执行查询来处理查询，这些物化视图通过订阅数据更改时发出的事件流而保持最新。

在稿件服务演进过程中，我们发现围绕着创作稿件、审核稿件，最终发布稿件有大量的逻辑揉在一块，其中稿件本身的状态也非常多种，但是最终前台用户只关注稿件能否查看，我们依赖稿件数据库 binlog 以及订阅 binlog 的中间件 canal，将我们的稿件结果发部到消息队列kafka中，最终消费数据独立组件一个稿件查询结果数据，并对外提供一个独立查询服务，来拆分复杂架构和业务。

我们架构也从 Polling publisher -> Transaction log tailing 进行了演进(Pull vs Push) 

Polling publisher: 定时服务监控id对应的时间段产生的新数据。