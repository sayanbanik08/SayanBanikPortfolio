import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbDownload } from "react-icons/tb";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import nameLogo from "../assets/name2.png";

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDocsOpen && !event.target.closest('.docs-dropdown')) {
        setIsDocsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDocsOpen]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 110,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const downloadPDF = (filename, displayName) => {
    const link = document.createElement("a");
    link.href = `/docs/${filename}`;
    link.download = displayName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDocsOpen(false);
  };

  const docs = [
    { filename: "10th12th-result.pdf", displayName: "10th Grade Result", label: "10th Result" },
    { filename: "10th12th-result.pdf", displayName: "12th Grade Result", label: "12th Result" },
    { filename: "graduation-result.pdf", displayName: "Graduation Result", label: "Graduation Result" },
    { filename: "Resume - Sayan Banik (1).pdf", displayName: "Resume", label: "Resume" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 bg-white p-5 transition-shadow duration-300 ${hasShadow ? "shadow-md" : "shadow-none"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection("home")}
          className="h-8 cursor-pointer"
          src={nameLogo}
          alt="Logo"
        />

        <ul className="hidden lg:flex items-center gap-x-7 font-semibold">
          {["about", "skills", "projects", "contact"].map((section) => (
            <motion.li
              key={section}
              className="group"
              whileHover={{ scale: 1.1 }}
            >
              <button onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
              <motion.span
                className="w-0 transition-all duration-300 group-hover:w-full h-[2px] bg-black flex"
                layout
              ></motion.span>
            </motion.li>
          ))}
        </ul>

        <div className="hidden lg:block relative docs-dropdown">
          <motion.button
            onClick={() => setIsDocsOpen(!isDocsOpen)}
            className="relative px-4 py-2 font-medium group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white flex items-center gap-x-3">
              Docs 
              <motion.div
                animate={{ rotate: isDocsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <HiChevronDown size={16} />
              </motion.div>
            </span>
          </motion.button>

          <AnimatePresence>
            {isDocsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 sm:-right-2 mt-2 w-40 sm:w-44 md:w-48 lg:w-44 z-50"
              >
                <div className="py-1">
                  {docs.map((doc, index) => (
                    <motion.button
                      key={doc.filename}
                      onClick={() => downloadPDF(doc.filename, doc.displayName)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group text-xs sm:text-sm"
                      whileHover={{ x: 3 }}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium text-gray-800">{doc.label}</span>
                      <TbDownload size={14} className="text-gray-600 group-hover:text-black transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.2 }}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow"
          >
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <HiX />
            </button>
            <ul className="flex flex-col items-start ml-16 mt-28 h-full gap-y-6 font-semibold">
              {["about", "skills", "projects", "contact"].map((section) => (
                <motion.li
                  key={section}
                  className="border-b"
                  whileHover={{ scale: 1.1 }}
                >
                  <button onClick={() => scrollToSection(section)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </motion.li>
              ))}
              <div className="w-auto docs-dropdown">
                <motion.button
                  onClick={() => setIsDocsOpen(!isDocsOpen)}
                  className="relative inline-block px-4 py-2 font-semibold group text-left"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white flex items-center gap-x-3">
                    Docs 
                    <motion.div
                      animate={{ rotate: isDocsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HiChevronDown size={16} />
                    </motion.div>
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isDocsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 overflow-hidden"
                    >
                      {docs.map((doc, index) => (
                        <motion.button
                          key={doc.filename}
                          onClick={() => downloadPDF(doc.filename, doc.displayName)}
                          className="w-full px-2 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group text-sm"
                          whileHover={{ x: 3 }}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="font-medium text-gray-800">{doc.label}</span>
                          <TbDownload size={14} className="text-gray-600 group-hover:text-black transition-colors" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
