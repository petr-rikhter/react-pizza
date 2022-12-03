import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PlaceHolder from '../components/PlaceHolder';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности(возр.)',
    sortProperty: 'rating',
    sortReach: 'increase',
  });

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://6388f4cbd94a7e5040ab61cb.mockapi.io/items?${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}${
        sortType.sortReach === 'increase' ? '&order=asc' : '&order=desc'
      }`,
    )
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => {
            setCategoryId(index);
          }}
        />
        <Sort sortType={sortType} onClickSortType={(elem) => setSortType(elem)} />
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
