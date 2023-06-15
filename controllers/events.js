const Events = require ('../models/Events')
const jsonAll = require ('../json/events.json')

const populateEvents = async () => {
    for (p of jsonAll){
       const event = new Events(p)
       await event.save()
    }
  };  

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const getEvents = async (req, res, next) => {
    const {title} = req.query;
    var allEvents = await Events.find({}, {projection});
    
    try {
      if(title){
        let eventByName = await allEvents.filter(e =>
          e.title.toLowerCase().includes(title.toLowerCase())
          );
          eventByName.length > 0
          ? res.status(200).json(eventByName[0])
          : res.status(404).json({message: "event not found"});
      }
        else {
          allEvents.length > 0
          ? res.status(200).json(allEvents)
          : res.status(404).json({message: "No Events"})
        }
      
    } catch (error) {
      console.log(error.message)
    }
    next();
};
const geteventById = async (req, res) => {
    const {id} = req.params;
    const event = await Events.findById(id, projection)
    res.status(200).json(event)
}
const deleteEvents = async (req, res) => {
    const id = req.params.id
    const info = {"status": "deleted"}
  
    const allEvents = await Events.findByIdAndUpdate(id, info, {
      returnOriginal: false
    })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete event with id=${id}. Maybe the event was not found!`
          });
        } else {
          res.send({
            message: "event was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete event with id=" + id
        })
      })
}

const postEvents = async (req, res) => {
    const event = new Events(req.body)
    try{
      const newevent = await event.save()
      res.status(201).json(newevent)
    }
    catch (error){
      console.log(error.message)
      res.status(404).json(error.message)
    }
}

module.exports = {
    populateEvents,
    getEvents,
    geteventById,
    deleteEvents,
    postEvents
}