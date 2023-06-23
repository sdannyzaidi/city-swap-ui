import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home, Auth } from '@/pages/index'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='auth/:action' element={<Auth />} />
				<Route path='home' element={<Home />} />
				<Route path='/' element={<Navigate to='home' replace />} />
				<Route path='*' element={<Navigate to='home' replace />} />
			</Routes>
		</Router>
	)
}

export default App
