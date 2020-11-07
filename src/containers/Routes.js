import React from 'react'
import Home from './home/HomeContainer'
import SignUp from './home/SignUpContainer'

const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/signUp",
		exact: true,
		component: SignUp
	},
	{
		path: '',
		exact: false,
		component: () => <div>NOT FOUND</div>
	}
];

export default routes