import { Inter } from "next/font/google";
import LandingHeader from "@/headers/landing-header";
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import Technology from "@/components/Technology";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/footers/Footer";
import Button from "@/buttons/Button";
import Connect from "@/components/Connect";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex w-screen min-h-screen flex-col items-center ${inter.className}`}
    >
      <div className="sticky top-0 w-full z-50">
        <LandingHeader />
      </div>
      
      <div className="w-screen h-screen">
        <HeroSection />
      </div>

      <div className="w-screen h-screen md:my-16">
        <WhoWeAre/>
      </div>

      <div className="w-screen h-full">
        <Connect />
      </div>

      <div className="relative w-screen h-screen mt-60 mb-40">
      <div className="absolute inset-0 bg-tech-bg bg-contain bg-no-repeat bg-center opacity-80 filter z-0"></div>
        <p className="text-gray-300 font-mono pl-40 xl:pl-28 lg:pl-10 sm:pl-4">TECHNOLOGY</p>
        <Technology />
      </div>

      <div className="w-full h-screen">
        <p className="text-gray-300 font-mono pl-40 xl:pl-28 lg:pl-4 sm:pl-2">COMING SOON</p>
        <ComingSoon />
      </div>
      
      <div 
        className="flex md:flex-col md:space-y-4 items-center justify-center text-white w-full h-full px-60 2xl:px-36 xl:px-28 halfxl:px-16 my-52 xl:my-20 md:my-16 space-x-8 md:space-x-0 halfxl:space-x-4"
      >
        <div className="flex flex-col text-3xl sm:text-xl font-semibold xl:w-[700px] lg:w-[500px] halflg:w-[400px] md:w-full md:text-center space-y-4">
          <p>Ready to join the most inclusive literary community? </p>
          <p>Join our platform today! </p>
        </div>
        
        <Link href="/signin">
          <Button 
            title="Sign up"
            buttonRadius='rounded-3xl'
          />
        </Link>
       
      </div>

      <div className="bottom-0 w-full">
        <Footer />
      </div>

    </main>
  );
}
