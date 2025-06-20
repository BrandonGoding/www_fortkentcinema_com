import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HeroSection from "./components/hero_section/hero_section";
import NowPlaying from "./components/now_playing/now_playing";
import Showtimes from "./components/showtimes/showtimes";
import Rates from "./components/rates/rates";
import './utils/spotlight/spotlight.js'
import './utils/spotlight/spotlight.scss';
import ComingSoonPage from "./pages/coming_soon_page/coming_soon_page";
import BlogRollPage from "./pages/blog_reel_page/blog_reel_page";
import BlogDetailPage from "./pages/blog_detail_page/blog_detail_page";

const films  = [
    { title: 'Karate Kid: Legends', start: '2025-06-06', end: '2025-06-20', rating: "PG-13", length: "1h 34m", youtubeId: "LhRXf-yEQqA", imdbId: "tt1674782" },
    { title: 'How to Train Your Dragon', start: '2025-06-13', end: '2025-07-02',rating: "PG", length: "2h 5m", youtubeId: "22w7z_lT6YM", imdbId: "tt26743210" },
    { title: 'Elio', start: '2025-06-20', end: '2025-07-11', rating: "PG", length: "1h 39m", youtubeId: "ETVi5_cnnaE", imdbId: "tt4900148" },
    { title: 'Jurassic World Rebirth', start: '2025-07-02', end:  '2025-07-25', youtubeId: "smavD1fopZ8" },
    { title: 'Superman (Unconfirmed)', start: '2025-07-11', end:   '2025-07-25', youtubeId: "y2dfTxk58mg" },
];




function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="Body">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <HeroSection/>
                                    <NowPlaying films={films} />
                                    <Showtimes/>
                                    <Rates/>
                                </>
                            }
                        />
                        <Route
                            path="fort-kent-cinema-blog"
                            element={
                                <BlogRollPage />
                            }
                        />
                        <Route path="fort-kent-cinema-blog/:slug" element={<BlogDetailPage />} />
                        <Route
                            path="coming-soon"
                            element={
                                <ComingSoonPage films={films} />
                            }
                        />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
