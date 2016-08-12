# Blog

Quick blog project

To use:

* Copy secrets.list.dist to secrets.list, and modify env variables appropriately
* Do the same for mysql.list.dist

## Developing

### Docker

#### Using docker-compose
Build and run the app on port 3099

* `docker-compose -f dev-compose.yml up`

Note: first time running with dev-compose.yml will require npm install from another shell attached to this container, e.g. `docker exec -it app_app_1 bash` `npm install`

#### Using plain docker

* `docker build -t app ./`
* `docker run --it -rm -v $(pwd):/var/www -p 3000:80 app` #runs on host port 3000

### Custom local Node.js installation
Run `npm start` in the root of the repository

## Deploying

### Docker

#### Using docker-compose
Build and run the app on port 80

* `docker-compose up`

#### Using plain docker
* `docker build -t app ./`
* `docker run -d -p 80:80 app`
