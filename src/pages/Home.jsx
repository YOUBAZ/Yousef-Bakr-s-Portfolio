import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring as useFramerSpring,
} from "framer-motion";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link } from "react-router-dom";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
  Stars,
} from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { useSpring as useButtonSpring, animated } from "@react-spring/web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../components/Seo";
import { siteMeta } from "../config/seo";
import { heroAnimationData } from "../data/animations";


const FloatingOrb = () => {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere args={[1.4, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#a78bfa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
};

const Home = () => {
  const heroHighlights = useMemo(
    () => [
      { label: "Platforms shipped", value: "50+" },
      { label: "Cloud workloads", value: "AWS / Docker / K8s" },
      { label: "LMS & sims launched", value: "20+" },
    ],
    []
  );

  const featuredProjects = useMemo(
    () => [
      {
        title: "Helix LMS Cloud",
        copy: "Multi-tenant LMS with AI mentors, SCORM import, and analytics powered by Next.js, Node.js/Express.js, PostgreSQL, and GraphQL APIs on AWS.",
        tags: ["Next.js", "Express.js", "PostgreSQL", "GraphQL", "AWS"],
        gradient: "from-sky-500/70 via-indigo-500/70 to-purple-500/70",
      },
      {
        title: "Orion Simulation Control",
        copy: "Digital-twin dashboard streaming sensor data over Socket.io and Kafka with React, Three.js, and Kubernetes orchestration.",
        tags: ["React", "Socket.io", "Kafka", "Three.js", "Kubernetes"],
        gradient: "from-slate-900/70 via-blue-900/70 to-emerald-700/70",
      },
      {
        title: "Flowcast Analytics Fabric",
        copy: "Node.js microservices + SQL/GraphQL data layer powering realtime dashboards, alerting, and AI summaries for ops teams.",
        tags: ["Node.js", "SQL", "GraphQL", "AI Integrations", "Docker"],
        gradient: "from-emerald-500/70 via-cyan-500/70 to-sky-500/70",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        period: "2022 -> Present",
        title: "Principal Software Engineer & Systems Analyst",
        detail:
          "Architecting LMS ecosystems, AI copilots, and simulation control rooms across React/Next.js, Node.js, and AWS.",
      },
      {
        period: "2020 -> 2022",
        title: "Senior Full-Stack Developer",
        detail:
          "Scaled fintech and gov-tech platforms with Express.js, GraphQL, PostgreSQL, and Kubernetes pipelines.",
      },
      {
        period: "2017 -> 2020",
        title: "Software Developer & Product Engineer",
        detail:
          "Built SaaS MVPs, automation scripts, and WebGL training simulators with strong OOP fundamentals.",
      },
    ],
    []
  );

  const homeSchema = useMemo(() => {
    const locale = (siteMeta.locale || "en_US").replace("_", "-");
    const primaryImage = `${siteMeta.siteUrl}${siteMeta.profileImage}`;
    return [
      {
        "@type": "WebPage",
        "@id": `${siteMeta.siteUrl}/#home`,
        url: `${siteMeta.siteUrl}/`,
        name: "Full-Stack Software Engineer Portfolio",
        description:
          "Explore the work of Yousef Bakr, a Cairo-based software engineer delivering LMS, simulation, and SaaS platforms across React, Next.js, Node.js, and AWS.",
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: primaryImage,
          caption: "Portrait of Yousef Bakr",
        },
        about: {
          "@type": "Person",
          name: "Yousef Bakr",
          jobTitle: "Full-Stack Software Engineer & Systems Analyst",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteMeta.siteUrl}/`,
          },
        ],
      },
    ];
  }, []);

  const cardsRef = useRef(null);
  const [gridRef] = useAutoAnimate({ duration: 240 });
  const statsSectionRef = useRef(null);
  const { ref: statsInViewRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const setStatsSectionRef = (node) => {
    statsSectionRef.current = node;
    statsInViewRef(node);
  };

  const [magneticSpring, magneticApi] = useButtonSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 210, friction: 18 },
  }));

  const bindMagnetic = useGesture({
    onMove: ({ event, hovering }) => {
      if (!hovering) return;
      const target = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - (target.left + target.width / 2);
      const y = event.clientY - (target.top + target.height / 2);
      magneticApi.start({ xys: [x / 8, y / 8, 1.05] });
    },
    onHover: ({ active }) => {
      if (!active) {
        magneticApi.start({ xys: [0, 0, 1] });
      }
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(".feature-card", {
          opacity: 0,
          y: 64,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }

      if (statsSectionRef.current) {
        gsap.from(".timeline-step", {
          x: -80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 75%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const smoothX = useFramerSpring(cursorX, { stiffness: 120, damping: 20 });
  const smoothY = useFramerSpring(cursorY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(59,130,246,0.35), transparent 55%)`;

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      cursorX.set(x);
      cursorY.set(y);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [cursorX, cursorY]);

  const rippleTransform = magneticSpring.xys.to(
    (x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  );

  return (
    <>
      <Seo
        title="Full-Stack Software Engineer & Systems Analyst"
        description="Yousef Bakr architected LMS platforms, simulation systems, SaaS apps, and cloud-native services across React.js, Next.js, Node.js, Express.js, SQL/NoSQL, AWS, Docker, Kubernetes, and AI integrations."
        keywords={[
          "Full-stack software engineer",
          "Systems analyst for LMS and simulations",
          "React, Next.js, Node.js developer",
          "AWS Docker Kubernetes engineer",
        ]}
        url="/"
        schema={homeSchema}
      />
      <div className="bg-slate-950 text-white">
        <section className="relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:flex lg:items-center lg:gap-16 lg:px-16">
          <motion.div
            className="absolute inset-0 -z-10 opacity-90 blur-3xl"
            style={{ backgroundImage: spotlight }}
          />
          <div className="space-y-8 text-balance lg:max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300">
              <Sparkles size={16} />
              Software engineering 2025
            </p>
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                Building LMS, simulation, and SaaS systems end to end.
              </motion.h1>
              <p className="text-lg text-slate-300 sm:text-xl">
                <Typewriter
                  words={[
                    "Software engineer shipping LMS and simulation systems with React.js, Next.js, and Express.js.",
                    "I pair Node.js, Socket.io, Kafka, and AI integrations to sync data over RESTful and GraphQL APIs.",
                    "MySQL, SQL, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, and disciplined OOP keep releases production ready.",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={40}
                  deleteSpeed={18}
                  delaySpeed={2200}
                />
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <animated.button
                {...bindMagnetic()}
                style={{ transform: rippleTransform }}
                className="btn btn-primary gap-2 border-none bg-gradient-to-r from-sky-500 to-indigo-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/30"
              >
                <Link
                  to="/lets-talk"
                  className="group flex items-center gap-3 text-base font-semibold tracking-wide"
                  aria-label="Yousef Bakr home"
                >
                  Let's build together
                  <ArrowUpRight size={18} />
                </Link>
              </animated.button>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="btn border-white/20 bg-white/10 text-white backdrop-blur"
              >
                <Link
                  to="/contact"
                  className="group flex items-center gap-3 text-base font-semibold tracking-wide"
                  aria-label="Yousef Bakr home"
                >
                  <Mail size={18} />
                  Contact
                </Link>
              </motion.a>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <motion.div
                  key={item.label}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <dt className="text-sm uppercase text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="text-2xl font-semibold text-white">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="mt-16 flex flex-1 flex-col gap-8 lg:mt-0">
            <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <Stars radius={8} depth={20} count={500} factor={2} fade />
                <FloatingOrb />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Canvas>
            </div>
            <div className="mx-auto max-w-xs rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Lottie animationData={heroAnimationData} loop autoplay />
              <p className="mt-4 text-center text-slate-300">
                Micro-interactions cue user intent and reward progress.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={cardsRef}
          className="space-y-10 px-6 pb-16 pt-6 sm:px-10 lg:px-16"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
              Selected Work
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Full-stack canvases engineered for realtime reliability.
            </h2>
            <p className="text-slate-400">
              Each initiative pairs immersive UI with resilient services: Node.js/Express.js or Next.js APIs, SQL and NoSQL storage, AWS and Docker pipelines, plus observability and testing so LMS cohorts, telehealth patients, and simulation teams can trust every action.
            </p>
          </div>

          <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <Tilt key={project.title} glareEnable className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  className={`feature-card flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br ${project.gradient} p-6 text-white`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Sparkles className="text-white/70" size={20} />
                  </div>
                  <p className="mt-4 text-sm text-white/90">{project.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/20 px-3 py-1 text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </Tilt>
            ))}
          </div>
        </section>

        <section
          ref={setStatsSectionRef}
          className="space-y-12 px-6 pb-24 sm:px-10 lg:px-16"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Engineered for uptime, insight, and user trust.
              </h2>
              <p className="text-slate-400">
                I move between systems analysis, API design, and experience craft:
                diagramming event flows, modeling data in SQL or MongoDB, wiring
                Node.js/Express.js or Next.js routes, then layering React, Three.js,
                and GSAP motion so dashboards, LMS portals, and simulated workspaces
                feel intuitive yet auditable.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { label: "APIs & services shipped", value: 120 },
                  { label: "Realtime sims / twins delivered", value: 14 },
                  { label: "LMS & training launches", value: 9 },
                  { label: "Avg. uptime", value: "99.98%" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      statsInView
                        ? { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                        : {}
                    }
                    className="rounded-2xl border border-white/5 bg-white/5 p-5"
                  >
                    <p className="text-sm uppercase text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-semibold text-white">
                      {statsInView && typeof stat.value === "number"
                        ? `${stat.value}+`
                        : stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {timeline.map((item) => (
                <div
                  key={item.period}
                  className="timeline-step rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
