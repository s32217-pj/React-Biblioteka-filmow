'use client';

import { useFilmDispatch, useFilmState } from "../context/FilmContext";

export default function FavoriteButton({ filmId }) {

    const state = useFilmState();
    const dispatch = useFilmDispatch();

    const isFavorite = state.favorites.includes(filmId);

    const handleToggle = () => {
        dispatch({
            type: 'TOGGLE_FAVORITE',
            payload: filmId
        });
    };

    return (
        <button
            className={`btn px-3 my-2 shadow text-white ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleToggle}>

            {isFavorite ? '★ Ulubiony' : '☆ Dodaj'}
        </button>
    );
}