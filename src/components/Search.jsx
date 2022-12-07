import React from 'react';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { SearchContext } from '../App';
import styles from './Search.module.scss';
import { useCallback } from 'react';
import { useState } from 'react';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = useRef('');

  const clearInputHandler = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const sendInputValueDelay = useCallback(
    debounce((event) => {
      setSearchValue(event);
    }, 300),
    [],
  );

  const inputHandler = (event) => {
    setValue(event.target.value);
    sendInputValueDelay(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id="Layeri"
        viewBox="0 0 108 108"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="Line">
          <path d="M104,52H86v4h6A38,38,0,0,1,27,80.67,10,10,0,0,0,22,62a9.86,9.86,0,0,0-4.85,1.28A38,38,0,0,1,52,16v7.16A9.43,9.43,0,0,0,50,23a10,10,0,0,0,0,20,9.43,9.43,0,0,0,2-.21V54a2,2,0,0,0,2,2H74V52H56V4a2,2,0,0,0-2-2,52,52,0,1,0,52,52A2,2,0,0,0,104,52ZM52,38.64a6,6,0,1,1,0-11.28ZM22,66a6,6,0,0,1,2.22,11.57,38.18,38.18,0,0,1-5.84-10.34A5.92,5.92,0,0,1,22,66Zm32,36A48,48,0,0,1,52,6v6A42,42,0,1,0,96,56h6A48.06,48.06,0,0,1,54,102Z" />
          <circle cx="58" cy="74" r="7.64" />
          <circle cx="78.5" cy="63.5" r="1.5" />
          <circle cx="43.5" cy="64.5" r="2.52" />
          <circle cx="28.5" cy="46.5" r="3.7" />
          <circle cx="81.5" cy="26.5" r="1.88" />
          <path d="M64,47h40a2,2,0,0,0,2-2A42,42,0,0,0,64,3a2,2,0,0,0-2,2V45A2,2,0,0,0,64,47Zm9.88-4a6.13,6.13,0,0,1,12.25,0Zm16.25,0a10.13,10.13,0,0,0-20.25,0H66V15.07A30,30,0,0,1,93.93,43Zm11.82,0h-4A34,34,0,0,0,66,11.06v-4A38.06,38.06,0,0,1,101.95,43Z" />
          <rect height="4" rx="2" ry="2" width="4" x="78" y="52" />
        </g>
      </svg>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={inputHandler}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={styles.close}
          onClick={clearInputHandler}
          height="14px"
          version="1.1"
          viewBox="0 0 14 14"
          width="14px"
          xmlns="http://www.w3.org/2000/svg">
          <title />
          <desc />
          <defs />
          <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
              <g id="close" transform="translate(341.000000, 89.000000)">
                <path
                  d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
