const express = require("express");
const reservationsRouter = express.Router();
const knex = require("../database");

reservationsRouter.get("/", async (request, response) => {
    try {
      const allReservations = await knex("Reservation").select("*")
      if(!allReservations.length){
        response.status(404).json({ error: 'That shit doesn’t exist.' });
        return;
      }
      response.json(allReservations);
    } 
    catch (error) {
      response.status(500).json({
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
        return;
      }
      response.json(idReservation);
    } 
    catch (error) {
      response.status(500).json({
        error: 'Error while looking for the reservation'
      });
    }
  });
  
  reservationsRouter.post("/", async (request, response) => {
    try {
      await knex("Reservation").insert(request.body);
      response.status(201).json({messange: "Look Mum, I made a thing"});
    } 
    catch (error) {
      response.status(500).json({
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
      } else {
        response.status(404).json({ error: 'That shit doesn’t exist' });
      }
    } 
    catch (error) {
      response.status(500).json({
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
      response.status(500).json({
        error: 'Error while deleting the reservation'
      });
    }
  });
  

module.exports = reservationsRouter;
