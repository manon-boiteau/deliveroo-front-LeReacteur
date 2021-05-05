/* Import Fontawsome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Categories = ({ data, meals }) => {
  return (
    <>
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
                        meals(elem);
                      }}
                    >
                      <div className="bloc-detail">
                        {elem.title ? <h3>{elem.title}</h3> : null}
                        {elem.description ? <p>{elem.description}</p> : null}
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
    </>
  );
};

export default Categories;
