import "./App.css";

/* Import Components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Button from "./components/Button";
import BasketTitle from "./components/BasketTitle";

/* Import Axios */
import axios from "axios";

/* Import useState() & useEffect() from React */
import { useState, useEffect } from "react";

/* Import Fontawsome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faStar, faSpinner);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [inBasket, setInBasket] = useState([]);

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

  /* Basket */
  const addMeals = (meal) => {
    const newMeal = [...inBasket];

    const isPresent = newMeal.find((elem) => elem.id === meal.id);

    if (isPresent) {
      isPresent.quantity++;
      setInBasket(newMeal);
    } else {
      newMeal.push({
        title: meal.title,
        id: meal.id,
        quantity: 1,
        price: meal.price,
      });
      setInBasket(newMeal);
    }
  };

  const removeMeals = (meal) => {
    const newMeal = [...inBasket];

    const isPresent = newMeal.find((elem) => elem.id === meal.id);

    if (meal.quantity === 1) {
      const index = newMeal.indexOf(isPresent);
      newMeal.splice(index, 1);
    } else {
      isPresent.quantity--;
    }
    setInBasket(newMeal);
  };

  const subPrice = () => {
    let result = 0;
    for (let i = 0; i < inBasket.length; i++) {
      result += Number(inBasket[i].price) * Number(inBasket[i].quantity);
    }
    return result;
  };

  const totalPrice = () => {
    return subPrice() + 2.5;
  };

  return isLoading ? (
    <span className="spin">
      {/* <FontAwesomeIcon icon="spinner" spin /> */}
      En cours de chargement...
    </span>
  ) : (
    <>
      <Header />
      <main>
        <Hero data={data} />

        <div className="wrapper categories">
          <Categories data={data} addMeals={addMeals} />

          <div className="basket">
            <Button />
            {inBasket.length > 0 ? (
              inBasket.map((elem, index) => {
                return (
                  <div key={elem.id}>
                    <div className="basket-count">
                      <div className="counter">
                        <button
                          className="btn-minus"
                          index={index}
                          onClick={() => {
                            removeMeals(elem);
                          }}
                        >
                          -
                        </button>
                        <span index={index}>{elem.quantity}</span>
                        <button
                          className="btn-plus"
                          index={index}
                          onClick={() => {
                            addMeals(elem);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <BasketTitle elem={elem} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Votre panier est vide</p>
            )}
            {inBasket.length > 0 && (
              <>
                <div className="sub-tot-1">
                  <p>Sous-total</p>
                  <span>{subPrice()} €</span>
                </div>

                <div className="sub-tot-2">
                  <p>Frais de livraison</p>
                  <span>2,50 €</span>
                </div>

                <div>
                  <p>Total</p>
                  <span>{totalPrice()} €</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
