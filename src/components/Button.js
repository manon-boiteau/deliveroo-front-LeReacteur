const Button = ({ disabled, setDisabled, inBasket }) => {
  return inBasket.length > 0 ? (
    <button className="validation">Valider mon panier</button>
  ) : (
    <button className="btn-disabled" disabled={disabled}>
      Valider mon panier
    </button>
  );
};

export default Button;
