import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <p>ubunto</p>
      <p className="font-secondaryLogoText text-large text-transparent secondLogoStroke">
        LANDRUP
      </p>
      <p className="font-primaryLogoText text-logoLarge text-logoText leading-4 logoStroke">
        DANS
      </p>
      <div>
        <button className="buttonStyle mb-10 mt-10">Button</button>
      </div>
      <Link to="/home" className="buttonStyle">
        Link
      </Link>
    </>
  );
};

export default Home;
