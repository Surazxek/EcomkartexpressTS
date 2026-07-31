import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";
import { productController } from "./product.controller";
import { onlyAdmin } from "../../types/globalTypes";
import uploader from "../../middleware/UploaderMiddleware";

const productRouter = Router();

//create Product

productRouter.post(
  "/",
  authenticate(onlyAdmin),
  uploader().fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  productController.create,
);

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

// productRouter.put(
//   "/:id",
//   authenticate(onlyAdmin),
//   uploader().fields([
//     { name: "coverImage", maxCount: 1 },
//     { name: "images", maxCount: 5 },
//   ]),
//   productController.updateProduct,
// );

productRouter.delete(
  "/:id",
  authenticate(onlyAdmin),
  productController.deleteProduct,
);

export default productRouter;
