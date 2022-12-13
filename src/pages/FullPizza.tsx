import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    description: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6388f4cbd94a7e5040ab61cb.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/react-pizza');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className={styles.container}>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.description}</h3>
      <h4>{pizza.price} руб.</h4>
    </div>
  );
};

export default FullPizza;
