import React, { useState } from 'react';
import './newProduct.css';

/* Handle multiple Inputs in one state */
const NewProduct = () => {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [cats, setCats] = useState([]);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCategories = (e) => {
		setCats(e.target.value.split(',').map((cat) => cat.trim()));
	};

	const handleCreate = (e) => {
		e.preventDefault();
		
	}

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New Product</h1>
			<form className='addProductForm'>
				<div className='addProductItem'>
					<label>Image</label>
					<input
						type='file'
						id='file'
						onChange={(e) => setFile(e.target.files)[0]}
					/>
				</div>
				<div className='addProductItem'>
					<label>Title</label>
					<input
						name='title'
						type='text'
						placeholder='Apple Airpods'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Description</label>
					<input
						name='desc'
						type='text'
						placeholder='description'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Price</label>
					<input
						name='price'
						type='number'
						placeholder='price'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Categories</label>
					<input
						type='text'
						placeholder='jeans, skirts'
						onChange={handleCategories}
					/>
				</div>
				<div className='addProductItem'>
					<label>Stock</label>
					<select name='inStock' onChange={handleChange}>
						<option value='true'>Yes</option>
						<option value='false'>No</option>
					</select>
				</div>
				<button onClick={handleCreate} className='addProductButton'>Create</button>
			</form>
		</div>
	);
};

export default NewProduct;
