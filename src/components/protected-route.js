import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getUser } from '../services/actions/user'

export function ProtectedAuthRoute({ children, ...rest }) {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [isUserLoaded, setUserLoaded] = useState(false);

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

    return (
        <Route
            {...rest}
            render={({location}) => (
                user ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                      }} />
                )
            )}
        />
    )
}

export function ProtectedUnauthRoute({ children, ...rest }) {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [isUserLoaded, setUserLoaded] = useState(false);

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

    return (
        <Route
            {...rest}
            render={() => (
                !user ? (
                    children
                ) : (
                    <Redirect to='/profile' />
                )
            )}
        />
    )
}