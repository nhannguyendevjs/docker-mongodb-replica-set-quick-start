### Primary

```bash
docker run -d --network local-network -p 27017:27017 --name mongodb-replset-primary mongo:latest mongod --replSet repl-set

docker exec -it mongodb-replset-primary mongosh

config = {
  "_id" : "repl-set",
  "members" : [
    {
      "_id" : 0,
      "host" : "mongodb-replset-primary:27017"
    },
    {
      "_id" : 1,
      "host" : "mongodb-replset-secondary:27017"
    }
  ]
}

rs.initiate(config)
```

### Sencondaries

```bash
docker run -d --network local-network -p 27018:27017 --name mongodb-replset-secondary mongo:latest mongod --replSet repl-set

docker exec -it mongodb-replset-secondary mongosh
```

### Add hosts

```txt
# Docker Local MongoDB Replica Set
127.0.0.1 mongodb-replset-primary mongodb-replset-secondary
# End of section
```

### Inspect Network

```bash
docker network inspect local-network | grep 'mongodb-replset'
```

### Connection String

```txt
DATABASE_URL="mongodb://localhost:27017,localhost:27018/test?replicaSet=repl-set"
```
