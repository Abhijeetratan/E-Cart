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
router.get("/",(req, res)=>{
//connect to mongodb
mcl.connect(url,(err,conn)=>{
if(err)
console.log('Error in connection:- ',err)
else{
let db = conn.db("nodedb")
db.collection('products').find().toArray((err, array)=>{
if(err)
console.log(err)
else{
console.log('Data sent')
res.json(array)
conn.close()
}
})
}
})
})

//User login Authentication
router.post("/login", (req, res) => {
    //connect to mongodb
    let u_name = req.body.u_name
    let u_pwd = req.body.u_pwd
    let obj = { u_name, u_pwd }    
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("nodedb")
            db.collection('login').find().toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                        res.json({ 'auth': 'success', 'user': u_name })
                    else
                        res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
            })
        }
    })
})

//Fetch cart data
router.post("/fetchCart", (req, res) => {
    //connect to mongodb
    let u_name = req.body.u_name
    let obj = { u_name }    
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("nodedb")
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart for ${obj.u_name} sent`)
                }
                conn.close()
            })
        }
    })
})

//export router
module.exports = router
