import { useState } from "react";
import AdminLayout from "../admin/AdminLayout.jsx";
import AdminExperience from "../admin/AdminExperience.jsx";
import AdminEducation from "../admin/AdminEducation.jsx";
import AdminProjects from "../admin/AdminProjects.jsx";
import AdminSkills from "../admin/AdminSkills.jsx";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import toast from "react-hot-toast";
import { RiRefreshLine } from "react-icons/ri";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("experience");
  const { resetToDefaults } = usePortfolioData();

  const handleReset = () => {
    if (window.confirm("Reset all data to default? This cannot be undone.")) {
      resetToDefaults();
      toast.success("Data reset to default");
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-zinc-400 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <RiRefreshLine className="w-4 h-4" />
          Reset to Default
        </button>
      </div>

      {activeTab === "experience" && <AdminExperience />}
      {activeTab === "education" && <AdminEducation />}
      {activeTab === "projects" && <AdminProjects />}
      {activeTab === "skills" && <AdminSkills />}
    </AdminLayout>
  );
}
