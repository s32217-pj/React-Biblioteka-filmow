'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useFetch from "../hooks/useFetch";

export default function FilmyPage() {

    let [refreshKey, setRefreshKey] = useState(0);
    let [searchQuery, setSearchQuery] = useState('');

    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    let { data, loading, error } = useFetch('/api/filmy?v=' + refreshKey);

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p className="text-danger">Błąd: {error}</p>;


    const filteredMovies = (data ?? []).filter(film =>
        film.title.toLowerCase().includes(
            searchQuery.toLowerCase()
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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