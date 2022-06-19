import 'dotenv/config';
import mongoose from 'mongoose';
import log from '../log';

/* Change Network access ip address into 0.0.0.0/0 */
const connect = () => {
	const dbUri = process.env.DB_URI as string;
	return mongoose
		.connect(dbUri)
		.then(() => {
			log.info('Database connected');
		})
		.catch((error) => {
			log.error(error);
			process.exit(1);
		});
};

export default connect;
