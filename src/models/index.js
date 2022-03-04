//this file responsable for preparing the connection btween my API server and SQL server
'use strict'
 //we cant use thw sequelize without pg so we install them (npm i pg sequelize) and then require as next line
const {Sequelize, DataTypes} = require('sequelize'); 
//prepare the connection you should add the DATABASE_URL in .env file

// here we say if we just testing then run on sqlite else connect with real postgress server we should instaall sqlite before npm i sqlite3
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL ;
// go to the terminal sqlstart then psql and creat data base( CREATE DATABASE NAME;)
const food=require('./food.js');
const clothes=require('./clothes.js');
require('dotenv').config();

// let sequelizeOptions={
//     // dialectOptions: {
//     //     ssl: {
//     //       require: true,
//     //       rejectUnauthorized: false,
//     //     }
//     //   }
// };
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }:{};

//create new obj with type sequelize
let sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);

module.exports = {
    db: sequelize, //for real connection and will use it in index.js
    food: food(sequelize,DataTypes),// for creating the table and will use it in our routes
    clothes: clothes(sequelize,DataTypes) //we call this function that is responsable to create table
}