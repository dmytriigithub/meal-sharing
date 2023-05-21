const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");

mealsRouter.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select("*")
    if(!allMeals.length){
      response.status(404).json({ error: 'That shit doesn’t exist.' });
      return;
    }
    response.json(allMeals);
  } 
  catch (error) {
    response.status(500).json({
      error: 'Error while looking for the meal'
    });
  }
});

mealsRouter.get("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const idMeal = await knex("Meal").select("*").where("id", '=', id);
    if(!idMeal.length){
      response.status(404).json({ error: 'That shit doesn’t exist' });
      return;
    }
    response.json(idMeal);
  } 
  catch (error) {
    response.status(500).json({
      error: 'Error while looking for the meal'
    });
  }
});

mealsRouter.post("/", async (request, response) => {
  try {
    await knex("Meal").insert(request.body);
    response.status(201).json({messge: "Look Mum, I made a thing"});
  } 
  catch (error) {
    response.status(500).json({
      error: 'Error while looking for the meal'
    });
  }
});

mealsRouter.put("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const idMeal = await knex("Meal").where({ id: id }).update(request.body);
    if(idMeal){
      response.status(202).json({ messange: 'This shit changed' });
    } else {
      response.status(404).json({ error: 'That shit doesn’t exist' });
    }
  } 
  catch (error) {
    response.status(500).json({
      error: 'Error while updating the meal'
    });
  }
});

mealsRouter.delete("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await knex("Meal").where({ id: id }).del();
    response.status(200).json({ messange: 'This shit deleted' });;
  } 
  catch (error) {
    response.status(500).json({
      error: 'Error while deleting the meal'
    });
  }
});


module.exports = mealsRouter;
