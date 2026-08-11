import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import AssistantPage from './pages/AssistantPage';
import CoursesPage from './pages/CoursesPage';
import ForumPage from './pages/ForumPage';
import DashboardPage from './pages/DashboardPage';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
