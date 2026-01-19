

export default class HttpError extends Error {
  errorCode: string;
  constructor(errorMessage: string, errorCode: string) {
    super(errorMessage);
    this.errorCode = errorCode
  }
}
