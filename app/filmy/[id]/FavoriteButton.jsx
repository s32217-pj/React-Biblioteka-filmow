'use client'

export default function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    }
    
    return (
        <button className="btn btn-outline-primary mt-3" onClick={toggleFavorite}>
            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
    );
}