import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch ({
            type : GET_POSTS,
            payload: res.data,
        });
    } catch (error){
        dispatchPostError(dispatch, error);
    }
};




export const createPost = FormData => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json',
        },
    };
    try {
        const res = await axios.post(`/api/posts`, FormData , config);
        dispatch ({
            type : CREATE_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post created','success'));
    } catch(error) {
        dispatchPostError(dispatch,error);
    }
};



export const deletePost = id => async dispatch => {

    try {
      await axios.delete(`/api/posts/${id}`);
       dispatch ({
          type : DELETE_POST,
          payload : id , 
       });
       dispatch(setAlert('Post deleted' , 'success'));
    } catch (error) {
        dispatchPostError(dispatch,error);
    }

};


export const getPost = id => async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch ( {
          type : GET_POST ,
          payload : res.data ,
      });
    } catch (error) {
        dispatchPostError(dispatch,error);  
    }
};








const dispatchPostError = (dispatch , error) => {
    console.log(error.response);
    dispatch ( {
       type: POST_ERROR,
       payload : {
           msg : error.response.statusText,
           status: error.response.status,
       } ,
    });
};