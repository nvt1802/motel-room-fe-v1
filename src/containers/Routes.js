import React from 'react'
import Index from './home/IndexContainer'
import Home from './home/HomeContainer'
import SignUp from './home/SignUpContainer'
import ViewPost from './home/ViewPostContainer'
import SearchResult from './home/SearchResultContainer'
import { Route } from 'react-router-dom'
import Dashboard from './dashboard/DashboardContainer'
import AccountManagementContainer from './dashboard/account/AccountManagementContainer'
import ViewAccount from './dashboard/account/ViewAccountComponent'
import EditAccountComponent from './dashboard/account/EditAccountComponent'

const routes = [
	{
		path: "/",
		exact: true,
		component: (props) => <Index><Home /></Index>
	},
	{
		path: "/signUp",
		exact: true,
		component: (props) => <Index><SignUp /></Index>
	},
	{
		path: "/searchResult",
		exact: true,
		component: (props) => <Index><SearchResult /></Index>
	},
	{
		path: "/post/viewPost/:postId",
		exact: true,
		component: (props) => <Index><ViewPost /></Index>
	},
	{
		path: "/dashboard",
		exact: false,
		component: (props) => <Dashboard {...props} />,
		routes: [
			{
				path: "/dashboard/account",
				exact: true,
				component: AccountManagementContainer
			},
			{
				path: "/dashboard/account/view/:accountId",
				exact: true,
				component: ViewAccount
			},
			{
				path: "/dashboard/account/edit/:accountId",
				exact: true,
				component: EditAccountComponent
			},
		]
	},
	{
		path: '',
		exact: false,
		component: () => <div>NOT FOUND</div>
	}
];

export default routes

export const RouteWithSubRoutes = (route) => {
	return (<>
		<Route
			path={route.path}
			exact={route.exact}
			render={props => (<>
				<route.component {...props} routes={route.routes} />
			</>)}
		/>
	</>)
}