import { Suspense, lazy } from "react";
import FullPageLoader from "./components/FullPageLoader.jsx";
const HireMeHeader = lazy(() => import("./components/HireMeHeader.jsx") )
const Page1 = lazy(() => import("./pages/page1.jsx"));
const SkillsPage = lazy(() => import("./pages/SkillsPage.jsx"));
const ProjectPage = lazy(() => import("./pages/ProjectPage.jsx"));
const ExpirencePage = lazy(() => import("./pages/ExpirencePage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));

function App() {
  return (
    <>
      
      <Suspense fallback={<FullPageLoader/>}>
      <HireMeHeader />
        <Page1 />
        <SkillsPage />
        <ProjectPage />
        <ExpirencePage />
        <ContactPage />
      </Suspense>
    </>
  );
}

export default App;