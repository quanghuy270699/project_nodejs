# VND NodeJS Restful Backend Template with NestJS

## Quick Start
### 1. Prereqisites
```
* Nodejs >= 14.17.1
* Yarn >= 1.22.5
* Nestjs cli (https://nestjs.com/)
* MySQL >= 8.0
```

### 2. Clone this repository then install dependencies
```
* npm install & nest update
or
* yarn
```

### 3. Create .env file
MySQL
```
DB_TYPE=[database_type]
DB_HOST=[database_host]
DB_PORT=[database_port]
DB_USERNAME=[database_username]
DB_PASSWORD=[database_password]
DB_NAME=[database_name]
```
Redis
```
REDIS_HOST=[redis_host]
REDIS_PORT=[redis_port]
REDIS_DB=[redis_db]
REDIS_PASSWORD=[redis_password]
REDIS_KEY_PRIFIX=[redis_key_prefix]
```

API
```
API_PORT=[API_port]
API_KEY=[API_key]
API_SECRET=[API_secret]
JWT_SECRET=[jwt_secret]
```
### 4. Start server 
#### 4.1 NPM
```     
* npm start:dev
* npm start:stag
* npm start:prod
```
#### 4.2 Yarn
```
* yarn start:dev
* yarn start:stag
* yarn start:prod
```