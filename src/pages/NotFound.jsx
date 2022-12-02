import React from 'react';
import styles from './NotFound.module.scss';

function NotFound(props) {
  return (
    <h1 className={styles.root}>
      <span>🙁</span>
      <br />
      Ничего не найдено
    </h1>
  );
}

export default NotFound;
