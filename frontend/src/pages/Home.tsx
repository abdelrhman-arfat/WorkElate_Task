import FeaturedBooks from "../components/card/FeaturedBooks";
import ImageHomeSection from "../components/ui/ImageHomeSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <ImageHomeSection />
      <FeaturedBooks />
    </div>
  );
};

export default Home;
