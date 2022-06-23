import { DataGrid } from '@mui/x-data-grid';
import './userList.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserList = () => {
	const [data, setData] = useState(userRows);

	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'user',
			headerName: 'User',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='userListUser'>
						<img className='userListImg' src={params.row.avatar} alt='' />
						{params.row.username}
					</div>
				);
			},
		},
		{ field: 'email', headerName: 'Email', width: 200 },
		{
			field: 'status',
			headerName: 'Status',
			width: 130,
		},
		{
			field: 'transaction',
			headerName: 'Transaction',
			width: 160,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/user/${params.row.id}`}>
							<button className='userListEdit'>Edit</button>
						</Link>
						<DeleteOutlineIcon
							onClick={() => handleDelete(params.row.id)}
							className='userListDelete'
						></DeleteOutlineIcon>
					</>
				);
			},
		},
	];

	return (
		<div className='userList'>
			<DataGrid
				rows={data}
				columns={columns}
				disableSelectionOnClick
				pageSize={8}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
};

export default UserList;
