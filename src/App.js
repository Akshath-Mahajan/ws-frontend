import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import Profile from './components/Profile/Profile'
// import theme from './baseTheme'
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/cart/">
                    <Cart />
                </Route>
                <Route exact path="/wishlist/">
                    <Wishlist />
                </Route>
                <Route exact path="/profile/">
                    <Profile />
                </Route>
            </BrowserRouter>
        </Provider>
    )
}

export default App
