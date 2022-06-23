import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
	const isAdmin = useSelector((state) => state?.user?.currentUser?.isAdmin);

	const Layout = () => (
		<>
			<Topbar />
			<div className='container'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);

	return (
		<div>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route element={isAdmin && <Layout />}>
					<Route path='/' element={isAdmin ? <Home /> : <Login />} />
					<Route path='/users' element={isAdmin && <UserList />} />
					<Route path='/user/:userId' element={isAdmin && <User />} />
					<Route path='/newUser' element={isAdmin && <NewUser />} />
					<Route path='/products' element={isAdmin && <ProductList />} />
					<Route path='/product/:productId' element={isAdmin && <Product />} />
					<Route path='/newProduct' element={isAdmin && <NewProduct />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
