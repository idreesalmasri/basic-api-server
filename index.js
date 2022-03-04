'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const {db}=require('./src/models/index.js');
//in models/index.js we exports obj contain 3 thing db and food and clothers so i need so specifiy which one of them i need to require so i use {db}

db.sync().then(()=>{
    server.start(process.env.PORT || 3001);
})
// befor running our server we should firstly run the postgress sql server (sqlstart)and doing the real connection between our server and postgress server and then we can runing our server
//to connect to post gress server we used method (.sync()) 
//.then used to assure that we connect to postgress server firstly and the start my server
// after doing this and when we start our server it will creat tables for me