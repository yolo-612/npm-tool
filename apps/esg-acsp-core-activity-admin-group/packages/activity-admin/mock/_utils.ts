export function resultSuccess<T>(obj: T, { errorCode = '', errorMessage = '' } = {}) {
  return {
    success: true,
    obj,
    errorCode,
    errorMessage,
  };
}

export function resultError({ obj = null, errorCode = 500, errorMessage = '' } = {}) {
  return {
    success: false,
    obj,
    errorCode,
    errorMessage,
  };
}
