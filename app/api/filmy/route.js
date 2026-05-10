import { z } from 'zod';

let films = [
  { id: 1, title: 'Oppenheimer', year: 2023, genre: 'Dramat' },
  { id: 2, title: 'Dune: Czesc druga', year: 2024, genre: 'Sci-Fi' },
  { id: 3, title: 'Past Lives', year: 2023, genre: 'Romans' },
  { id: 4, title: 'Poor Things', year: 2023, genre: 'Komedia' }
]

const FilmSchema = z.object({
  title: z.string().min(2),
  year: z.number().int().min(1888).max(new Date().getFullYear() + 1),
  genre: z.string().min(1)
});


export async function GET() {
  return Response.json(films);
}

export async function POST(request) {
  const body = await request.json();

  const parsed = FilmSchema.safeParse(body);

  if (!parsed.success) {
    return new Response('Nieprawidłowy format danych', { status: 400 });
  }

  const newFilm = {
    id: films.length ? films[films.length - 1].id + 1 : 1,
    ...parsed.data
  };

  films.push(newFilm);
  return Response.json(newFilm, { status: 201 });
}