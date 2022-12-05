import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const arrayOfCategories = useSelector((state) => state.filterReducer.arrayOfCategories);
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
}

export default Categories;
