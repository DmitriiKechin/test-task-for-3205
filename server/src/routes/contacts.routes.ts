import { Router } from 'express';
import { contactsController } from '../controllers/contacts/contacts';
import { body } from 'express-validator';
import { cancelPreviousRequestMiddleware } from '../controllers/contacts/middleware/cancelPreviousRequestMiddleware';

const router = Router();

router.post(
  '',
  cancelPreviousRequestMiddleware,
  body('email').isEmail().withMessage('Не верный email'),
  body('number').optional()
    .isInt()
    .withMessage('Необходимо ввести число')
    .isLength({ min: 6, max: 6 })
    .withMessage('номер должен содержать 6 чисел'),
  contactsController.getContact
);

export default router;
