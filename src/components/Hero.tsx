import heroImage from "@/assets/birds-hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
          Bird Name Classification
        </h1>
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto">
          Upload an image and let AI identify the bird species with confidence scores and detailed information
        </p>
      </div>
    </section>
  );
};

export default Hero;
