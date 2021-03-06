import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_GITHUB_REPOS,
  } from '../actions/types';



const initialState = {
    profile : null ,
    profiles : [],
    repos : [],
    error : {},
    loading : true ,
};


export default ( state = initialState , action ) => {
    const { type , payload } = action ;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
          return {
              ...state,
              profile : payload,
              loading : false ,
          };

         case GET_PROFILES:
            return {
             ...state,
             repos: payload,
             loading: false , 
            };
         
         case GET_GITHUB_REPOS:
             return {
              ...state,
              error : payload,
              loading: false ,
             };
          case PROFILE_ERROR:
              return {
               ...state,
               error: payload,
               loading: false,
              };
           case CLEAR_PROFILE:
               return {
                  ...state,
                  profile: null,
                  repos: [],
                  loading: false ,  
               };
            default:
                return state;

    }
};

