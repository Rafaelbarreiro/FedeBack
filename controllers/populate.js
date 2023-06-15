//const { populateUser } = require("./users");
const {populateArticles} = require("./articles")
const {populateComunications} = require ("./comunications")
const {populateEvents} = require ("./events")

const Events = require('../models/Events');


const populateDB = async (req, res) => {
    try {
      const count = await Events.find();
      if (count.length === 0) {
        //await populateUser();
        //await populateArticles();
        await populateComunications();
        await populateEvents()

        return res.status(200).send("Database populated");
      }
      res.status(200).send("Database already populated");
    } catch (error) {
      console.log('error')
      res.status(400).send(error.message);
    }
  }
  
  
  module.exports = { populateDB };