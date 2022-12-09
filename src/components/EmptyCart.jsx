import React from 'react';
import emtyCartPng from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу. <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emtyCartPng} alt="Empty cart" />
      <Link to="/react-pizza" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default EmptyCart;
