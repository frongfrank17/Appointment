module.exports= {
    setting : {
        datebase : {
            host : process.env.DATABASE_HOST ,
            port : process.env.DATABASE_PORT ,
            database_name : process.env.DATABASE_NAME ,
            username : process.env.DATABASE_USERNAME ,
            password : process.env.DATABASE_PASSWORD ,
        } ,
        redis : {
            REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
            REDIS_PORT: process.env.REDIS_PORT || 6379,
            REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
        }  ,
        Authorization: {
            ACC_JWT_KEY : process.env.ACC_JWT_KEY ,
            REFR_JWT_KEY : process.env.REFR_JWT_KEY ,
            ACC_KEY_T : process.env.ACC_KEY_T ,
            REFR_KEY_T : process.env.REFR_KEY_T ,
        } ,
        External : {
            API_USERS : process.env.API_USERS
        } 
    } ,
    port : process.env.PORT || 3001,
    application_name : process.env.APP_NAME ,
    node_env : process.env.NODE_ENV || "development"
}