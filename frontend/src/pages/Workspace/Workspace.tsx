import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Plus,
  Folder,
  Bot,
  Database,
  Terminal,
  LogOut,
  Settings,
} from "lucide-react";

const projects = [
  {
    id: "1",
    name: "E-Commerce AI Assistant",
    type: "Multi-Agent System",
    updated: "2 hours ago",
    status: "Active",
  },
  {
    id: "2",
    name: "Legal Knowledge Base RAG",
    type: "Vector RAG",
    updated: "1 day ago",
    status: "Completed",
  },
  {
    id: "3",
    name: "Automated Code Reviewer",
    type: "Agentic Workflow",
    updated: "3 days ago",
    status: "Draft",
  },
];

export default function Workspace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between bg-black/20">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-2">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg">RAG Factory</span>
          </div>

          <nav className="space-y-2">
            <Link
              to="/workspace"
              className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl font-medium"
            >
              <Folder size={18} /> Projects
            </Link>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2.5 rounded-xl transition"
            >
              <Bot size={18} /> AI Agents
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2.5 rounded-xl transition"
            >
              <Database size={18} /> RAG Knowledge
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2.5 rounded-xl transition"
            >
              <Terminal size={18} /> Deployments
            </a>
          </nav>
        </div>

        <div className="space-y-2 pt-6 border-t border-white/10">
          <a
            href="#"
            className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2 rounded-xl transition"
          >
            <Settings size={18} /> Settings
          </a>
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Workspace</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your AI agent configurations and RAG architecture projects.
            </p>
          </div>

          <button
            onClick={() => navigate("/new-project")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition"
          >
            <Plus size={18} /> New Project
          </button>
        </header>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {proj.type}
                </span>
                <span className="text-xs text-gray-400">{proj.status}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{proj.name}</h3>
              <p className="text-xs text-gray-500">Updated {proj.updated}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}