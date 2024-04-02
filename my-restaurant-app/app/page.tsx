'use client'
import Navbar from "./components/Navbar/Navbar"; 
import HeroSection from "./components/HeroSection/HeroSection"
import Description from "./components/Description/Description";

export default function Home() {
    return (
        <main>
            <Navbar /> 
            <HeroSection />
            <Description />
            <div>
                Paco Paco mfers
            </div>
        </main>
    );
}
