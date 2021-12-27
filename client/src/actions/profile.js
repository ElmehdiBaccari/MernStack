import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_GITHUB_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';



export const getCurrentProfile = () => async dispatch => {
    try {
      const res = await axios.get('/api/profile/me');
      dispatch ({
          type: GET_PROFILE,
          payload: res.data,
      });
 } catch (error ) {
      dispatchProfileError( dispatch, error);
    }
};



export const getAllProfiles = () => async dispatch => {
    dispatch ( { type : CLEAR_PROFILE});
  try {
    const res = await axios.get('/api/profile');
    dispatch ({
      type : GET_PROFILES,
      payload : res.data,
    });
  } catch (error) {
    dispatchProfileError( dispatch, error);   
  }
};


export const getProfileById = id => async dispatch => {
    try {
     const res = await axios.get(`/api/profile/user/${id}`);
     dispatch ({
         type : GET_PROFILE,
         payload: res.data,
     });

    } catch(error) {
        dispatchProfileError( dispatch, error);  
    }
};


export const createProfile = (
  formData,
  history,
  edit = false 
) => async dispatch => {
    console.log(formData);
    const config = {
        headers : {
            'Content-Type':'application/json',
        },
    };
    try {
        const res = await axios.post('/api/profile', formData, config);
        dispatch ({
         type: UPDATE_PROFILE,
         payload: res.data ,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created' , 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        console.log(error.response);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }
        dispatchProfileError( dispatch, error);  
    }
};
















const dispatchProfileError = ( dispatch , error ) => {
    console.log(error.response);
    dispatch ({
       type : PROFILE_ERROR,
       payload : {
           msg : error.response.statusText,
           status: error.response.status,
       } ,
    });
};