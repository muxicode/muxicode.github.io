(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{390:function(e,t,_){"use strict";_.r(t);var s=_(14),v=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"redis四种部署模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#redis四种部署模式"}},[e._v("#")]),e._v(" Redis四种部署模式")]),e._v(" "),t("ul",[t("li",[e._v("单节点模式")]),e._v(" "),t("li",[e._v("主从模式")]),e._v(" "),t("li",[e._v("哨兵模式（Sentinel）【2.8版本开始提供】")]),e._v(" "),t("li",[e._v("集群模式（Cluster）【3.0版本开始提供】")])]),e._v(" "),t("h2",{attrs:{id:"一、单节点模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、单节点模式"}},[e._v("#")]),e._v(" 一、单节点模式")]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/master.png",alt:"img"}})]),e._v(" "),t("blockquote",[t("p",[e._v("Redis默认启动，什么都不配置，默认就是Master节点，简单却不具备高可用。")]),e._v(" "),t("p",[e._v("优点")]),e._v(" "),t("p",[e._v("配置简单，操作简单\n缺点")]),e._v(" "),t("p",[e._v("单点的宕机引来的服务的灾难、数据丢失\n单点服务器内存瓶颈，无法无限纵向扩容\n解决办法")]),e._v(" "),t("p",[e._v("单节点宕机，可以由其他节点暂时顶替，宕机的慢慢排查")])]),e._v(" "),t("h2",{attrs:{id:"二、主从模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、主从模式"}},[e._v("#")]),e._v(" 二、主从模式")]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/20210915004402460.png",alt:""}})]),e._v(" "),t("blockquote",[t("p",[e._v("优点")]),e._v(" "),t("p",[e._v("有了主从，提高了Redis整体的可用性，当主节点（master）挂了，可以把从节点（slave）手动升级为主节点继续服务。")]),e._v(" "),t("p",[e._v("缺点")]),e._v(" "),t("p",[e._v("master挂了整个Redis将失去写操作的能力，仅具备读操作，需要运维半夜爬起来手动升级，中间的请求失败数据丢失无法容忍。\n解决办法")]),e._v(" "),t("p",[e._v("可以有一种方式自动升级slave为master      ------【哨兵】")])]),e._v(" "),t("h3",{attrs:{id:"_2-1-主从复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-主从复制"}},[e._v("#")]),e._v(" 2.1 主从复制")]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/2021091522311961.png",alt:""}})]),e._v(" "),t("p",[e._v("​        从一台Redis服务器的数据（主节点master），复制到其他Redis服务器（从节点slave）。数据复制单向，只能由主节点到从节点，master可读可写，slave只可读不可写；默认每台Redis服务器都是主节点，从节点需要在配置文件中单独配置，才会从默认的主节点变成从节点。一个主节点可以有0个或多个从节点，但每个从节点只能有一个主节点。")]),e._v(" "),t("h4",{attrs:{id:"_2-1-1-复制原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-复制原理"}},[e._v("#")]),e._v(" 2.1.1 复制原理")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("slave第一次连接master，一定会执行一次全量复制")])]),e._v(" "),t("li",[t("p",[e._v("全量复制数据量过大，会造成很大的网络开销，消耗CPU/内存/硬盘IO")])]),e._v(" "),t("li",[t("p",[e._v("增量复制用于处理在主从复制中因网络等数据丢失的场景，当slave再次连接上master，并且就是原来的master，如果条件允许，master补发数据给slave，补发数据量小，避免全量复制的开销（到底能不能复制还要看offset和buffer的情况）")])]),e._v(" "),t("li",[t("p",[e._v("如果slave再次连上的master是新选举的master，那么只能进行全量复制")])]),e._v(" "),t("li",[t("p",[e._v("早期的redis只有全量复制，增量复制是对全量复制的重大优化，尽量采用2.8以上版本")])])]),e._v(" "),t("h4",{attrs:{id:"_2-1-1-1-全量复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-1-全量复制"}},[e._v("#")]),e._v(" 2.1.1.1 全量复制")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("slave给master发一个sync同步命令")])]),e._v(" "),t("li",[t("p",[e._v("master通过bgsave命令fork子进程，持久化生成RDB文件")])]),e._v(" "),t("li",[t("p",[e._v("master通过网络将RDB文件传给slave")])]),e._v(" "),t("li",[t("p",[e._v("slave清空老数据，载入新的RDB文件，此时slave阻塞，无法响应客户端，专心复制")])])]),e._v(" "),t("h4",{attrs:{id:"_2-1-1-2-增量复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-2-增量复制"}},[e._v("#")]),e._v(" 2.1.1.2 增量复制")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("主从节点各自维护自己的复制偏移量offset，主节点写入命令时，offset=offset+命令字节长度；从节点收到主节点命令也会相应增加自己的offset，并同步给主节点。主节点同时维护自己的offset和从节点的offset，以此来判断主从节点数据是否一致。")])]),e._v(" "),t("li",[t("p",[e._v("主节点指令记录在本地buffer（缓冲区），异步将buffer同步给从节点")])]),e._v(" "),t("li",[t("p",[e._v("若网络不好，同步速度慢了，buffer满了就会从头开始覆盖前面的内容，于是无法增量复制，必须全量复制")])])]),e._v(" "),t("h3",{attrs:{id:"_2-2-读写分离"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-读写分离"}},[e._v("#")]),e._v(" 2.2 读写分离")]),e._v(" "),t("p",[e._v("​        大部分情况都是读操作，将读操作放在从节点，写操作放在主节点，减缓服务器压力；同时一些执行耗时比较久的操作也可以放在一台从节点完成，例如keys、sort。（什么时候连主节点写，什么时候连从节点读，由客户端自己控制）")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("    最低配：一主二从，当主节点宕机后，其中一个从节点升级为主节点，还能剩一个从节点。\n")])])]),t("h3",{attrs:{id:"_2-3-主要作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-主要作用"}},[e._v("#")]),e._v(" 2.3 主要作用")]),e._v(" "),t("ol",[t("li",[e._v("数据冗余：热备份，持久化另一种方式")]),e._v(" "),t("li",[e._v("故障恢复：master宕机，快速升级slave为master")]),e._v(" "),t("li",[e._v("读写分离：master写，slave，提高服务器负载能力，同时可以根据需求添加slave")]),e._v(" "),t("li",[e._v("负载均衡：配合读写分离，读多写少场景，多个slave分担负载，大大提高并发")]),e._v(" "),t("li",[e._v("高可用基石：是实现哨兵和集群的基础")])]),e._v(" "),t("h2",{attrs:{id:"三、哨兵模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、哨兵模式"}},[e._v("#")]),e._v(" 三、哨兵模式")]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/20210915004448949.png",alt:""}})]),e._v(" "),t("p",[e._v("​    试想一下，如果主从模式中，大半夜主节点挂了，运维从床上迷迷糊糊爬起来，打开电脑，手动升级处理，怕不是第二天就要上头条了。")]),e._v(" "),t("p",[e._v("​    哨兵模式的出现用于解决主从模式中无法自动升级主节点的问题，一个哨兵是一个节点，用于监控主从节点的健康，当主节点挂掉的时候，自动选择一个最优从节点升级为主节点。")]),e._v(" "),t("p",[e._v("​    但哨兵如果挂了怎么办？于是哨兵一般都会是一个集群，是集群高可用的心脏，一般由3-5个节点组成，即使个别节点挂了，集群还可以正常运行。")]),e._v(" "),t("blockquote",[t("p",[e._v("优点")]),e._v(" "),t("ul",[t("li",[e._v("可以在master挂掉后自动选举新的master")])]),e._v(" "),t("p",[e._v("缺点")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("master挂了，切换新的master会造成未来得及主从同步的数据丢失")])]),e._v(" "),t("li",[t("p",[e._v("大数据高并发，单个master内存仍存在上限")])]),e._v(" "),t("li",[t("p",[e._v("主从全量同步仍然要耗费大量时间")])]),e._v(" "),t("li",[t("p",[e._v("单个Redis只能利用CPU的单个核心，应对海量数据捉襟见肘")])])]),e._v(" "),t("p",[e._v("解决办法")]),e._v(" "),t("ul",[t("li",[e._v("Redis集群方案")])])]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/20210915004503755.png",alt:""}})]),e._v(" "),t("p",[e._v("​    客户端连接Redis，会首先连接"),t("strong",[e._v("Sentinel")]),e._v("，通过Sentinel查询master地址，然后再连接master进行数据交互。当master挂了，客户端重新跟Sentinel要master地址，连接新的master。")]),e._v(" "),t("p",[e._v("​    上图中可看，master挂了，原先的主从复制断开，客户端和master也断开。然后一个slave变成新的master，和其余的slave进行新的主从复制，客户端通过新的master继续交互，Sentinel持续监控已经挂掉的旧的master，"),t("strong",[e._v("一旦旧的master恢复")]),e._v("，集群会变为下图，"),t("strong",[e._v("旧的master成为新的slave，从新的master建立主从复制关系。")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/2021091500451855.png",alt:""}})]),e._v(" "),t("ul",[t("li",[e._v("一个Sentinel或Sentinel集群可以管理多个主从Redis，如果只有一个Redis，Sentinel没有意义")]),e._v(" "),t("li",[e._v("master挂了，Sentinel在slave中选举一个升级为master，并修改配置文件")]),e._v(" "),t("li",[e._v("挂了的master恢复后，只能当slave，跟新选举的master主从复制")]),e._v(" "),t("li",[e._v("Sentinel有可能会挂，所以Sentinel一般都是一个集群")]),e._v(" "),t("li",[e._v("每个Sentinel节点定期检测Redis数据节点、其余Sentinel节点是否可达")]),e._v(" "),t("li",[e._v("对于节点的故障是由多个Sentinel节点共同完成，有效防止误判")]),e._v(" "),t("li",[e._v("Redis主从复制为异步，master挂了，从节点可能会丢失一部分信息，Sentinel无法保证消息完全不丢失，但可以做到尽量少丢失")]),e._v(" "),t("li",[e._v("Sentinel.slave_for方法可以从连接池内采用轮询方案拿出一个slave地址，实现负载均衡")])]),e._v(" "),t("h3",{attrs:{id:"_3-1-定时监控任务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-定时监控任务"}},[e._v("#")]),e._v(" 3.1 定时监控任务")]),e._v(" "),t("ul",[t("li",[e._v("每隔10秒，每个Sentinel节点会向主节点和从节点发送info命令获取最近的拓扑结构，可以感知新加入或故障转移的Redis数据节点")]),e._v(" "),t("li",[e._v("每隔2秒，每个Sentinel节点会与其他Sentinel节点通信，可以发现新的Sentinel节点，并与其他Sentinel节点交换对主节点的判断信息，方便故障转移及选举")]),e._v(" "),t("li",[e._v("每隔1秒，每个Sentinel节点会向主节点、从节点以及其他的Sentinel节点发送ping做一次心跳检测，来确认这些节点是否可达，实现对每个节点的监控")])]),e._v(" "),t("h3",{attrs:{id:"_3-2-主观下线和客观下线"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-主观下线和客观下线"}},[e._v("#")]),e._v(" 3.2 主观下线和客观下线")]),e._v(" "),t("p",[t("strong",[e._v("主观下线")])]),e._v(" "),t("p",[e._v("​    当Sentinel节点ping其他节点，超时未回复，Sentinel节点就会对该节点做失败判定。主观下线是当前Sentinel节点的一家之言，存在误判可能")]),e._v(" "),t("p",[t("strong",[e._v("客观下线")])]),e._v(" "),t("p",[e._v("​    当Sentinel主观下线的节点是master，该Sentinel会询问其他Sentinel对master的判断，当大部分Sentinel都对master的下线做了同意判断，那么这个判断就是比较客观的")]),e._v(" "),t("h3",{attrs:{id:"_3-3-sentinel集群的领导者选举"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-sentinel集群的领导者选举"}},[e._v("#")]),e._v(" 3.3 Sentinel集群的领导者选举")]),e._v(" "),t("p",[e._v("Sentinel节点已经对master做了客观下线，但还不能立刻进行故障转移，因为故障转移工作只需要一个Sentinel节点来完成，因此在Sentinel集群中要选出一个leader来进行故障转移。")]),e._v(" "),t("p",[e._v("Redis使用了Raft算法实现领导者选举：")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("每个在线的Sentinel节点都有资格成为领导者，他要求其他节点来投自己一票")])]),e._v(" "),t("li",[t("p",[e._v("先收到谁的要求就给谁投票，但不能给自己投")])]),e._v(" "),t("li",[t("p",[e._v("首先拿到大多数（即一半+1）的票当选领导者")])])]),e._v(" "),t("h3",{attrs:{id:"_3-4-故障转移"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-故障转移"}},[e._v("#")]),e._v(" 3.4 故障转移")]),e._v(" "),t("p",[e._v("Sentinel集群领导者负责此次故障转移")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("排除主观下线的从节点")])]),e._v(" "),t("li",[t("p",[e._v("选择优先级高的从节点，如果没有再进行3")])]),e._v(" "),t("li",[t("p",[e._v("选择复制偏移量最大的从节点（复制的最完整），如果没有再进行4")])]),e._v(" "),t("li",[t("p",[e._v("选择runid最小的从节点")])])]),e._v(" "),t("h2",{attrs:{id:"四、-集群模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、-集群模式"}},[e._v("#")]),e._v(" 四、 集群模式")]),e._v(" "),t("p",[t("img",{attrs:{src:"/nosql_1_redis_deploy.assets/20210915004424387.png",alt:""}})]),e._v(" "),t("p",[e._v("​     集群方案真正实现了Redis高可用，有很多种实现方式，目前最常用的Redis Cluster是Redis的亲儿子，是Redis作者自己提供的Redis集群化方案，从Redis3.0版本开始正式提供。")]),e._v(" "),t("p",[e._v("​    集群由多个Redis主从组成，每一个主从代表一个节点，每个节点负责一部分数据，他们之间通过一种特殊的二进制协议交互集群信息。")]),e._v(" "),t("p",[e._v("​    Redis Cluster将所有数据分片，分成16384个槽位，Redis Cluster对key值使用crc16算法进行hash，然后用除留余数发模除16384得到具体的槽位，每个节点负责其中一部分槽位。")]),e._v(" "),t("p",[e._v("当客户端连接集群，会得到一份集群的槽位匹配信息，当客户端要查找key，可以直接定位到目标节点。")]),e._v(" "),t("p",[e._v("​    Cluster去中心化，由多个节点组成，客户端连接时可以只用一个节点的地址，其余节点可通过该节点自动发现，但如果该节点挂了，就必须手动更换地址，因此连接多个地址安全性更高。")]),e._v(" "),t("p",[t("strong",[e._v("容错")])]),e._v(" "),t("p",[e._v("​    Redis Cluster拥有类似哨兵的功能，每个节点仍需设置若干从节点，主节点发生故障，集群可将slave升级为master；否则如果master挂了，集群完全不可用；")]),e._v(" "),t("p",[e._v("​    且Redis Cluster是去中心化，集群内某个节点不可用时，一个节点认为他失联并不代表所以节点都认为他失联，集群要进行一次商议，只有大多数节点认为他失联，才会认为其需要主从切换来容错。")]),e._v(" "),t("p",[t("strong",[e._v("动态扩容")])]),e._v(" "),t("p",[e._v("​    假如原先集群中有3个节点，一共3000个数据，可能1-1000在第一个节点，1001-2000在第二个节点，2001-3000在第三个节点。")]),e._v(" "),t("p",[e._v("​    当新节点加入集群，需要手动将槽和数据迁移到新节点，可以使用redis-trib工具或手动命令迁移（略）。")]),e._v(" "),t("p",[t("strong",[e._v("大致流程：")])]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("从源节点获取内容")])]),e._v(" "),t("li",[t("strong",[e._v("存到目标节点")])]),e._v(" "),t("li",[t("strong",[e._v("删除源节点内容")])])]),e._v(" "),t("blockquote",[t("p",[e._v("优点")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("无中心架构，支持动态扩容")])]),e._v(" "),t("li",[t("p",[e._v("Cluster自动具备哨兵监控和故障转移（主从切换）能力")])]),e._v(" "),t("li",[t("p",[e._v("客户端连接集群内部地址可自动发现")])]),e._v(" "),t("li",[t("p",[e._v("高性能、高可用，有效解决了Redis分布式需求")])])]),e._v(" "),t("p",[e._v("缺点")]),e._v(" "),t("ul",[t("li",[e._v("运维复杂")]),e._v(" "),t("li",[e._v("只能使用0号数据库")])])]),e._v(" "),t("h2",{attrs:{id:"五、常见问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五、常见问题"}},[e._v("#")]),e._v(" 五、常见问题")]),e._v(" "),t("h3",{attrs:{id:"_1、sentinel节点为什么是至少三个且奇数个"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、sentinel节点为什么是至少三个且奇数个"}},[e._v("#")]),e._v(" 1、Sentinel节点为什么是至少三个且奇数个？")]),e._v(" "),t("ul",[t("li",[e._v("因为投票机制需要满足多数派原则，就是说至少有半数以上的节点同意才能生效。如果Sentinel节点只有两个，那么当其中一个节点失效时，另一个节点无法获得多数派的支持，也就无法进行故障转移。😭如果Sentinel节点是偶数个，那么当出现网络分区时，可能会导致两个子集都无法获得多数派的支持，也就无法进行故障转移。😭所以我们需要至少三个节点，来保证Sentinel集群自身的高可用。😊")]),e._v(" "),t("li",[e._v("当然了，这三个Sentinel节点肯定都推荐部署到「不同的」机器上，如果所有的Sentinel节点都部署到了同一台机器上，那当这台机器挂了，整个Sentinel也就不复存在了。😭所以我们要注意分散风险，让我们的Redis数据库更安全、更可靠。👍")])]),e._v(" "),t("h3",{attrs:{id:"_2、redis集群节点数为什么至少是6个"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、redis集群节点数为什么至少是6个"}},[e._v("#")]),e._v(" 2、Redis集群节点数为什么至少是6个？")]),e._v(" "),t("p",[e._v("因为Redis集群需要满足以下两个条件：👇")]),e._v(" "),t("ul",[t("li",[e._v("每个主节点都要有一个从节点，来保证数据的复制和备份。这样当主节点出现故障时，从节点可以接替主节点的角色，继续提供服务。👍")]),e._v(" "),t("li",[e._v("集群中的主节点数量要超过半数，来保证集群的可用性。这样当出现网络分区时，可以避免脑裂的情况，即两个子集都认为自己是集群的一部分。😭")])]),e._v(" "),t("p",[e._v("​      所以，如果我们只有两个节点，那么就无法满足第一个条件，因为没有从节点来复制数据。😭如果我们只有四个节点，那么就无法满足第二个条件，因为当两个主节点失去联系时，就会出现脑裂的情况。😭所以我们至少需要六个节点，来满足这两个条件，让我们的Redis集群更稳定、更可靠。😊")]),e._v(" "),t("p",[e._v("​       假设我们只有两个节点，A和B，都是主节点。那么当A节点出现故障时，B节点就没有从节点可以接替A节点的角色，也就无法提供A节点原本负责的数据。这样就会导致数据丢失和服务中断。😭所以我们需要至少一个从节点来复制A节点的数据，这样当A节点出现故障时，从节点可以顶上，继续提供服务。👍")]),e._v(" "),t("p",[e._v("​       假设我们有四个节点，A和B是主节点，C和D是从节点。那么当A和B之间的网络出现故障时，就会导致集群分成两个子集，一个是A和C，一个是B和D。这样就会出现脑裂的情况，即两个子集都认为自己是集群的一部分。😭这样就会导致数据不一致和服务混乱。所以我们需要至少三个主节点，来保证集群中的主节点数量要超过半数，这样当出现网络分区时，只有一个子集可以获得多数派的支持，继续提供服务。👍")]),e._v(" "),t("h3",{attrs:{id:"_3、为什么redis-cluster槽位设计成16384个"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、为什么redis-cluster槽位设计成16384个"}},[e._v("#")]),e._v(" 3、为什么Redis Cluster槽位设计成16384个？")]),e._v(" "),t("p",[e._v("这个数字主要考虑了以下几个因素：👇")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("集群设计最多支持1000个分片（shard），也就是1000个主节点。16384是相对比较好的选择，需要保证在最大集群规模下，槽位均匀分布场景下，每个分片平均分到的槽位不至于太小。"),t("OutboundLink")],1),t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),t("OutboundLink")],1),t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("所以16384是在正确的范围内，以确保每个主节点有足够的槽位，最多1000个主节点，但这个数量足够小，可以轻松地将整个集群状态存储在每个节点中。"),t("OutboundLink")],1),t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("如果槽位数量太大，比如100万个，那么每次迁移槽位时，需要迁移的数据量就会很小，导致迁移次数增多，网络开销增大。"),t("OutboundLink")],1),t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),t("OutboundLink")],1),e._v("而且每个节点需要维护一个很大的槽位映射表，占用更多的内存空间。😭")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("如果槽位数量太小，比如1000个，那么每次迁移槽位时，需要迁移的数据量就会很大，导致迁移时间增长，影响服务质量。"),t("OutboundLink")],1),t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1912954",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),t("OutboundLink")],1),e._v("而且每个分片平均分到的槽位就会很少，导致数据分布不均匀，负载不平衡。😭")])]),e._v(" "),t("p",[e._v("所以，16384是一个比较合理的数字，既能保证数据分布均匀，又能保证迁移效率高，还能保证内存占用低。😊")]),e._v(" "),t("h2",{attrs:{id:"六、文章来源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#六、文章来源"}},[e._v("#")]),e._v(" 六、文章来源")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://blog.csdn.net/qq_26012495/article/details/120299332",target:"_blank",rel:"noopener noreferrer"}},[e._v("csdn"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=v.exports}}]);