import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PlaceHolder from '../components/PlaceHolder';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const sortType = useSelector((state) => state.filterReducer.sortType);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности(возр.)',
  //   sortProperty: 'rating',
  //   sortReach: 'increase',
  // });

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://6388f4cbd94a7e5040ab61cb.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}${
        sortType.sortReach === 'increase' ? '&order=asc' : '&order=desc'
      }${searchValue ? `&search=${searchValue}` : ''}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((elem) => {
    return <PizzaBlock key={elem.id} {...elem}></PizzaBlock>;
  });

  const skeletons = [...new Array(4)].map((_, index) => <PlaceHolder key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
