import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import Login from "./Login";
import Panel from "./Panel";
import Blog from "./Blog";
import NewUser from "./NewUser";
import blogApp from "../reducers";


const store = createStore(blogApp);

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div >
                    <Panel />
                    <div className='container' id='blog-body'>
                        <Switch>
                            <Route exact path='/' component={Blog} />
                            <Route path='/blog' component={Blog} />
                            <Route path='/login' component={Login} />
                            <Route path='/singup' component={NewUser} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    )
};

export default App
