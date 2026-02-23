import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import toast from "react-hot-toast";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";

const EMPTY_SKILL = { name: "", logo: "" };

export default function AdminSkills() {
  const { skills, skillActions } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_SKILL);
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setFormData(EMPTY_SKILL);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, logo: item.logo || "" });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (editingId) {
      skillActions.update(editingId, formData);
      toast.success("Skill updated");
    } else {
      skillActions.add(formData);
      toast.success("Skill added");
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this skill?")) {
      skillActions.remove(id);
      toast.success("Skill removed");
      resetForm();
    }
  };

  const showForm = isAdding || editingId;

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-600/80 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";

  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-100">Skills</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200"
        >
          <RiAddLine className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/60 border border-zinc-700/80 rounded-2xl p-6 space-y-5 shadow-xl shadow-black/20">
          <h3 className="text-base font-semibold text-white">
            {editingId ? "Edit Skill" : "New Skill"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name</label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={inputClass}
                placeholder="e.g. React"
              />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input
                value={formData.logo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, logo: e.target.value }))
                }
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          {formData.logo && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">Preview:</span>
              <img
                src={formData.logo}
                alt={formData.name}
                className="w-12 h-12 object-contain rounded-lg bg-zinc-800 p-1 border border-zinc-700"
                onError={(e) => e.target.style.display = "none"}
              />
            </div>
          )}

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between gap-2 p-3 bg-zinc-900/60 border border-zinc-700/60 rounded-xl hover:border-zinc-600/80 hover:bg-zinc-800/40 transition-all duration-200"
          >
            <div className="flex items-center gap-2 min-w-0">
              {item.logo && (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-9 h-9 object-contain flex-shrink-0 rounded-lg bg-zinc-800/80 p-1"
                />
              )}
              <span className="truncate text-sm font-medium text-zinc-200">
                {item.name}
              </span>
            </div>
            <div className="flex gap-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded-lg bg-zinc-700/80 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 transition-colors"
                title="Edit"
              >
                <RiEditLine className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-red-900/30 hover:bg-red-500/20 text-red-400 transition-colors"
                title="Delete"
              >
                <RiDeleteBinLine className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
