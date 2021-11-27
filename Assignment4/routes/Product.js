const express = require("express");
const product = require("../product");
const router = express.Router();
router.use(express.json());



router.get("/",(req,res) => {

    res.json({data:["Product Details"]});

});

router.get("/productList",(req,res) => {

    res.json({data:product});

});


router.get("/retriveSeller/:sid",(req,res) => {
    const sid = req.params.sid;
    const prod = product.filter((p)=>p.sellerId === parseInt(sid));

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        return res.json({data: prod})
    }
});

router.get("/retriveCompony/:cid",(req,res) => {
    const sid = req.params.cid;
    const prod = product.filter((p) => p.sellerId === parseInt(sid));

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        return res.json({data: prod})
    }
});

router.post("/addProduct",(req,res) => {

    const prodId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const companyId = req.body.companyId;
    const sellerId = req.body.sellerId;

    const p = { productId: prodId,title: title,price: price,category: category,companyId: companyId,sellerId: sellerId} 
        product.push(p);
        return res.json(p)
    
});

module.exports = router;