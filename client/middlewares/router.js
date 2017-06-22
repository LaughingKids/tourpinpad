export default function routerMiddleware({ getState }) {
  return (next) =>
    (action) => {
      next(action);
    };
}
