import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Star, ChevronDown } from 'lucide-react';
import logoImg from '@assets/logo_1779998926197.png';

interface LandingPageProps {
  onEnterApp: () => void;
}

const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: `${(i * 7 + 13) % 97}%`,
  top: `${(i * 11 + 5) % 90}%`,
  size: i % 3 === 0 ? 3 : i % 5 === 0 ? 2 : 1.5,
  duration: 6 + (i % 7) * 1.2,
  delay: (i * 0.4) % 7,
  gold: i % 4 === 0,
}));

const LotusWatermark = ({ className }: { className?: string }) => (
  <img
    src={logoImg}
    alt=""
    aria-hidden
    className={className}
    style={{ filter: 'brightness(0) invert(1)', userSelect: 'none', pointerEvents: 'none' }}
  />
);

const PhoneMockup = ({
  className,
  screen,
  onClick,
}: {
  className?: string;
  screen: 'splash' | 'dashboard';
  onClick?: () => void;
}) => (
  <div
    className={`relative rounded-[44px] overflow-hidden shadow-[0_40px_120px_rgba(108,61,186,0.6),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.06)] cursor-pointer ${className}`}
    onClick={onClick}
  >
    {/* Phone notch */}
    <div className="absolute top-0 inset-x-0 flex justify-center pt-3 z-20">
      <div className="w-24 h-6 bg-black rounded-b-2xl" />
    </div>

    {screen === 'splash' ? (
      <div className="w-full h-full bg-gradient-to-b from-[#0D0130] via-[#2D1B69] to-[#4A2899] flex flex-col items-center justify-center relative">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#B892FF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#E4B008]/15 rounded-full blur-3xl" />
        {/* Lotus watermark rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <LotusWatermark className="w-64 h-64 object-contain" />
        </div>
        <div className="z-10 flex flex-col items-center text-center px-6">
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-[#E4B008]/30 blur-2xl rounded-full scale-150 animate-pulse-glow" />
            <img
              src={logoImg}
              alt="EndoSoul"
              className="relative w-20 h-20 object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(228,176,8,0.7)) drop-shadow(0 0 40px rgba(184,146,255,0.3))' }}
            />
          </div>
          <p className="font-serif text-2xl text-[#E4B008] tracking-wide mb-1">EndoSoul</p>
          <div className="w-8 h-px bg-[#E4B008]/60 mb-3" />
          <p className="text-white/60 text-xs italic font-serif">Lumière sur ta guérison</p>
          <p className="text-white/30 text-xl mt-8">ॐ</p>
        </div>
        <div className="absolute bottom-8 inset-x-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-xs py-3 rounded-2xl text-center">
            Toucher pour explorer →
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full bg-[#FAF7FF] flex flex-col">
        <div className="bg-gradient-to-r from-[#6C3DBA] to-[#B892FF] p-4 pt-10">
          <p className="text-white/70 text-xs">Bonjour,</p>
          <p className="text-white font-serif text-lg">Nour ✦</p>
        </div>
        <div className="flex gap-2 p-3 overflow-hidden">
          {['Douleur 💜','Sereine ✨','Fatigue 😴'].map((m, i) => (
            <div key={i} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${i === 1 ? 'bg-[#6C3DBA] text-white' : 'bg-[#EDE4FF] text-[#6C3DBA]'}`}>{m}</div>
          ))}
        </div>
        <div className="p-3 space-y-2 flex-1">
          {['Journal de bord','Méditations','Programme'].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#EDE4FF] flex items-center justify-center text-[#6C3DBA] text-sm">{['📖','🌙','📅'][i]}</div>
              <p className="text-[#2D1B69] text-xs font-medium">{t}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  return (
    <div className="min-h-screen w-full overflow-y-auto overflow-x-hidden font-sans" style={{ background: '#030009' }}>

      {/* ─── NAVBAR ─────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 bg-[#030009]/60 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <img
            src={logoImg}
            alt="EndoSoul"
            className="w-7 h-7 object-contain"
            style={{ filter: 'drop-shadow(0 0 6px rgba(228,176,8,0.6))' }}
          />
          <span className="font-serif text-white text-lg tracking-wide">EndoSoul</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40 font-medium">
          <a href="#features" className="hover:text-white/80 transition-colors">Fonctionnalités</a>
          <a href="#temoignages" className="hover:text-white/80 transition-colors">Témoignages</a>
          <a href="#premium" className="hover:text-white/80 transition-colors">Premium</a>
        </div>
        <button
          onClick={onEnterApp}
          data-testid="nav-tester"
          className="bg-white/10 backdrop-blur-md border border-white/15 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
        >
          Tester →
        </button>
      </nav>

      {/* ─── HERO ───────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 pb-16">

        {/* Deep cosmic background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 30%, #1A0840 0%, #0A0020 40%, #030009 100%)' }} />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(108,61,186,0.25) 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full animate-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: p.gold ? 'rgba(228,176,8,0.8)' : 'rgba(184,146,255,0.7)',
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                boxShadow: p.gold ? '0 0 4px rgba(228,176,8,0.6)' : '0 0 3px rgba(184,146,255,0.5)',
              }}
            />
          ))}
        </div>

        {/* Lotus watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <LotusWatermark className="w-[600px] h-[600px] object-contain" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 border border-[#E4B008]/30 bg-[#E4B008]/8 text-[#E4B008] text-xs font-medium px-4 py-1.5 rounded-full mb-10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4B008] animate-pulse" />
            Application FemTech Premium · French Innovation
          </motion.div>

          {/* Central lotus with glow rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="relative mb-10"
          >
            {/* Expanding rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-40 h-40 rounded-full border border-[#E4B008]/20 animate-lotus-ring" />
              <div className="absolute w-40 h-40 rounded-full border border-[#E4B008]/15 animate-lotus-ring" style={{ animationDelay: '1.2s' }} />
              <div className="absolute w-40 h-40 rounded-full border border-[#B892FF]/10 animate-lotus-ring" style={{ animationDelay: '2.4s' }} />
            </div>
            {/* Glow halo */}
            <div className="absolute inset-0 bg-[#E4B008]/20 blur-3xl rounded-full scale-[2] animate-pulse-glow" />
            <div className="absolute inset-0 bg-[#B892FF]/15 blur-2xl rounded-full scale-150 animate-pulse-glow" style={{ animationDelay: '2s' }} />
            {/* Logo */}
            <img
              src={logoImg}
              alt="EndoSoul"
              className="relative w-28 h-28 object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(228,176,8,0.8)) drop-shadow(0 0 60px rgba(184,146,255,0.4)) drop-shadow(0 0 80px rgba(108,61,186,0.3))' }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl text-white leading-[1.05] tracking-tight mb-6 max-w-3xl"
          >
            Lumière sur<br />
            <span style={{ background: 'linear-gradient(135deg, #E4B008 0%, #F5D060 40%, #C7933A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ta guérison
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-xl font-light"
          >
            EndoSoul accompagne les femmes atteintes d&apos;endométriose avec bienveillance — suivi du cycle, méditations guidées et soutien communautaire.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={onEnterApp}
              data-testid="hero-tester"
              className="relative group overflow-hidden rounded-full px-10 py-4 text-base font-semibold text-[#030009] shadow-[0_0_40px_rgba(228,176,8,0.4),0_8px_24px_rgba(228,176,8,0.3)]"
              style={{ background: 'linear-gradient(135deg, #F5D060 0%, #E4B008 50%, #C7933A 100%)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Tester le prototype
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
            <button className="px-10 py-4 rounded-full border border-white/15 text-white/70 text-base font-medium hover:border-white/30 hover:text-white transition-all backdrop-blur-sm">
              En savoir plus
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {['#B892FF','#9B59B6','#7B2FBE','#6C3DBA'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030009] flex items-center justify-center text-xs font-bold text-white" style={{ background: c }}>
                  {['A','M','S','L'][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={11} fill="#E4B008" className="text-[#E4B008]" />)}</div>
              <span className="text-white/40">·</span>
              <span className="text-white/60"><span className="text-white font-semibold">+12 000</span> femmes accompagnées</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── FLOATING PHONES ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
          className="relative z-10 flex items-end justify-center gap-6 mt-20 px-4"
        >
          {/* Left phone */}
          <div className="animate-float-phone hidden sm:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-[#B892FF]/20 blur-3xl rounded-full" />
              <PhoneMockup
                screen="dashboard"
                className="w-[190px] h-[390px]"
                onClick={onEnterApp}
              />
            </div>
          </div>

          {/* Center phone — main */}
          <div className="animate-float-phone" style={{ animationDelay: '0.4s', animationName: 'float-phone' }}>
            <div className="relative">
              <div className="absolute -inset-12 bg-[#E4B008]/15 blur-[60px] rounded-full animate-pulse-glow" />
              <div className="absolute -inset-12 bg-[#6C3DBA]/20 blur-[80px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
              <PhoneMockup
                screen="splash"
                className="w-[240px] h-[490px]"
                onClick={onEnterApp}
              />
            </div>
          </div>

          {/* Right phone */}
          <div className="animate-float-phone-r hidden sm:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-[#B892FF]/20 blur-3xl rounded-full" />
              <PhoneMockup
                screen="dashboard"
                className="w-[190px] h-[390px]"
                onClick={onEnterApp}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-scroll-cue">
          <span className="text-white/20 text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown size={16} className="text-white/20" />
        </div>
      </section>

      {/* ─── STATS BAND ───────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { num: '1/10', label: "femmes atteintes d'endométriose" },
            { num: '7 ans', label: 'délai moyen de diagnostic' },
            { num: '176M', label: 'femmes touchées dans le monde' },
            { num: '100%', label: 'anonymat garanti' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-serif text-4xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #E4B008, #F5D060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {s.num}
              </p>
              <p className="text-white/35 text-xs leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────── */}
      <section id="features" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#E4B008]/70 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Fonctionnalités</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">Tout ce dont vous avez besoin,<br /><span className="text-white/40">réuni en un seul espace.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { emoji: '🌙', title: 'Suivi du cycle', desc: 'Calendrier menstruel intelligent, phases du cycle et prédictions personnalisées.', accent: '#B892FF' },
            { emoji: '✨', title: 'Méditation & Reiki', desc: 'Sessions guidées : respiration lunaire, ancrage, lâcher-prise, sommeil réparateur.', accent: '#E4B008' },
            { emoji: '💜', title: 'Communauté', desc: "Espace d'échange anonyme, témoignages positifs et soutien entre femmes.", accent: '#B892FF' },
            { emoji: '🩺', title: 'Praticiens partenaires', desc: 'Gynécologues, ostéopathes, naturopathes spécialisés — consultation en ligne.', accent: '#6BE4A0' },
            { emoji: '📊', title: 'Suivi des symptômes', desc: "Journal quotidien : douleur, fatigue, humeur, énergie. Graphiques d'évolution.", accent: '#E46B6B' },
            { emoji: '🔔', title: 'Rappels intelligents', desc: 'Rappels de traitement personnalisés et alertes de cycle.', accent: '#B892FF' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative rounded-3xl p-6 border border-white/6 hover:border-white/12 transition-all cursor-default overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at top left, ${f.accent}08, transparent 60%)` }} />
              <div className="text-3xl mb-4">{f.emoji}</div>
              <h3 className="font-serif text-white text-lg mb-2">{f.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────── */}
      <section id="temoignages" className="py-28 px-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
        {/* Lotus watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <LotusWatermark className="w-96 h-96 object-contain" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#E4B008]/70 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Témoignages</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Elles témoignent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { text: "EndoSoul m'a aidée à comprendre mon cycle et à mieux communiquer avec mon gynécologue. Je me sens moins seule.", name: 'Amina K.', label: 'Diagnostiquée depuis 3 ans' },
              { text: "Les méditations sont un vrai sauvetage pendant les crises. L'application est si belle et apaisante, j'adore l'ouvrir chaque matin.", name: 'Léa M.', label: 'Utilisatrice depuis 6 mois' },
              { text: "J'ai trouvé mon ostéopathe spécialisée grâce aux praticiens partenaires. Un réel soulagement dans mon parcours.", name: 'Sarah B.', label: 'Stade IV, en rémission' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rounded-3xl p-7 border border-white/8 flex flex-col gap-5"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#E4B008" className="text-[#E4B008]" />)}
                </div>
                <p className="text-white/60 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #B892FF, #6C3DBA)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white/80 text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREMIUM ──────────────────────────────── */}
      <section id="premium" className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] p-12 overflow-hidden border border-white/8"
            style={{ background: 'linear-gradient(145deg, #1A0840 0%, #0D0130 50%, #1A0840 100%)' }}
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.2), rgba(184,146,255,0.1), transparent)' }} />
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
              <LotusWatermark className="w-80 h-80 object-contain" />
            </div>

            <div className="relative z-10">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-[#E4B008]/25 blur-2xl rounded-full scale-[2] animate-pulse-glow" />
                <img src={logoImg} alt="EndoSoul" className="relative w-16 h-16 object-contain mx-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(228,176,8,0.8))' }} />
              </div>

              <h2 className="font-serif text-3xl text-white mb-3">EndoSoul <span style={{ background: 'linear-gradient(135deg, #E4B008, #F5D060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span></h2>
              <p className="text-white/40 mb-10 max-w-sm mx-auto leading-relaxed">Accédez à l&apos;ensemble des programmes, méditations avancées et un accompagnement vraiment personnalisé.</p>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-10 text-left">
                {['Méditations avancées', 'Suivi personnalisé', 'Praticiens illimité', 'Rapport mensuel', 'Communauté exclusive', 'Support prioritaire'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-white/60 text-sm">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E4B008, #C7933A)' }}>
                      <Check size={9} className="text-white" strokeWidth={3} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <span className="font-serif text-5xl text-white">9,99€</span>
                <span className="text-white/30 text-lg ml-1">/mois</span>
              </div>

              <button
                onClick={onEnterApp}
                className="relative group overflow-hidden rounded-full px-12 py-4 font-semibold text-[#030009] text-base shadow-[0_0_40px_rgba(228,176,8,0.4)]"
                style={{ background: 'linear-gradient(135deg, #F5D060 0%, #E4B008 50%, #C7933A 100%)' }}
              >
                <span className="relative z-10">Essai gratuit 7 jours</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>
              <p className="text-white/20 text-xs mt-4">Sans engagement · Annulation à tout moment</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(108,61,186,0.15), transparent)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">Prête à commencer<br />votre parcours ?</h2>
          <p className="text-white/35 mb-10">Testez le prototype interactif dès maintenant.</p>
          <button
            onClick={onEnterApp}
            data-testid="cta-tester"
            className="relative group overflow-hidden rounded-full px-12 py-5 font-semibold text-[#030009] text-lg shadow-[0_0_50px_rgba(228,176,8,0.4),0_12px_30px_rgba(228,176,8,0.25)]"
            style={{ background: 'linear-gradient(135deg, #F5D060 0%, #E4B008 50%, #C7933A 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Tester le prototype
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </button>
          <p className="text-white/20 text-xs mt-5">Aucune inscription requise · 100% gratuit</p>
        </motion.div>
      </section>

      {/* ─── FOOTER ───────────────────────────────── */}
      <footer className="py-10 px-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/25">
        <div className="flex items-center gap-2.5">
          <img src={logoImg} alt="EndoSoul" className="w-5 h-5 object-contain" style={{ filter: 'drop-shadow(0 0 4px rgba(228,176,8,0.5))' }} />
          <span className="font-serif text-white/50">EndoSoul</span>
          <span className="text-white/20">· Lumière et inspiration ॐ</span>
        </div>
        <p>© 2026 EndoSoul · RGPD conforme · Toutes données protégées</p>
      </footer>
    </div>
  );
};

export default LandingPage;
