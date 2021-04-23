const asyncMiddleware = (store) => (next) => async (action) => {
  if (typeof action.payload !== "function") {
    next(action);
    return;
  }

  store.dispatch({
    type: `${action.type}/PENDING`,
  });

  try {
    const result = await action.payload(store.dispatch, store.getState);
    console.log("result", JSON.stringify(result, null, 2));
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
