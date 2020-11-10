import React from 'react'
import Home from './home/HomeContainer'
import SignUp from './home/SignUpContainer'
import ViewPost from './home/ViewPostContainer'
import SearchResult from './home/SearchResultContainer'

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
		path: "/searchResult",
		exact: true,
		component: SearchResult
	},
	{
		path: "/post/viewPost/:postId",
		exact: true,
		component: ViewPost
	},
	{
		path: '',
		exact: false,
		component: () => <div>NOT FOUND</div>
	}
];

export default routes