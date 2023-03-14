import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center"
      style={{
        backgroundImage: `url('/images/splash-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center max-w-[242px] mt-28">
        <p className="font-secondaryLogoText text-large text-transparent secondLogoStroke">
          LANDRUP
        </p>
        <p className="font-primaryLogoText text-logoLarge text-logoText leading-4 logoStroke mb-10">
          DANS
        </p>
        <div className="max-w-[242px] w-full h-[15px] bg-logoBar"></div>
      </div>
      <Link
        to="/activities"
        className="buttonStyle pt-3 absolute bottom-20 self-center"
      >
        Kom i gang
      </Link>
    </div>
  );
};

export default Home;
