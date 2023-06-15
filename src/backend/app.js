const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reviewsRouter = require("./api/reviews");

const reservationsRouter = require("./api/reservations");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reviews", reviewsRouter);
router.use("/reservations", reservationsRouter);

//-------------------------------------------------------------

const knex = require("./database");


router.get("/all-meals", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select("*").orderBy('id', 'desc');
    response.json(allMeals);
  } 
  catch (error) {
    throw error;
  }
});

router.get("/future-meals", async (request, response) => {
  try {
    const futureMeals = await knex("Meal").select("*").where("created_date", '>=', '2023-01-01');
    response.json(futureMeals);
  } 
  catch (error) {
    throw error;
  }
});

router.get("/past-meals", async (request, response) => {
  try {
    const pastMeals = await knex("Meal").select("*").where("created_date", '<=', '2023-01-01');
    response.json(pastMeals);
  } 
  catch (error) {
    throw error;
  }
});

router.get("/last-meals", async (request, response) => {
  try {
    const maxIdQuery = await knex('Meal').max('id as maxId');
    const lastMeals = await knex("Meal").select("*").where("id", maxIdQuery[0].maxId);
    if (lastMeals.length === 0) {
      response.status(404).end("Not Found Meals");
    } else {
      response.json(lastMeals);
    }
  } 
  catch (error) {
    throw error;
  }
});

router.get("/first-meals", async (request, response) => {
  try {
    const minIdQuery = await knex('Meal').min('id as minId');
    const firstMeals = await knex("Meal").select("*").where("id", minIdQuery[0].minId);
    if (firstMeals.length === 0) {
      response.status(404).end("Not Found Meals");
    } else {
      response.json(firstMeals);
    }
  }
  catch (error) {
    throw error;
  }
});

//------------------------------------------------------------------

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
