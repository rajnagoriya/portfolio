import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { NavBar } from "../component/nav";
import { SideNave } from "../component/sideNav";
import { Footer } from "../component/footer";
import { MobileFooterNav } from "../component/mobileFooter";
import "../style/LayOut.css";
import Loading from "../component/shared/loading";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Project = lazy(() => import("../pages/Project"));
const Expirence = lazy(() => import("../pages/experience"));
const Resume = lazy(() => import("../pages/resume"));
const Profiles = lazy(() => import("../pages/profiles"));
const Education = lazy(() => import("../pages/education"));
const NotFound = lazy(() => import("../pages/notFound"));

const LayOut = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 600);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const location = useLocation();
    return (
        <>
            <NavBar isMobile={isMobile} />
            <div className="center">
                {location.pathname !== "/" ? (
                    <>
                        <div className="center1"><SideNave /></div>
                        <div className="center2"><Outlet /></div>
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
            {isMobile ? <MobileFooterNav /> : <Footer />}
        </>
    );
};

// Use Suspense to show fallback (loading component) while loading lazily
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/project",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Project />
                    </Suspense>
                ),
            },
            {
                path: "/expirence",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Expirence />
                    </Suspense>
                ),
            },
            {
                path: "/resume",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Resume />
                    </Suspense>
                ),
            },
            {
                path: "/education",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Education />
                    </Suspense>
                ),
            },
            {
                path: "/profiles",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Profiles />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotFound />
                    </Suspense>
                ),
            }
        ]
    }
]);
