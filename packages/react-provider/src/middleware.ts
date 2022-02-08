const asyncMiddleware = (store) => (next) => async (action) => {
  if (typeof action.payload !== "function") {
    next(action);
    return;
  }

  store.dispatch({
    type: `${action.type}/PENDING`,
    meta: action.meta,
  });

  try {
    const result = await action.payload(store.dispatch, store.getState);
    store.dispatch({
      type: `${action.type}/DONE`,
      payload: result,
    });
  } catch (ex) {
    store.dispatch({
      type: `${action.type}/ERROR`,
      ex,
    });
  }
};

export default [asyncMiddleware];
