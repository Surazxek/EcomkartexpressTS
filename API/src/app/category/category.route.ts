import { Router } from "express";
import { categoryController } from "./category.Controller";
import bodyValidator from "../../middleware/validatordto";
import { createCategoryDTO } from "./categoryDTO";
import { authenticate } from "../../middleware/authenticate.middleware";



const categoryRouter = Router()

//register Category

categoryRouter.post ('/', authenticate(), bodyValidator(createCategoryDTO), categoryController.create)

categoryRouter.get('/', authenticate(), categoryController.getAllCategories)

categoryRouter.get('/:id', categoryController.getCategorybyId)

categoryRouter.put('/:id', categoryController.updateCategory)

categoryRouter.delete('/:id', categoryController.deleteCategory)

export default categoryRouter;