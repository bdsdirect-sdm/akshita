import Product from "../models/product.model"
import User from "../models/user.model"

export interface productInterface {
    user_id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    status: "Draft" | "Published"; 
    image: string;
  }


export const getProduct = async (req: any, res: any) => {
    const { id } = req.params.id;
    const product = await Product.findOne()
}

//send id as request.body
export const addProduct = async (req: any, res: any) => {
    try {
        console.log("BODY", req.body, req.files)
        const {
            user_id,
            name,
            category,
            quantity,
            price,
            status
        } = req.body
    
        const filesData: any = req.files;

        let productDetails: productInterface = {
            user_id,
            name,
            category,
            quantity,
            price,
            status,
            image: filesData.image[0].path,
        }
        const product = await Product.create(productDetails as any);
        return res.status(201).json({ product });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Error adding product" });
    }
}

export const editProduct = (req: Request, res: Response) => {

}

export const deleteProduct = (req: Request, res: Response) => {

}

//send id as request.body
export const productListing = async (req: any, res: any) => {
    console.log("HELLOOO")
    try {
        const { id } = req.params;
        console.log("Id", id)
        const products = await Product.findAll({
          where: {
            user_id: id,
          },
        });
        res.status(200).json(products);
      } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Error fetching products" });
    }
}