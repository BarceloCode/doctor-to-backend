const SalesModel = require("../models/SalesModel");
const CashModel = require("../models/CashClose");
const ProductsModel = require("../models/ProductsModel");
const moment = require("moment");
const mongoose = require("mongoose");

async function create(req, res){
    try{
        const treatment = req.body.treatment;
        const products = req.body.products;

        const totalTratamientos = treatment.reduce(( total, treatment ) => total + treatment.price, 0);
        const totalProductos = products.reduce((total, product ) => total + product.cost, 0);
        const total = totalTratamientos + totalProductos;
        const iva = total * 0.16;
        const totalIva = total + iva;

        const Sales = await SalesModel.create({
            cosmetologist: req.body.cosmetologist,
            treatment: treatment,
            products: products,
            total: total,
            totaliva: totalIva
        })
        if(Sales) return { message: "Sales note: ", result: Sales }                   
    }catch(error){
        return {
            message: "Internal server error!: " + error
        }
    }
}

async function retrieve(req, res){
    try {
        await SalesModel.find({cosmetologist: req.body.cosmetologist})
        .populate({
            path: 'cosmetologist',
            select: { _id: 0, name: 1}
        })
        .then((result) => {
            res.json({
                message: "Doctor sales",
                result: result
            })
        })        
    } catch (error) {
        return {
            message: "Internal server error!: " + error
        }
    }
}

async function cashregister (req, res){
    try {        
        const productId = req.body.productId;
        const productsExists = await ProductsModel.findOne({_id: productId});
        console.log(productsExists);
        const cosmetelogist = req.body.cosmetologist;        
        const Corte = await SalesModel.aggregate([ 
            { $match: { 
                cosmetologist: mongoose.Types.ObjectId(cosmetelogist),                 
            } },
            { $group: {
                _id: null,                
                total: { $sum: '$totaliva'},
            },
          } 
        ])       
        if(Corte.length === 0){
            return {
                message: "No hay documentos"
            }
        }
        res.json({
            message: "Total Sales: ",
            result: Corte[0].total
        })
    } catch (error) {
        return {
            message: "Internal server error: " + error
        }
    }
}

async function cashclose (req, res){
    
}





module.exports = { create, retrieve, cashregister }