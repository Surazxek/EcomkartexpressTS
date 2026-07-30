
import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";
import { cartController } from "./cart.controller";
import { onlyAdmin, onlyUser } from "../../types/globalTypes";

const cartRouter = Router();

// create Cart
cartRouter.post('/', authenticate(onlyAdmin), cartController.create)

cartRouter.post('/clear', authenticate(onlyAdmin), cartController.clearCart)

cartRouter.get("/", authenticate(onlyAdmin), cartController.getCart)


export default cartRouter;