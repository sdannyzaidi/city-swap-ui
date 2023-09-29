import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {
	Home,
	Auth,
	NewListing,
	SearchPage,
	About,
	Listing,
	Profile,
	RequestsBookings,
	Chat,
	Pricing,
	TermsAndConditions,
	Privacy,
	Faqs,
	HowItWorks,
	AboutUs,
	Contact,
} from '@/pages/index'
import { PrivateRoute } from '@auth'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='auth/:action' element={<Auth />} />
				<Route path='home' element={<Home />}>
					<Route path='about' element={<About />} />
					<Route path='search' element={<SearchPage />} />
				</Route>
				<Route
					path='requests-bookings/:type?'
					element={
						<PrivateRoute redirect='/auth/login'>
							<RequestsBookings />
						</PrivateRoute>
					}
				/>
				<Route
					path='my-listings/:id/:action?'
					element={
						<PrivateRoute redirect='/auth/login'>
							<Listing />
						</PrivateRoute>
					}
				/>
				<Route
					path='chat/:id?/:goBackListing?'
					element={
						<PrivateRoute redirect='/auth/login'>
							<Chat />
						</PrivateRoute>
					}
				/>
				<Route
					path='profile'
					element={
						<PrivateRoute redirect='/auth/login'>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='new-listing'
					element={
						<PrivateRoute redirect='/auth/login'>
							<NewListing />
						</PrivateRoute>
					}
				/>
				<Route path='listing/:id' element={<Listing />}></Route>
				<Route path='pricing' element={<Pricing />}></Route>
				<Route path='terms-and-conditions' element={<TermsAndConditions />}></Route>
				<Route path='about-us' element={<AboutUs />}></Route>
				<Route path='privacy' element={<Privacy />}></Route>
				<Route path='contact' element={<Contact />}></Route>
				<Route path='faqs' element={<Faqs />}></Route>
				<Route path='how-it-works' element={<HowItWorks />}></Route>

				<Route path='/' element={<Navigate to='home/about' replace />} />
				<Route path='*' element={<Navigate to='home/about' replace />} />
			</Routes>
		</Router>
	)
}

export default App
