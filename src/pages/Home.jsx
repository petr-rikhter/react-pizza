import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PlaceHolder from '../components/PlaceHolder';

function Home(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6388f4cbd94a7e5040ab61cb.mockapi.io/items')
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((_, index) => <PlaceHolder key={index} />)
          : items.map((elem) => {
              return <PizzaBlock key={elem.id} {...elem}></PizzaBlock>;
            })}
      </div>
    </div>
  );
}

export default Home;
