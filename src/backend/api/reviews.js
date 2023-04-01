const express = require("express");
const reviewsRouter = express.Router();
const knex = require("../database");

reviewsRouter.get("/", async (request, response) => {
    try {
      const allReviews = await knex("Review").select("*")
      if(!allReviews.length){
        response.status(404).json({ error: 'Not Found' });
      }
      response.json(allReviews);
    } 
    catch (error) {
      throw error;
    }
  });
  
  reviewsRouter.get("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const idReview = await knex("Review").select("*").where("id", '=', id);
      if(!idReview.length){
        response.status(404).json({ error: 'Not Found' });
      }
      response.json(idReview);
    } 
    catch (error) {
      throw error;
    }
  });
  
  reviewsRouter.post("/", async (request, response) => {
    try {
      await knex("Review").insert(request.body);
      response.status(201).json({messange: "Look Mum, I made a thing"});
    } 
    catch (error) {
      throw error;
    }
  });
  
  reviewsRouter.put("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const idReview = await knex("Review").where({ id: id }).update(request.body);
      if(idReview){
        response.status(202).json({ messange: 'This shit changed' });
      }
    } 
    catch (error) {
      throw error;
    }
  });
  
  reviewsRouter.delete("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      await knex("Review").where({ id: id }).del();
      response.status(200).json({ messange: 'This shit deleted' });;
    } 
    catch (error) {
      throw error;
    }
  });
  

module.exports = reviewsRouter;
