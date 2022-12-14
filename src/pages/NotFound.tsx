import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>🙁</span>
      <br />
      Ничего не найдено
    </h1>
  );
};

export default NotFound;
