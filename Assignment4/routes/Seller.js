const express = require("express");
const seller = require("../seller");
const product = require("../product");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {

    res.json({data:["Seller Details"]});

});

router.get("/sellerList",(req,res) => {

    res.json({data:seller});

});

router.post("/addSeller",(req,res) => {

    const sellId = req.body.sellerId;
    const name = req.body.name;
    const productId = req.body.productId;

    const sell = seller.filter((s)=>s.sellerId === sellId);
    if(sell.length === 0){
        seller.push({sellerId: sellId,name: name,productId: productId});
        return res.json({data:"seller added!"})
    } else {
        return res.json({data:"seller already exist!"})
    }
});

//fetch seller details based on product name
router.get("/sellerDetailProduct/:title",(req,res) => {

    const pname = req.params.title;
    const prod = product.filter((p)=>p.title === pname);

    if(prod.length === 0){
        return res.json({data:"Product not exist!"})
    } else {
        const pid = prod.productId;
        const sell = seller.filter((p)=>p.productId === parseInt(pid));
        return res.json({data:sell})
    }
});


module.exports = router;