import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

const arrayOfCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {arrayOfCategories.map((elem, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => dispatch(setCategoryId(index))}>
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
