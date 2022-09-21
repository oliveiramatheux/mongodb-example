import 'dotenv/config'
import server from './server.js'
import { database } from './database/index.js'
import config from './config/index.js'

const serverPort = Number(config.applicationPort) || 8080

database.createConnection()

server.listen(serverPort, () => console.log(`Server up, listening on ${serverPort}`))
