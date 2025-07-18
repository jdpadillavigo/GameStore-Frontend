import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGamesContext, Game } from '../../contexts/GamesContext';
import { FaWindows, FaApple, FaLinux, FaPlaystation, FaXbox } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './GameCatalog.css';

const GameCatalog = () => {
  const { games } = useGamesContext();

  const minPrice = 0;
  const maxPrice = 300;
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  type FilterType = 'categories' | 'platforms' | 'discounts' | 'prices';

  const [filteredGames, setFilteredGames] = useState<{ [key: string]: Game }>({});
  const [filters, setFilters] = useState<{
    categories: string[];
    platforms: string[];
    discounts: boolean;
    prices: boolean;
  }>({
    categories: [],
    platforms: [],
    discounts: false,
    prices: false,
  });

  useEffect(() => {
    applyFilters();
  }, [games, filters, priceRange]);

  const handleCheckboxChange = (type: FilterType, value?: string) => {
    setFilters((prev) => {
      if (type === "discounts") {
        return { ...prev, discounts: !prev.discounts };
      }

      if (type === "categories" && value) {
        const updatedCategories = prev.categories.includes(value)
          ? []
          : [value];

        return { ...prev, categories: updatedCategories };
      }

      const list = prev[type as 'platforms'];
      const updatedList = list.includes(value || '')
        ? list.filter((item) => item !== value)
        : [...list, value];

      return { ...prev, [type]: updatedList };
    });
  };

  const applyFilters = () => {
    const result = Object.fromEntries(
      Object.entries(games).filter(([_, game]) => {
        const finalPrice = game.discount > 0
          ? game.base_price * (100 - game.discount) / 100
          : game.base_price;

        const matchPrice = finalPrice >= priceRange[0] && finalPrice <= priceRange[1];

        const matchCategory =
          filters.categories.length === 0 ||
          filters.categories.some(cat =>
            game.category?.toLowerCase().includes(cat.toLowerCase())
          );

        const matchPlatform =
          filters.platforms.length === 0 ||
          filters.platforms.some(pf =>
            game.platform?.toLowerCase().split(',').some((platform) =>
              platform.trim().toLowerCase().includes(pf.toLowerCase())
            )
          );

        const matchDiscount = !filters.discounts || game.discount > 0;

        return matchPrice && matchCategory && matchPlatform && matchDiscount;
      })
    );

    setFilteredGames(result);
  };

  return (
    <div className="catalog-page">
      <h2>Juegos</h2>
      <section className='catalog-page__content'>
        <div className='catalog-page__content__games'>
          {Object.entries(filteredGames).length === 0 ?
            <p className='catalog-page__content__games__no-results'>No se encontraron resultados.</p>
          :
            Object.entries(filteredGames).map(([key, game]) => (
              <Link to={`/juego/${key}`}>
                <img src={game.images[0]} alt={game.title} />
                <div className='catalog-page__content__games__info'>
                  <div className='catalog-page__content__games__info__title-stars'>
                    <p>{game.title}</p>
                    <p>
                      Valoración:
                      {game.reviews.length > 0
                        ? ` ${(game.reviews.reduce((sum, review) => sum + review.stars, 0) / game.reviews.length).toFixed(1)} de 5 estrellas`
                        : " Desconocida"}
                    </p>
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
            ))
          }
        </div>
        <div className="catalog-page__content__filters">
          <h3>Filtrar por</h3>

          <div className="catalog-page__content__filters__section">
            <h4>Precio (S/.)</h4>
            <div className="catalog-page__content__filters__section__price">
              <div className="catalog-page__content__filters__section__price__inputs">
                <div className="catalog-page__content__filters__section__price__inputs__min-max">
                  <label>Mínimo:</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    min={minPrice}
                    max={priceRange[1]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  />
                </div>
                <div className="catalog-page__content__filters__section__price__inputs__min-max">
                  <label>Máximo:</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    min={priceRange[0]}
                    max={maxPrice}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  />
                </div>
              </div>

              <div className="catalog-page__content__filters__section__price__range">
                {/* <label>Rango:</label> */}
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onChange={(value: number | number[]) => {
                    if (Array.isArray(value)) {
                      setPriceRange([value[0], value[1]]);
                    } else {
                      setPriceRange([value, value]);
                    }
                  }}
                  railStyle={{ backgroundColor: '#ccc', height: 5 }}
                  trackStyle={{ backgroundColor: 'darkred', height: 5 }}
                  handleStyle={{
                    border: 0,
                    backgroundColor: 'darkred',
                    height: 12,
                    width: 12,
                    marginTop: -3,
                  }}
                />
                {/* <span>De S/. {priceRange[0]} a S/. {priceRange[1]}</span> */}
              </div>
            </div>
          </div>

          <div className="catalog-page__content__filters__section">
            <h4>Categorías</h4>
            <p>
              <input
                type="checkbox"
                id="top-sellers"
                checked={filters.categories.includes("más vendido")}
                onChange={() => handleCheckboxChange("categories", "más vendido")}
              />
              <label htmlFor="top-sellers">Más vendidos</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="top-rated"
                checked={filters.categories.includes("mejor valorado")}
                onChange={() => handleCheckboxChange("categories", "mejor valorado")}
              />
              <label htmlFor="top-rated">Mejor valorados</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="free"
                checked={filters.categories.includes("gratuito")}
                onChange={() => handleCheckboxChange("categories", "gratuito")}
              />
              <label htmlFor="free">Gratuitos</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="multiplayer"
                checked={filters.categories.includes("multijugador")}
                onChange={() => handleCheckboxChange("categories", "multijugador")}
              />
              <label htmlFor="multiplayer">Multijugador</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="early-access"
                checked={filters.categories.includes("acceso temprano")}
                onChange={() => handleCheckboxChange("categories", "acceso temprano")}
              />
              <label htmlFor="early-access">Acceso temprano</label>
            </p>
          </div>

          <div className="catalog-page__content__filters__section">
            <h4>Plataformas</h4>
            <p>
              <input
                type="checkbox"
                id="windows"
                onChange={() => handleCheckboxChange("platforms", "windows")}
              />
              <label htmlFor="windows">Windows</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="macos"
                onChange={() => handleCheckboxChange("platforms", "macos")}
              />
              <label htmlFor="macos">MacOS</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="linux"
                onChange={() => handleCheckboxChange("platforms", "linux")}
              />
              <label htmlFor="linux">Linux</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="playstation"
                onChange={() => handleCheckboxChange("platforms", "playstation")}
              />
              <label htmlFor="playstation">PlayStation</label>
            </p>
            <p>
              <input
                type="checkbox"
                id="xbox"
                onChange={() => handleCheckboxChange("platforms", "xbox")}
              />
              <label htmlFor="xbox">Xbox</label>
            </p>
          </div>

          <div className="catalog-page__content__filters__section">
            <h4>Ofertas especiales</h4>
            <p>
              <input
                type="checkbox"
                id="discounts"
                onChange={() => handleCheckboxChange("discounts")}
              />
              <label htmlFor="discounts">Con descuento</label>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameCatalog;