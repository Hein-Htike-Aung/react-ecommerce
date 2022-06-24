import PublishIcon from '@mui/icons-material/Publish';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { userRequest } from '../../requestMethods';
import './product.css';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';

const metadata = {
	contentType: 'image/jpeg',
};

const Product = () => {
	const location = useLocation();
	const productId = location.pathname.split('/')[2];
	const [productStat, setProductStat] = useState([]);
	const [file, setFile] = useState(null);
	const [inputs, setInputs] = useState({});
	const [cats, setCats] = useState([]);
	const dispatch = useDispatch();

	const product = useSelector((state) =>
		state.product.products.find((p) => p._id === productId),
	);

	useEffect(() => {
		setInputs({ ...product });
		setCats([...product.categories]);
	}, [product]);

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

	const handleChange = (e) => {
		const priceValue = e.target.name === 'price' && +e.target.value;

		setInputs((prev) => ({
			...prev,
			[e.target.name]: priceValue || e.target.value,
		}));
	};

	const handleCategories = (e) => {
		setCats(e.target.value.split(',').map((cat) => cat.trim()));
	};

	const handleUpdate = (e) => {
		e.preventDefault();

		if (file) {
			const fileName = new Date().getTime() + file.name;

			const storage = getStorage(app);

			const storageRef = ref(storage, fileName);

			const uploadTask = uploadBytesResumable(storageRef, file, metadata);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
						default:
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;

						// ...

						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
						default:
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						delete inputs.categories;
						delete inputs.img;
						const targetProduct = {
							...inputs,
							img: downloadURL,
							categories: cats,
						};

						updateProduct(dispatch, product._id, targetProduct);
					});
				},
			);
		} else {
			delete inputs.categories;
			const targetProduct = {
				...inputs,
				img: product.img,
				categories: cats,
			};

			updateProduct(dispatch, product._id, targetProduct);
		}
	};

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
						<input
							type='text'
							name='title'
							placeholder={product.title}
							onChange={handleChange}
						/>
						<label>Product Description</label>
						<input
							type='text'
							name='desc'
							placeholder={product.desc}
							onChange={handleChange}
						/>
						<label>Product Price</label>
						<input
							type='text'
							name='price'
							placeholder={product.price}
							onChange={handleChange}
						/>
						<label>Categories</label>
						<input
							onChange={handleCategories}
							type='text'
							placeholder={product.categories}
						/>
						<label>In Stock</label>
						<select
							onChange={handleChange}
							defaultValue={product.inStock}
							name='inStock'
							id='inStock'
						>
							<option value='true'>Yes</option>
							<option value='false'>No</option>
						</select>
					</div>
					<div className='productFormRight'>
						<div className='productUpload'>
							<img
								src={file ? URL.createObjectURL(file) : product.img}
								alt=''
								className='productUploadImg'
							/>
							<label htmlFor='file'>
								<PublishIcon
									style={{ cursor: 'pointer' }}
									className='productUpdateIcon'
								/>
							</label>
							<input
								hidden
								type='file'
								id='file'
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</div>
						<button onClick={handleUpdate} className='productButton'>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Product;
