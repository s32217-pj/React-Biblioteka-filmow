'use client';

import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function FilmyPage() {

    let [refreshKey, setRefreshKey] = useState(0);
    let { data, loading, error } = useFetch('/api/filmy?v=' + refreshKey);

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p className="text-danger">Błąd: {error}</p>;

    return (
        <>
            <div className="container py-4">
                <div className="row g-3">

                    {data.map(film => (
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