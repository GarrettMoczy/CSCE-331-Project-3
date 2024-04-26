'use client'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection"
import Description from "./components/Description/Description";
import Translate from "./components/Translate/Translate";

export default function Home() {
    return (
        <main>
            <div className='fixed right-0 bottom-3 z-[999]'>
                <Translate></Translate>
            </div>

            <Navbar />
            <HeroSection />
            <Description />

            <div>

                Paco Paco mfers
            </div>

        </main>
    );
}
