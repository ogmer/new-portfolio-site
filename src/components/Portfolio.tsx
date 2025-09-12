import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import SakuraAnimation from "./SakuraAnimation";

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  technologies: string[];
}

const sections: Project[] = [
  {
    id: 1,
    title: "About",
    description: "横浜出身。東京にて暮らしてます",
    details:
      "横浜出身で、現在は東京にて暮らしています。趣味はバイクをいじったりDIYをすることです。技術的なことだけでなく、手を動かして何かを作ることが好きです。",
    technologies: ["横浜出身", "東京在住", "バイク", "DIY"],
  },
  {
    id: 2,
    title: "Skill",
    description: "得意言語: Java, C++",
    details:
      "得意言語はJavaとC++です。また、Python、JavaScript、SQLも扱うことができます。本業ではバックエンド開発を担当し、趣味でフロントエンド開発をやっています。",
    technologies: ["Java", "C++", "Python", "JavaScript", "SQL"],
  },
  {
    id: 3,
    title: "Link",
    description: "GitHub Qiita Zenn",
    details:
      "各種SNSや技術ブログで活動しています。GitHubでコードを公開し、QiitaやZennで技術記事を書いています。",
    technologies: ["GitHub", "Qiita", "Zenn"],
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

const PortfolioContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleProjectKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, project: Project) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleProjectClick(project);
      }
    },
    [handleProjectClick]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <>
      <SakuraAnimation />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 min-h-screen"
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
          <h1 className="text-4xl font-bold mb-4">ogmer</h1>
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
                <img
                  src="/profile.webp"
                  alt="プロフィール画像"
                  className="w-full h-full object-cover cursor-pointer"
                />
              </a>
            </div>
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            本業のバックエンドと趣味でフロントエンド開発をやっています
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
            詳細を見る
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
              }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              role="button"
              tabIndex={0}
              aria-label={`セクション: ${section.title}`}
              onClick={() => handleProjectClick(section)}
              onKeyDown={(e) => handleProjectKeyDown(e, section)}
            >
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {section.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={selectedProject ? selectedProject.title : "Contact"}
        >
          <div className="prose dark:prose-invert max-w-none">
            {selectedProject ? (
              <>
                <p className="mb-4">{selectedProject.details}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">詳細:</h3>
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
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-4">Contact</h2>
                  <p className="text-lg mb-4">ogmer.net〔at〕gmail.com</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    お気軽にお問い合わせください
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">GitHub</h3>
                    <a
                      href="https://github.com/ogmer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="GitHubプロフィールを開く"
                    >
                      @ogmer
                    </a>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Qiita</h3>
                    <a
                      href="https://qiita.com/ogmer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="Qiitaプロフィールを開く"
                    >
                      @ogmer
                    </a>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Zenn</h3>
                    <a
                      href="https://zenn.dev/ogmer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="Zennプロフィールを開く"
                    >
                      @ogmer
                    </a>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Made by ogmer
                  </p>
                </div>
              </>
            )}
          </div>
        </Modal>
      </motion.div>
    </>
  );
};

const Portfolio = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default Portfolio;
