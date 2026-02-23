import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import experienceData from "../../data/experience.json";
import projectsData from "../../data/projects.json";
import skillsData from "../../data/skills.json";
import educationData from "../../data/education.json";

const STORAGE_KEYS = {
  experience: "portfolio_experience",
  projects: "portfolio_projects",
  skills: "portfolio_skills",
  education: "portfolio_education",
};

const VERSION_KEY = "portfolio_data_version";

// Bump this when you update the JSON files to force reload from files
const DATA_VERSION = 3;

const PortfolioDataContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== String(DATA_VERSION)) {
      localStorage.removeItem(STORAGE_KEYS.experience);
      localStorage.removeItem(STORAGE_KEYS.projects);
      localStorage.removeItem(STORAGE_KEYS.skills);
      localStorage.removeItem(STORAGE_KEYS.education);
      localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
      return fallback;
    }
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return fallback;
    }
  } catch {
    // ignore parse errors
  }
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.warn("Failed to save to localStorage");
  }
}

export function PortfolioDataProvider({ children }) {
  const [experience, setExperience] = useState(() =>
    loadFromStorage(STORAGE_KEYS.experience, experienceData)
  );
  const [projects, setProjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.projects, projectsData)
  );
  const [skills, setSkills] = useState(() =>
    loadFromStorage(STORAGE_KEYS.skills, skillsData)
  );
  const [education, setEducation] = useState(() =>
    loadFromStorage(STORAGE_KEYS.education, educationData)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.experience, experience);
  }, [experience]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.skills, skills);
  }, [skills]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.education, education);
  }, [education]);

  useEffect(() => {
    localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
  }, []);

  const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const experienceActions = useMemo(
    () => ({
      add: (item) =>
        setExperience((prev) => [...prev, { ...item, id: item.id || generateId("exp") }]),
      update: (id, updates) =>
        setExperience((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        ),
      remove: (id) => setExperience((prev) => prev.filter((item) => item.id !== id)),
    }),
    []
  );

  const projectActions = useMemo(
    () => ({
      add: (item) =>
        setProjects((prev) => [...prev, { ...item, id: item.id || generateId("proj") }]),
      update: (id, updates) =>
        setProjects((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        ),
      remove: (id) => setProjects((prev) => prev.filter((item) => item.id !== id)),
    }),
    []
  );

  const skillActions = useMemo(
    () => ({
      add: (item) =>
        setSkills((prev) => [...prev, { ...item, id: item.id || generateId("skill") }]),
      update: (id, updates) =>
        setSkills((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        ),
      remove: (id) => setSkills((prev) => prev.filter((item) => item.id !== id)),
    }),
    []
  );

  const educationActions = useMemo(
    () => ({
      add: (item) =>
        setEducation((prev) => [...prev, { ...item, id: item.id || generateId("edu") }]),
      update: (id, updates) =>
        setEducation((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        ),
      remove: (id) => setEducation((prev) => prev.filter((item) => item.id !== id)),
    }),
    []
  );

  const resetToDefaults = useCallback(() => {
    setExperience(experienceData);
    setProjects(projectsData);
    setSkills(skillsData);
    setEducation(educationData);
  }, []);

  const value = useMemo(
    () => ({
      experience,
      projects,
      skills,
      education,
      experienceActions,
      projectActions,
      skillActions,
      educationActions,
      resetToDefaults,
    }),
    [
      experience,
      projects,
      skills,
      education,
      experienceActions,
      projectActions,
      skillActions,
      educationActions,
      resetToDefaults,
    ]
  );

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    throw new Error("usePortfolioData must be used within PortfolioDataProvider");
  }
  return ctx;
}
