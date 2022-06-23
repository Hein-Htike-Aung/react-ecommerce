import React, { useEffect, useMemo, useState } from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { userRequest } from '../../requestMethods';
import './home.css';

const Home = () => {
	const [userStats, setUserStats] = useState([]);

	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[],
	);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get(`/user/by-month/stats`);

				res.data.map((item) =>
					setUserStats((prev) => [
						...prev,
						{
							name: MONTHS[item._id - 1],
							'Active User': item.total,
						},
					]),
				);
			} catch (error) {}
		};

		getStats();
	}, [MONTHS]);

	return (
		<div className='home'>
			<FeaturedInfo />
			<Chart
				title='Users Analytics'
				grid
				data={userStats}
				dataKey='Active User'
			/>
			<div className='homeWidgets'>
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
};

export default Home;
