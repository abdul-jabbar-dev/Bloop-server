import TMeta from "./TMeta";

type TResponse<T> = {
  status?: true;
  message: string;
  meta?: TMeta;
  data?: T;
};
export default TResponse;
