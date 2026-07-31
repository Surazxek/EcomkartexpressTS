import {Router} from 'express'
import { wishlistController } from './wishlist.controller'
import { authenticate } from '../../middleware/authenticate.middleware'
import { onlyAdmin } from '../../types/globalTypes'

const wishListRouter = Router()

wishListRouter.post('/', authenticate(onlyAdmin) , wishlistController.createWishlist)

wishListRouter.delete('/', authenticate(onlyAdmin) , wishlistController.clearWishlist)

wishListRouter.get ('/', authenticate(onlyAdmin), wishlistController.getWishlist)

export default wishListRouter

