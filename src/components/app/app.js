import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import { ProtectedAuthRoute, ProtectedUnauthRoute } from '../protected-route';
import NotFound404 from '../../pages/not-found-404';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { STOP_VIEW_CURRENT_INGREDIENT } from '../../services/actions/current-ingredient';

function App() {
  return (
    <>
      <Router>
        <AppHeader />
        <Switch>

          <ProtectedUnauthRoute path="/login" exact={true}>
            <Login />
          </ProtectedUnauthRoute>
          <ProtectedUnauthRoute path="/register" exact={true}>
            <Register />
          </ProtectedUnauthRoute>
          <ProtectedUnauthRoute path="/forgot-password" exact={true}>
            <ForgotPassword />
          </ProtectedUnauthRoute>
          <ProtectedUnauthRoute path="/reset-password" exact={true}>
            <ResetPassword />
          </ProtectedUnauthRoute>

          <ProtectedAuthRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedAuthRoute>

          <ModalSwitch />
        
        </Switch>
      </Router>
    </>
  )
}

const ModalSwitch = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const back = () => {
    history.goBack();
    dispatch({
      type: STOP_VIEW_CURRENT_INGREDIENT
    })
  };
  
  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact={true}>
              <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor/>
                </DndProvider>
              </main>
        </Route>
        <Route path="/ingredients/:id">
          <IngredientDetails />
        </Route>

        <Route path="*">
            <NotFound404 />
          </Route>
      </Switch>

      {background && 
        <Route path="/ingredients/:id"
          children={<Modal header={'Детали ингредиента'} onClose={back}>
                      <IngredientDetails />
                    </Modal>}
        />
      }
    </>
  )
}

export default App;
