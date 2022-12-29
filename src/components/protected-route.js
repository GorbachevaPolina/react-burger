import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getUser } from '../services/actions/user'

export function ProtectedRoute({ onlyForAuth, children, ...rest}) {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation()

    const init = () => {
        dispatch(getUser());
        setUserLoaded(true);
    }

    useEffect(() => {
        init()
    }, [])

    if (!isUserLoaded) {
        return null;
    }

    if(!onlyForAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        )
    }

    if (onlyForAuth && !user) {
        return (
            <Route {...rest}>
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            </Route>
        )
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}

