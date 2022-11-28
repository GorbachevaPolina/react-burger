import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {data, chosenIngredients} from '../../utils/data'

function App() {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={chosenIngredients}/>
      </main>
    </>
  );
}

export default App;
