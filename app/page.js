"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { FaInstagram, FaEnvelope, FaBehance, FaDribbble, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  const [loading, setLoading] = useState(true);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse Follower Logic
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorXY({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/getallprojects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500 selection:text-white font-sans">
      
      {/* Custom Cursor (Hidden on Touch) */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{ 
          transform: `translate3d(${cursorXY.x - 16}px, ${cursorXY.y - 16}px, 0)` 
        }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{ 
          transform: `translate3d(${cursorXY.x - 4}px, ${cursorXY.y - 4}px, 0)` 
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Background Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 transition-all duration-300 backdrop-blur-md bg-black/10 border-b border-white/5 pb-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">A</div>
            <span className="font-bold tracking-tight text-xl group-hover:text-gray-300 transition-colors">Aditya.</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {["About", "Projects", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
             <a href="mailto:adityas131204@gmail.com" className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-medium">
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {["About", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-bold hover:text-purple-500 transition-colors">
              {item}
            </a>
          ))}
        </motion.div>
      )}

      <main className="relative z-10 pt-20">
        
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm uppercase tracking-widest text-gray-400 font-medium">Available for Freelance</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
              Designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white">Digital Experiences</span> that feel human.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              I&apos;m Aditya Shrivastav, a UI/UX Designer obsessed with clarity, aesthetics, and user behavior.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 mb-6">
              <a href="#projects" className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">View Work <FaArrowRight className="group-hover:translate-x-1 transition-transform"/></span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee Skills Section */}
        <div className="w-full py-10 border-y border-white/5 bg-black/20 overflow-hidden mb-20">
            <motion.div 
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-16 mx-8">
                        {["UI Design", "UX Research", "Figma", "Prototyping", "Wireframing", "Adobe XD", "User Flow", "Interaction Design"].map((skill) => (
                            <span key={skill} className="text-2xl md:text-4xl font-bold text-white/20 uppercase hover:text-purple-500/50 transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>

        {/* About Section */}
        <section id="about" className="px-6 md:px-12 max-w-7xl mx-auto py-20 mb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-40"></div>
                        {/* Placeholder for Profile - Stylized */}
                        <div className="relative h-[400px] w-full bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src="/images/professional_photo.png" width="300px" height="300px"/>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">About Me</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Bridging the gap between <br/><span className="text-gray-500">Logic</span> and <span className="text-white">Magic</span>.</h3>
                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>
                            I don&apos;t just move pixels around; I solve problems. My design philosophy is rooted in empathy—understanding the user&apos;s journey to create interfaces that are intuitive, accessible, and delightful.
                        </p>
                        <p>
                            With a strong foundation in modern design tools and a constant hunger to learn, I help brands translate complex ideas into clean, functional digital products.
                        </p>
                    </div>
                    
                    <div className="flex gap-6 mt-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white">10+</span>
                            <span className="text-sm text-gray-500 uppercase">Projects</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white">100%</span>
                            <span className="text-sm text-gray-500 uppercase">Dedication</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-6 md:px-12 max-w-7xl mx-auto py-20">
            <motion.div 
                className="flex flex-col md:flex-row justify-between items-end mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
                    <p className="text-gray-400">A curated list of projects I&apos;ve worked on.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [1,2,3].map((n) => (
                        <div key={n} className="h-96 bg-white/5 rounded-2xl animate-pulse"></div>
                    ))
                ) : projects.length > 0 ? (
                    projects.map((proj, i) => (
                        <motion.a
                            key={i}
                            href={proj.figmaLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group block"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#111]">
                                <Image
                                    src={proj.image}
                                    alt={proj.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-6 py-3 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Project</span>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{proj.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{proj.description}</p>
                            </div>
                        </motion.a>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        <p>Projects are being updated. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 md:px-12 text-center bg-gradient-to-b from-transparent to-[#0a0a0a]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold mb-8">Have an idea?</h2>
                <p className="text-xl text-gray-400 mb-12">
                    I&apos;m currently available for freelance work and open to new opportunities. 
                    Let&apos;s create something meaningful together.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                     <a 
                        href="mailto:adityas131204@gmail.com" 
                        className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
                     >
                        Say Hello 👋
                     </a>
                     <div className="flex gap-4 items-center">
                        <a href="https://www.instagram.com/adityashrivastava536/" className="p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"><FaInstagram size={20}/></a>
                     </div>
                </div>
            </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-600 text-sm">
        <p>© 2025 Aditya Shrivastav. Crafted with <span className="text-red-500">❤</span> and Next.js.</p>
      </footer>
    </div>
  );
}