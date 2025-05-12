import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
//import StoryCreate from './components/stories/StoryCreate';
//import StoryEdit from './components/stories/StoryEdit';
//import LearningPlan from './pages/LearningPlans';
//import SearchResults from './pages/SearchResults';

// Lazy-loaded components
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'));

function App() {
  const { user, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/recipe/:id" element={user ? <RecipeDetail /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;