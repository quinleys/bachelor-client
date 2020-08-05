import axios from 'axios';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { GET_DAILY_RESERVATIONS,DELETERESTAURANTIMAGE,NOTUPDATED, RESTAURANT_UPDATING , DELETERESTAURANTMENUIMAGE, DELETERESTAURANTCAROUSELIMAGE, IMAGES_LOADING,LOADING_NEWDATA,GET_RECENT_COMMENTS,UPLOADRESTAURANTMENUS, ADD_LAYOUT, UPLOADPRIMARYIMG, GET_RESTAURANT, UPLOADRESTAURANTIMAGES, GET_ACTIVEROOMS, GET_WEEKLY_RESERVATIONS, RESET_SERVERRESPONSE, MAKE_ROOM_UNACTIVE, MAKE_ROOM_ACTIVE,  DASHBOARD_LOADING , FAILED_DASHBOARD, UPDATE_RESTAURANT,  UPDATE_ROOMDASHBOARD, UPDATE_LAYOUT, GET_MONTHLY_RESERVATIONS, GET_LAYOUTSDASHBOARD, DELETE_ROOM, GET_ROOMDASHBOARD, GET_RECENT_RESERVATIONS, REMOVE_ROOM, GET_PLATTEGROND, DELETE_LAYOUT } from "./types";

export const getRoom = (id) => (dispatch) => {
    dispatch(setDashboardLoading())

    console.log('id',id)
    axios.get('http://127.0.0.1:8000/api/dashboard/room/' + id ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') }} )
    .then(res => {
        console.log('res', res.data)
      
       
            dispatch({
                type: GET_ROOMDASHBOARD,
                payload: res.data
            }) 
        
        
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getActiveRooms = (id) => (dispatch) => {
    dispatch(setDashboardLoading())

    console.log('id',id)
    axios.get('http://127.0.0.1:8000/api/dashboard/'+ id +'/rooms/active',  { headers: { Authorization: "Bearer " + localStorage.getItem('token') } } )
    .then(res => {
        console.log('res active rooms', res.data)
        dispatch({
            type: GET_ACTIVEROOMS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getRecentReservations = (id,url ) => (dispatch) => {
    dispatch(setDashboardLoading())
    let newurl;
    if (url != '' && url != undefined && url != null){
        newurl = url
    }else{
        newurl = ''
    }
    axios.get('http://127.0.0.1:8000/api/dashboard/' + id + '/reservations/'  + newurl ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        console.log('res', res.data)
        dispatch({
            type: GET_RECENT_RESERVATIONS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getRecentComments = (id , url) => (dispatch) => {
    dispatch(setDashboardLoading())
    let newurl;
    if (url != '' && url != undefined && url != null){
        newurl = url
    }else{
        newurl = ''
    }
    console.log(newurl, 'new url')
    axios.get('http://127.0.0.1:8000/api/dashboard/' + id + '/comments/' + newurl,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') }} )
    .then(res => {
        console.log('res', res.data)
        dispatch({
            type: GET_RECENT_COMMENTS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getPlattegrond = (id,url) => (dispatch) => {

    dispatch(setDashboardLoading())

    axios.get('http://127.0.0.1:8000/api/dashboard/' + id + '/plattegrond' + url)
    .then(res => {
        console.log('res', res.data)
        dispatch({
            type: GET_PLATTEGROND,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const updateRestaurant = (id, item) => (dispatch) => {
    dispatch(setDashboardLoading())
    dispatch(setRestaurantUpdating())
    dispatch(resetServerResponse())
    dispatch(setNotUpdated())

    axios.post('http://127.0.0.1:8000/api/dashboard/' + id + '/restaurant/update', item , { headers: { Authorization: "Bearer " + localStorage.getItem('token') , Accept :'application/json', Application : "application/json"  }} )
    .then(res => {
        console.log('update restaurant', res)
        dispatch({
            type: UPDATE_RESTAURANT,
            payload: res.data
        })
        toast.success("De kamer is succesvol geupdate.");
    }).catch(err => {
        console.log(err)
        dispatch(returnErrors(err.message, err.error))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets misgegaan", err.message);
    })
}

export const updateRoom = (item) => (dispatch) => {
    console.log('item',item)
    dispatch(setDashboardLoading())
    axios.put('http://127.0.0.1:8000/api/dashboard/room/update' , item ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') , Accept :'application/json', Application : "application/json" }} )
    .then(res => {
        console.log('update',res);
        dispatch({
            type: UPDATE_ROOMDASHBOARD,
            payload: res.data
        })
        toast.success("De kamer is succesvol geupdate.");
    }).catch(err => {
        console.log(err.message, 'error')
        dispatch(returnErrors(err.response, err.response, 'UPDATE_FAIL'))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const makeRoomActive = (item) => (dispatch) => {
    console.log('item',item)
    dispatch(setDashboardLoading())
    axios.put('http://127.0.0.1:8000/api/dashboard/room/update' , item ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') , Accept :'application/json', Application : "application/json" }} )
    .then(res => {
        console.log('update',res);
        dispatch({
            type: MAKE_ROOM_ACTIVE,
            payload: res.data
        })
        toast.success("De kamer is succesvol actief gemaakt.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const makeRoomUnactive = (item) => (dispatch) => {
    console.log('item',item)
    dispatch(setDashboardLoading())
    axios.put('http://127.0.0.1:8000/api/dashboard/room/update' , item ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') , Accept :'application/json', Application : "application/json" }} )
    .then(res => {
        console.log('update',res);
        dispatch({
            type: MAKE_ROOM_UNACTIVE,
            payload: res.data
        })
        toast.success("De kamer is niet meer actief gemaakt.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getRestaurant = id => (dispatch) => {
    
    dispatch(setDashboardLoading());
    dispatch(setImagesLoading());
    console.log('get item')
    axios.get('http://127.0.0.1:8000/api/restaurant/' + id , { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        console.log('get Item',res.data)
        dispatch({
            type: GET_RESTAURANT,
            payload: res.data
        })}).catch(err => {
            console.log(err, 'getRestaurant')
            dispatch(returnErrors(err.response, err.response))})
}

export const postPrimaryImg = (item) => (dispatch) => {
    dispatch(setDashboardLoading())
    axios.post('http://127.0.0.1:8000/api/dashboard/14/restaurant/primaryimg' , item,{ headers: { Authorization: "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data', }} )
    .then( res => {
        console.log(res)
        dispatch({
            type: UPLOADPRIMARYIMG,
            payload: res.data
        })
        toast.success("De hoofdfoto is succesful geupload.");
    }).catch(err => {
        console.log('all error', err)
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets misgegaan. De file is te groot of de foute extensie.");
    })
}
export const postRestaurantImages = (item) => (dispatch) => {
    dispatch(setImagesLoading())
    axios.post('http://127.0.0.1:8000/api/dashboard/14/restaurant/uploadimages' , item,{ headers: { Authorization: "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data', }} )
    .then( res => {
        console.log('res upload', res)
        if(res.data[0] == 'menus'){
            dispatch({
                type: UPLOADRESTAURANTMENUS,
                payload: res.data[1]
            })
        }else if (res.data[0] == 'images'){
            dispatch({
                type: UPLOADRESTAURANTIMAGES,
                payload: res.data[1]
            })
        }
       
        toast.success("De foto is succesful geupload.");
    }).catch(err => {
        console.log('all error', err)
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets misgegaan. De file is te groot of de foute extensie.");
    })
}
export const deleteRestaurantImage = (item) => (dispatch)=> {
    console.log('item', item)
    dispatch(setImagesLoading())
    axios.post('http://127.0.0.1:8000/api/dashboard/14/restaurant/deleteimage' , item, { headers: { Authorization: "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data', }} )
    .then(res => {
        console.log('delete',res )
        if(res.data[0] == "menus"){
            dispatch({
                type: DELETERESTAURANTMENUIMAGE,
                payload: res.data[1]
            })
        }else if(res.data[0] == "images"){
            dispatch({
                type: DELETERESTAURANTCAROUSELIMAGE,
                payload: res.data[1]
            })
        }
       
        toast.success("De foto is succesful verwijderd.");
    }).catch(err => {
        console.log('all error', err)
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets misgegaan.");
    })
}
export const updateLayout = (item) => (dispatch) => {

    dispatch(setDashboardLoading())
    axios.put('http://127.0.0.1:8000/api/dashboard/layout/update', item ,  { headers: { Authorization: "Bearer " + localStorage.getItem('token') , Accept :'application/json', Application : "application/json" }}  )
    .then(res => {
        console.log('update',res)
        dispatch({
            type: UPDATE_LAYOUT,
            payload: res
        })
        toast.success("De kamer is succesvol geupdate.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD,
            payload: err
        })
        toast.error("Er is iets fout gegaan.");
    })
}

export const getLayouts = (id) => (dispatch) => {
    dispatch(setDashboardLoading())
    axios.get('http://127.0.0.1:8000/api/dashboard/' + id + '/layouts')
    .then(res => {
        dispatch({
            type: GET_LAYOUTSDASHBOARD,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getDailyReservations = (id , date) => (dispatch) => {
    dispatch(setDashboardLoading())
    axios.get('http://127.0.0.1:8000/api/restaurant/dashboard/' + id + '/daily?date=' + date )
    .then(res => {
        console.log(res.data)
        dispatch({
            type:GET_DAILY_RESERVATIONS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const getWeeklyReservations = (id , date) => (dispatch) => {
    console.log(id, date)
    dispatch(setLoadingNewData())
    dispatch(setDashboardLoading())

    axios.get('http://127.0.0.1:8000/api/restaurant/dashboard/' + id + '/weekly?date=' + date )
    .then(res => {
        console.log(res.data)
        dispatch({
            type:GET_WEEKLY_RESERVATIONS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
}
export const deleteRoom = (id) => (dispatch) => {

    dispatch(setDashboardLoading())

    axios.delete('http://127.0.0.1:8000/api/room/' + id + '/delete')
    .then(res => {
        console.log('res', res)
        dispatch({
            type: DELETE_ROOM,
            payload: res.data
        })
        toast.success("De kamer is succesvol verwijderd");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets fout gegaan");
    })
}
export const addLayout = item => (dispatch) => {
    dispatch(setDashboardLoading())
    console.log(item);
    axios.post('http://127.0.0.1:8000/api/layout/store' , item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        dispatch({
        type: ADD_LAYOUT,
        payload: res.data
    })
    toast.success("De layout is succesvol verwijderd.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        toast.error("Er is iets fout gegaan");
    })
}

export const deleteLayout = (id) => (dispatch) => {
    dispatch(setDashboardLoading())
    axios.delete('http://127.0.0.1:8000/api/layout/' + id + '/delete')
    .then(res => {
        dispatch({
            type: DELETE_LAYOUT,
            payload: res.data
        })
        toast.success("De layout is succesvol verwijderd.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
        toast.error("Er is iets fout gegaan");
    })
}


/* export const getMonthlyReservations = (id , date) => (dispatch) => {
    console.log(id, date)
    dispatch(setDashboardLoading())

    axios.get('http://127.0.0.1:8000/api/restaurant/dashboard/' + id + '/monthly?date=' + date )
    .then(res => {
        console.log(res.data)
        dispatch({
            type:GET_MONTHLY_RESERVATIONS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_DASHBOARD
        })
    })
} */
export const removeRoom = () => {
    return {
        type: REMOVE_ROOM
    }
}
export const resetServerResponse = () => {
    return {
        type: RESET_SERVERRESPONSE
    }
}
export const setDashboardLoading = () => {
    return {
        type: DASHBOARD_LOADING
    }
}
export const setLoadingNewData = () => {
    return {
        type: LOADING_NEWDATA
    }
}
export const setImagesLoading = () => {
    return {
        type: IMAGES_LOADING
    }
}

export const setRestaurantUpdating = () => {
    return {
        type: RESTAURANT_UPDATING
    }
}
export const setNotUpdated =() => {
    return {
        type: NOTUPDATED
    }
}