import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
function App() {
    return (
        <Provider store={store}>
            <div>
                <Header/>
                <Home />
            </div>
        </Provider>
    )
}

export default App
