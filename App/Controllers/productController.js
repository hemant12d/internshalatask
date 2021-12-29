const Product = require('../Models/Product');

const productController = {

    // Added prodect to database
    addProduct: async (req, res)=>{
    
    try{

        req.body._createdBy = req.user._id;

        const product = await Product.create(req.body);

        return res.status(200).json({
            status: "success",
            data:{
                product
            }
        })

    }
    catch(error){
        return res.status(404).json({
            status: 'fail',
            msg: error.message,
            errorStack: error.stack,
            error: error
        })
    }

    },

    // Get the list of all the products
    allProducts: async (req, res)=>{
        try{

            const products = await Product.find();

            return res.status(200).json({
                status: "success",
                totalResult: products.length,
                data:{
                    products
                }
            })

        }
        catch(error){
            return res.status(404).json({
                status: 'fail',
                msg: error.message,
                errorStack: error.stack,
                error: error
            })
        }
    }, 

    // Get particular single product
    getProduct: async (req, res)=>{
        try{

            const product = await Product.findById(req.params.id);

            return res.status(200).json({
                status: "success",
                data:{
                    product
                }
            })

        }
        catch(error){
            return res.status(404).json({
                status: 'fail',
                msg: error.message,
                errorStack: error.stack,
                error: error
            })
        }
    }

}

module.exports = productController;