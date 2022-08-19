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

export default [asyncMiddleware];
