import Hadith from "./(components)/home/Hadith";
import Hero from "./(components)/home/Hero";
import Personalized from "./(components)/home/Personalized";
import TrackAdvancement from "./(components)/home/TrackAdvancement";

const page = () => {
  return (
    <>
      <Hero />
      <Personalized />
      <TrackAdvancement />
      <Hadith />
    </>
  );
};

export default page;
