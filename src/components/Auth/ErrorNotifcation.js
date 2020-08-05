/* import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ErrorNotification = (props) => {
 const isOpen = useSelector(state => state.errorReducer.isOpen);
 const error = useSelector(state => state.errorReducer.error);

 const dispatch = useDispatch();

 function handleClose(){
 dispatch({ type: HIDE_ERROR });
 }
 
 return (
 <>
 {isOpen && error && (
 <div class="fancy-error-class">
 <button>Close Error</button>
 <span>{error}</span>
 </div>
 )}
 </>
 )
}

export default ErrorNotification; */