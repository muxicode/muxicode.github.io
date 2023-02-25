# MongoDb 示例代码

## 1. Python

基于 pymongo 模块，进行分层设计，链接池最大默认值，100，最小默认值 0。

### 1.1 Service 代码

```python
# -*- coding: utf-8 -*-
import traceback

from bson.objectid import ObjectId
import pymongo

from config.DbCfg import MONGO_DB
from infrastructure.utility.Singleton import Singleton
from infrastructure.utility.db.mongo.MongoDbHandler import MongoDbHandler


TABLE_INDEX = 'MTE_USERDEFINED_TABLE_INDEX'
KEY_CREATOR = 'creator'
KEY_TABLE = 'tablename'
KEY_SHEET = 'sheetname'
KEY_FIELD = 'fields'
STEP_COUNT = 10000


@Singleton
class MongoDbService(object):

    def __init__(self, db=MONGO_DB):
        self._db = MongoDbHandler(db)

    def is_table_exist(self, tablename):
        return self._db.is_table_exist(tablename)

    def create_table(self, tablename, creator, fields=[]):
        self._db.create_collection(tablename)
        self._db.save({KEY_CREATOR: creator, KEY_TABLE: tablename, KEY_FIELD: fields}, TABLE_INDEX)

    def drop_table(self, tablename):
        self._db.delete({KEY_TABLE: tablename}, TABLE_INDEX)
        self._db.drop_collection(tablename)

    def query(self, condition, tablename, constraint={}, skip=0, limit=0):
        if condition:
            if condition.has_key('_id') and not isinstance(condition['_id'], ObjectId):
                condition['_id'] = ObjectId(condition['_id'])
        return self._db.query_with_constraint(condition, tablename, constraint, skip, limit)

    def count(self, condition, tablename):
        return self._db.count_data(condition, tablename)

    def distinct(self, attr, condition, tableName):
        return self._db.distinct(attr, condition=condition, collection=tableName)

    def query_table_id(self, condition, tablename):
        ids = []
        result = self.query(condition, tablename, {'_id': 1})
        for idDict in result:
            ids.append(idDict['_id'])
        return ids

    def update(self, uuid, attr_dict, tablename):
        if uuid is None:
            return self._db.save(attr_dict, tablename)
        queryResult = self._db.query_with_constraint({'_id': ObjectId(uuid)}, tablename, {'_id': 1})
        if len(queryResult) != 0:
            return self._db.update({'_id': ObjectId(uuid)}, attr_dict, tablename)
        else:
            return self._db.save(attr_dict, tablename)

    def aggregate(self, pipeline, collection=None):
        return self._db.aggregate(pipeline, collection)

    def insert_one_document(self, attr_dict, collection=None):
        return self._db.insert_one_document(attr_dict, collection)

    def insert_many(self, attrDicts, collection=None):
        return self._db.insert_many(attrDicts, collection)

    def delete_by_id(self, uuid, tablename):
        try:
            return self._db.delete({'_id': ObjectId(uuid)}, tablename)
        except Exception:
            print traceback.print_exc()

    def delete(self, condition, tablename):
        try:
            return self._db.delete(condition, tablename)
        except Exception:
            print traceback.print_exc()

    def get_uuid(self, condition, tableName):
        return self.query_table_id(condition, tableName)

    def get(self, condition, tableName, sort=None, limit=0):
        if "_id" in condition.keys():
            condition.update({"_id": ObjectId(condition["_id"])})
        return self._db.query(condition, tableName, limit, sort=sort)

    def get_newest_one(self, condition, tableName):
        result = self._db.query(condition, tableName, limit=1, sort=("_id", -1))
        if result:
            return result[0]

    def get_by_step(self, condition, tableName, constraint={}, limit=0):
        if condition:
            if condition.has_key('_id') and not isinstance(condition['_id'], ObjectId):
                condition['_id'] = ObjectId(condition['_id'])
        flag = True
        while flag:
            resultFrag = self._db.query_with_constraint(condition, tableName, constraint=constraint, limit=STEP_COUNT)
            if (limit > 0 and len(resultFrag) <= STEP_COUNT) or (limit == 0 and len(resultFrag) < STEP_COUNT):
                flag = False
            yield resultFrag
            if not resultFrag:
                break
            _id = ObjectId(resultFrag[-1].get("_id"))
            condition.update({"_id": {"$gt": _id}})


if __name__ == '__main__':
    import time
    mongo = MongoDbService()
    # 测试约束查询功能
    condition = {'_id': ObjectId("5dee48273a9bed000b0d485f")}
    print mongo.query(condition, "model_tree_data", {"data.ConfigTree/LTEME/Equipment/Rack/SubRack/Slot/PlugInUnit/SdrDeviceGroup/FiberDeviceSet.description": 1})


#     # 测试计数功能
#     condition = {'taskId': "202003171922099918"}
#     print(mongo.count(condition, "model_tree_data"))

#     condition = {'collectDate': {'$lte': '2019-08-15', '$gte': '2019-03-18'}}
#     result = mongo.get(condition, "scene_model_data", limit=0)
#     result = mongo.distinct("networksOperator", condition, "task")
#     print result
    # 测试普通查询
#     result = mongo.query({}, 'model_tree_data', {"variableName", "expressions"})
#     print result
#     condition = {'collectDate': {'$lte': '2019-07-15', '$gte': '2019-06-18'}, 'dataSet': '123'}
#     start = time.time()
#     result = mongo.get_by_step(condition, 'model_tree_data')
#
#     for item in result:
#         print item.get("_id")
#     end = time.time()
#     print "spend %d" % (end - start)
#     for item in result:
#         print item.get("_id")
#     userId = "10225930"
#     date = "2018-07-19"
#     condition = {"baseInfo.userId": {"$eq": userId}, "baseInfo.date": {"$eq": date}}
#     print mongo.get_uuid(condition, "daily_report")
#     mongo.create_collection('RFKeyWord', 'admin')
#     mongo.drop_table('USERDEFINED_TABLE_INDEX')

```

### 1.2 handler 代码

```python
# coding=utf-8
import pymongo

from infrastructure.utility.Repeat import retries_on_exception


class MongoDbHandler(object):

    def __init__(self, dbcfg, collection=None):
        self._dbcfg = dbcfg
        self._reconnection(collection)

    def create_collection(self, collection):
        return self.__db.create_collection(collection)

    def rename_collection(self, oldname, newname):
        self.__db[oldname].rename(newname)

    def copy_collection(self, originalCollName, duplicateCollName):
        return self.__db[originalCollName].aggregate([{'$out': duplicateCollName}])

    def drop_collection(self, collection):
        return self.__db.drop_collection(collection)

    def set_collection(self, collection):
        if collection:
            self.__collection = self.__db[collection]

    def is_table_exist(self, collection):
        if collection in self.__db.collection_names():
            return True
        return False

    def _reconnection(self, collection=None):
        self.__db = self.__init_db()
        if collection:
            self.__collection = self.__db[collection]

    def __init_db(self):
        db = self.__connect_db()
        try:
            db.authenticate(self._dbcfg['user'], self._dbcfg['password'])
        except:
            db = self.__connect_db()
        return db

    def __connect_db(self):
        conn = pymongo.MongoClient(self._dbcfg['ip'], int(self._dbcfg['port']))
        return conn[self._dbcfg['name']]

    def aggregate(self, pipeline, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _aggregate(self, pipeline):
            cursor = self.__collection.aggregate(pipeline)
            result = []
            for contentDict in cursor:
                if contentDict.has_key("_id"):
                    contentDict['_id'] = str(contentDict['_id'])
                result.append(contentDict)
            return result
        return _aggregate(self, pipeline)

    def query_all(self, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _query_all(self):
            cursor = self.__collection.find()
            result = []
            for contentDict in cursor:
                result.append(contentDict)
            return result
        return _query_all(self)

    def query_with_constraint(self, condition, collection=None, constraint={}, skip=0, limit=0):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _query_with_constraint(self, condition, constraint, skip, limit):
            cursor = self.__collection.find(condition, constraint, skip, limit)
            result = []
            for contentDict in cursor:
                if contentDict.has_key("_id"):
                    contentDict['_id'] = str(contentDict['_id'])
                result.append(contentDict)
            return result
        return _query_with_constraint(self, condition, constraint, skip, limit)

    def query(self, condition, collection=None, limit=0, sort=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _query(self, condition):
            if sort:
                if isinstance(sort, tuple):
                    cursor = self.__collection.find(condition, limit=limit).sort(sort[0], sort[1])
                else:
                    cursor = self.__collection.find(condition, limit=limit).sort(sort)
            else:
                cursor = self.__collection.find(condition, limit=limit)
            result = []
            for contentDict in cursor:
                if contentDict.get("_id", False):
                    contentDict.update({"_id": str(contentDict["_id"])})
                result.append(contentDict)
            return result
        return _query(self, condition)

    def count_data(self, condition, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _count(self, condition):
            return self.__collection.count_documents(condition)
        return _count(self, condition)

    def distinct(self, attr, condition={}, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _distinct(self, attr):
            cursor = self.__collection.find(condition).distinct(attr)
            result = []
            for contentDict in cursor:
                result.append(contentDict)
            return result
        return _distinct(self, attr)

    def query_without_id(self, condition, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _query_without_id(self, condition):
            return self.query_with_constraint(condition, collection, {'_id': 0})
        return _query_without_id(self, condition)

    def save(self, json_format_data, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _save(self, json_format_data):
            return self.__collection.insert(json_format_data)
        return _save(self, json_format_data)

    def delete(self, condition, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _delete(self, condition):
            return self.__collection.remove(condition)
        return _delete(self, condition)

    def clear_all(self, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _clear_all(self):
            self.__collection.remove()
        return _clear_all(self)

    def clear(self, condition, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _clear(self, condition):
            self.__collection.remove(condition)
        return _clear(self, condition)

    def update_attr(self, object_id, attr_dict, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _update_attr(self, object_id, attr_dict):
            self.update({'_id': object_id}, attr_dict)
        return _update_attr(self, object_id, attr_dict)

    def update(self, criteria, new_obj, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _update(self, criteria, new_obj):
            self.__collection.update(criteria, {'$set': new_obj})
        _update(self, criteria, new_obj)
        return True

    def delete_by_key(self, criteria, key_path, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _delete_by_key(self, criteria, key_path):
            self.__collection.update(criteria, {'$unset': {key_path: ''}}, True)
        return _delete_by_key(self, criteria, key_path)

    def insert_one_document(self, attr_dict, collection=None):
        self.set_collection(collection)

        @retries_on_exception(2, self._reconnection, collection)
        def _insert_one_document(self, attr_dict):
            self.__collection.insert_one(attr_dict).inserted_id
        return _insert_one_document(self, attr_dict)

    def insert_many(self, attrDicts, collection=None):
        self.set_collection(collection)
        return self.__collection.insert_many(attrDicts)


if __name__ == '__main__':
    from config.DbCfg import MONGO_DB
    db = MongoDbHandler(MONGO_DB)
#     print db.query_all()
#     print db.aggregate([{'$group': {'_id': '', 'statictis': {'$sum': '$丢包数'}}}], 'test2')

```

### 1.3 装饰器

#### 重传装饰器

```python
# coding=utf-8
import logging
import time


def retries_on_exception(maxTries, hook=None, hookArg=None, hookGrainSize=1, exceptions=(Exception,)):
    def dec(func):
        def f2(*args, **kwargs):
            hookGrainSizeInit = hookGrainSize
            tries = range(maxTries)
            tries.reverse()
            for triesRemaining in tries:
                hookGrainSizeInit = hookGrainSizeInit - 1
                try:
                    return func(*args, **kwargs)
                except exceptions:
                    if triesRemaining > 0:
                        if hookGrainSizeInit == 0:
                            hookGrainSizeInit = hookGrainSize
                            if hook is not None:
                                if hookArg is not None:
                                    hook(hookArg)
                                else:
                                    hook()
                    else:
                        logging.error('try ' + str(maxTries) + ' times, but excute ' + func.__name__ + ' is still fail')
                        raise
                else:
                    break
        return f2
    return dec


def retries_on_flag(maxTries, hook=None, hookArg=None, hookGrainSize=1, flag=False, isRaiseException=True, everyTryDelaySecs=0):
    def dec(func):
        def f2(*args, **kwargs):
            hookGrainSizeInit = hookGrainSize
            tries = range(maxTries)
            tries.reverse()
            for triesRemaining in tries:
                hookGrainSizeInit = hookGrainSizeInit - 1
                result = func(*args, **kwargs)
                if result == flag:
                    if triesRemaining > 0:
                        if hookGrainSizeInit == 0:
                            hookGrainSizeInit = hookGrainSize
                            if hook is not None:
                                if hookArg is not None:
                                    hook(hookArg)
                                else:
                                    hook()
                    else:
                        if isRaiseException:
                            raise Exception('try ' + str(maxTries) + ' times, but excute ' + func.__name__ + ' is still fail')
                        else:
                            logging.error('try ' + str(maxTries) + ' times, but excute ' + func.__name__ + ' is still fail')
                            return result
                    time.sleep(everyTryDelaySecs)
                else:
                    return result
        return f2
    return dec

```

#### 单例装饰器

```python
# -*- coding: utf-8 -*-


def Singleton(cls):
    instances = {}

    def _singleton(*args, **kw):
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton
```

### 1.4 客户端代码

```python
class DomainRepository(object):

    @staticmethod
    def get(condition):
        # MongoDbService().get({"_id": taskId}, TABLE, limit=1)
        # MongoDbService().get(condition, TABLE, sort=sort)
        MongoDbService().get(condition, TABLE, limit=1)
```

### 1.5 MongoClient 源码相关

连接池相关参数：

- ' connect '(可选):如果' ' True '(默认)，立即开始在后台连接MongoDB。否则在第一次操作时连接。
- “maxPoolSize”(可选):允许连接到每个服务器的最大并发连接数。如果有“maxPoolSize”未连接到请求的服务器，对服务器的请求将被阻塞。默认为100。不能是0。
- “minPoolSize”(可选):池将维护到每个连接的服务器的最小并发连接数。默认值为0。

```
MongoClient(local_host, local_port, connect=False, maxPoolSize=2000)
```

## 2. Golang

### 2.1 Mongo

#### 2.1.1 pool

conf

```go
package conf

//dbPool
const (
	DBPOOL_INITSIZE = 15
	DBPOOL_CAP      = 100
	DBPOOL_IDLETIME = 5 * 1000 * 1000 * 1000 //单位为duration，目前设置为5s
)

// db
const (
	DB_NAME      = "dbname"
	DB_UESERNAME = "username"
	DB_PASSWORD  = "password"
	DB_IP        = "0.0.0.0"
	DB_PORT      = "27017"
)
```

base.go

```go
package pool

import (
	"errors"
	"fmt"
	"infrastructure/log"
	"sync"
	"time"
)

// Config 连接池相关配置
type Config struct {
	//连接池中拥有的最小连接数
	InitialCap int
	//连接池中拥有的最大的连接数
	MaxCap int
	//生成连接的方法
	Factory func() (interface{}, error)
	//关闭连接的方法
	Close func(interface{}) error
	//检查连接是否有效的方法
	Ping func(interface{}) error
	//连接最大空闲时间，超过该事件则将失效
	IdleTimeout time.Duration
}

// channelPool 存放连接信息
type channelPool struct {
	mu          sync.Mutex
	conns       chan *idleConn
	factory     func() (interface{}, error)
	close       func(interface{}) error
	ping        func(interface{}) error
	idleTimeout time.Duration
}

type idleConn struct {
	conn interface{}
	t    time.Time
}

// NewChannelPool 初始化连接
func NewChannelPool(poolConfig *Config) (Pool, error) {
	if poolConfig.InitialCap < 0 || poolConfig.MaxCap <= 0 || poolConfig.InitialCap > poolConfig.MaxCap {
		return nil, errors.New("invalid capacity settings")
	}
	if poolConfig.Factory == nil {
		return nil, errors.New("invalid factory func settings")
	}
	if poolConfig.Close == nil {
		return nil, errors.New("invalid close func settings")
	}

	c := &channelPool{
		conns:       make(chan *idleConn, poolConfig.MaxCap),
		factory:     poolConfig.Factory,
		close:       poolConfig.Close,
		idleTimeout: poolConfig.IdleTimeout,
	}

	if poolConfig.Ping != nil {
		c.ping = poolConfig.Ping
	}

	for i := 0; i < poolConfig.InitialCap; i++ {
		conn, err := c.factory()
		if err != nil {
			c.Release()
			return nil, fmt.Errorf("factory is not able to fill the pool: %s", err)
		}
		c.conns <- &idleConn{conn: conn, t: time.Now()}
	}

	return c, nil
}

// getConns 获取所有连接
func (c *channelPool) getConns() chan *idleConn {
	c.mu.Lock()
	conns := c.conns
	c.mu.Unlock()
	return conns
}

// Get 从pool中取一个连接
func (c *channelPool) Get() (interface{}, error) {
	conns := c.getConns()
	if conns == nil {
		return nil, ErrClosed
	}
	for {
		select {
		case wrapConn := <-conns:
			if wrapConn == nil {
				return nil, ErrClosed
			}
			//判断是否超时，超时则丢弃
			if timeout := c.idleTimeout; timeout > 0 {
				if wrapConn.t.Add(timeout).Before(time.Now()) {
					//丢弃并关闭该连接
					c.Close(wrapConn.conn)
					continue
				}
			}
			//判断是否失效，失效则丢弃，如果用户没有设定 ping 方法，就不检查
			if c.ping != nil {
				if err := c.Ping(wrapConn.conn); err != nil {
					log.Fatal("conn is not able to be connected: ", err)
					continue
				}
			}
			return wrapConn.conn, nil
		default:
			c.mu.Lock()
			if c.factory == nil {
				c.mu.Unlock()
				continue
			}
			conn, err := c.factory()
			c.mu.Unlock()
			if err != nil {
				return nil, err
			}

			return conn, nil
		}
	}
}

// Put 将连接放回pool中
func (c *channelPool) Put(conn interface{}) error {
	if conn == nil {
		return errors.New("connection is nil. rejecting")
	}

	c.mu.Lock()

	if c.conns == nil {
		c.mu.Unlock()
		return c.Close(conn)
	}

	select {
	case c.conns <- &idleConn{conn: conn, t: time.Now()}:
		c.mu.Unlock()
		return nil
	default:
		c.mu.Unlock()
		//连接池已满，直接关闭该连接
		return c.Close(conn)
	}
}

// Close 关闭单条连接
func (c *channelPool) Close(conn interface{}) error {
	if conn == nil {
		return errors.New("connection is nil. rejecting")
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.close == nil {
		return nil
	}
	return c.close(conn)
}

// Ping 检查单条连接是否有效
func (c *channelPool) Ping(conn interface{}) error {
	if conn == nil {
		return errors.New("connection is nil. rejecting")
	}
	return c.ping(conn)
}

// Release 释放连接池中所有连接
func (c *channelPool) Release() {
	c.mu.Lock()
	conns := c.conns
	c.conns = nil
	c.factory = nil
	c.ping = nil
	closeFun := c.close
	c.close = nil
	c.mu.Unlock()

	if conns == nil {
		return
	}

	close(conns)
	for wrapConn := range conns {
		closeFun(wrapConn.conn)
	}
}

// Len 连接池中已有的连接
func (c *channelPool) Len() int {
	return len(c.getConns())
}
```

pooll.go

```go
package pool

import (
	"errors"
	"sync"
)

var (
	pools = &_pools{cache: make(map[string]Pool)}
	//ErrClosed 连接池已经关闭Error
	ErrClosed        = errors.New("pool is closed")
	ErrRegisterPool  = errors.New("register pool error")
	ErrGetConnection = errors.New("get connection error")
	ErrPutConnection = errors.New("put connection error")
)

// Pool 基本方法
type Pool interface {
	Get() (interface{}, error)

	Put(interface{}) error

	Close(interface{}) error

	Release()

	Len() int
}

type _pools struct {
	mux   sync.RWMutex
	cache map[string]Pool
}

// add pool with pool name.
func (m *_pools) add(name string, p Pool) (added bool) {
	m.mux.Lock()
	defer m.mux.Unlock()
	if _, ok := m.cache[name]; !ok {
		m.cache[name] = p
		added = true
	}
	return
}

// get pool if cached.
func (m *_pools) get(name string) (p Pool, ok bool) {
	m.mux.RLock()
	defer m.mux.RUnlock()
	p, ok = m.cache[name]
	return
}


```

pool_mgo.go

```go
package pool

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func RegisterMgoPool(poolName string, url string, params ...int) (err error) {
	//factory 创建连接的方法
	factory := func() (interface{}, error) {
		return mongo.Connect(context.Background(), options.Client().ApplyURI(url))
	}

	//close 关闭连接的方法
	close := func(v interface{}) error {
		return v.(*mongo.Client).Disconnect(context.Background())
	}

	//ping 检测连接的方法
	ping := func(v interface{}) error {
		return v.(*mongo.Client).Ping(context.Background(), readpref.Primary())
	}

	var (
		size int           = 5
		cap  int           = 20
		idle time.Duration = 30
	)

	for i, v := range params {
		switch i {
		case 0:
			size = v
		case 1:
			cap = v
		case 2:
			idle = time.Duration(v)
		}
	}

	//创建一个连接池： 初始化5，最大连接30
	poolConfig := &Config{
		InitialCap: size,
		MaxCap:     cap,
		Factory:    factory,
		Close:      close,
		Ping:       ping,
		//连接最大空闲时间，超过该时间的连接 将会关闭，可避免空闲时连接EOF，自动失效的问题
		IdleTimeout: idle * time.Second,
	}
	mgoPool, err := NewChannelPool(poolConfig)

	if !pools.add(poolName, mgoPool) {
		return ErrRegisterPool
	}
	return
}

func GetMgoClient(poolName string) (c *mongo.Client, err error) {
	if p, ok := pools.get(poolName); ok {
		v, err := p.Get()
		if err == nil {
			c = v.(*mongo.Client)
		}
		return c, err
	}
	return nil, ErrGetConnection
}
func PutMgoClient(poolName string, c *mongo.Client) (err error) {
	if p, ok := pools.get(poolName); ok {
		err = p.Put(c)
		return
	}
	return ErrPutConnection
}
```

#### 2.1.2 mogno

mongodb

```go
package mongodb

import (
	"conf"
	"context"
	"fmt"
	"infrastructure/db/pool"
	"infrastructure/log"
	"sync"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var instance *Mongodb
var once sync.Once

type Mongodb struct {
}

const (
	dbName = conf.DB_NAME
)

func (this *Mongodb) InsertOne(collection string, document interface{}) (string, error) {
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	result, err := client.Database(dbName).Collection(collection).InsertOne(context.Background(), document)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), err

}

func (this *Mongodb) InsertMany(collection string, documents []interface{}) ([]string, error) {
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	result, err := client.Database(dbName).Collection(collection).InsertMany(context.Background(), documents)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	var ids []string
	for _, id := range result.InsertedIDs {
		ids = append(ids, id.(primitive.ObjectID).Hex())
	}
	return ids, err
}

func (this *Mongodb) Update(collection string, condition interface{}, updateContent interface{}) error {
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	_, err := client.Database(dbName).Collection(collection).UpdateMany(context.Background(), condition, updateContent)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func (this *Mongodb) Delete(collection string, condition interface{}) error {
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	_, err := client.Database(dbName).Collection(collection).DeleteMany(context.Background(), condition)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func (this *Mongodb) Drop(collection string) error {
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	err := client.Database(dbName).Collection(collection).Drop(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func (this *Mongodb) Query(collection string, condition map[string]interface{}) ([]map[string]interface{}, error) {
	var docs []map[string]interface{}
	var ctx = context.Background()
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	cur, err := client.Database(dbName).Collection(collection).Find(ctx, condition)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer cur.Close(ctx)
	cur.All(ctx, &docs)
	for _, doc := range docs {
		doc["id"] = doc["_id"].(primitive.ObjectID).Hex()
		delete(doc, "_id")
	}
	return docs, err
}

func (this *Mongodb) QueryByPage(collection string, condition map[string]interface{}, projection map[string]interface{}, limit, skip int64) ([]map[string]interface{}, error) {
	findOptions := options.Find()
	findOptions.SetLimit(limit)
	findOptions.SetSkip(skip)
	findOptions.SetProjection(projection)
	var docs []map[string]interface{}
	var ctx = context.Background()
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	cur, err := client.Database(dbName).Collection(collection).Find(ctx, condition, findOptions)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer cur.Close(ctx)
	cur.All(ctx, &docs)
	for _, doc := range docs {
		doc["id"] = doc["_id"].(primitive.ObjectID).Hex()
		delete(doc, "_id")
	}
	return docs, err
}

func (this *Mongodb) Aggregate(collection string, pipeline interface{}) ([]map[string]interface{}, error) {
	var docs []map[string]interface{}
	var ctx = context.Background()
	client, _ := pool.GetMgoClient(dbName)
	defer pool.PutMgoClient(dbName, client)
	cur, err := client.Database(dbName).Collection(collection).Aggregate(ctx, pipeline)
	if nil != err {
		log.Fatal(err)
		return nil, err
	}
	defer cur.Close(ctx)
	cur.All(ctx, &docs)
	for _, doc := range docs {
		_, ok := doc["_id"]
		if !ok {
			break
		}
		doc["id"] = doc["_id"].(primitive.ObjectID).Hex()
		delete(doc, "_id")
	}
	return docs, err
}

func GetMongodbInstance() *Mongodb {
	once.Do(func() {
		var mongodbUrl string
		if conf.DB_UESERNAME == "" {
			mongodbUrl = fmt.Sprintf("mongodb://%s:%s/%s", conf.DB_IP, conf.DB_PORT, conf.DB_NAME)
		} else {
			mongodbUrl = fmt.Sprintf("mongodb://%s:%s@%s:%s/%s", conf.DB_UESERNAME, conf.DB_PASSWORD, conf.DB_IP, conf.DB_PORT, conf.DB_NAME)
		}
		if err := pool.RegisterMgoPool(dbName, mongodbUrl, conf.DBPOOL_INITSIZE, conf.DBPOOL_CAP, conf.DBPOOL_IDLETIME); err != nil {
			log.Fatal("pool register error, info:", err.Error())
		}
		instance = new(Mongodb)
	})
	return instance
}
```

#### 2.1.3 客户端

```go
package domain

import (
    "sync"
	"errors"
	"fmt"
	"infrastructure/db/mongodb"
	"infrastructure/log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var instance *domainRepository
var once sync.Once

const (
	collection = "domain"
)

type domainRepository struct {
	mongoClient *mongodb.Mongodb
}

func (this *domainRepository) Query(snapshotId string, dataBlockId string) ([]map[string]interface{}, error) {
	condition := bson.M{"snapshotId": snapshotId, "dataBlockId": dataBlockId}
	return this.mongoClient.Query(collection, condition)
}

func (this *domainRepository) Aggregate(pipeline interface{}) (data []map[string]interface{}, err error) {
	return this.mongoClient.Aggregate(collection, pipeline)
}

func (this *domainRepository) InsertMany(datas []interface{}) ([]string, error) {
	if len(datas) == 0 {
		return nil, nil
	}
	return this.mongoClient.InsertMany(collection, datas)
}

func (this *domainRepository) DeleteById(dbId string) error {
	id, err := primitive.ObjectIDFromHex(dbId)
	if err != nil {
		errInfo := fmt.Sprintf("id:%s 转objectId error, info:%s", dbId, err.Error())
		log.Fatal(errInfo)
		return errors.New(errInfo)
	}
	condition := bson.M{"_id": id}
	return this.mongoClient.Delete(collection, condition)
}

func GetRepositoryInstance() *domainRepository {
	once.Do(func() {
		instance = new(domainRepository)
		instance.mongoClient = mongodb.GetMongodbInstance()
	})
	return instance
}
```

#### 2.1.4 log

```go
package log

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"
)

const (
	info = iota
	warn
	error
	fatal
)

type Log struct {
	logLevel   int
	logChannel chan string
}

var (
	logObj      = Log{logLevel: error, logChannel: make(chan string, 1024)}
	levelMap    = make(map[string]int)
	levelStrMap = make(map[int]string)
)

func initLevelMap() {
	levelMap["fatal"] = fatal
	levelMap["error"] = error
	levelMap["warn"] = warn
	levelMap["info"] = info

	levelStrMap[fatal] = "fatal"
	levelStrMap[error] = "error"
	levelStrMap[warn] = "warn"
	levelStrMap[info] = "info"
}

func init() {
	initLevelMap()
}

func Fatal(v ...interface{}) {
	logObj.Fatal(v...)
}

func Error(v ...interface{}) {
	logObj.Error(v...)
}

func Warn(v ...interface{}) {
	logObj.Warn(v...)
}

func Info(v ...interface{}) {
	logObj.Info(v...)
}

func SetLogLevel(level string) {
	logObj.SetLogLevel(level)

}
func GetLogLevel() int {
	return logObj.GetLogLevel()
}

func RunLogFileThread() {
	logObj.RunLogFileThread()
}

func (self *Log) SetLogLevel(level string) {
	_, ok := levelMap[level]
	if ok {
		self.logLevel = levelMap[level]
		log.Println("logLevel has changed:" + level)
	} else {
		log.Println("loglevel is error")
	}

}
func (self *Log) GetLogLevel() int {
	return self.logLevel
}

func (self *Log) Fatal(v ...interface{}) {
	self.printWithCheckLevel(fatal, v...)
}

func (self *Log) Error(v ...interface{}) {
	self.printWithCheckLevel(error, v...)
}

func (self *Log) Warn(v ...interface{}) {
	self.printWithCheckLevel(warn, v...)
}

func (self *Log) Info(v ...interface{}) {
	self.printWithCheckLevel(info, v...)
}

func (self *Log) printWithCheckLevel(logLevel int, v ...interface{}) {
	if self.logLevel <= logLevel {
		log.Println(v...)
	}
	str := strings.TrimRight(strings.TrimPrefix(strings.TrimSpace(fmt.Sprintln(v)), "["), "]")
	self.logChannel <- "[" + levelStrMap[logLevel] + "] " + strings.TrimSpace(str) + "\n"
}

func (self *Log) WriteLogFile(log string) {
	checkDestDirectory("log")
	logFile, err := os.OpenFile("log/log_"+time.Now().Format("2006-01-02")+".txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("open log file failed!!!")
		return
	}
	logFile.WriteString(time.Now().Format("2006-01-02 15:04:05") + " " + log)
	logFile.Close()
}

func (self *Log) RunLogFileThread() {
	for {
		strlog := <-self.logChannel
		self.WriteLogFile(strlog)
	}
}

func checkDestDirectory(destDir string) {
	if !isDirExists(destDir) {
		err := os.Mkdir(destDir, 0777)
		if err != nil {
			fmt.Println("Create log directory fail, ", err.Error())
		}
	}
}

func isDirExists(destDir string) bool {
	fi, err := os.Stat(destDir)
	if err != nil {
		return os.IsExist(err)
	} else {
		return fi.IsDir()
	}
}
```

全局启动

```go
	go log.RunLogFileThread()
```

### 2.2 Mysql

