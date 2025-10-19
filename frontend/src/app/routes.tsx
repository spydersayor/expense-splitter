import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './guard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';

const GroupsListPage = lazy(() =>
  import('../features/groups/GroupsListPage').then((m) => ({ default: m.GroupsListPage }))
);
const GroupDetailLayout = lazy(() =>
  import('../features/groups/GroupDetailLayout').then((m) => ({ default: m.GroupDetailLayout }))
);

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size={48} />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/groups"
          element={
            <RequireAuth>
              <GroupsListPage />
            </RequireAuth>
          }
        />

        <Route
          path="/groups/:groupId/:tab?"
          element={
            <RequireAuth>
              <GroupDetailLayout />
            </RequireAuth>
          }
        />

        <Route path="/" element={<Navigate to="/groups" replace />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
                <p className="text-gray-600 dark:text-gray-400">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}
