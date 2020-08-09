import axios from 'axios';
import { returnErrors , tooManyRequest} from './errorActions';

import { GET_FACILITIES, FAILED_FACILITIES, FACILITIES_LOADING } from "./types";

export const getFacilities = () => (dispatch) => {
    dispatch(setCategoriesLoading())

    axios.get('/api/facility/all')
    .then(res => {
        dispatch({
            type:GET_FACILITIES,
            payload: res.data
        })
    }).catch(err => {
        if(typeof err.response == "object"){
        if(err.response.status == 429 ){
            dispatch(tooManyRequest(err.response.status))
            dispatch({
                type: FAILED_FACILITIES
            })
        }else{
            dispatch({
                type: FAILED_FACILITIES
            })
        }
        }else{
        dispatch(returnErrors(err, err, err))
        dispatch({
            type: FAILED_FACILITIES
        })
    }
    })
}

export const setCategoriesLoading = () => {
    return {
        type: FACILITIES_LOADING
    }
}