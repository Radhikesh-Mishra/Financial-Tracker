const initialState = {
  user: null,
  token: null,
  loading: false,
  errors: null,
  message: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, errors: null, message: '' };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        errors: null,
        message: action.payload.message || 'Authenticated successfully'
      };

    case 'AUTH_FAIL':
      return {
        ...state,
        loading: false,
        errors: action.payload,
        message: action.payload || 'Authentication failed'
      };

    case 'LOGOUT':
      localStorage.clear();
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
