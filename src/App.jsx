import { Suspense, lazy } from "react";
import Header from "./components/Header";
import FullPageLoader from "./components/FullPageLoader";

const Page1 = lazy(() => import("./pages/page1"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ExpirencePage = lazy(() => import("./pages/ExpirencePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  return (
    <>
      
      <Suspense fallback={<FullPageLoader/>}>
      <Header />
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