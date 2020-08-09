import { GET_DAILY_RESERVATIONS,LOADING_NEWDATA,IMAGES_LOADING, NOTUPDATED, RESTAURANT_UPDATING, UPLOADRESTAURANTMENUS, UPLOADPRIMARYIMG,GET_RECENT_COMMENTS,UPLOADRESTAURANTIMAGES,GET_RESTAURANT, GET_ACTIVEROOMS, ADD_LAYOUT, RESET_SERVERRESPONSE, MAKE_ROOM_UNACTIVE, MAKE_ROOM_ACTIVE , DASHBOARD_LOADING, FAILED_DASHBOARD, UPDATE_RESTAURANT, GET_WEEKLY_RESERVATIONS, GET_PLATTEGROND, GET_ROOMDASHBOARD, GET_MONTHLY_RESERVATIONS, GET_LAYOUTSDASHBOARD, DELETE_LAYOUT, DELETE_ROOM, UPDATE_ROOMDASHBOARD, GET_RECENT_RESERVATIONS, REMOVE_ROOM, UPDATE_LAYOUT, DELETERESTAURANTCAROUSELIMAGE, DELETERESTAURANTMENUIMAGE } from '../actions/types'


const initialState = {
    daily: [],
    weekly: [],
    monthly: [],
    allLayouts: [],
    allRooms: [],
    layout : [],
    room: [],
    restaurant: [],
    reservations: [],
    activeRoom: [],
    plattegrond: [],
    activeRooms: [],
    comments: [],
    menus : [],
    images: [],
    serverResponse: [],
    dashboardloading: false,
    loadingNewData: false,
    imagesloading: false,
    updated: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_ROOMDASHBOARD: 
            return {
                ...state,
                room: action.payload,
                activeRoom: state.activeRoom.map(
                    (content) => content.id === action.payload.id ? action.payload
                                            : content
                ),
                dashboardloading:false
            }
        case MAKE_ROOM_ACTIVE:
            return{
                ...state,
                activeRoom:[...state.activeRoom, action.payload],
                allRooms: state.allRooms.map(
                    
                     (content) => content.id == action.payload.id ? action.payload 
                    : content
                ),
                dashboardloading: false,
            }
        case MAKE_ROOM_UNACTIVE:
            return { 
                ...state,
                activeRoom: state.activeRoom.filter(item => item.id !== action.payload.id),
                allRooms: state.allRooms.map(
                    (content) => content.id === action.payload.id ? action.payload 
                    : content
                ),
                dashboardloading: false,
            }
        case ADD_LAYOUT:
            return {
                ...state,
                allLayouts: [action.payload, ...state.allLayouts],    
                } 
        case GET_RESTAURANT:
            return {
                ...state,
                restaurant: action.payload,
                menus: JSON.parse(action.payload.menus),
                images: JSON.parse(action.payload.images),
                dashboardloading: false,
                imagesloading: false,
            }
        case UPLOADRESTAURANTMENUS:
            return {
                ...state,
                menus: action.payload,
                imagesloading: false,
            }
        case UPLOADRESTAURANTIMAGES:
            return {
                ...state,
                menus: action.payload,
                imagesloading:false
            }
        case DELETERESTAURANTCAROUSELIMAGE:
            return {
                ...state,
                images: action.payload,
                imagesloading: false,
            }
        case DELETERESTAURANTMENUIMAGE:
            return {
                ...state,
                menus: action.payload,
                imagesloading: false
            }
        case UPLOADPRIMARYIMG:
        case UPDATE_RESTAURANT:
            return {
                ...state,
                updated: true,
                restaurant: action.payload, 
                dashboardloading: false,
                restaurantupdating: false,
            }
        case UPDATE_LAYOUT:
            return {
                ...state,
                layout: action.payload.data,
                serverResponse: action.payload,
                dashboardloading: false,
            }
        case GET_PLATTEGROND:
            return {
                ...state,
                plattegrond: action.payload,
                dashboardloading: false,
            }
        case GET_RECENT_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload,
                dashboardloading:false,
            }
        case GET_RECENT_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                dashboardloading:false,
            }
        case GET_DAILY_RESERVATIONS:
            return {
                ...state,
                daily: action.payload,
                dashboardloading: false,
            };
        case DELETE_LAYOUT:
            return {
                ...state,
                allLayouts: state.allLayouts.filter(item => item.id !== action.payload.id),
                dashboardloading:false
            }
        case GET_ROOMDASHBOARD: 
            return {
                ...state,
                room: action.payload,
                dashboardloading: false,
            }
        case REMOVE_ROOM: 
            return {
                ...state,
                room: [],
                dashboardloading: false,
            }
        case DELETE_ROOM:
            return {
                ...state,
                allRooms: state.allRooms.filter(item => item.id !== action.payload.id ),
                dashboardloading:false,
            }
        case GET_WEEKLY_RESERVATIONS:
            return {
                ...state,
                weekly: action.payload,
                dashboardloading: false,
                loadingNewData: false,
            }
        case GET_ACTIVEROOMS:
            return {
                ...state,
                activeRooms: action.payload,
                dashboardloading: false
            }
        case GET_MONTHLY_RESERVATIONS:
            return {
                ...state,
                monthly: action.payload,
                dashboardloading: false,
            }
        case GET_LAYOUTSDASHBOARD:
            return {
                ...state,
                activeRoom: action.payload.activeRoom,
                allRooms: action.payload.allRooms,
                allLayouts: action.payload.allLayouts,
                dashboardloading: false,
            }
        case FAILED_DASHBOARD:
            return {
                ...state,
                serverResponse: action.payload,
                dashboardloading:false,
                imagesloading: false,
            }
        case DASHBOARD_LOADING:
            return {
                ...state,
                dashboardloading: true,
            };
        case IMAGES_LOADING:
            return {
                ...state,
                imagesloading: true,
            };
        case LOADING_NEWDATA:
            return {
                ...state,
                weekly: [],
                loadingNewData: true,
            }
        case RESET_SERVERRESPONSE:
            return {
                ...state,
                serverResponse: [],
            }
        case NOTUPDATED:
            return {
                ...state,
                updated:false
            }
        case RESTAURANT_UPDATING:
        return {
            ...state,
            restaurantupdating: true
        }
        default:
            return state;
    }
}