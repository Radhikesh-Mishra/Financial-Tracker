import * as AuthApi from '../api/AuthApi';

export const login = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.login(formData);
    dispatch({ type: 'AUTH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL', payload: error.response?.data?.message || 'Login failed' });
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.register(formData);
    dispatch({ type: 'AUTH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL', payload: error.response?.data?.message || 'Registration failed' });
  }
};

export const setBudgetLimit = (limit, userId) => async (dispatch) => {
  try{
    const { data } = await AuthApi.setBudgetLimit( limit, userId );
    console.log("Setting limits:", limit, "for user:", userId);
  } catch(err){
    console.log(err);
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  window.location.href = '/'; 
}; 
