import TMeta from "./TMeta";

type TResponse<T> = {
  meta?: TMeta;
  data: T;
};
export default TResponse;
