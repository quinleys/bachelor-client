import { GET_ITEMS, ADD_ITEM, LOAD_NEXT , FAILED_ITEM, ITEMS_LOADING,GET_ITEM, GET_CATEGORIES, GET_MATERIALS, FAILED_ITEMS, GET_RANDOM } from '../actions/types'


const initialState = {
    items: [],
    item: [],
    itemOpeninghours: [],
    page: [],
    images: [],
    menus: [],
    random: [],
    ratings: [],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                page: action.payload,
                items: action.payload.data,
                loading: false,
            };
        case GET_ITEM:
            return {
                ...state,
                item: action.payload,
                images: JSON.parse(action.payload.images),
                menus: JSON.parse(action.payload.menus),
                ratings: action.payload.ratings,
                itemOpeninghours: action.payload.openinghours,
                loading:false,
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [ ...state.items, action.payload],
            };
        case GET_RANDOM:
            return{
                ...state,
                random : action.payload,
                loading: false,
            }
        case LOAD_NEXT:
            return  {
                ...state,
                items: [action.payload, ...state.items],
                loading:false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading:true,
            };
       
        case FAILED_ITEMS:
            return{
                ...state,
                loading:false
            }
        case FAILED_ITEM:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}