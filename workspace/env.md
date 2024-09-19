
 ## 后端服务部署
> 本次考试已提供了后端服务镜像，执行下面的命令即可运行后端项目。同时，您需要按照接口文档的要求完成前端功能开发。

### 启动
>在`backend_server`目录下执行以下命令
```shell
$ docker-compose up -d

$ docker exec -it  comment_serve bash

$ cd comment 

$ composer install 
```
执行上述命令后，即可通过`http://localhost:8000`访问后端服务提供的接口。请确保本机的`8000`端口没有被占用。
