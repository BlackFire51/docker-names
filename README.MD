# docker-names

This container adds the IPs of all running docker contrainers to the hosts list of the docker host.


## Install
____
clone the repo and build the container

```bash
git clone https://github.com/BlackFire51/docker-names.git
cd docker-names
npm install
npm run build
docker build -t docker-names .
```

Start the container
```bash
docker run -d \
	--name docker-names \
	-v /etc/hosts:/mnt/hosts \
	-v /var/run/docker.sock:/var/run/docker.sock \
	docker-names
```