import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../context/Global';

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
