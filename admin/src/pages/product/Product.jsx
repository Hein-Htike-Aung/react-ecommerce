import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import PublishIcon from '@mui/icons-material/Publish';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';

const Product = () => {
	const location = useLocation();
	const productId = location.pathname.split('/')[2];
	const [productStat, setProductStat] = useState([]);

	const product = useSelector((state) =>
		state.product.products.find((p) => p._id === productId),
	);

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
				const res = await userRequest.get(
					`order/monthly/income?productId=${productId}`,
				);

				const list = res.data.sort((a, b) => a._id - b._id);

				list.map((item) =>
					setProductStat((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], Sales: item.total },
					]),
				);
			} catch (error) {}
		};

		getStats();
	}, [MONTHS, productId]);

	return (
		<div className='product'>
			<div className='productTitleContainer'>
				<h1 className='productTitle'>Product</h1>
				<Link to={'/newproduct'}>
					<button className='productAddButton'>Create</button>
				</Link>
			</div>
			<div className='productTop'>
				<div className='productTopLeft'>
					<Chart title='Sales Performance' dataKey='Sales' data={productStat} />
				</div>
				<div className='productTopRight'>
					<div className='productInfoTop'>
						<img src={product.img} alt='' className='productInfoImg' />
						<span className='productName'>{product.title}</span>
					</div>
					<div className='productInfoBottom'>
						<div className='productInfoItem'>
							<span className='productInfoKey'>id:</span>
							<span className='productInfoValue'>{product._id}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>sales:</span>
							<span className='productInfoValue'>5323</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>active:</span>
							<span className='productInfoValue'>{product.inStock}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>in stock:</span>
							<span className='productInfoValue'>{product.inStock}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='productBottom'>
				<form className='productForm'>
					<div className='productFormLeft'>
						<label>Product Name</label>
						<input type='text' placeholder={product.title} />
						<label>Product Description</label>
						<input type='text' placeholder={product.desc} />
						<label>Product Price</label>
						<input type='text' placeholder={product.price} />
						<label>In Stock</label>
						<select name='inStock' id='inStock'>
							<option value='true'>Yes</option>
							<option value='false'>No</option>
						</select>
					</div>
					<div className='productFormRight'>
						<div className='productUpload'>
							<img src={product.img} alt='' className='productUploadImg' />
							<label htmlFor='file'>
								<PublishIcon className='productUpdateIcon' />
							</label>
							<input hidden type='file' id='file' />
						</div>
						<button className='productButton'>Update</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Product;
