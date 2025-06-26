import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HeroSection from "./components/hero_section/hero_section";
import NowPlaying from "./components/now_playing/now_playing";
import Showtimes from "./components/showtimes/showtimes";
import Rates from "./components/rates/rates";
import './utils/spotlight/spotlight.jsx';
import './utils/spotlight/spotlight.scss';
import ComingSoonPage from "./pages/coming_soon_page/coming_soon_page";
import BlogRollPage from "./pages/blog_reel_page/blog_reel_page";
import BlogDetailPage from "./pages/blog_detail_page/blog_detail_page";
import {useEffect} from "react";
import {initGA, trackPageview} from "./analytics";
import films from "./films.json"


function App() {
    return (
        <Router>
            <LocationTracker />
            <div className="App">
                <Header />
                <div className="Body">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <HeroSection />
                                    <NowPlaying films={films} />
                                    <Showtimes />
                                    <Rates />
                                </>
                            }
                        />
                        <Route
                            path="fort-kent-cinema-blog"
                            element={<BlogRollPage />}
                        />
                        <Route
                            path="fort-kent-cinema-blog/:slug"
                            element={<BlogDetailPage />}
                        />
                        <Route
                            path="coming-soon"
                            element={<ComingSoonPage films={films} />}
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

function LocationTracker() {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        trackPageview(location.pathname + location.search);
    }, [location]);

    return null;
}

export default App;