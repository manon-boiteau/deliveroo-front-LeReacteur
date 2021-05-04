import "./App.css";

/* Import Components */
import Counter from "./components/Couter";

/* Import Axios */
import axios from "axios";

/* Import useState() & useEffect() from React */
import { useState, useEffect } from "react";

/* Import images */
import logo from "./assets/img/deliveroo-logo.svg";

/* Import Fontawsome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faStar, faSpinner);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [inBasket, setInBasket] = useState([]);
  const [counter, setCounter] = useState([]);

  /* Import data from server */
  const fetchData = async () => {
    const response = await axios.get(
      "https://deliveroo-lereacteur.herokuapp.com/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* Counter */
  const counters = () => {
    const newCounter = [...counter];
    newCounter.push(0);
    setCounter(newCounter);
  };

  const meals = (meal, id) => {
    const newMeal = [...inBasket];
    if (inBasket.length === 0) {
      newMeal.push(meal);
      setInBasket(newMeal);
    }
    if (inBasket.length > 0) {
      const arr = [];
      for (let i = 0; i < inBasket.length; i++) {
        if (inBasket[i].id !== id) {
          arr.push(1);
        }
      }
    }
  };

  return isLoading ? (
    <span className="spin">
      {/* <FontAwesomeIcon icon="spinner" spin /> */}
      En cours de chargement...
    </span>
  ) : (
    <>
      <header>
        <div className="wrapper">
          <img src={logo} alt="Deliveroo logo." />
        </div>
      </header>

      <main>
        <div className="description">
          <div className="wrapper">
            <div>
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div>
              <img
                src={data.restaurant.picture}
                alt="Brunch Le Pain Quotidien."
              />
            </div>
          </div>
        </div>

        <div className="wrapper categories">
          {data.categories.map((elem, index) => {
            return (
              elem.meals.length > 0 && (
                <div key={index}>
                  <h2>{elem.name}</h2>
                  <div className="bloc">
                    {elem.meals.map((elem, index) => {
                      return (
                        <div
                          key={elem.id}
                          className="bloc-meal"
                          onClick={() => {
                            meals(elem, elem.id);
                            counters();
                          }}
                        >
                          <div className="bloc-detail">
                            {elem.title ? <h3>{elem.title}</h3> : null}
                            {elem.description ? (
                              <p>{elem.description}</p>
                            ) : null}
                            <div>
                              <span>{elem.price} €</span>
                              {elem.popular ? (
                                <FontAwesomeIcon
                                  icon="star"
                                  className="icon-star"
                                />
                              ) : null}
                              <span className="star">
                                {elem.popular ? "Populaire" : null}
                              </span>
                            </div>
                          </div>
                          <div>
                            {elem.picture ? (
                              <img src={elem.picture} alt={elem.title} />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
          <div className="basket">
            <button>Valider mon panier</button>
            {inBasket.length > 0 ? (
              inBasket.map((elem, index) => {
                return (
                  <div key={elem.id}>
                    <Counter
                      counter={counter}
                      setCounter={setCounter}
                      index={index}
                      key={index}
                    />

                    <span>{elem.title}</span>
                    <span>{elem.price} €</span>
                    <span>Sous-total</span>
                    <span></span>
                    <span>Frais de livraison</span>
                    <span>2,50 €</span>
                    <span>Total</span>
                    <span>{elem.price} €</span>
                  </div>
                );
              })
            ) : (
              <p>Votre panier est vide</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

/* <div className="basket">
  <button>Valider mon panier</button>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span>Sous-total</span>
  <span></span>
  <span>Frais de livraison</span>
  <span></span>
  <span>Total</span>
  <span></span>
</div> */

// const newMeal = [...inBasket];
// newMeal.push(elem);
// setInBasket(newMeal); // OK
