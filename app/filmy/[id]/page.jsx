import { notFound } from 'next/navigation';
import NotFound from './not-found';


export default async function Page({ params }) {
    const { id } = await params;
    let response = await fetch(`http://localhost:3000/api/filmy/`);

    if (!response.ok)
        notFound();

    const result = await response.json();
    const film = result.find(f => f.id === parseInt(id));

    if (!film)
        notFound();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
            <div className="col-md-6">

                <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">Film ID: {id}</h4>
                </div>

                <div className="card-body">
                    <h2 className="card-title mb-3">
                    {film.title}
                    </h2>

                    <p className="card-text mb-2">
                    <span className="fw-bold">Year:</span> {film.year}
                    </p>

                    <p className="card-text">
                    <span className="fw-bold">Genre:</span> {film.genre}
                    </p>
                </div>

                </div>

            </div>
            </div>
        </div>
    );
}