import * as Docker from 'dockerode'
import cfg from './config'
const docker = new Docker({socketPath: '/var/run/docker.sock'});

export async function getDockerData(){
	let list = await docker.listContainers()
	let data: IContainerData[] = []
	console.log("found ",list.length,"container(s)")
	// loop through all containers
	for (let i = 0; i < list.length; i++) {
		const conatiner = list[i];
		// check if container is running
		if(cfg.skipOfflineContainer &&
			conatiner.State!="running"){
				continue;
		}
		// array with alle ip addresses of this conatiner
		let nw = []
		Object.keys(conatiner.NetworkSettings.Networks).forEach(k=>{
			const a= conatiner.NetworkSettings.Networks[k].IPAddress
			if(a && a.length>3){
				nw.push(a)
			}
		})
		// get names of this container
		let names = conatiner.Names
		if(cfg.onlyFirstName){
			names=[conatiner.Names[0]]
		}
		names=names.map(n=>n.replace(/^\//,""))  // remove the leading / in the name
		data.push(<IContainerData>{
			names:names,
			ipv4:nw
		})
	}
	return data
}

export interface IContainerData{
	names:string[]
	ipv4:string[]
}