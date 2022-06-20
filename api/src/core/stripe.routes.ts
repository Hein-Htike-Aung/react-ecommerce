import { Express } from 'express';
import { Request, Response } from 'express';

const stripe = require('stripe')(process.env.STRIPE_KEY);

export const stripeRoute = (app: Express) => {
	app.post('/payment', (req: Request, res: Response) => {
		stripe.charges.create(
			{
				source: req.body.tokenId,
				amount: req.body.amount,
				currency: 'usd',
			},
			(stripeErr: any, stripeRes: any) => {
				if (stripeErr) {
					res.status(500).json({ error: stripeErr });
				} else {
					res.status(200).json(stripeRes);
				}
			},
		);
	});
};
