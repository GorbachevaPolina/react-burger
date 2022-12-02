import React, {useEffect, useState} from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const URL = "https://norma.nomoreparties.space/api/ingredients"

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true)
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } 
        return Promise.reject(`Ошибка ${response.status}`)
      })
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        setError(error.message)
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
              <BurgerIngredients data={data}/>
              <BurgerConstructor data={data}/>
              </> : <h1>Загрузка</h1>
          }
        </main>
      </>
    );
  }

}

export default App;
