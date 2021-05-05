const Hero = ({ data }) => {
  return (
    <div className="description">
      <div className="wrapper">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div>
          <img src={data.restaurant.picture} alt="Brunch Le Pain Quotidien." />
        </div>
      </div>
    </div>
  );
};

export default Hero;
