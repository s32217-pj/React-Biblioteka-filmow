'use client';

import {createContext, useContext, useEffect, useReducer} from 'react';

import { filmReducer,initialFilmState} from '../reducers/filmReducer';

const FilmStateContext = createContext(null);
const FilmDispatchContext = createContext(null);

export function FilmProvider({ children }) {

    const [state, dispatch] = useReducer(filmReducer,initialFilmState);

    useEffect(() => {

        let cancelled = false;

        async function fetchFilms() {

            dispatch({ type: 'FETCH_START' });

            try {
                const res = await fetch('/api/filmy');

                if (!res.ok) {
                    throw new Error('Błąd pobierania filmów');
                }

                const data = await res.json();

                if (!cancelled) {
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        payload: data
                    });
                }

            } catch (err) {

                if (!cancelled) {
                    dispatch({
                        type: 'FETCH_ERROR',
                        payload: err.message
                    });
                }
            }
        }

        fetchFilms();

        return () => {
            cancelled = true;
        };

    }, []);

    return (
        <FilmStateContext.Provider value={state}>
            <FilmDispatchContext.Provider value={dispatch}>
                {children}
            </FilmDispatchContext.Provider>
        </FilmStateContext.Provider>
    );
}

export function useFilmState() {

    const context = useContext(FilmStateContext);

    if (context === null)
        throw new Error('useFilmState moze byc uzyty tylko wewnatrz FilmProvider');

    return context;
}

// 4. HOOK: DISPATCH
export function useFilmDispatch() {

    const context = useContext(FilmDispatchContext);

    if (context === null) {
        throw new Error(
            'useFilmDispatch musi być użyty wewnątrz FilmProvider'
        );
    }

    return context;
}