'use client';

import { useState, useEffect, useRef, useReducer } from "react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { useFilmDispatch, useFilmState } from "../context/FilmContext";

export default function FilmyPage() {

    const state = useFilmState();
    const dispatch = useFilmDispatch();

    let [refreshKey, setRefreshKey] = useState(0);

    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    if (state.loading) return <p>Ładowanie...</p>;
    if (state.error) return <p className="text-danger">Błąd: {state.error}</p>;


    const filteredMovies = (state.films ?? []).filter(film =>
        film.title.toLowerCase().includes(
            state.query.toLowerCase()
        )
    )

    return (
        <>
            <div className="container py-4">

                <div className="row mb-4 g-2">

                    <div className="col-md-8">
                        <input
                            ref={searchRef}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Szukaj filmu..."
                            value={state.query}
                            onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                        />
                    </div>

                    <div className="col-md-2 d-grid">
                        <Link
                            href="/filmy/dodaj"
                            className="btn btn-success btn-lg"
                        >
                            Dodaj
                        </Link>
                    </div>

                    <div className="col-md-2 d-grid">
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => setRefreshKey(prev => prev + 1)}
                        >
                            Odśwież
                        </button>
                    </div>

                </div>


                <div className="row g-3">

                    {filteredMovies.map(film => (
                        <div key={film.id} className="col-md-6 col-lg-4">

                            <div className="card h-100 shadow-sm border-0 hover-shadow">

                                <div className="card-body d-flex flex-column">

                                    <h5 className="card-title fw-bold mb-3">
                                        {film.title}
                                    </h5>

                                    <p className="card-text text-muted mb-4">
                                        Informacje o filmie
                                    </p>

                                    <div className="mt-auto">
                                        <p className="mb-1">
                                            <span className="badge bg-dark me-2">Rok</span>
                                            {film.year}
                                        </p>

                                        <p className="mb-0">
                                            <span className="badge bg-secondary me-2">Gatunek</span>
                                            {film.genre}
                                        </p>

                                        <FavoriteButton filmId={film.id} />
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}