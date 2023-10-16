type TError = {
  name: string;
  message: String;
  statusCode: number;
  path?: { path: string; message?: string };
};
export default TError;
