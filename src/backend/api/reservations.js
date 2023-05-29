const express = require("express");
const reservationsRouter = express.Router();
const knex = require("../database");

reservationsRouter.get("/", async (request, response) => {
    try {
      const allReservations = await knex("Reservation").select("*")
      if(!allReservations.length){
        response.status(404).json({ error: 'That shit doesn’t exist.' });
      }
      response.json(allReservations);
    } 
    catch (error) {
      res.status(500).json({
        error: 'Error while looking for the reservation'
      });
    }
  });
  
  reservationsRouter.get("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const idReservation = await knex("Reservation").select("*").where("id", '=', id);
      if(!idReservation.length){
        response.status(404).json({ error: 'That shit doesn’t exist' });
      }
      response.json(idReservation);
    } 
    catch (error) {
      res.status(500).json({
        error: 'Error while looking for the reservation'
      });
    }
  });
  
  reservationsRouter.post("/", async (request, response) => {
    try {
      await knex("Reservation").insert(request.body);
      response.status(201).json({messge: "Look Mum, I made a thing"});
    } 
    catch (error) {
      res.status(500).json({
        error: 'Error while creating the reservation'
      });
    }
  });
  
  reservationsRouter.put("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const idReservation = await knex("Reservation").where({ id: id }).update(request.body);
      if(idReservation){
        response.status(202).json({ messange: 'This shit changed' });
      }
    } 
    catch (error) {
      res.status(500).json({
        error: 'Error while updating the reservation'
      });
    }
  });
  
  reservationsRouter.delete("/:id", async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      await knex("Reservation").where({ id: id }).del();
      response.status(200).json({ messange: 'This shit deleted' });;
    } 
    catch (error) {
      res.status(500).json({
        error: 'Error while deleting the reservation'
      });
    }
  });
  

module.exports = reservationsRouter;
