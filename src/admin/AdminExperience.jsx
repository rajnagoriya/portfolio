import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import toast from "react-hot-toast";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import DateRangePicker from "./components/DateRangePicker.jsx";

const EMPTY_EXPERIENCE = {
  role: "",
  type: "Intern",
  discription: [""],
  technology: [""],
  date: "",
};

export default function AdminExperience() {
  const { experience, experienceActions } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_EXPERIENCE);
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setFormData(EMPTY_EXPERIENCE);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setFormData({
      role: item.role,
      type: item.type,
      discription: [...(item.description || item.discription || [""])],
      technology: [...(item.technology || [""])],
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
    if (!formData.role.trim()) {
      toast.error("Role is required");
      return;
    }
    if (!formData.date.trim()) {
      toast.error("Please select start date");
      return;
    }

    const payload = {
      ...formData,
      discription: formData.discription.filter(Boolean),
      technology: formData.technology.filter(Boolean),
    };

    if (editingId) {
      experienceActions.update(editingId, payload);
      toast.success("Experience updated");
    } else {
      experienceActions.add(payload);
      toast.success("Experience added");
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this experience?")) {
      experienceActions.remove(id);
      toast.success("Experience removed");
      resetForm();
    }
  };

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const updateArrayField = (field, index, value) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((v, i) => (i === index ? value : v)),
    }));

  const addArrayItem = (field) =>
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeArrayItem = (field, index) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  const showForm = isAdding || editingId;

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-600/80 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";

  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-100">Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200"
        >
          <RiAddLine className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/60 border border-zinc-700/80 rounded-2xl p-6 space-y-5 shadow-xl shadow-black/20">
          <h3 className="text-base font-semibold text-white">
            {editingId ? "Edit Experience" : "New Experience"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Role</label>
              <input
                value={formData.role}
                onChange={(e) => updateField("role", e.target.value)}
                className={inputClass}
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select
                value={formData.type}
                onChange={(e) => updateField("type", e.target.value)}
                className={inputClass}
              >
                <option value="Intern">Intern</option>
                <option value="FullStack Developer">FullStack Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Date range</label>
            <DateRangePicker
              value={formData.date}
              onChange={(v) => updateField("date", v)}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            {formData.discription.map((d, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={d}
                  onChange={(e) => updateArrayField("discription", i, e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Bullet point"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("discription", i)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("discription")}
              className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
            >
              + Add line
            </button>
          </div>

          <div>
            <label className={labelClass}>Technologies</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technology.map((t, i) => (
                <div key={i} className="flex items-center gap-1">
                  <input
                    value={t}
                    onChange={(e) => updateArrayField("technology", i, e.target.value)}
                    className="w-28 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-600/80 text-white text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    placeholder="Tech"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("technology", i)}
                    className="p-1.5 rounded text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addArrayItem("technology")}
              className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
            >
              + Add tech
            </button>
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
        {experience.map((item) => (
          <div
            key={item.id}
            className="group flex items-start justify-between gap-4 p-4 bg-zinc-900/60 border border-zinc-700/60 rounded-xl hover:border-zinc-600/80 hover:bg-zinc-800/40 transition-all duration-200"
          >
            <div>
              <h4 className="font-medium text-white">{item.role}</h4>
              <p className="text-sm text-zinc-400 mt-0.5">
                {item.type} · {item.date}
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
