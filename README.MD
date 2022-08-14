# docker-names

This container adds the Names of all running docker contrainers to the hosts file of the docker host.


## Install
____

### use the container Registry
```bash
docker pull ghcr.io/nightwire/docker-names:latest
docker run -d \
	--name docker-names \
	-v /etc/hosts:/mnt/hosts \
	-v /var/run/docker.sock:/var/run/docker.sock \
	ghcr.io/nightwire/docker-names:master
```

OR

### use the container Registry via docker-compose
```bash
mkdir names
cd names
wget https://raw.githubusercontent.com/Nightwire/docker-names/master/docker-compose.yml
docker-compose up -d
```
OR

### build from source

```bash
git clone https://github.com/Nightwire/docker-names.git
cd docker-names
npm install
npm run build
docker build -t docker-names .
```
```bash
docker run -d \
	--name docker-names \
	-v /etc/hosts:/mnt/hosts \
	-v /var/run/docker.sock:/var/run/docker.sock \
	docker-names
```