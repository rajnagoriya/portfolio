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





// import Header from "./components/header";
// import ContactPage from "./pages/ContactPage";
// import ExpirencePage from "./pages/ExpirencePage";
// import Page1 from "./pages/page1";
// import ProjectPage from "./pages/ProjectPage";
// import SkillsPage from "./pages/SkillsPage";


// function App() {

//   return (
//    <>
//     <Header/>
//     <Page1/>
//     <SkillsPage/>
//     <ProjectPage/>
//     <ExpirencePage/>
//     <ContactPage/>
//     </>
//   )
// }

// export default App;