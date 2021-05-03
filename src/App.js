import "./App.css";

/* Import Axios */
import axios from "axios";

/* Import useState() & useEffect() from React */
import { useState, useEffect } from "react";

/* Import images */
import logo from "./assets/img/deliveroo-logo.svg";

/* Import Fontawsome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://git.heroku.com/deliveroo-lereacteur.git"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
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
              <div key={index}>
                <h2>{elem.name}</h2>
                <div className="bloc">
                  {elem.meals.map((elem, index) => {
                    return (
                      <div key={index} className="bloc-meal">
                        <div className="bloc-detail">
                          <h3>{elem.title}</h3>
                          <p>{elem.description}</p>
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
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
