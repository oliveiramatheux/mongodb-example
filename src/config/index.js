const {
  APP_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env

export default {
  applicationPort: APP_PORT,
  databaseHost: DB_HOST,
  databaseUser: DB_USER,
  databasePassword: DB_PASSWORD,
  databaseName: DB_NAME
}
