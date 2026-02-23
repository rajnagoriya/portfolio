import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PortfolioDataProvider } from "./context/PortfolioDataContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import FullPageLoader from "./components/FullPageLoader.jsx";

const HireMeHeader = lazy(() => import("./components/HireMeHeader.jsx"));
const Page1 = lazy(() => import("./pages/page1.jsx"));
const SkillsPage = lazy(() => import("./pages/SkillsPage.jsx"));
const ProjectPage = lazy(() => import("./pages/ProjectPage.jsx"));
const ExpirencePage = lazy(() => import("./pages/ExpirencePage.jsx"));
const EducationPage = lazy(() => import("./pages/EducationPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));

function PortfolioLayout() {
  return (
    <>
      <Suspense fallback={<FullPageLoader />}>
        <HireMeHeader />
        <Page1 />
        <ExpirencePage />
        <ProjectPage />
        <SkillsPage />
        <EducationPage />
        <ContactPage />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioLayout />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<FullPageLoader />}>
                    <AdminPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortfolioDataProvider>
    </AuthProvider>
  );
}

export default App;
