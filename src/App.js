import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://6388f4cbd94a7e5040ab61cb.mockapi.io/items')
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((elem) => {
              return <PizzaBlock key={elem.id} {...elem}></PizzaBlock>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
