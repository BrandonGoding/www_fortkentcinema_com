import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";
import HeroSection from "./components/hero_section";
import NowPlaying from "./components/now_playing";
import Showtimes from "./components/showtimes";
import Rates from "./components/rates";
import './utils/spotlight/spotlight.jsx';
import './utils/spotlight/spotlight.scss';
import ComingSoonPage from "./pages/coming_soon_page/coming_soon_page";
import BlogRollPage from "./pages/blog_roll_page/blog_roll_page";
import BlogDetailPage from "./pages/blog_detail_page/blog_detail_page";
import {useEffect} from "react";
import {initGA, trackPageview} from "./analytics";
import films from "./films.json"
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import Archive from "./pages/archive_page/archive_page";

function App() {
    return (
        <Router>
            <LocationTracker/>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header/>
                                <div className="Body">
                                    <HeroSection/>
                                    <NowPlaying films={films}/>
                                    <Showtimes/>
                                    <Rates/>
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="archive"
                        element={
                            <>
                                <Header/>
                                <div className="Body">
                                    <Archive films={films} />
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="fort-kent-cinema-blog"
                        element={
                            <>
                                <Header/>
                                <div className="Body">
                                    <BlogRollPage/>
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="fort-kent-cinema-blog/:slug"
                        element={
                            <>
                                <Header/>
                                <div className="Body">
                                    <BlogDetailPage/>
                                </div>
                                <Footer/>
                            </>

                        }
                    />
                    <Route
                        path="coming-soon"
                        element={
                            <>
                                <Header/>
                                <div className="Body">
                                    <ComingSoonPage films={films}/>
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <LoginPage />
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <SignupPage />
                        }
                    />
                </Routes>
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
