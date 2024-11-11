import { Router } from 'express';
import { addProduct, deleteProduct, editProduct, getProduct, productListing } from '../controllers/product.controller';
import upload from '../middleware/multer.middleware';
import { JWT } from "../middleware/token"

const productRouter = Router();

// router.put("/product/:id", editProduct);
productRouter.get("/get-product/:id", getProduct);
productRouter.post("/add-product", JWT, upload.fields([
    {name: "image", maxCount: 1}, 
]), JWT, addProduct);
// router.put("/product/:id", deleteProduct)
productRouter.get("/products/:id", JWT, productListing)

export default productRouter;