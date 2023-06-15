const Articles = require ('../models/Articles')
const jsonAll = require ('../json/articles.json');
const {mercadopago} = require('../utils/mercadoPago');

const populateArticles = async () => {
    for (p of jsonAll){
       const article = new Articles(p)
       await article.save()
    }
  };  

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const getArticles = async (req, res, next) => {
  const {title, category, autor} = req.query;
  var allArticles = await Articles.find({}, {projection});
  

  try {
    if(title){
      let articleByName = await allArticles.filter(e =>
        e.title.toLowerCase().includes(title.toLowerCase())
        );
        articleByName.length > 0
        ? res.status(200).json(articleByName[0])
        : res.status(404).json({message: "article not found"});
    }
      else if(category){
        const articleByCategory = await Articles.find({ category: { $in: [`${category}`] } }, { projection })
        res.status(200).json(articleByCategory)
        
      }
      else if(autor){
        const byAutor = await Articles.find ({ autor: {$eq: `${autor}` }} );
        res.status(200).json(byAutor)
      } 
      else {
        allArticles.length > 0
        ? res.status(200).json(allArticles)
        : res.status(404).json({message: "No Articles"})
      }
    
  } catch (error) {
    console.log(error.message)
  }
  next();
};

const getarticleById = async (req, res) => {
  const {id} = req.params;
  const article = await Articles.findById(id, projection)
  res.status(200).json(article)
}

const updateArticles = async (req, res) => { 
  const title = req.query.title
  const data = req.body
 //console.log(data)
  var allArticles = await Articles.find({}, {projection});
  try {
    let articleByName = allArticles.filter(e =>
      e.title.toLowerCase().includes(title.toLowerCase())
      );
      
      const forUpdateArticles = await Articles.findByIdAndUpdate(
        {_id : articleByName[0]._id} , 
        data, {
        new: true
      })
      console.log(forUpdateArticles)
     res.json(forUpdateArticles)
  } catch (error) {
    console.log(err.message)
  }
}

const deleteArticles = async (req, res) => {
  const id = req.params.id
  const info = {"status": "deleted"}

  const allArticles = await Articles.findByIdAndUpdate(id, info, {
    returnOriginal: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete article with id=${id}. Maybe the article was not found!`
        });
      } else {
        res.send({
          message: "article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete article with id=" + id
      })
    })

}

const postArticles = async (req, res) => {
  const article = new Articles(req.body)
  try{
    const newarticle = await article.save()
    res.status(201).json(newarticle)
  }
  catch (error){
    console.log(error.message)
    res.status(404).json(error.message)
  }
}
/////////////////////mercado pago////////////////
const Payarticle = async (req, res) => {
  const {id} = req.params
  const datos = req.body
  const article = await Articles.findById(id, projection)
 console.log(datos)
  let preference = {
    transaction_amount: parseInt(datos.amount*1.15), //sumo el 15% comision de ML
    items: [
      {
        id: article._id,
        title: article.title,
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
    populateArticles,
    getArticles,
    getarticleById,
    postArticles, 
    updateArticles, 
    deleteArticles,
    Payarticle
}