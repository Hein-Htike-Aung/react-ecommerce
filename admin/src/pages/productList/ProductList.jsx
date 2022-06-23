import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import './productList.css';

const ProductList = () => {
	// const [data, setData] = useState(productRows);

	const dispatch = useDispatch();

	const products = useSelector((state) => state.product.products);

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		try {
			deleteProduct(dispatch, id);
		} catch (error) {}
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 220 },
		{
			field: 'product',
			headerName: 'Product',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='productListItem'>
						<img className='productListImg' src={params.row.img} alt='' />
						{params.row.title}
					</div>
				);
			},
		},
		{ field: 'inStock', headerName: 'Stock', width: 200 },
		{
			field: 'price',
			headerName: 'Price',
			width: 160,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={`/product/${params.row._id}`}>
							<button className='productListEdit'>Edit</button>
						</Link>
						<DeleteOutlineIcon
							onClick={() => handleDelete(params.row._id)}
							className='productListDelete'
						></DeleteOutlineIcon>
					</>
				);
			},
		},
	];

	return (
		<div className='productList'>
			<DataGrid
				rows={products}
				columns={columns}
				disableSelectionOnClick
				pageSize={8}
				getRowId={(row) => row._id}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
};

export default ProductList;
