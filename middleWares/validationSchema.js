import { body } from "express-validator"
const validationSchema = () =>{ 
    return [
                        body('name')
                                .notEmpty()
                                .withMessage('name is required')
                                .isLength({min:3 , max : 15})
                                .withMessage('name most be 3-15 chractar'),
                        body('price')
                                .notEmpty()
                                .withMessage('price is required')
                                .isLength({min:2})
                                .withMessage('atleat 2 chars')
                            ]

}
export default validationSchema;