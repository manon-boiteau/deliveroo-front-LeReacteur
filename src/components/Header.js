import logo from "../assets/img/deliveroo-logo.svg";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <img src={logo} alt="Deliveroo logo." />
      </div>
    </header>
  );
};

export default Header;
