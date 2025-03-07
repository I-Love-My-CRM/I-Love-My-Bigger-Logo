import LogoUpscaler from "./logo-upscaler/upscaler";
import Footer from "./footer";

function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-50 to-indigo-100 relative">
      {/* Content with glass effect */}
      <div className="relative z-10 pt-10 pb-10 px-4 flex flex-col min-h-screen">
        <div className="flex-grow">
          <LogoUpscaler />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
