import React, { useEffect, useState } from 'react';
import './widgetSm.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userRequest } from '../../requestMethods';

const WidgetSm = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userRequest.get(`user?new=${5}`);

				setUsers(res.data);
			} catch (error) {}
		};

		getUsers();
	}, []);

	return (
		<div className='widgetSm'>
			<span className='widgetSmTitle'>New Join Members</span>
			<ul className='widgetSmList'>
				{users.map((user) => (
					<li key={user._id} className='widgetSmListItem'>
						<img
							src={
								user?.img ||
								'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
							}
							alt=''
							className='widgetSmImg'
						/>
						<div className='widgetSmUser'>
							<span className='widgetSmUsername'>{user.username}</span>
						</div>
						<button className='widgetSmButton'>
							<VisibilityIcon className='widgetSmIcon' />
							Dispaly
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetSm;
