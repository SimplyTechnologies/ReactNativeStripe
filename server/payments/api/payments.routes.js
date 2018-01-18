import { Router } from 'express';
import * as paymentsHandler from './payments.handler';

export function init(api) {
    const router = Router();

    router.post('/pay-with-card', paymentsHandler.payWithCard);

    api.use('/payments', router);
}