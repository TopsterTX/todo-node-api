export const errorHandler = (message: string, code: number = 400) => ({
  message: `Error. ${message}`,
  code,
});
