import { produce } from "immer";

export const initialFilmState = {
    films : [],
    loading : true,
    error : null,
    query : '',
    favorites : []
}

export function filmReducer(state, action) {

    //state.films, state.loading, state.error, state.query, state.favorites

    return produce(state, draft => {
        switch (action.type) {
            case 'FETCH_START':
                {

                    draft.loading = true;
                    draft.error = null;
                    break;
                }
            case 'FETCH_SUCCESS':
                {

                    draft.films = action.payload;
                    draft.loading = false;
                    break;
                }
            case 'FETCH_ERROR':
                {
                    draft.error = action.payload;
                    draft.loading = false;
                    break;
                }
            case 'SET_QUERY':
                {

                    draft.query = action.payload;
                    break;
                }
            case 'TOGGLE_FAVORITE':
                {

                    const filmID = action.payload;
                    if (draft.favorites.includes(filmID))
                        draft.favorites = draft.favorites.filter(
                            id => id !== filmID
                        );
                    else
                        draft.favorites.push(filmID);

                    break;
                }
            case 'ADD_FILM':
                {
                    draft.films.push(action.payload);
                    break;
                }
            case 'ADD_NOTIFICATION':
                {

                    draft.notifications.push(
                        {
                            id: Date.now(),
                            message: action.payload.message,
                            type: action.payload.type
                        }
                    )
                    break;
                }
            case 'DISMISS_NOTIFICATION': {
                const id = action.payload
                draft.notifications = draft.notifications.filter(
                    n => n.id !== id
                )
                break;
            }
            default:
                throw new Error(`Nieznana akcja ${action.type}`)
        }
    });

}