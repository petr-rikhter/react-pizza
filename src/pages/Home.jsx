import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { objectOfSort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PlaceHolder from '../components/PlaceHolder';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useRef } from 'react';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterReducer);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      //Вшивание в ссылку
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = objectOfSort.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true);

      axios
        .get(
          `https://6388f4cbd94a7e5040ab61cb.mockapi.io/items?page=${currentPage}&limit=4${
            categoryId ? `&category=${categoryId}` : ''
          }&sortBy=${sortType.sortProperty}${
            sortType.sortReach === 'increase' ? '&order=asc' : '&order=desc'
          }${searchValue ? `&search=${searchValue}` : ''}`,
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    }

    isSearch.current = false;

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
