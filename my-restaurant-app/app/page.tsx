'use client'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection"
import Description from "./components/Description/Description";
import Translate from "./components/Translate/Translate";

export default function Home() {
    return (
        <main>
            <div className='fixed right-0 bottom-3 z-[999]'>
            <div className='fixed right-0 bottom-3 z-[999] p-4 bg-white rounded-lg'>
                <Translate></Translate>
            </div>

            </div>

            <Navbar />
            <HeroSection />
            <Description />
        </main>
    );
}
