const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");

mealsRouter.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select("*")
    if(!allMeals.length){
      response.status(404).json({ error: 'That shit doesn’t exist.' });
    }
    response.json(allMeals);
  } 
  catch (error) {
    throw error;
  }
});

mealsRouter.get("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const idMeal = await knex("Meal").select("*").where("id", '=', id);
    if(!idMeal.length){
      response.status(404).json({ error: 'That shit doesn’t exist' });
    }
    response.json(idMeal);
  } 
  catch (error) {
    throw error;
  }
});

mealsRouter.post("/", async (request, response) => {
  try {
    await knex("Meal").insert(request.body);
    response.status(201).json({messge: "Look Mum, I made a thing"});
  } 
  catch (error) {
    throw error;
  }
});

mealsRouter.put("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const idMeal = await knex("Meal").where({ id: id }).update(request.body);
    if(idMeal){
      response.status(202).json({ messange: 'This shit changed' });
    }
  } 
  catch (error) {
    throw error;
  }
});

mealsRouter.delete("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await knex("Meal").where({ id: id }).del();
    response.status(200).json({ messange: 'This shit deleted' });;
  } 
  catch (error) {
    throw error;
  }
});


module.exports = mealsRouter;
