import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackgroundFX from './components/BackgroundFX';
import Home from './pages/Home';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Join from './pages/Join';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <BackgroundFX />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {/* Keyed by URL so each navigation re-mounts the page and replays its
            entrance animation. Navbar and footer stay outside and never animate. */}
        <div key={location.pathname} className="animate-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
