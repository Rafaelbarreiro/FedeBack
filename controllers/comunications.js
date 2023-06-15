const Comunications = require ('../models/Comunications')
const jsonAll = require ('../json/comunications.json')

const populateComunications = async () => {
    for (p of jsonAll){
       const comunications = new Comunications(p)
       await comunications.save()
    }
  }; 

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const getAllComunications = async (req, res, next) => {
    const {title} = req.query
    var allComunications = await Comunications.find({}, {projection});

    try {
        if(title){
            let comunicationByName = await allComunications.filter ( e => e.title.toLocaleLowerCase().includes(title.toLowerCase()));
            comunicationByName.length > 0
            ? res.status(200).json(comunicationByName[0])
            :res.status(404).json({message: "comunication not found"})
        }
        else{
            allComunications.length > 0
            ? res.status(200).json(allComunications)
            : res.status(404).json({message: "No Comunications"})
        }
    } catch (error) {
        console.log(error.message)
    }
    next();
}

const getComunicationById = async (req, res) => {
    const {id} = req.params;
    const comunication = await Comunications.findById(id, projection)
    res.status(200).json(comunication)
}

const deleteComunication = async (req, res) => {
    const id = req.params.id
    const info = {"status": "deleted"}
  
    const allComunications = await Comunications.findByIdAndUpdate(id, info, {
      returnOriginal: false
    })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete comunication with id=${id}. Maybe the comunication was not found!`
          });
        } else {
          res.send({
            message: "comunication was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete comunication with id=" + id
        })
      })
}

const postComunication = async (req, res) => {
    const comunication = new Comunications(req.body)
    try{
      const newcomunication = await comunication.save()
      res.status(201).json(newcomunication)
    }
    catch (error){
      console.log(error.message)
      res.status(404).json(error.message)
    }
}

module.exports = {
    populateComunications,
    getAllComunications,
    getComunicationById,
    postComunication,
    deleteComunication
}