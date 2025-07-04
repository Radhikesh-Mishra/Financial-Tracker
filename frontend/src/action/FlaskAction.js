import { suggestions } from '../api/FlaskApi';

export const smartSuggestions = ( expenses ) => async (dispatch) => {
    try {
        const { data } = await suggestions(expenses);
        return data;
    }   catch (error) {
        console.error("Error fetching suggestions:", error);
    }
}