import React, { useEffect, useState } from 'react';
import './featuredInfo.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { userRequest } from '../../requestMethods';

const FeaturedInfo = () => {
	const [income, setIncome] = useState([]);
	const [perc, setPerc] = useState(0);

	useEffect(() => {
		const getIcomes = async () => {
			const res = await userRequest.get(`/order/monthly/income`);

			setIncome(res.data);
			// Compare Latest Month incomes with previous month by percentage
			setPerc(
				(res.data[res.data.length - 1].total * 100) /
					res.data[res.data.length - 2].total -
					100,
			);
		};

		getIcomes();
	}, []);

	return (
		<div className='featured'>
			<div className='featuredItem'>
				<span className='featuredTitle'>Revanue</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>
						$ {income[income.length - 1]?.total}
					</span>
					<span className='featuredMoneyRate'>
						{Math.floor(perc)} %
						{perc < 0 ? (
							<ArrowDownwardIcon className='featuredIcon negative' />
						) : (
							<ArrowUpwardIcon className='featuredIcon' />
						)}
					</span>
				</div>
				<div className='span featuredSub'>Compared to last month</div>
			</div>

			<div className='featuredItem'>
				<span className='featuredTitle'>Sales</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>$4, 415</span>
					<span className='featuredMoneyRate'>
						-1.4 <ArrowDownwardIcon className='featuredIcon negative' />
					</span>
				</div>
				<div className='span featuredSub'>Compared to last month</div>
			</div>

			<div className='featuredItem'>
				<span className='featuredTitle'>Cost</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>$2, 3315</span>
					<span className='featuredMoneyRate'>
						+1.4 <ArrowUpwardIcon className='featuredIcon' />
					</span>
				</div>
				<span className='featuredSub'>Compared to last month</span>
			</div>
		</div>
	);
};

export default FeaturedInfo;
