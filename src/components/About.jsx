import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="py-20 px-5 lg:px-28" id="about">
      <div className="flex justify-between items-center lg:flex-row flex-col-reverse gap-10">
        <motion.div
          className="lg:w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5">
            About <span className="text-white" style={{ WebkitTextStroke: "1px black" }}>Me</span>
          </h2>
          <p className="text-[#71717A] text-sm lg:text-base leading-relaxed">
            I&apos;m Sayan Banik, a Full-Stack Developer with a strong interest in building modern, user-friendly web applications.
          </p>
          <p className="text-[#71717A] text-sm lg:text-base leading-relaxed mt-4">
          I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and have experience developing responsive, full-featured projects from scratch.
          </p>
          <p className="text-[#71717A] text-sm lg:text-base leading-relaxed mt-4">
          I&apos;m currently pursuing a BCA at Techno India University, with a CGPA of 7.91, and have completed academic and personal projects.
          </p>
          <p className="text-[#71717A] text-sm lg:text-base leading-relaxed mt-4">
          I have a solid foundation in HTML, CSS, JavaScript, Java, Python, C, and C++, and enjoy solving problems, improving UI/UX design, and learning new technologies. My goal is to continue growing as a developer and contribute to impactful, real-world software solutions.
          </p>
        </motion.div>

        <motion.div
          className="lg:w-[55%]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <img className="h-full w-full" src="/assets/about-me.svg" alt="About Me" />
        </motion.div>
      </div>
    </div>
  );
}
