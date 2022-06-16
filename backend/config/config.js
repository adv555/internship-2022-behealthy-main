module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    dialect: 'postgres',

    jwtAcces: process.env.JWT_ACCESS_SECRET,
    jwtRefresh: process.env.JWT_REFRESH_SECRET,

    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
  },
};
