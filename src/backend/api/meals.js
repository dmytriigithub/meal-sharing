const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");

//-------------------------------------------------------NodeJS-week2

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
    response.status(201).json({messange: "Look Mum, I made a thing"});
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Error while creating the meal'
    });
  }
});


mealsRouter.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select("*")
    if(!allMeals.length){
      response.status(404).json({ error: 'That shit doesn’t exist.' });
    }
    response.json(allMeals);
  } 
  catch (error) {
    res.status(500).json({
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
    }
    response.json(idMeal);
  } 
  catch (error) {
    res.status(500).json({
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
    res.status(500).json({
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
    }
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Error while updating the meal'
    });
  }
});

mealsRouter.delete("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await knex("Meal").where({ id: id }).del();
    response.status(200).send({ messange: 'This shit deleted' });;
  } 
  catch (error) {
    res.status(500).json({
      error: 'Error while deleting the meal'
    });
  }
});


//-------------------------------------------------------NodeJS-week3

mealsRouter.get("/", async (request, response) => {
  try {
    const q = request.query;
    const [keyQuery] = Object.keys(q);
    const [valueQuery] = Object.values(q);

    if(q) {
      switch (keyQuery) {

        case 'maxPrice': // Returns all meals that are cheaper than maxPrice
          const maxPrice = await knex("Meal").select("meal_title", "price").where("price", "<", +valueQuery);
          if (maxPrice.length){
            return response.json(maxPrice);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'availableReservations': // Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left.
          const availableReservations = await knex.select("meal_title", "status").from('Meal').where("status", "=", "available");
          const unavailableReservations = await knex.select("meal_title", "status").from('Meal').where("status", "=", "unavailable");
          if(valueQuery === 'true'){
            if (availableReservations.length){
              return response.json(availableReservations);
            }
            response.status(404).json({ error: 'Not Found' });     
          } else if(valueQuery === 'false'){
            if (unavailableReservations.length){
              return response.json(unavailableReservations);
            }
            response.status(404).json({ error: 'Not Found' });
          } else {
            response.status(404).json({ error: 'Not Found' });
          }
          break;

        case 'title': // Returns all meals that partially match the given title. Rød grød will match the meal with the title Rød grød med fløde
          const title = await knex("Meal").select("meal_title").where("meal_title", "like", `%${valueQuery}%`);
          if (title.length){
            return response.json(title);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'dateAfter': // Returns all meals where the date for when is after the given date.
          const dateAfter = await knex("Meal").select("meal_title", "date").where("date", ">", valueQuery);
          if (dateAfter.length){
            return response.json(dateAfter);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'dateBefore': // Returns all meals where the date for when is before the given date
          const dateBefore = await knex("Meal").select("meal_title", "date").where("date", "<", valueQuery);
          if (dateBefore.length){
            return response.json(dateBefore);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'limit': // Returns the given number of meals.
          const limit = await knex("Meal").select("*").limit(+valueQuery);
          if (limit.length){
            return response.json(limit);
          }
          response.status(404).json({ error: 'Not Found' });
          break;

        case 'sortKey': 
        // Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. Default sorting order is asc(ending).
        // Returns all meals sorted in the given direction. Only works combined with the sortKey and allows asc or desc.
          if (!q.sortDir && (valueQuery === "max_reservations" || valueQuery === "price")){
            const sortKey = await knex("Meal").select("meal_title", "max_reservations", "price").orderBy(valueQuery);
            return response.json(sortKey);
          } else if ((q.sortKey === "max_reservations" || q.sortKey === "price") && (q.sortDir === 'desc' || q.sortDir === 'asc')) {
            const sortDir = await knex("Meal").select("meal_title", "max_reservations", "price").orderBy(q.sortKey, q.sortDir);
            return response.json(sortDir);
          } else{
            response.status(404).json({ error: 'Not Found' });
          }
          break;
          
        default:
          const allMeals = await knex("Meal").select("*");
          response.json(allMeals);
      }     
    } 
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Error while looking for the meal'
    });
  }
});

module.exports = mealsRouter;
