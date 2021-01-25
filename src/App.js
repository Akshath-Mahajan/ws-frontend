import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import Profile from './components/Profile/Profile'
import Trending from './components/Trending/Trending'
import Collection from './components/Collection/Collection'
import ContactUs from './components/ContactUs/ContactUs'
import New from './components/NewProducts/New'
import Product from './components/Product/Product'
import SearchQ from './components/SearchQ/SearchQ'
import AuthRoute from './AuthRoute'
import Verify from './Verify'
import AboutUs from './components/AboutUs/AboutUs'
import { theme } from './baseTheme'
import { ThemeProvider } from '@material-ui/core'
import Success from './components/OrderResults/Success'
import Reject from './components/OrderResults/Reject'
import NotFound from './NotFound'
import TermsOfService from './components/TOS/TermsOfService'
// <ThemeProvider theme={theme}>
//   <CustomCheckbox />
// </ThemeProvider>

function App() {
    return (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <AuthRoute exact path="/bag/">
                    <Cart />
                </AuthRoute>
                <AuthRoute exact path="/wishlist/">
                    <Wishlist />
                </AuthRoute>
                <AuthRoute exact path="/profile/">
                    <Profile />
                </AuthRoute>

                <Route exact path="/product/:id">
                    <Product />
                </Route>
                <Route exact path="/trending/">
                    <Trending />
                </Route>
                <Route exact path="/collection/">
                    <Collection />
                </Route>
                <Route exact path="/new/">
                    <New />
                </Route>
                <Route exact path="/contact-us/">
                    <ContactUs />
                </Route>
                <Route exact path="/about-us/">
                    <AboutUs />
                </Route>
                <Route exact path="/search/:query">
                    <SearchQ />
                </Route>
                <Route exact path="/verify-user/:str">
                    <Verify />
                </Route>
                <Route exact path="/order-success">
                    <Success />
                </Route>
                <Route exact path="/order-failure">
                    <Reject />
                </Route>
                <Route exact path="/terms-of-service">
                    <TermsOfService />
                </Route>
                <Route path="*" exact component={NotFound} />
            </Switch>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
    )
}

export default App
