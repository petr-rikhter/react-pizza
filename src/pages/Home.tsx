import React, { useEffect, useRef } from 'react';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectPizzas } from '../redux/slices/pizzaSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import {
  filterSliceState,
  selectFilter,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { objectOfSort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PlaceHolder from '../components/PlaceHolder';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

// type SortType = {
//   name: string;
//   sortProperty: string;
//   sortReach: string;
// };

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const onChangePage = (id: number) => {
    dispatch(setCurrentPage(id));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      //Вшивание в ссылку
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = objectOfSort.find((obj) => obj.sortProperty === params.sortProperty);

      console.log(params, sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    dispatch(
      fetchPizza({
        currentPage,
        categoryId,
        sort,
        searchValue,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // if (window.location.search) {
    getPizzas();
    // }
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((elem: any) => {
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
      {status === 'error' ? (
        <div>
          <h2 className="content__error">Ошибка при запросе пицц, обновите категорию поиска!</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
