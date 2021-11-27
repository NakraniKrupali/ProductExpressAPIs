const express = require("express");
const company = require("../company");
const product = require("../product");
const router = express.Router();
router.use(express.json());



router.get("/",(req,res) => {

    res.json({data:"Company Details"});

});


router.post("/addCompany",(req,res) => {

    const companyId = req.body.companyId;
    const name = req.body.name;
    const productId = req.body.productId;

    const companyRecord = company.filter((p)=>p.companyId === companyId);

    if(companyRecord.length === 0){
        company.push({companyId: companyId,name: name,productId: productId});
        return res.json({data:"Company added!"})
    } else {
        return res.json({data:"Company already exist!"})
    }
});

router.get("/list",(req,res) => {

    res.json({data: company});

});


router.get("/companyDetailProduct/:title",(req,res) => {

    const pname = req.params.title;
    const productRecord = product.filter((p)=>p.title === pname);

    if(productRecord.length === 0){
        return res.json({data:"Data Not Found!"});
    } else {
        const prodid = productRecord.productId;
        const comp = company.filter((p)=>p.productId === prodid);
        return res.json({data: productRecord})

    }
});


module.exports = router;