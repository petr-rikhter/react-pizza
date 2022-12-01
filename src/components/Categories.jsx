import React, { useState } from 'react';

function Categories(props) {
  const [active, setActive] = useState(0);

  const setActiveHandler = (index) => {
    setActive(index);
  };

  const arrayOfCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {arrayOfCategories.map((elem, index) => {
          return (
            <li
              className={active === index ? 'active' : ''}
              onClick={() => setActiveHandler(index)}>
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
