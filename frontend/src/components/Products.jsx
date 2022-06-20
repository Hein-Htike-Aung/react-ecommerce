import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ category, sort, filters }) => {
	const [products, setProducts] = useState([]);
	const [filteredProudcts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					category
						? `/product/by-query/list?category=${category}`
						: `/product/by-query/list`,
				);

				setProducts(res.data);
			} catch (error) {}
		};

		getProducts();
	}, [category]);

	useEffect(() => {
		category &&
			setFilteredProducts(
				products.filter((p) =>
					Object.entries(filters).every(([key, value]) =>
						p[key].includes(value),
					),
				),
			);
	}, [products, category, filters]);

	useEffect(() => {
		if (sort === 'newest') {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
			);
		} else if (sort === 'asc') {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price),
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price),
			);
		}
	}, [sort]);

	return (
		<Container>
			{category
				? filteredProudcts.map((item) => <Product key={item._id} item={item} />)
				: // Only show 8 items in home page
				  products
						.slice(0, 8)
						.map((item) => <Product key={item._id} item={item} />)}
		</Container>
	);
};

export default Products;
