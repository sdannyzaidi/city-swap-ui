import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home, Auth, NewListing, SearchPage, About, Listing, Profile, RequestsBookings, Chat } from '@/pages/index'
import { PrivateRoute } from '@auth'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='auth/:action' element={<Auth />} />
				<Route path='home' element={<Home />}>
					<Route path='about' element={<About />} />
					<Route path='search' element={<SearchPage />} />
				</Route>
				<Route path='requests-bookings' element={<RequestsBookings />} />
				<Route path='my-listings/:id/:action?' element={<Listing />} />
				<Route path='chat/:id?' element={<Chat />} />
				<Route path='profile' element={<Profile />} />
				<Route
					path='new-listing'
					element={
						<PrivateRoute redirect='/auth/login'>
							<NewListing />
						</PrivateRoute>
					}
				/>
				<Route path='listing/:id' element={<Listing />}></Route>
				<Route path='/' element={<Navigate to='home/about' replace />} />
				<Route path='*' element={<Navigate to='home/about' replace />} />
			</Routes>
		</Router>
	)
}

export default App
