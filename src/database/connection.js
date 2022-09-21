import mongoose from 'mongoose'
import config from '../config/index.js'
import databaseTest from './databaseTest.js'

const databaseUrlConnection = `mongodb+srv://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}/${config.databaseName}?retryWrites=true&w=majority`

mongoose.createConnection = () => {
  if (!mongoose.connection.readyState) {
    return mongoose.connect(databaseUrlConnection)
      .then(() => {
        console.log('Connected to MongoDB')
        databaseTest()
      })
      .catch(() => setTimeout(mongoose.createConnection, 3000))
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected...')
  return setTimeout(mongoose.createConnection, 10000)
})

export default mongoose
