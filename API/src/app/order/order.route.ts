import { orderController } from './order.controller';
import { onlyAdmin, onlyUser } from '../../types/globalTypes';
import { authenticate } from './../../middleware/authenticate.middleware';
import { Router } from 'express'


const orderRouter = Router()

orderRouter.post ('/', authenticate(onlyAdmin||onlyUser),orderController.create)
orderRouter.get(
    "/",
    authenticate(onlyAdmin),
    orderController.getAllOrders
);

orderRouter.get(
  "/",
  authenticate(onlyAdmin),
  orderController.getAllOrders
);

orderRouter.get(
    "/my-orders",
    authenticate(onlyUser),
    orderController.getMyOrders
);

//Get Order By ID (Admin)
orderRouter.get(
  "/:id",
  authenticate(onlyAdmin),
  orderController.getByID
);

// Delete Order (Admin)
orderRouter.delete(
  "/:id",
  authenticate(onlyAdmin || onlyUser),
  orderController.removeOrder
);

orderRouter.put('/:id', authenticate(onlyAdmin), orderController.updateOrder)





export default orderRouter