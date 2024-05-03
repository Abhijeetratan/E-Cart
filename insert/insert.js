//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
let obj = {
"p_id": req.body.p_id,
"p_name": req.body.p_name,
"p_cost": req.body.p_cost,
"p_desc":req.body.p_desc,
"p_img": req.body.p_img
}
//connect to mongodb
mcl.connect(url, (err, conn) => {
if (err)
console.log('Error in connection:- ', err)
else {
let db = conn.db('nodedb')
db.collection('products').insertOne(obj,(err)=>{
if(err)
res.json({'insert':'Error '+err})
else{
console.log('Data inserted')
res.json({'insert':'Success'})
conn.close()
}
})
}
})
})


//Insert User
router.post("/createUser", (req, res) => {
    let obj = {
        "u_id": req.body.u_id,
        "u_name": req.body.u_name,
        "u_pwd": req.body.u_pwd,
        "u_email": req.body.u_email
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('login').insertOne(obj,(err)=>{
                if(err)
                    res.json({'UserInsert':'Error '+err})
                else{
                    console.log('User inserted')
                    res.json({'UserInsert':'Success'})
                    conn.close()
                }
            })
        }
    })
})

//insert product into cart
router.post("/cartInsert", (req, res) => {
    let obj = {
        "u_name" : req.body.u_name,
        "p_id" : req.body.p_id,
        "p_cost" : req.body.p_cost,
        "qty" : req.body.qty
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('cart').insertOne(obj,(err)=>{
                if(err)
                    res.json({'cartInsert':'Error '+err})
                else{
                    console.log('Product in cart inserted quantity:- ',obj.qty)
                    res.json({'cartInsert':'Success'})
                    conn.close()
                }
            })
        }
    })
})

//export router
module.exports = router