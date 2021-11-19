import {getDockerData} from './docker'
import {promises as fs} from 'fs'

const FILE_HEADER='################ BEGIN DOCKER-NAMES ####'
const FILE_FOOTER='################ END   DOCKER-NAMES ####'
let lastPayload=""
async function writeToHostsFile() {
	// read hosts file
	let data = await fs.readFile("/mnt/hosts")
	let str = data.toString("utf8")
	let before =str
	let after = ""
	// check if file is allready moded
	if(str.includes(FILE_HEADER) && str.includes(FILE_FOOTER)){
		// find start of our block
		let idx = str.indexOf(FILE_HEADER)
		if(idx>0){
			before=str.substr(0,idx) // remember all BEFOR this block
		}
		//#########################
		// find end of block
		idx = str.indexOf(FILE_FOOTER)
		if(idx>0){
			after=str.substr(idx+FILE_FOOTER.length).trimStart() // remember everything after the block
		}
	}else{
		// file is vanilla .. so everything is befor our block
		before=str
	}
	// query docker and prepare string
	let payload = await prepareData()
	if(payload == lastPayload) { // if we have no changes we do not need to write something
		return 
	}
	lastPayload=payload
	// write new hosts file
	fs.writeFile("/mnt/hosts",
		before.trimEnd()+"\n"+
		FILE_HEADER+"\n"+
		payload+"\n"+
		FILE_FOOTER+"\n"+
		after
	)
}

async function prepareData() {
	let data = await getDockerData()
	let str=""
	data.forEach(c=>{
		let names= c.names.filter(n=>n!="localhost").join(" ") // filer localhost (sanity check) and formate all names for hosts file
		c.ipv4.forEach(ip=>{
			str+=`${ip}\t${names}\n` // add new line to our block for each IP of the container
		})
	})
	return str.trimEnd()
}

writeToHostsFile() // exec on start
setInterval(writeToHostsFile,1000*60*5) // exec every 5 min