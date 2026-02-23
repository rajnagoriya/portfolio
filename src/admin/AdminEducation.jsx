import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import toast from "react-hot-toast";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import DateRangePicker from "./components/DateRangePicker.jsx";

const EMPTY_EDUCATION = {
  degree: "",
  institution: "",
  grade: "",
  location: "",
  date: "",
};

export default function AdminEducation() {
  const { education, educationActions } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_EDUCATION);
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setFormData(EMPTY_EDUCATION);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setFormData({
      degree: item.degree || "",
      institution: item.institution || "",
      grade: item.grade || "",
      location: item.location || "",
      date: item.date || "",
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.degree.trim()) {
      toast.error("Degree is required");
      return;
    }
    if (!formData.institution.trim()) {
      toast.error("Institution is required");
      return;
    }
    if (!formData.date.trim()) {
      toast.error("Please select date range");
      return;
    }

    const payload = {
      ...formData,
      grade: formData.grade.trim(),
      location: formData.location.trim(),
    };

    if (editingId) {
      educationActions.update(editingId, payload);
      toast.success("Education updated");
    } else {
      educationActions.add(payload);
      toast.success("Education added");
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this education entry?")) {
      educationActions.remove(id);
      toast.success("Education removed");
      resetForm();
    }
  };

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const showForm = isAdding || editingId;

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-600/80 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";

  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-100">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200"
        >
          <RiAddLine className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/60 border border-zinc-700/80 rounded-2xl p-6 space-y-5 shadow-xl shadow-black/20">
          <h3 className="text-base font-semibold text-white">
            {editingId ? "Edit Education" : "New Education"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Degree</label>
              <input
                value={formData.degree}
                onChange={(e) => updateField("degree", e.target.value)}
                className={inputClass}
                placeholder="e.g. BCA, MCA"
              />
            </div>
            <div>
              <label className={labelClass}>Institution</label>
              <input
                value={formData.institution}
                onChange={(e) => updateField("institution", e.target.value)}
                className={inputClass}
                placeholder="e.g. Govt. Holkar Science College"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Grade (optional)</label>
              <input
                value={formData.grade}
                onChange={(e) => updateField("grade", e.target.value)}
                className={inputClass}
                placeholder="e.g. CGPA: 7.40"
              />
            </div>
            <div>
              <label className={labelClass}>Location (optional)</label>
              <input
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                className={inputClass}
                placeholder="e.g. Indore, India"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Date range</label>
            <DateRangePicker
              value={formData.date}
              onChange={(v) => updateField("date", v)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all"
            >
              Save
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-lg bg-zinc-700/80 hover:bg-zinc-600 text-zinc-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {education.map((item) => (
          <div
            key={item.id}
            className="group flex items-start justify-between gap-4 p-4 bg-zinc-900/60 border border-zinc-700/60 rounded-xl hover:border-zinc-600/80 hover:bg-zinc-800/40 transition-all duration-200"
          >
            <div>
              <h4 className="font-medium text-white">{item.degree}</h4>
              <p className="text-sm text-zinc-400">
                {item.institution} · {item.date}
              </p>
            </div>
            <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-700/80 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400 text-sm font-medium transition-colors"
              >
                <RiEditLine className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
              >
                <RiDeleteBinLine className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
