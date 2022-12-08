import React, {useEffect, useState} from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {URL} from '../../utils/url'
import { BurgerIngredientsContext } from '../../context/burger-ingredients-context';

function App() {

  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true)
    fetch(`${URL}ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } 
        return Promise.reject(`Ошибка ${response.status}`)
      })
      .then((result) => {
        setIngredients(result.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  if(error) {
    return (
      <h1>Возникла ошибка, перезагрузите страницу</h1>
    )
  } else {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          
          {
            !isLoading ? 
              <>
                <BurgerIngredients data={ingredients}/>
                <BurgerIngredientsContext.Provider value={ingredients}>
                  <BurgerConstructor/>
                </BurgerIngredientsContext.Provider>
              </> : <h1>Загрузка</h1>
          }
        </main>
      </>
    );
  }

}

export default App;
