import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const linkVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
      },
    },
  };
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
      <motion.div
        variants={linkVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-20 self-center"
      >
        <Link to="/aktiviteter" className="buttonStyle pt-3.5 px-20">
          Kom i gang
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
