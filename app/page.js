// app/page.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a1a2f] overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-b-[#2e3f65] bg-[#0a1a2f]/80 px-10 py-4 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 text-white">
          <motion.svg
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-6 w-6 text-[#3b82f6]"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
              fill="currentColor"
            />
          </motion.svg>
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold"
          >
            Aditya Shrivastav
          </motion.h2>
        </Link>

        <nav className="hidden md:flex gap-8">
          {["About", "Projects", "Contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,128,0.8), rgba(173,216,230,1)),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100' viewBox='0 0 1440 320'%3E%3Cpath fill='%233b82f6' fill-opacity='1' d='M0,192L60,186.7C120,181,240,171,360,181.3C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160L1440,0L0,0Z'%3E%3C/path%3E%3C/svg%3E")
            `,
          }}
        >
          <motion.div
            className="max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white">
              Aditya Shrivastav
            </h1>
            <motion.p
              className="text-gray-300 text-lg md:text-xl mt-4"
              variants={fadeInUp}
            >
              UI/UX Designer crafting beautiful and intuitive digital
              experiences.
            </motion.p>
            <motion.a
              href="#projects"
              className="inline-flex mt-8 h-12 px-6 rounded-full bg-[#3b82f6] text-white font-bold hover:bg-blue-600 transition items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </section>

        {/* About */}
        <section
          id="about"
          className="px-4 md:px-10 lg:px-40 py-16 md:py-24 space-y-24"
        >
          <motion.div
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a UI/UX designer passionate about creating intuitive and
                visually appealing digital experiences...
              </p>
            </div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-white mb-6">My Skills</h3>
              <div className="flex gap-3 flex-wrap">
                {[
                  "UI Design",
                  "UX Design",
                  "Prototyping",
                  "User Research",
                  "Wireframing",
                  "Interaction Design",
                ].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-[#1b2a4a] text-white rounded-full text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="px-4 md:px-10 lg:px-40 py-16 md:py-24"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            My Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MealMate",
                desc: "Help to make a proper diet plan",
                img: "/images/img1.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=10-2",
              },
              {
                title: "Good Food",
                desc: "Order your healthy and tasty food",
                img: "/images/img2.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=313-215",
              },
              {
                title: "Dream Trip",
                desc: "Turn your Dream Trip into Reality",
                img: "/images/img3.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=179-70",
              },
              {
                title: "Money Master",
                desc: "Your Personal Finance Assistant",
                img: "/images/img4.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=140-2",
              },
              {
                title: "SpendWise",
                desc: "Your Personal Finance Assistant V-2.0",
                img: "/images/img5.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=389-187",
              },
              {
                title: "StudyFocus",
                desc: "Your Personal Guide for Study",
                img: "/images/img6.png",
                link: "https://www.figma.com/design/dLUAMA8STqY9qVeT42r1mv/Untitled?node-id=355-27",
              },
            ].map((proj, i) => (
              <motion.a
                key={proj.title}
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="group relative flex flex-col overflow-hidden rounded-xl bg-[#1b2a4a] h-80">
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      width={400}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition">
                    <h3 className="text-xl font-bold text-white">
                      {proj.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{proj.desc}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="px-4 md:px-10 lg:px-40 py-16 md:py-24"
        >
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-300">
              Let&rsquo;s connect! You can reach me on any of these platforms:
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href="mailto:adityas131204@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b2a4a] border border-[#2e3f65] text-white hover:bg-[#3b82f6] hover:text-white transition"
                >
                  <FaEnvelope /> Email
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href="https://instagram.com/adityashrivastava536"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b2a4a] border border-[#2e3f65] text-white hover:bg-[#3b82f6] hover:text-white transition"
                >
                  <FaInstagram /> Instagram
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-b-[#2e3f65] px-10 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto flex justify-center">
          <p className="text-gray-400 text-sm">
            © 2025 Aditya Shrivastav. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
