/**
 * Defines system configurations
 */
 export enum Configuration {
    DB_TYPE = 'DB_TYPE',  
    DB_HOST = 'DB_HOST',
    DB_PORT = 'DB_PORT',
    DB_USERNAME = 'DB_USERNAME',
    DB_PASSWORD = 'DB_PASSWORD',
    DB_NAME = 'DB_NAME',
    // Redis
    REDIS_HOST = 'REDIS_HOST',
    REDIS_PORT = 'REDIS_PORT',
    REDIS_DB = 'REDIS_DB',
    REDIS_PASSWORD = 'REDIS_PASSWORD',
    REDIS_KEY_PRIFIX = 'REDIS_KEY_PRIFIX',
    CACHE_TTL = 'CACHE_TTL',
    // API
    API_PORT = 'API_PORT',
    API_KEY = 'API_KEY',
    API_SECRET = 'API_SECRET',
    
    // JWT
    JWT_SECRET = 'JWT_SECRET',
    AWS_ACCESS_KEY_ID           = 'AWS_ACCESS_KEY_ID',
    AWS_SECRET_ACCESS_KEY       = 'AWS_SECRET_ACCESS_KEY',
    AWS_BUCKET_REGION_NAME      = 'AWS_BUCKET_REGION_NAME',
    BUCKET_NAME                 = 'BUCKET_NAME',
  }
  