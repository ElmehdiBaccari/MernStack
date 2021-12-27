
import React, { Fragment , useEffect  } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import { loadUser} from './actions/auth';
import './App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import Register from './components/auth/Register';
import Login from './components/auth/Login';





const token = localStorage.token ;
 if (token) {
   setAuthToken(token);
 }


const App = () => {
    useEffect (() => { store.dispatch(loadUser() ); }, [] );
    return (
      <Provider store= {store}>
        <Router>
         <Fragment>
      
       
         <Routes>
            
       
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            
              
              </Routes>
          
        </Fragment>
     
        </Router>
      </Provider>

    );

};
export default App;
