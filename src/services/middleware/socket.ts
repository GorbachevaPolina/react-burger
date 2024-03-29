import type { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from "../actions/socket";
import type { AppDispatch, RootState } from '../types/store'
import { TWS } from "../types/ws";

const wsUrl = "wss://norma.nomoreparties.space/orders"

export const socketMiddleware = (wsActions: TWS): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return next => (action: TWSActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
       
            if (type === wsInit) {
              if (socket !== null) {
                socket.close();
              }
              socket = new WebSocket(`${wsUrl}${action.payload}`);
            }
            
            if (socket) {
              socket.onopen = event => {
                dispatch({ type: onOpen, payload: event });
              };
              socket.onerror = event => {
                dispatch({ type: onError, payload: event });
              };
              socket.onmessage = event => {
                const { data } = event;
                dispatch({ type: onMessage, payload: data });
              };
              socket.onclose = event => {
                dispatch({ type: onClose });
              };
      
              if (type === wsSendMessage) {
                const message = action.payload;
                socket.send(JSON.stringify(message));
              }

              if (type === onClose) {
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