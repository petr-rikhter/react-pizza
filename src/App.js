import './scss/app.scss';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';

import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import { useState } from 'react';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');

  // const count = useSelector((state) => state.counterReducer.value);
  // const dispatch = useDispatch();

  return (
    // <div>
    //   <button aria-label="Increment value" onClick={() => dispatch(increment())}>
    //     Increment
    //   </button>
    //   <span>{count}</span>
    //   <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
    //     Decrement
    //   </button>
    // </div>

    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
