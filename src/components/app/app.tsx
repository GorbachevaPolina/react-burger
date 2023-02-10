import React, { useEffect, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, HashRouter, Route, Switch, useLocation, useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useDispatch } from '../../services/types/hooks';

import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';
import NotFound404 from '../../pages/not-found-404';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { STOP_VIEW_CURRENT_INGREDIENT } from '../../services/action-types/current-ingredient-actions';
import { getIngredients } from '../../services/actions/burger-ingredients';

import { Location } from 'history'; 
import Feed from '../../pages/feed';
import Order from '../../pages/order';
import ProfileOrders from '../../pages/profile-orders';

const App : FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <HashRouter>
        <AppHeader />
        <Switch>

          <ProtectedRoute onlyForAuth={false} path="/login" exact={true}>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/register" exact={true}>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/forgot-password" exact={true}>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/reset-password" exact={true}>
            <ResetPassword />
          </ProtectedRoute>

          <ProtectedRoute onlyForAuth={true} path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>

          <ModalSwitch />
        
        </Switch>
      </HashRouter>
    </>
  )
}

const ModalSwitch = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation<{background: Location}>();
  const background = location.state && location.state.background;

  const back = () : void => {
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

        <Route path="/feed" exact={true}>
          <Feed />
        </Route>

        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>

        <Route path="/feed/:id" exact={true}>
          <Order />
        </Route>

        <ProtectedRoute onlyForAuth={true} path="/profile/orders" exact={true}>
            <ProfileOrders />
          </ProtectedRoute>

        <ProtectedRoute onlyForAuth={true} path="/profile/orders/:id" exact={true}>
          <Order />
        </ProtectedRoute>

        <Route path="*" exact={true}>
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

      {background && 
        <Route path="/feed/:id"
          children={<Modal header={null} onClose={back}>
                      <Order />
                    </Modal>}
        />
      }

      {background && 
        <ProtectedRoute onlyForAuth={true} path="/profile/orders/:id"
          children={<Modal header={null} onClose={back}>
                      <Order />
                    </Modal>}
        />
      }
    </>
  )
}

export default App;
