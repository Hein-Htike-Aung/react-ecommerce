import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import Register from './pages/Register';

const App = () => {
	const user = true;

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
		</Routes>
	);
};

export default App;
