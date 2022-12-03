import React, { useState } from 'react';

function Categories({ categoryId, onClickCategory }) {
  const arrayOfCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {arrayOfCategories.map((elem, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => onClickCategory(index)}>
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
