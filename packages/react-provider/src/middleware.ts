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
  const middlewares: any[] = [];
  let store;

  const enhancer = (_store) => {
    store = _store;
    return (next) => (action) => {
      return compose(...middlewares.map((m) => m.middleware))(next)(action);
    };
  };

  const addMiddleware = (middleware: {
    id: string;
    middleware: Middleware;
  }) => {
    if (middlewares.find((m) => m.id === middleware.id)) {
      return;
    }

    middlewares.push({
      ...middleware,
      middleware: middleware.middleware(store),
    });
  };

  return {
    enhancer,
    addMiddleware,
  };
};

const dynamicMiddlewaresInstance = createDynamicMiddlewares();

export const { addMiddleware } = dynamicMiddlewaresInstance;

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
