### Docker MongoDB replica set quick start

##### Primary

```bash
docker run -d --network local-network -p 127.0.10.1:27017:27017 --name local-mongo mongo:latest mongod --replSet repl-set

docker exec -it local-mongo mongosh

config = { "_id" : "repl-set", "members" : [ { "_id" : 0, "host" : "local-mongo:27017" }, { "_id" : 1, "host" : "local-mongo-secondary:27017" } ] }

rs.initiate(config)
```

##### Secondary

```bash
docker run -d --network local-network -p 127.0.20.1:27017:27017 --name local-mongo-secondary mongo:latest mongod --replSet repl-set

docker exec -it local-mongo-secondary mongosh
```

##### Add Host

```txt
...
# MongoDB Replica Set
127.0.10.1 local-mongo
127.0.20.1 local-mongo-secondary
# End of section
```

#### URI

```txt
mongodb://local-mongo:27017,local-mongo-secondary:27018/test?replicaSet=repl-set
```
