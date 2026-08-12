import CoverImage from "../../assets/CoverImage.png";

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">

      {/* overlay screen halka back banauuna */}
      <div className=" bg-black/20 absolute inset-0"></div>
      <img
        src={CoverImage}
        alt="Cover"
        className="h-full w-full object-cover"
      />
      {/* Hero Info */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-lg px-10">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Nepal's Top  Online Marketplace
          </h1>

          <p className="mt-5 text-lg text-white/90">
            Discover fashion, electronics, and authentic Nepali products with
            fast delivery across Nepal.
          </p>

          <button className="mt-8 rounded-md bg-white px-6 py-3 font-semibold text-teal-600 hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;