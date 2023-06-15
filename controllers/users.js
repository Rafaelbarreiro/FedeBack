const Users = require ('../models/Users');
const axios = require("axios");

const populateUser = async () => {
    const user = new Users({
      username: "fundacionFedeh",
      email: "fundacionFedehweb@gmail.com",
      isAdmin: "true"
    });
     await user.save()
  };

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }
  
const getUsers = async (req, res, next) => {
  const {username} = req.body;
  const allUsers = await Users.find({},{ projection })
    try {
      if(username){
        let userByName = await allUsers.filter(e =>
          e.username.toLowerCase().includes(username.toLowerCase())
          );
          userByName.length > 0
          ? res.json (userByName)
          : res.status(404).json({message: "User not found"});
      }else {
        allUsers.length > 0
        ? res.status(200).json(allUsers)
        : res.status(404).json({message: "There are no users"})
      }
    } catch (error) {
      res.status(400).json({ error: "No users found" });
      next()
    }
    next();
};

const postUser = async (req, res) => {
    const user = new Users(req.body)
    try {
      const newUser = await user.save()
     

      const userRegistered = newUser[0]
      console.log(newUser, 'newUser')
      if(newUser){
        axios.post(`${process.env.BACK_URL}/email/register`, {
          username: newUser.username,
          email: newUser.email,
          img: newUser.img,
          nickname: newUser.nickname
      })
      }
      res.status(201).json(newUser)
      }
    catch (error) {
      console.log(error.message)
      res.status(404).json(error.message);
    }  
  };

const getUserById = async (req, res) => {
  const {email} = req.params;
  const allUsers = await Users.find({},{ projection })
try {
  allUsers.forEach(el => {
    if(el.email === email){
      res.json({
        _id: el._id,
        username: el.username,
        email: el.email,
        status: el.status,
        isAdmin: el.isAdmin,
        img: el.img
      })
    }
  })
} catch (error) {
  
}
}
 
const updateUser = async (req, res) => {
  const id = req.params.id
  const data = req.body
  console.log(data)
  try {
    const userUpdate = await Users.findByIdAndUpdate(
    {_id : id},
    data, {
      new:true
    }
    )
    console.log(userUpdate)
    res.status(201).json(userUpdate)
    
  } catch (error) {
    console.log(error.message)
  } 
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  const info = {"status": "deleted"}

  const allUsers = await Users.findByIdAndUpdate(id, info, {
    returnOriginal: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe the User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      })
    })
}

module.exports = {
    populateUser,
    getUsers,
    postUser,
    getUserById,
    updateUser,
    deleteUser
}