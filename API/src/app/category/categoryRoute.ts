import { Router } from "express";
import { categoryController } from "./category.Controller";
import bodyValidator from "../../middleware/validatordto";
import { createCategoryDTO } from "./categoryDTO";


const categoryRouter = Router()

//register Category

categoryRouter.post ('/', bodyValidator(createCategoryDTO), categoryController.create)

categoryRouter.get('/', categoryController.getAllCategories)

categoryRouter.get('/:id', categoryController.getCategorybyId)

categoryRouter.put('/:id', categoryController.updateCategory)

categoryRouter.delete('/:id', categoryController.deleteCategory)

export default categoryRouter;