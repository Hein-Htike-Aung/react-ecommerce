import { cartRoute } from './cart/cart.routes';
import { authRoute, userRoute } from './user/user.routes';
import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import connect from './db/connect';
import log from './log';
import { productRoute } from './product/product.routes';
const cors = require('cors');

const port = process.env.PORT as unknown as number;
const host = process.env.HOST;

const app = express();

/* Middleware */
app.use(express());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());
app.use(cors());

app.listen(port, host, () => {
	log.info(`server listening at http://${host}:${port}`);

	connect();

	authRoute(app);
	userRoute(app);
	productRoute(app);
	cartRoute(app);
});
