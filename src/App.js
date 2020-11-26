import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import Profile from './components/Profile/Profile'
import Trending from './components/Trending/Trending'
import Collection from './components/Collection/Collection'
import ContactUs from './components/ContactUs/ContactUs'
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

                <Route exact path="/trending/">
                    <Trending />
                </Route>
                <Route exact path="/collection/">
                    <Collection />
                </Route>
                <Route exact path="/new/">
                    New App
                </Route>
                <Route exact path="/contact-us/">
                    <ContactUs />
                </Route>
            </BrowserRouter>
        </Provider>
    )
}

export default App
