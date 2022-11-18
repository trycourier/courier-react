import { Middleware } from "./middleware";
function compose(...funcs) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
export interface Action {
  type: any;
}

export interface Dispatch {
  <A extends Action>(action: A): A;
}

export interface MiddlewareAPI<S> {
  dispatch: Dispatch;
  getState(): S;
}

export interface Middleware {
  <S>(api: MiddlewareAPI<S>): (next: Dispatch) => Dispatch;
}

const createDynamicMiddlewares = () => {
  const middlewares: Array<{
    id: string;
    middleware: Middleware;
  }> = [];
  let store;

  const enhancer = (_store) => {
    store = _store;
    return (next) => (action) => {
      return compose(...middlewares.map((m) => m.middleware(store)))(next)(
        action
      );
    };
  };

  const registerMiddleware = (id: string, middleware: Middleware) => {
    if (middlewares.find((m) => m.id === id)) {
      return;
    }

    middlewares.push({
      id,
      middleware,
    });
  };

  return {
    enhancer,
    registerMiddleware,
  };
};

const dynamicMiddlewaresInstance = createDynamicMiddlewares();

export const { registerMiddleware } = dynamicMiddlewaresInstance;

const asyncMiddleware = (store) => (next) => async (action) => {
  if (typeof action.payload !== "function") {
    next(action);
    return;
  }

  store.dispatch({
    meta: action.meta,
    type: `${action.type}/PENDING`,
  });

  try {
    const result = await action.payload(store.dispatch, store.getState);
    store.dispatch({
      meta: action.meta,
      payload: result,
      type: `${action.type}/DONE`,
    });
  } catch (ex) {
    store.dispatch({
      ex,
      meta: action.meta,
      type: `${action.type}/ERROR`,
    });
  }
};

export default [asyncMiddleware, dynamicMiddlewaresInstance.enhancer];
