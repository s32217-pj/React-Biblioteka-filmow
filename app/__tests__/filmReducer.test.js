import {filmReducer, initialFilmState} from '../reducers/filmReducer';

describe('filmReducer', () => {

    test('FETCH_START ustawia loading=true', () => {

        const state = filmReducer(
            initialFilmState,
            { type: 'FETCH_START' }
        );

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);

    });

    test('FETCH_SUCCESS zapisuje filmy', () => {

        const films = [
            { id: 1, title: 'Matrix' }
        ];

        const state = filmReducer(
            initialFilmState,
            {
                type: 'FETCH_SUCCESS',
                payload: films
            }
        );

        expect(state.loading).toBe(false);
        expect(state.films).toEqual(films);

    });

    test('FETCH_ERROR zapisuje error', () => {

        const state = filmReducer(
            initialFilmState,
            {
                type: 'FETCH_ERROR',
                payload: 'Błąd API'
            }
        );

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Błąd API');

    });

    test('SET_QUERY zmienia query', () => {

        const state = filmReducer(
            initialFilmState,
            {
                type: 'SET_QUERY',
                payload: 'matrix'
            }
        );

        expect(state.query).toBe('matrix');

    });

    test('TOGGLE_FAVORITE dodaje film do favorites', () => {

        const state = filmReducer(
            initialFilmState,
            {
                type: 'TOGGLE_FAVORITE',
                payload: 1
            }
        );

        expect(state.favorites).toContain(1);

    });

    test('TOGGLE_FAVORITE usuwa film z favorites', () => {

        const startState = {
            ...initialFilmState,
            favorites: [1]
        };

        const state = filmReducer(
            startState,
            {
                type: 'TOGGLE_FAVORITE',
                payload: 1
            }
        );

        expect(state.favorites).not.toContain(1);

    });

    test('Reducer immutability test', () => {

        const frozenState = Object.freeze({
            ...initialFilmState,
            favorites: Object.freeze([])
        });

        const newState = filmReducer(
            frozenState,
            {
                type: 'SET_QUERY',
                payload: 'Batman'
            }
        );

        expect(newState).not.toBe(frozenState);
        expect(frozenState.query).toBe('');
        expect(newState.query).toBe('Batman');

    });

    test('Reducer Unknown action', () => {

        expect(() => {

            filmReducer(
                initialFilmState,
                { type: 'DFDSFSDGGG##43434' }
            );

        }).toThrow();

    });

});