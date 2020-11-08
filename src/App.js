import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from './components/Cart/Cart'
function App() {
    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <Header/>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/cart/">
                        <Cart />
                    </Route>
                    <Route exact path="/wishlist/">
                        wishlist
                    </Route>
                    <Route exact path="/profile/">
                        [profile]
                    </Route>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App
