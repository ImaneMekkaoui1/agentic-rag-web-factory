import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Database, Cpu, Sparkles, ArrowLeft } from "lucide-react";

const templates = [
  {
    id: "Multi-Agent",
    icon: Bot,
    title: "Multi-Agent",
    description: "Collaborative agents (Planner, Architect, Reviewer).",
  },
  {
    id: "RAG Pipeline",
    icon: Database,
    title: "RAG Pipeline",
    description: "Vector search contextual grounding engine.",
  },
  {
    id: "Agentic RAG",
    icon: Cpu,
    title: "Agentic RAG",
    description: "Full stack hybrid workflow with external tools.",
  },
];

export default function NewProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Multi-Agent");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          description: description,
          template: selectedTemplate,
        }),
      });

      if (response.ok) {
        navigate("/workspace");
      } else {
        console.error("Erreur lors de la création du projet");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      // Fallback de navigation si le backend n'est pas encore connecté
      navigate("/workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <h1 className="text-3xl font-bold">Create New AI Project</h1>
        <p className="text-gray-400 mt-2 mb-8">
          Configure your autonomous workflow, agents, and data retrieval parameters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Info Box */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Smart Customer Support Agent"
                required
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description & Goal</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your AI agents should accomplish..."
                required
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
              />
            </div>
          </div>

          {/* Architecture Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Architecture Template</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {templates.map((tmpl) => {
                const Icon = tmpl.icon;
                const isSelected = selectedTemplate === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected
                          ? "bg-purple-500 text-white"
                          : "bg-white/10 text-purple-400"
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold text-white">{tmpl.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{tmpl.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-xl border border-white/20 px-6 py-3 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold hover:scale-105 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              {loading ? "Initializing..." : "Initialize Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}