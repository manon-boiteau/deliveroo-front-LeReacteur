const BasketTitle = ({ elem }) => {
  return (
    <div className="basket-title">
      <p>{elem.title}</p>
      <span>{elem.price} €</span>
    </div>
  );
};

export default BasketTitle;
