// Counter.jsx
import React from 'react';
import styles from './Counter.module.css';

function Counter({ count }) {
  return <div className={styles.counter}>feathers = {count}</div>;
}

export default Counter;