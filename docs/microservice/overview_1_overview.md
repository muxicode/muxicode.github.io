---
title: 微服务概览
autoGroup-1: 微服务概览与治理
---

# 微服务概览

## 单体服务

![](/overview_1_overview.assets/microservice_introduce.drawio.png)

- 前后端分离的单体架构

> 服务小时优点

- 易部署：只有一个服务需要管理，直接部署即可
- 易测试：外部依赖少，保证单体服务正常即可
- 易开发：逻辑相对简单
- 易拓展：拓展服务器

> 服务变复杂后的缺点

- 代码量大，模块众多，打包与启动缓慢
- 应用无法拓展，虽然在一个单体中划分了模块，但是由于服务复杂，导致代码难以理解
- 可靠性低：当多个模块都修改，并发布时，问题难以定位只能回滚，导致敏捷开发与部署难以完成

**应对：化繁为简，分儿治之**

- 分儿治之，模块化不是可以吗？为什么要微服务？
- 抓住核心要点，独立部署

哔哩哔哩案例：

![](/overview_1_overview.assets/bilibili_extend.drawio.png)

## 微服务起源

面向服务架构也叫 SOA (Service-Oriented Architecture)架构。与微服务有什么联系？你可以把微服务想成是 SOA 的最佳实践。

![](/overview_1_overview.assets/SOA_architectrue.drawio.png)



- **小即是美**：小的服务代码少，bug也少，易测试，易维护，也更容易不断迭代完善的精致进而美妙。
- **单一职责**：一个服务也只需要做好一件事，专注才能做好。
- **尽可能早的创建原型**：尽可能早的提供服务API，建立服务锲约，达成服务间沟通的一致性约定，至于实现和完善可以慢慢再做。
- **可移植性比效率更重要**：服务间的轻量级交互协议在效率和可移植性二者间，首要依然考虑兼容性和移植性。

## 微服务定义

![](/overview_1_overview.assets/micrservice_defined.drawio.png)

**围绕业务功能构建**的，服务**关注单一业务**，服务间**采用轻量级的通信机制**，可以**全自动独立部署**，可以使用不同的变成语言和数据存储技术。微服务架构通过业务拆分实践服务组件化，通过组件组合快速开发系统，业务单一的服务组件有可以独立部署，使得整个系统变得清晰灵活：

- **原子服务**    ---    单一的业务场景，单一的业务，**api**由业务单元构建
- **独立进程**    ---    独立部署与交付，小体量4核**4G**
- **隔离部署**    ---    隔离包括**DB**、**业务**
- **去中心化服务治理**   ---    四层或七层实现负载均衡，容易出现流量过热，尽量让两个服务直连，减少集中式的负载均衡。在需要服务发现的场景下，那无法避免我们也需要一个集中式的服务发现。

缺点

- **基础设施建设、复杂度高**       ----      一个巨石应用变成上千个小应用，维护工作变大，需要对接的人变多了，日志不统一（日志中心），可用性、数据一致性的复杂度都会变高（有些需求需要多个服务同时部署）

## 微服务不足

![](/overview_1_overview.assets/microservice_complexity.drawio.png)

Fred Brooks 在30年前写道，“there are no sliver bullets”。但凡事有利就有弊，微服务也不是万能的

- 微服务应用时分布式系统，由此会带来固有的复杂性。开发者不得不使用 RPC 或则消息传递，来实现进程间通信；此外，必须要写代码来处理消息传递中速度过慢或者服务不可用等局部失效问题。
- 分区的数据库架构，同时更新多个业务主体的事务很普遍。这种事务对于单体式应用来说很容易，因为只有一个数据库。在微服务架构应用中，需要更新不同服务所使用的不同数据库，从而对开发者提出了更高的要求和挑战。
- 测试一个基于微服务架构的应用也是很复杂的任务。
- 服务模块间的依赖，应用的升级由可能会波及多个服务模块的修改。
- 对运维基础设施的挑战比较大。

## 组件服务化

![](/overview_1_overview.assets/micro_compose.drawio.png)

传统实现组件的方式式通过库(library)，库是和应用一起运行在进程中，库的局部变化意味着整个应用的的重新部署。通过服务来实现组件，意味着将应用拆散为一系列的服务运行在不同的进程中，那么单一服务的局部变化只需要重新部署对应的服务进程。我们用Go实施一个微服务：

- kit：一个微服务的基础库（框架）
- service：业务代码 + kit 依赖 + 第三方依赖组成的业务微服务
- RPC + message queue：轻量级通讯

本质上等同于，多个微服务组合完成了一个完整的用户场景。

## 去中心化

![](/overview_1_overview.assets/micro_decentration.drawio.png)

每个服务面临的业务场景不同，可以针对性的选择合适的技术解决方案。但页需要避免过度多样化，结合团队实际情况来选择取舍，要是每个服务都用不同的语言技术栈来实现，想想维护成本真是够高的。

- 数据去中心化
- 治理去中心化
- 技术去中心化

**每个服务独享自身的数据存储设施（缓存，数据库等），不像传统应用共享一个缓存和数据库，这样有历与服务的独立性，隔离相关干扰。**

## 按业务组织服务

![](/overview_1_overview.assets/micro_team.drawio.png)

**按业务能力组织服务的意思是服务提供的能力和业务功能对应**，比如：订单服务和数据访问服务，前者反应了真实的订单相关业务，后者是一种技术抽象服务不反应真实业务。所以按微服务架构理念来划分服务时，是不应该存在数据访问服务这样一个服务的。

事实上**传统应用设计架构的分层结构正反映了不同角色的沟通结构**。所以若要按微服务的方式来构建应用，也需要对用调整团队的组织架构。每个微服务背后的小团队的组织是跨功能的，包含实现业务的所需的全面技能。

BiliBili模式：**大前端(移动/Web)** => **网关接入** =》 **业务服务** => **平台服务** =》 **基础设施(PaaS/Saas)** 

开发团队对软件在生成环境的运行负全部责任！

## 基础设施自动化

![](/overview_1_overview.assets/micro_ci.drawio.png)

**无自动化不微服务，自动化包括测试和部署**。单一进程的传统应用被拆分为一系列的多进程服务后，意味着开发，调试，测试，监控和部署的复杂度都会相应增大，必须要有合适的自动化基础设施来支撑微服务架构模式，否则开发、运维的成本将大大增大。

- CICD： Gitlab + Gitlab Hooks + kubernetes
- Testing: 测试环境、单元测试、API自动化测试
- 在线运行时：kubernetes，以及一系列Prometheus、ELK、Control Panle

## 可用性&兼容性设计

著姓名的 Design For Failure 思想，微服务架构采用粗粒度的进程间通信，引入了额外的复杂性和需要处理的新问题，如网络延迟、消息格式、负载均衡和容错，忽略其中任何一点都属于对“分布式计算的误解”。

- **隔离**
- **超时控制**
- **负载保护**
- **限流**
- **降级**
- **重试**
- **负载均衡**

一旦采用了微服务架构模式，那么在服务需要变更时我们要特别小心，服务提供者的变更可能引发服务消费者的兼容性破坏，时刻谨记保持服务契约（接口）的兼容性。

Be conservative in what you send, be liberal in what you accept.

发送时要保守，接收时要开放。按照伯斯塔尔法则的思想来设计和实现服务时，发送的数据要更保守，意味着最小化的传送必要的信息，接收时更开放意味着要最大限度的容忍冗余数据，保证兼容性。

## 实践建议

### 单体服务演进

![](/overview_1_overview.assets/micro_single_update.drawio.png)

- 混沌一片
  1. 完善单元测试
  2. 先抽取公共部分，如utils，helper等
  3. 引入聚合层接触模块间循环依赖
  4. 按照业务对象划分模块，分到不同的包里
- 模块化
  1. 创建不同的代码仓库，将公共部分、业务模块逐个挪到别的代码仓库
  2. 开始准备微服务环境和微服务框架选型
  3. 搭建好CI和集成测试环境
- 模块依赖化
  1. 业务模块逐个服务化。要解决微服务开发、测试、部署中所遇到的问题
  2. 搭建自动部署和回滚平台
  3. 调研服务治理和网关
  4. 引入消息队列
  5. 引入分布式事务解决方案
  6. 引入分布式任务调度
  7. 搭建可观测性平台-----logging，tracing，metrics，以及对应的告警

### 如何划分模块

> 垂直划分  -----------   按照业务对象划分

正统理论：DDD

> 水平划分  -----------   按层次划分

**大前端(移动/Web)** => **网关接入** =》 **业务服务** => **平台服务** =》 **基础设施(PaaS/Saas)** 

1.  丐中丐版本：直接使用 应用服务组装数据
2. 丐版本：加入聚合服务
3. 普通版：加入平台服务

### 微服务的粒度

- 两个披萨团队
- 一个人能够理解模块的所有细节？
- 事实标准：基本上没有谁能够知道所有的细节，多数情况下，是三两个核心成员合并在一起互相补充，能够说清楚各种细节
- 误超前划分，过小粒度更难以开发。