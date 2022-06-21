import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Success from './pages/Success';
import { useSelector } from 'react-redux';

const App = () => {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/proudcts/:category' element={<ProductList />} />
			<Route path='/product/:id' element={<Product />} />
			<Route
				path='/login'
				element={user ? <Navigate to='/' replace={true} /> : <Login />}
			/>
			<Route
				path='/register'
				element={user ? <Navigate to='/' replace={true} /> : <Register />}
			/>
			<Route path='/cart' element={<Cart />} />
			<Route path='/success' element={<Success />} />
		</Routes>
	);
};

export default App;
