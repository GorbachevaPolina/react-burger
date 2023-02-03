import type { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from "../actions/socket";
import type { TApplicationActions, AppDispatch, RootState } from '../types/store'

const wsUrl = "wss://norma.nomoreparties.space/orders"

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return next => (action: TWSActions) => {
            const { dispatch } = store;
            const { type } = action;
       
            if (type === `WS_CONNECTION_START`) {
              if (socket !== null) {
                socket.close();
              }
              socket = new WebSocket(`${wsUrl}${action.payload}`);
            }
            
            if (socket) {
              socket.onopen = event => {
                dispatch({ type: `WS_CONNECTION_SUCCESS`, payload: event });
              };
              socket.onerror = event => {
                dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
              };
              socket.onmessage = event => {
                const { data } = event;
                dispatch({ type: 'WS_GET_MESSAGE', payload: data });
              };
              socket.onclose = event => {
                dispatch({ type: 'WS_CONNECTION_CLOSED' });
              };
      
              if (type === 'WS_SEND_MESSAGE') {
                const message = action.payload;
                socket.send(JSON.stringify(message));
              }

              if (type === "WS_CONNECTION_CLOSED") {
                if (socket !== null) {
                  socket.close();
                }
                socket = null;
              }

            }
      
            next(action);
          };
          }) as Middleware;
      }; 