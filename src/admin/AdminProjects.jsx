import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import toast from "react-hot-toast";
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiExternalLinkLine } from "react-icons/ri";

const EMPTY_PROJECT = {
  heading: "",
  tag: "Fullstack",
  discription: [""],
  technology: [""],
  link: "",
  img: "",
};

export default function AdminProjects() {
  const { projects, projectActions } = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PROJECT);
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setFormData(EMPTY_PROJECT);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (item) => {
    setFormData({
      heading: item.heading,
      tag: item.tag,
      discription: [...(item.description || item.discription || [""])],
      technology: [...(item.technology || [""])],
      link: item.link || "",
      img: item.img || "",
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.heading.trim()) {
      toast.error("Heading is required");
      return;
    }

    const desc = formData.discription.filter(Boolean);
    const payload = {
      ...formData,
      description: desc,
      discription: desc,
      technology: formData.technology.filter(Boolean),
    };

    if (editingId) {
      projectActions.update(editingId, payload);
      toast.success("Project updated");
    } else {
      projectActions.add(payload);
      toast.success("Project added");
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      projectActions.remove(id);
      toast.success("Project removed");
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
        <h2 className="text-lg font-semibold text-zinc-100">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-200"
        >
          <RiAddLine className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/60 border border-zinc-700/80 rounded-2xl p-6 space-y-5 shadow-xl shadow-black/20">
          <h3 className="text-base font-semibold text-white">
            {editingId ? "Edit Project" : "New Project"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input
                value={formData.heading}
                onChange={(e) => updateField("heading", e.target.value)}
                className={inputClass}
                placeholder="Project name"
              />
            </div>
            <div>
              <label className={labelClass}>Tag</label>
              <select
                value={formData.tag}
                onChange={(e) => updateField("tag", e.target.value)}
                className={inputClass}
              >
                <option value="Fullstack">Fullstack</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Link</label>
            <input
              value={formData.link}
              onChange={(e) => updateField("link", e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              value={formData.img}
              onChange={(e) => updateField("img", e.target.value)}
              className={inputClass}
              placeholder="https://..."
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
        {projects.map((item) => (
          <div
            key={item.id}
            className="group flex items-start justify-between gap-4 p-4 bg-zinc-900/60 border border-zinc-700/60 rounded-xl hover:border-zinc-600/80 hover:bg-zinc-800/40 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white">{item.heading}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {item.tag}
                </span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-emerald-400 transition-colors"
                    title="Open link"
                  >
                    <RiExternalLinkLine className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
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
