'use strict';

const express = require('express');
const {food} = require('../models/index');
const router = express.Router();


router.post('/food',createFood);
router.get('/food',getFood);
router.get('/food/:id',getOneFood);
router.put('/food/:id',updateOneFood);
router.delete('/food/:id',deleteOneFood);
// localhost:3000/food (body:{firstName:'razan',lastName:'quran'})
async function createFood(req,res) {
    let newFood = req.body;
    let dish = await food.create(newFood);
    res.status(201).json(dish);
}
async function getFood(req,res) {
    let Food = await food.findAll();
    res.status(200).json(Food);
}
async function getOneFood(req,res) {
    let pid = parseInt(req.params.id);
    let dish = await food.findOne({where:{id:pid}})
    res.status(200).json(dish);
}
async function updateOneFood(req,res) {
    let updatedFood = req.body;
    let pid = parseInt(req.params.id);
    let dish = await food.update(updatedFood,{returning: true,where:{id:pid}});
    // let updateThisEle = await food.findOne({where:{id:pid}});
    // let dish = await updateThisEle.update(updatedFood);
    res.status(201).json(dish);
}
async function deleteOneFood(req,res) {
    let pid = parseInt(req.params.id);
    let dish = await food.destroy({where:{id:pid}});
    res.status(204).json(dish);
}
module.exports = router;