"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "A modern web application built with React and Node.js",
    details:
      "This project is a full-stack web application that demonstrates modern web development practices. It includes features such as real-time updates, user authentication, and responsive design.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "Project 2",
    description: "E-commerce platform with advanced features",
    details:
      "An e-commerce platform that includes product management, shopping cart functionality, payment processing, and order tracking. The platform is built with scalability in mind.",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Django"],
  },
  {
    id: 3,
    title: "Project 3",
    description: "Mobile-first responsive website",
    details:
      "A responsive website that showcases modern design principles and mobile-first development. The site includes animations, interactive elements, and optimized performance.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <motion.div variants={itemVariants} className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={
            theme === "light"
              ? "ダークモードに切り替え"
              : "ライトモードに切り替え"
          }
        >
          {theme === "light" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ogmer Portfolio</h1>
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-500">
            <a
              href="https://github.com/ogmer"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              aria-label="GitHubプロフィールを開く"
            >
              <Image
                src="/profile.webp"
                alt="プロフィール画像"
                fill
                className="object-cover cursor-pointer"
                priority
              />
            </a>
          </div>
        </motion.div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          I&apos;m a web developer passionate about creating beautiful and
          functional websites.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="詳細情報を表示"
        >
          Learn More
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleProjectClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleProjectClick(project);
              }
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedProject ? selectedProject.title : "About Me"}
      >
        <div className="prose dark:prose-invert max-w-none">
          {selectedProject ? (
            <>
              <p className="mb-4">{selectedProject.details}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">
                I am a passionate web developer with experience in creating
                modern and responsive websites. My skills include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Frontend Development (React, Vue.js)</li>
                <li>Backend Development (Node.js, Python)</li>
                <li>UI/UX Design</li>
                <li>Responsive Web Design</li>
              </ul>
              <p className="mb-4">
                I love creating beautiful and functional websites that provide
                great user experiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p>Bachelor of Computer Science</p>
                  <p>University of Technology</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <p>5+ years of web development</p>
                  <p>3+ years of UI/UX design</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Contact</h3>
                <p>Email: example@email.com</p>
                <p>Phone: +1 234 567 890</p>
                <div className="flex gap-4 mt-2">
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label="LinkedInプロフィールを開く"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label="GitHubプロフィールを開く"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label="Twitterプロフィールを開く"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </motion.div>
  );
}
