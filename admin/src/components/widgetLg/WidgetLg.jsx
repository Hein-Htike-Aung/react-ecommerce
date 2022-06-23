import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './widgetLg.css';
import TimeAgo from 'react-timeago';

const WidgetLg = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userRequest.get(`order`);

				setOrders(res.data);
			} catch (error) {}
		};

		getUsers();
	}, []);

	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};

	return (
		<div className='widgetLg'>
			<h3 className='widgetLgTitle'>Latests transactions</h3>
			<table className='widgetLgTable'>
				<thead>
					<tr className='widgetLgTr'>
						<th className='widgetLgTh'>Customer</th>
						<th className='widgetLgTh'>Date</th>
						<th className='widgetLgTh'>Amount</th>
						<th className='widgetLgTh'>Status</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order._id} className='widgetLgTr'>
							<td className='widgetLgUser'>
								<span className='widgetLgName'>{order.userId}</span>
							</td>
							<td className='widgetLgDate'>
								<TimeAgo date={order.createdAt} />
							</td>
							<td className='widgetLgAmount'>$ {order.amount}</td>
							<td className='widgetLgStatus'>
								<Button type={order.status}></Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WidgetLg;
