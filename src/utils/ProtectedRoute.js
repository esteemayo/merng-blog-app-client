import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../context/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useGlobalContext();

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to='/' />
            }
        />
    )
}

export default ProtectedRoute
