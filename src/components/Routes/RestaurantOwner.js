import React from 'react'
import { Route, Redirect } from "react-router-dom";

export const RestaurantOwner = ({ component: Component, ...rest }) => {
    
        return (
            <Route 
            {...rest}
            render={props => {
                if(localStorage.getItem('authenticated') && localStorage.getItem('token') && localStorage.getItem('restaurant_id') ){
                    return <Component {...props} />
                }else{
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
            />
        )
    
}
    
