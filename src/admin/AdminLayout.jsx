import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { RiLogoutBoxLine, RiBriefcaseLine, RiFolderLine, RiStarLine, RiGraduationCapLine } from "react-icons/ri";

const TABS = [
  { id: "experience", label: "Experience", icon: RiBriefcaseLine },
  { id: "education", label: "Education", icon: RiGraduationCapLine },
  { id: "projects", label: "Projects", icon: RiFolderLine },
  { id: "skills", label: "Skills", icon: RiStarLine },
];

export default function AdminLayout({ children, activeTab, onTabChange }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <RiBriefcaseLine className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold font-[anzo3] tracking-tight">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-sm font-medium transition-all duration-200"
        >
          <RiLogoutBoxLine className="w-4 h-4" />
          Logout
        </button>
      </header>

      <nav className="border-b border-zinc-800/80 bg-zinc-900/30 px-6">
        <div className="flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  isActive
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : ""}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
