import "./App.css";

/* Import Components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Button from "./components/Button";
import BasketTitle from "./components/BasketTitle";
import BasketTotal from "./components/BasketTotal";
import Counter from "./components/Couter";

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
  const [counter, setCounter] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
    newCounter.push(1);
    setCounter(newCounter);
  };

  /* Basket */
  const meals = (meal) => {
    const newMeal = [...inBasket];
    if (inBasket.length === 0) {
      newMeal.push({
        title: meal.title,
        id: meal.id,
        quantity: 1,
        price: meal.price,
      });
      setInBasket(newMeal);
      counters();
    }

    let isPresent = false;
    if (inBasket.length > 0) {
      for (let i = 0; i < inBasket.length; i++) {
        if (inBasket[i].id === meal.id) {
          isPresent = true;
        }
      }
      if (isPresent === false) {
        newMeal.push({
          title: meal.title,
          id: meal.id,
          quantity: 1,
          price: meal.price,
        });
        setInBasket(newMeal);
        counters();
      }
    }
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
          <Categories data={data} meals={meals} />

          <div className="basket">
            <Button />
            {inBasket.length > 0 ? (
              inBasket.map((elem, index) => {
                console.log(elem);
                return (
                  <div key={elem.id}>
                    <div className="basket-count">
                      <Counter
                        counter={counter}
                        setCounter={setCounter}
                        index={index}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        subPrice={subPrice}
                      />
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
                <div>
                  <p>Sous-total</p>
                  <span>{subPrice()} €</span>
                </div>

                <div>
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
