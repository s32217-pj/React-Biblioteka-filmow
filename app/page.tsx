import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-5 text-center">

      <h1 className="mb-4 fw-bold">
        🎬 Twoja Biblioteka Filmów
      </h1>

      <p className="lead mb-5">
        Dodawaj własne filmy, przeglądaj kolekcję i buduj swoją bibliotekę.
        Wszystko w jednym miejscu.
      </p>

      <div className="d-flex justify-content-center gap-3">

        <Link
          href="/filmy"
          className="btn btn-dark btn-lg"
        >
          Zobacz filmy
        </Link>

        <Link
          href="/filmy/dodaj"
          className="btn btn-success btn-lg"
        >
          Dodaj film
        </Link>

      </div>

    </div>
  );
}