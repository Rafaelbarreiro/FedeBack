const mongoose = require('mongoose');
require('dotenv').config()


const conectarDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connection =  await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conected in : ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
  }
  
/*   mongoose.connect('mongodb://127.0.0.1:27017/fundacionfedeh',
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
    ); */

  module.exports = {
    conectarDB
  }
//export default conectarDB;