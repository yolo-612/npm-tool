const EMP_CODE_KEY = 'emp_code';

const getEmpCode = () => {
  return localStorage.getItem(EMP_CODE_KEY);
};

const setEmpCode = (empCode: string) => {
  localStorage.setItem(EMP_CODE_KEY, empCode);
};

const clearEmpCode = () => {
  localStorage.removeItem(EMP_CODE_KEY);
};

export { getEmpCode, setEmpCode, clearEmpCode };
