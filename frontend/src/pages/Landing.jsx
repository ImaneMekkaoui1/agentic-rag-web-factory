import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  BrainCircuit,
  Database,
  Bot,
  Code2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Agents",
    description:
      "Autonomous agents that plan, design and generate complete application architectures.",
  },
  {
    icon: Database,
    title: "RAG Knowledge Engine",
    description:
      "Retrieve accurate context from your private knowledge base powered by vector search.",
  },
  {
    icon: Bot,
    title: "Multi-Agent Workflow",
    description:
      "Planner, Architect, Developer and Reviewer agents collaborating together.",
  },
  {
    icon: Code2,
    title: "Code Generation",
    description:
      "Generate production-ready frontend and backend application structures.",
  },
];

const workflow = [
  "Knowledge Retrieval",
  "Requirement Analysis",
  "Architecture Design",
  "Code Generation",
  "AI Review",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden scroll-smooth">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-2">
            <Sparkles size={22} />
          </div>
          <span className="text-xl font-bold">Agentic RAG Factory</span>
        </div>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#workflow" className="hover:text-white transition">
            Workflow
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
        </div>

        <div className="flex gap-3">
          {/* Sign In Button */}
          <button
            onClick={() => navigate("/sign in")}
            className="rounded-xl border border-white/20 px-5 py-2 hover:bg-white/10 transition"
          >
            Sign In
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => navigate("/sign up")}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 font-medium hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-purple-300">
              <Sparkles size={16} />
              Next Generation AI Development Platform
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
              Build Applications <br />
              with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Autonomous AI Agents
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-400">
              A modular AI platform combining LLMs, RAG and intelligent agents
              to automatically design, generate and improve modern web applications.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              {/* Start Building */}
              <button
                onClick={() => navigate("/Workspace")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-4 font-semibold hover:scale-105 transition"
              >
                Start Building
                <ArrowRight size={18} />
              </button>

              {/* Explore Demo */}
              <a
                href="#workflow"
                className="rounded-xl border border-white/20 px-7 py-4 hover:bg-white/10 transition inline-block"
              >
                Explore Demo
              </a>
            </div>
          </motion.div>

          {/* AI Workflow Preview (avec ID pour le scroll) */}
          <motion.div
            id="workflow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >
            <div className="grid md:grid-cols-5 gap-4">
              {workflow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-xl bg-black/30 border border-white/10 p-5"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-8 py-32">
        <h2 className="text-center text-4xl font-bold">
          Everything needed for AI-powered development
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                whileHover={{ y: -5 }}
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <Icon className="text-purple-400" size={35} />
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-8 pb-16 text-center">
        <h2 className="text-3xl font-bold">About Agentic RAG Factory</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Agentic RAG Factory connects advanced retrieval architecture with multi-agent orchestration to build full-stack web solutions autonomously.
        </p>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-center">
          <h2 className="text-4xl font-bold">
            Start creating intelligent applications today
          </h2>
          <p className="mt-4 text-white/80">
            Let AI agents transform your ideas into complete software solutions.
          </p>

          <button
            onClick={() => navigate("/NewProject")}
            className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-black hover:bg-gray-100 transition hover:scale-105"
          >
            Create your first project
          </button>
        </div>
      </section>
    </div>
  );
}