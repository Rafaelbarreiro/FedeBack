const Donations = require('../models/Donations')
const {mercadopago} = require('../utils/mercadoPago');

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const postDonation = async (req, res) => {
    const donation = new Donations(req.body)

    try {
        const newDonation = await donation.save()

        res.status(201).json(newDonation)
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message)
    }
}

const getDonations = async (req, res) => {
    const {donor} = req.query;
    var allDonations = await Donations.find ({}, {projection})
    try {
        if(donor){
            const donationByDonor = allDonations.filter(e =>
                e.donor.includes(donor)
                );
              donationByDonor.length > 0
              ? res.status(200).json(donationByDonor)
              : res.status(404).json({message: "this user don't make any donation"}) 
        }
        else{
            allDonations.length > 0
            ? res.status(200).json(allDonations)
            : res.status(404).json({message: "No donations"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

/////////////////MERCADO PAGO////////////////
const PayDonation = async (req, res) => {
    const datos = req.body
    console.log(datos)
    let preference = {
        transaccion_amount: parseInt(datos.amount),
        items: [
            {
                unit_price: parseInt(datos.amount),
                quantity: 1,
                payer:{
                    email: datos.email
                }
            }
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
      res.status(200).json(response.body.init_point);
    })
.catch(function (error) {
    console.log(error.message);
  });
}

module.exports = {
    postDonation,
    getDonations,
    PayDonation
}