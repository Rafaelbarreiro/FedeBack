const Events = require ('../models/Events')
const jsonAll = require ('../json/events.json')
const {mercadopago} = require('../utils/mercadoPago');

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
    const {_id} = req.params;
    const event = await Events.findById(_id, projection)
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
///////////////////////MERCADO PAGO/////////////
const PayEvent = async (req, res) => {
  const {_id} = req.params
  const datos = req.body
  const Event = await Events.findById(_id, projection)
 console.log(datos)
  let preference = {
    transaction_amount: parseInt(datos.amount*1.15), //sumo el 15% comision de ML
    items: [
      {
        id: Event._id,
        title: Event.title,
        unit_price: datos.amount,
        quantity: 1,
        payer:{
          email: datos.email,
          name: datos.nickname
        }
      },
    ],
    back_urls: {
      success: `${process.env.FRONT_URL}/ipayments/`,
      failure: `${process.env.FRONT_URL}/paymentsfail`,
      pending: `${process.env.FRONT_URL}/paymentspending`
    },
     auto_return: "approved" 
  };
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  //console.log(response)
  
    res.status(200).json(response.body.init_point);
  
  })
  .catch(function (error) {
    console.log(error.message);
  });
 }



module.exports = {
    populateEvents,
    getEvents,
    geteventById,
    deleteEvents,
    postEvents,
    PayEvent
}