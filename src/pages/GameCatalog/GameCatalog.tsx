import { Link } from 'react-router-dom';
import { useGamesContext } from '../../contexts/GamesContext';
import { FaWindows, FaApple, FaLinux, FaPlaystation, FaXbox } from 'react-icons/fa';
import './GameCatalog.css';

const GameCatalog = () => {
  const { games } = useGamesContext();

  return (
    <div className="catalog-page">
      <h2>Juegos</h2>
      <section className='catalog-page__content'>
        <div className='catalog-page__content__games'>
          {Object.entries(games).map(([key, game]) => (
            <Link to={`/game/${key}`}>
              <img src={game.images[0]} alt={game.title} />
              <div className='catalog-page__content__games__info'>
                <div className='catalog-page__content__games__info__title-stars'>
                  <p>{game.title}</p>
                  <p>Valoración: {(game.reviews.reduce((sum, review) => sum + review.stars, 0) / game.reviews.length).toFixed(1)} de 5 estrellas</p>
                </div>
                <div className='catalog-page__content__games__info__date'>
                  <p>{game.release_date}</p>
                </div>
                <div className='catalog-page__content__games__info__platform'>
                  {game.platform?.toLowerCase().includes('windows') && <FaWindows size={30} color="#00A4EF" />}
                  {game.platform?.toLowerCase().includes('macos') && <FaApple size={30} color="#A2AAAD" />}
                  {game.platform?.toLowerCase().includes('linux') && <FaLinux size={30} color="#FCC624" />}
                  {game.platform?.toLowerCase().includes('playstation') && <FaPlaystation size={30} color="#003791" />}
                  {game.platform?.toLowerCase().includes('xbox') && <FaXbox size={30} color="#107C10" />}
                </div>
                <div className='catalog-page__content__games__info__discount-price'>
                  {game.discount > 0 ?
                    <>
                      <p className='catalog-page__content__games__info__discount-price__discount'>
                        -{game.discount}%
                      </p>
                      <div className='catalog-page__content__games__info__discount-price__prices'>
                        <p className='catalog-page__content__games__info__discount-price__prices__old'>
                          S/. {game.base_price.toFixed(2)}
                        </p>
                        <p className='catalog-page__content__games__info__discount-price__prices__new'>
                          S/. {(game.base_price * (100 - game.discount) / 100).toFixed(2)}
                        </p>
                      </div>
                    </>
                  :
                    <p className='catalog-page__content__games__info__discount-price__base-price'>
                      S/. {game.base_price.toFixed(2)}
                    </p>
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="catalog-page__content__filters">
          <h3>Filtrar por</h3>

          <div className="catalog-page__content__filters__section">
            <h4>Categorías</h4>
            <p>
              <input type="checkbox" id="top-sellers" /> <label htmlFor="top-sellers">Más vendidos</label>
            </p>
            <p>
              <input type="checkbox" id="top-rated" /> <label htmlFor="top-rated">Mejor valorados</label>
            </p>
            <p>
              <input type="checkbox" id="free" /> <label htmlFor="free">Gratuitos</label>
            </p>
            <p>
              <input type="checkbox" id="multiplayer" /> <label htmlFor="multiplayer">Multijugador</label>
            </p>
            <p>
              <input type="checkbox" id="early-access" /> <label htmlFor="early-access">Acceso temprano</label>
            </p>
          </div>

          <div className="catalog-page__content__filters__section">
            <h4>Plataformas</h4>
            <p>
              <input type="checkbox" id="windows" /> <label htmlFor="windows">Windows</label>
            </p>
            <p>
              <input type="checkbox" id="macos" /> <label htmlFor="macos">MacOS</label>
            </p>
            <p>
              <input type="checkbox" id="linux" /> <label htmlFor="linux">Linux</label>
            </p>
            <p>
              <input type="checkbox" id="playstation" /> <label htmlFor="playstation">PlayStation</label>
            </p>
            <p>
              <input type="checkbox" id="xbox" /> <label htmlFor="xbox">Xbox</label>
            </p>
          </div>

          <div className="catalog-page__content__filters__section">
            <h4>Ofertas especiales</h4>
            <p>
              <input type="checkbox" id="discounts" /> <label htmlFor="discounts">Con descuento</label>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameCatalog;