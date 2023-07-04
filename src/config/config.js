//cargamos las variables de entorno declaradas en el archivo .env, especificando la ubicación del archivo partiendo desde la raíz del proyecto, solo si está en un entorno de desarrollo
if(process.env.NODE_ENV !== 'environment') require('dotenv').config({ path: './src/config/.env'});

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    secret: process.env.SECRET,
    recoverySecret: process.env.RECOVERY_SECRET,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    frontUri: process.env.FRONT_URI
}

config.dbUrl = process.env.DATABASE_URL || `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {config};