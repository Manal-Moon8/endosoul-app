import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Moon, Anchor, Feather, Star, Play, Pause,
  MessageCircle, Heart, MapPin, Check, ChevronRight, ChevronLeft, Plus,
  Activity, Shield, Settings, LifeBuoy, LogOut, Bell, BookOpen,
  Calendar as CalendarIcon, Volume2, Search, X, Send, Bookmark,
  TrendingUp, Award, FileText, Zap
} from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { ScreenId } from './App';
import logoImg from '@assets/logo_1779998926197.png';
import { useAmbientAudio } from './useAmbientAudio';
import {
  MOOD_HISTORY, PRACTITIONERS, COMMUNITY_POSTS, STORIES,
  CYCLE_PHASES, BOOKING_DATES
} from './data';

const SPRING = { type: 'spring' as const, stiffness: 340, damping: 28 };
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ScreenWrapper = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 22, scale: 0.985 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -14, scale: 0.985 }}
    transition={{ duration: 0.48, ease: EASE_OUT, opacity: { duration: 0.3 } }}
    className={`absolute inset-0 w-full h-full overflow-y-auto pb-28 pt-14 px-6 bg-transparent ${className}`}
    data-testid={`screen-${id}`}
  >
    {children}
  </motion.div>
);

const MusicIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const MoodChart = () => {
  const maxVal = 10;
  const barMaxH = 36;
  const barW = 22;
  const gap = 8;
  const svgW = (barW + gap) * 7 - gap;
  return (
    <svg width={svgW} height={barMaxH + 18} className="overflow-visible">
      {MOOD_HISTORY.map((d, i) => {
        const h = Math.max(4, (d.value / maxVal) * barMaxH);
        const x = i * (barW + gap);
        const y = barMaxH - h;
        const isToday = i === 6;
        return (
          <g key={i}>
            <rect x={x} y={0} width={barW} height={barMaxH} rx={6} fill="#F0E8FF" />
            <motion.rect
              x={x} y={y} width={barW} height={h} rx={6}
              fill={isToday ? '#6C3DBA' : '#B892FF'}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.06 + 0.3, duration: 0.5, ease: EASE_OUT }}
              style={{ transformOrigin: `${x + barW / 2}px ${barMaxH}px` }}
            />
            <text x={x + barW / 2} y={barMaxH + 14} textAnchor="middle" fontSize={9} fill={isToday ? '#6C3DBA' : '#8B7BA8'} fontWeight={isToday ? '600' : '400'}>
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const HealthRing = ({ score }: { score: number }) => {
  const R = 48;
  const C = 2 * Math.PI * R;
  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B892FF" />
          <stop offset="100%" stopColor="#E4B008" />
        </linearGradient>
      </defs>
      <circle cx={60} cy={60} r={R} fill="none" stroke="#E9D8FF" strokeWidth={8} />
      <motion.circle
        cx={60} cy={60} r={R} fill="none"
        stroke="url(#ringGrad)" strokeWidth={8} strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: C * (1 - score / 100) }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.4 }}
        transform="rotate(-90 60 60)"
      />
      <text x={60} y={55} textAnchor="middle" fontSize={20} fontWeight="700" fill="#2D1B69" fontFamily="'Playfair Display', serif">
        {score}
      </text>
      <text x={60} y={70} textAnchor="middle" fontSize={9} fill="#8B7BA8">
        /100
      </text>
    </svg>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ONBOARDING — minimal premium splash
───────────────────────────────────────────────────────────────── */
export const Onboarding = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="absolute inset-0 rounded-[36px] overflow-hidden flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(170deg, #04000F 0%, #0C0225 28%, #1B0848 56%, #2D1B69 100%)' }}
  >
    {/* Ambient glow behind logo */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.42, 0.18] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(228,176,8,0.22) 0%, rgba(184,146,255,0.1) 55%, transparent 80%)',
        pointerEvents: 'none',
      }}
    />

    {/* Official EndoSoul logo */}
    <motion.img
      src={logoImg}
      alt="EndoSoul"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.0, ease: EASE_OUT }}
      style={{
        width: 82, height: 82, objectFit: 'contain', marginBottom: 22,
        filter: 'drop-shadow(0 0 24px rgba(228,176,8,0.9)) drop-shadow(0 0 50px rgba(228,176,8,0.3))',
      }}
    />

    {/* EndoSoul */}
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8 }}
      className="font-serif text-white text-[2.1rem] font-medium mb-1 text-center"
      style={{ textShadow: '0 0 28px rgba(184,146,255,0.3)' }}
    >
      EndoSoul
    </motion.h1>

    {/* Gold divider */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.55 }}
      className="mb-2"
      style={{ width: 30, height: 1, background: 'rgba(228,176,8,0.55)' }}
    />

    {/* Slogan */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="text-center mb-4"
      style={{ color: 'rgba(228,176,8,0.9)', fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase' }}
    >
      Lumière sur ta guérison
    </motion.p>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="text-center mb-10"
      style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', lineHeight: 1.65, maxWidth: 228 }}
    >
      Application FemTech dédiée à l'accompagnement des femmes atteintes d'endométriose.
    </motion.p>

    {/* Commencer */}
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.15, duration: 0.7, ease: EASE_OUT }}
      whileTap={{ scale: 0.96 }}
      data-testid="btn-commencer"
      onClick={() => navigate('auth')}
      className="font-semibold text-white"
      style={{
        padding: '15px 54px',
        borderRadius: 999,
        fontSize: '0.95rem',
        background: 'linear-gradient(135deg, #7C4DCC 0%, #4A2899 100%)',
        boxShadow: '0 8px 32px rgba(108,61,186,0.5), 0 0 0 1px rgba(184,146,255,0.2)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Commencer
    </motion.button>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────────
   AUTH — minimal, 3 buttons only
───────────────────────────────────────────────────────────────── */
export const Auth = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.5, ease: EASE_OUT }}
    className="absolute inset-0 flex flex-col items-center justify-center rounded-[36px] overflow-hidden px-8"
    style={{ background: 'linear-gradient(170deg, #04000F 0%, #0D0228 30%, #1E0A50 60%, #2D1B69 100%)' }}
  >
    {/* Subtle ambient glow */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.38, 0.18] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184,146,255,0.25) 0%, transparent 70%)' }}
    />

    {/* Logo + brand */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="flex flex-col items-center mb-12 relative z-10"
    >
      <img
        src={logoImg} alt="EndoSoul"
        className="w-16 h-16 object-contain mb-4"
        style={{ filter: 'drop-shadow(0 0 20px rgba(228,176,8,0.85)) drop-shadow(0 0 48px rgba(184,146,255,0.4))' }}
      />
      <h1 className="font-serif text-white text-2xl font-medium mb-1">EndoSoul</h1>
      <p className="text-[#E4B008] text-[10px] tracking-[0.3em] uppercase">Lumière sur ta guérison</p>
    </motion.div>

    {/* Auth buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.65, ease: EASE_OUT }}
      className="w-full flex flex-col gap-3 relative z-10"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        data-testid="btn-google"
        onClick={() => navigate('dashboard')}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.96)', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
      >
        <FaGoogle className="text-[#DB4437]" size={18} />
        <span className="font-semibold text-sm text-[#2D1B69]">Continuer avec Google</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        data-testid="btn-apple"
        onClick={() => navigate('dashboard')}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
        style={{ background: '#1A1A1E', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
      >
        <FaApple size={20} className="text-white" />
        <span className="font-semibold text-sm text-white">Continuer avec Apple</span>
      </motion.button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1" style={{ background: 'rgba(184,146,255,0.2)' }} />
        <span className="text-[11px] text-white/30">ou</span>
        <div className="h-px flex-1" style={{ background: 'rgba(184,146,255,0.2)' }} />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        data-testid="btn-email"
        onClick={() => navigate('dashboard')}
        className="w-full py-4 rounded-2xl font-semibold text-sm text-white"
        style={{
          background: 'linear-gradient(135deg, #7C4DCC 0%, #4A2899 100%)',
          boxShadow: '0 6px 24px rgba(108,61,186,0.4)',
          border: '1px solid rgba(184,146,255,0.2)',
        }}
      >
        {"S'inscrire avec e-mail"}
      </motion.button>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.6 }}
      className="text-[10px] text-white/25 text-center mt-8 relative z-10 leading-relaxed"
    >
      En continuant, vous acceptez nos CGU et notre Politique de confidentialité RGPD.
    </motion.p>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────────────────────── */
export const Dashboard = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [activeMood, setActiveMood] = useState('Sereine');
  const [reminderOn, setReminderOn] = useState(true);
  const [hasNotif] = useState(true);

  const moods = [
    { label: 'Douleur', icon: '💜' },
    { label: 'Fatiguée', icon: '😴' },
    { label: 'Stressée', icon: '😰' },
    { label: 'Sereine', icon: '✨' },
    { label: 'Énergique', icon: '⚡' },
  ];

  return (
    <ScreenWrapper id="dashboard">
      {/* Lotus watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.04] overflow-hidden">
        <img src={logoImg} alt="" aria-hidden className="w-48 h-48 object-contain translate-x-10 -translate-y-10"
          style={{ filter: 'brightness(0) saturate(0)' }} />
      </div>

      {/* Header */}
      <header className="mb-5 flex items-start justify-between relative z-10">
        <div>
          <p className="text-[#8B7BA8] text-xs font-medium mb-0.5">Lundi 7 juillet 2026</p>
          <h1 className="text-2xl text-[#2D1B69] font-serif flex items-center gap-2">
            Bonjour, Nour <span className="text-[#E4B008]">👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate('notifications')}
            className="w-9 h-9 glass-card rounded-full flex items-center justify-center text-[#8B7BA8] relative"
          >
            <Bell size={18} />
            {hasNotif && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E4B008] rounded-full" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Inspirational quote */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="mb-5 px-4 py-3 rounded-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EDE4FF 0%, #F5F0FF 100%)', border: '1px solid #E9D8FF' }}
      >
        <p className="text-[#6C3DBA] text-sm italic font-serif leading-relaxed">
          "Tu es plus forte que tu ne le crois. Chaque jour est une victoire." ✦
        </p>
      </motion.div>

      {/* Health ring + Phase */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}
        className="glass-card rounded-[28px] p-5 mb-5 flex items-center gap-5 border border-[#E9D8FF]/60"
      >
        <HealthRing score={72} />
        <div className="flex-1">
          <p className="text-[10px] text-[#8B7BA8] uppercase tracking-wider mb-1">Score bien-être</p>
          <h3 className="text-xl font-serif text-[#2D1B69] mb-2">72 <span className="text-sm font-sans text-[#8B7BA8]">/ 100</span></h3>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'linear-gradient(135deg, #EDE4FF, #D8CCFF)', color: '#6C3DBA' }}>
            <span>🌙</span> Phase folliculaire · Jour 8
          </div>
        </div>
      </motion.div>

      {/* Quick stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex gap-3 mb-5"
      >
        {[
          { icon: '🔥', value: '23j', label: 'Série', color: '#FFF3E0', border: '#FFD080' },
          { icon: '💊', value: '3.8', label: 'Douleur moy.', color: '#EDE4FF', border: '#B892FF' },
          { icon: '🧘', value: '8', label: 'Sessions', color: '#E4F5E4', border: '#86C986' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.07, ...SPRING }}
            className="flex-1 rounded-2xl p-3 flex flex-col items-center gap-1"
            style={{ backgroundColor: s.color, border: `1px solid ${s.border}50` }}
          >
            <span className="text-lg">{s.icon}</span>
            <span className="text-base font-bold text-[#2D1B69] font-serif">{s.value}</span>
            <span className="text-[9px] text-[#8B7BA8] text-center leading-tight">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Mood pills */}
      <div className="mb-5">
        <p className="text-[#2D1B69] text-sm font-semibold mb-3">Comment te sens-tu aujourd'hui ?</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {moods.map(m => (
            <motion.button
              key={m.label}
              onClick={() => setActiveMood(m.label)}
              data-testid={`mood-${m.label}`}
              whileTap={{ scale: 0.93 }}
              className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                activeMood === m.label
                  ? 'bg-[#6C3DBA] text-white shadow-[0_4px_16px_rgba(108,61,186,0.35)]'
                  : 'glass-card text-[#8B7BA8]'
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              {m.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 7-day mood chart */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="glass-card rounded-[24px] p-4 mb-5 border border-[#E9D8FF]/60"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-[#2D1B69]">Humeur · 7 derniers jours</p>
            <p className="text-xs text-[#8B7BA8]">Moyenne : 5.7 / 10</p>
          </div>
          <button onClick={() => navigate('moodhistory')} className="text-[10px] text-[#6C3DBA] font-medium">
            Voir tout →
          </button>
        </div>
        <div className="flex justify-center">
          <MoodChart />
        </div>
      </motion.div>

      {/* Next appointment */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={() => navigate('practitioners')}
        className="glass-card rounded-[24px] p-4 mb-5 flex items-center gap-4 cursor-pointer border border-[#E4B008]/20"
        style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)' }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #E4B008, #F5C832)' }}>
          <CalendarIcon size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-[#C49B00] font-medium uppercase tracking-wide">Prochain RDV</p>
          <p className="font-semibold text-[#2D1B69] text-sm">Dr. Claire Dubois</p>
          <p className="text-xs text-[#8B7BA8]">Demain · 10h00 · Gynécologue</p>
        </div>
        <ChevronRight size={18} className="text-[#C49B00]" />
      </motion.div>

      {/* Ton espace bien-être */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#2D1B69] mb-3">Ton espace bien-être</h3>
        <div className="space-y-3">
          {[
            { icon: BookOpen, color: '#EDE4FF', iconColor: '#6C3DBA', title: 'Journal de bord', desc: 'Note tes symptômes, émotions et progrès', screen: 'symptoms' as ScreenId },
            { icon: Moon, color: '#F5F0FF', iconColor: '#B892FF', title: 'Méditations', desc: 'Apaise ton corps et ton esprit', screen: 'meditation' as ScreenId },
            { icon: CalendarIcon, color: '#FFF8E4', iconColor: '#E4B008', title: 'Mon Cycle', desc: 'Ton suivi personnalisé', screen: 'cycle' as ScreenId },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => navigate(item.screen)}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-[#E9D8FF]/60"
                data-testid={`card-${item.title}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color }}>
                  <Icon size={20} style={{ color: item.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#2D1B69] text-sm">{item.title}</h4>
                  <p className="text-xs text-[#8B7BA8] truncate">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[#8B7BA8] flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Reminder + CTA */}
      <div>
        <h3 className="text-base font-semibold text-[#2D1B69] mb-3">Rappels & suivi</h3>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#EDE4FF] rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell size={18} className="text-[#6C3DBA]" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#2D1B69] text-sm">Prendre mon traitement</p>
            <p className="text-xs text-[#8B7BA8]">{"Aujourd'hui à 20:00"}</p>
          </div>
          <button
            onClick={() => setReminderOn(r => !r)}
            data-testid="toggle-reminder"
            className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${reminderOn ? 'bg-[#6C3DBA]' : 'bg-[#E9D8FF]'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${reminderOn ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('symptoms')}
          className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] text-white py-3.5 rounded-2xl flex justify-center items-center gap-2 shadow-premium"
          data-testid="btn-nouveau-releve"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Nouveau relevé</span>
        </motion.button>
      </div>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   CYCLE
───────────────────────────────────────────────────────────────── */
export const Cycle = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [selectedDay, setSelectedDay] = useState(8);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayStyle = (day: number) => {
    if (day >= 1 && day <= 5) return { bg: 'bg-[#B892FF]', text: 'text-white', label: 'Règles' };
    if (day >= 6 && day <= 13) return { bg: 'bg-[#EDE4FF]', text: 'text-[#6C3DBA]', label: 'Folliculaire' };
    if (day >= 14 && day <= 16) return { bg: 'bg-[#E4B008]', text: 'text-white', label: 'Ovulation' };
    if (day >= 17 && day <= 28) return { bg: 'bg-[#F0E8FF]', text: 'text-[#8B7BA8]', label: 'Lutéale' };
    return { bg: '', text: 'text-[#2D1B69]', label: '' };
  };

  return (
    <ScreenWrapper id="cycle">
      <h1 className="text-2xl text-[#2D1B69] mb-5 font-serif">Mon Cycle</h1>

      {/* Calendar */}
      <div className="glass-card rounded-[32px] p-5 mb-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-[#2D1B69]">Juillet 2025</h3>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.88 }} className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-[#8B7BA8]">
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.88 }} className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-[#6C3DBA]">
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
            <div key={i} className="text-[10px] text-[#8B7BA8] font-semibold py-1">{d}</div>
          ))}
          {days.map(day => {
            const { bg, text } = getDayStyle(day);
            const isSelected = day === selectedDay;
            const isToday = day === 7;
            return (
              <div key={day} className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setSelectedDay(day)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all ${bg} ${text} ${isSelected ? 'ring-2 ring-[#E4B008] ring-offset-1 ring-offset-white' : ''} ${isToday ? 'ring-2 ring-[#6C3DBA]/40' : ''}`}
                >
                  {day}
                </motion.button>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-[#E9D8FF] text-[10px] flex-wrap">
          {[
            { color: '#B892FF', label: 'Règles' },
            { color: '#EDE4FF', label: 'Folliculaire', textColor: '#6C3DBA' },
            { color: '#E4B008', label: 'Ovulation' },
            { color: '#F0E8FF', label: 'Lutéale', textColor: '#8B7BA8' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1 text-[#2D1B69]">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Phase info */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 rounded-2xl p-4 border"
          style={{ background: 'linear-gradient(135deg, #EDE4FF 0%, #FAF7FF 100%)', borderColor: '#E9D8FF' }}>
          <span className="text-[10px] text-[#6C3DBA] uppercase font-bold tracking-wider">Phase actuelle</span>
          <h4 className="text-lg text-[#2D1B69] mt-1 font-serif">Folliculaire</h4>
          <p className="text-xs text-[#8B7BA8] mt-0.5">Jour 8 · Cycle de 28 jours</p>
        </div>
        <div className="flex-1 rounded-2xl p-4 border"
          style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)', borderColor: '#F0DCA0' }}>
          <span className="text-[10px] text-[#C49B00] uppercase font-bold tracking-wider">Prochaine</span>
          <h4 className="text-lg text-[#2D1B69] mt-1 font-serif">Ovulation</h4>
          <p className="text-xs text-[#8B7BA8] mt-0.5">Dans 6 jours</p>
        </div>
      </div>

      {/* Weekly pain chart */}
      <div className="glass-card rounded-[24px] p-4 mb-5 border border-[#E9D8FF]/60">
        <p className="text-sm font-semibold text-[#2D1B69] mb-3">Douleur · Dernière semaine</p>
        <svg width="100%" height={50} viewBox={`0 0 ${210} 50`} preserveAspectRatio="xMidYMid meet">
          {[6, 4, 5, 7, 3, 4, 3].map((v, i) => {
            const x = i * 30 + 15;
            const h = (v / 10) * 40;
            const y = 42 - h;
            return (
              <g key={i}>
                <motion.rect x={x - 9} y={y} width={18} height={h} rx={5}
                  fill={v >= 6 ? '#B892FF' : '#E9D8FF'}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.5, ease: EASE_OUT }}
                  style={{ transformOrigin: `${x}px 42px` }}
                />
                <text x={x} y={50} textAnchor="middle" fontSize={8} fill="#8B7BA8">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#8B7BA8]">Moy. douleur : 4.6 / 10</span>
          <span className="text-[10px] text-[#6C3DBA] font-medium">↓ -1.2 vs semaine préc.</span>
        </div>
      </div>

      {/* Conseil du jour */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-[24px] p-4 mb-4 flex items-start gap-3 border border-[#B892FF]/20"
        style={{ background: 'linear-gradient(135deg, #EDE4FF 0%, #F5F0FF 100%)' }}
      >
        <div className="text-2xl shrink-0">🌙</div>
        <div>
          <p className="text-[10px] text-[#6C3DBA] font-bold uppercase tracking-wider mb-1">Conseil du jour · Phase folliculaire</p>
          <p className="text-sm text-[#2D1B69] leading-relaxed font-medium">
            {"C'est le bon moment pour l'activité douce : yoga, marche ou pilates. Ton énergie remonte !"}
          </p>
        </div>
      </motion.div>

      {/* Hydration reminder */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="rounded-[24px] p-4 mb-4 flex items-center gap-4 border border-[#86C986]/25"
        style={{ background: 'linear-gradient(135deg, #E4F5E4 0%, #F0FAF0 100%)' }}
      >
        <div className="text-2xl shrink-0">💧</div>
        <div className="flex-1">
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Hydratation</p>
          <p className="text-sm text-[#2D1B69] font-medium">Bois 1,5 L d'eau aujourd'hui</p>
          <p className="text-xs text-[#8B7BA8]">Réduit les crampes et les ballonnements</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-serif font-bold text-emerald-600">6/8</div>
          <div className="text-[9px] text-[#8B7BA8]">verres</div>
        </div>
      </motion.div>

      {/* Medical recommendation card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-[24px] p-4 mb-5 flex items-start gap-3 border border-[#E4B008]/20"
        style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)' }}
      >
        <div className="text-2xl shrink-0">🩺</div>
        <div>
          <p className="text-[10px] text-[#C49B00] font-bold uppercase tracking-wider mb-1">Recommandation médicale</p>
          <p className="text-sm text-[#2D1B69] leading-relaxed font-medium">
            Pensez à prendre votre antalgique préventif 2 jours avant vos prochaines règles.
          </p>
          <button className="mt-2 text-xs text-[#E4B008] font-semibold">Planifier un rappel →</button>
        </div>
      </motion.div>

      {/* Phase symptoms */}
      <h3 className="text-base font-semibold text-[#2D1B69] mb-3">Symptômes fréquents</h3>
      <div className="flex flex-wrap gap-2">
        {['Crampes pelviennes', 'Fatigue intense', 'Ballonnements', 'Maux de tête', 'Humeur instable', 'Dos lombaire'].map(sym => (
          <motion.span key={sym} whileTap={{ scale: 0.95 }}
            className="px-4 py-2 glass-card rounded-full text-sm text-[#2D1B69] cursor-pointer border border-[#E9D8FF]/60">
            {sym}
          </motion.span>
        ))}
      </div>

      {/* Phases CYCLE_PHASES */}
      <h3 className="text-base font-semibold text-[#2D1B69] mt-6 mb-3">Les 4 phases du cycle</h3>
      <div className="space-y-2">
        {CYCLE_PHASES.map((phase, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="glass-card rounded-2xl p-3 flex items-center gap-3 border border-[#E9D8FF]/50">
            <div className="w-3 h-10 rounded-full" style={{ backgroundColor: phase.color }} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#2D1B69] text-sm">{phase.name}</span>
                <span className="text-[10px] text-[#8B7BA8]">Jours {phase.days}</span>
              </div>
              <span className="text-xs text-[#8B7BA8]">{phase.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SYMPTOMS
───────────────────────────────────────────────────────────────── */
export const Symptoms = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [activeMoodIdx, setActiveMoodIdx] = useState(2);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); navigate('dashboard'); }, 2000);
  };

  return (
    <ScreenWrapper id="symptoms">
      <div className="flex items-center gap-4 mb-8">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('dashboard')}
          className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={24} />
        </motion.button>
        <h1 className="text-2xl text-[#2D1B69] font-serif">Comment vas-tu ?</h1>
      </div>

      <div className="space-y-7 glass-card p-6 rounded-[32px] border border-[#E9D8FF]">
        <div>
          <label className="block text-base font-semibold text-[#2D1B69] mb-4">Niveau de douleur</label>
          <input type="range" min="0" max="10" defaultValue="4" className="custom-slider mb-2" />
          <div className="flex justify-between text-sm text-[#8B7BA8] font-medium">
            <span>Aucune</span><span>Insoutenable</span>
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-[#2D1B69] mb-4">Humeur</label>
          <div className="flex justify-between glass-card p-2 rounded-2xl">
            {['😊', '😐', '😔', '😢', '😤'].map((emoji, i) => (
              <motion.button key={emoji} whileTap={{ scale: 0.88 }}
                onClick={() => setActiveMoodIdx(i)}
                className={`text-3xl p-2 rounded-xl transition-all ${i === activeMoodIdx ? 'bg-[#E9D8FF] scale-110' : 'hover:bg-white/50'}`}>
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-[#2D1B69] mb-4">Fatigue</label>
          <input type="range" min="0" max="10" defaultValue="6" className="custom-slider mb-2" />
          <div className="flex justify-between text-sm text-[#8B7BA8] font-medium">
            <span>En forme</span><span>Épuisée</span>
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-[#2D1B69] mb-3">Symptômes du jour</label>
          <div className="flex flex-wrap gap-2">
            {['Crampes', 'Ballonnements', 'Fatigue', 'Dos', 'Nausées', 'Migraines'].map(s => (
              <motion.button key={s} whileTap={{ scale: 0.93 }}
                className="px-3 py-1.5 glass-card rounded-full text-sm text-[#6C3DBA] border border-[#E9D8FF]">
                + {s}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-[#2D1B69] mb-3">Note libre</label>
          <textarea
            placeholder="Décris ta journée en quelques mots…"
            className="w-full bg-[#FAF7FF] border border-[#E9D8FF] rounded-2xl p-3 text-sm text-[#2D1B69] placeholder:text-[#C4B5D4] resize-none focus:outline-none focus:border-[#B892FF]"
            rows={3}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] border border-[#E4B008]/30 text-white py-4 rounded-2xl text-base font-semibold shadow-premium relative overflow-hidden"
        >
          {submitted ? 'Enregistré ✨' : 'Enregistrer'}
        </motion.button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-6 right-6 glass-card border border-[#E9D8FF] text-[#6C3DBA] p-4 rounded-xl shadow-premium flex items-center justify-center gap-2 z-50"
          >
            <Check size={20} className="text-[#E4B008]" />
            <span className="font-medium text-sm">Tes symptômes ont été notés. Repose-toi bien. 💜</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MEDITATION
───────────────────────────────────────────────────────────────── */
export const Meditation = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <ScreenWrapper id="meditation">
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04]">
      <img src={logoImg} alt="" aria-hidden className="w-56 h-56 object-contain"
        style={{ filter: 'hue-rotate(260deg) saturate(0.3) brightness(0.4)' }} />
    </div>

    <div className="flex items-center gap-3 mb-2 relative z-10">
      <img src={logoImg} alt="" className="w-9 h-9 object-contain"
        style={{ filter: 'drop-shadow(0 0 6px rgba(228,176,8,0.5))' }} />
      <h1 className="text-2xl text-[#2D1B69] font-serif">Méditation & Reiki</h1>
    </div>
    <p className="text-[#8B7BA8] text-sm mb-6 relative z-10">Un moment de douceur pour toi.</p>

    {/* Stats banner */}
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="flex gap-3 mb-6 relative z-10"
    >
      {[
        { icon: '🧘', value: '8', label: 'Sessions ce mois' },
        { icon: '⏱', value: '96min', label: 'Temps total' },
        { icon: '🔥', value: '3j', label: 'Série actuelle' },
      ].map((s, i) => (
        <div key={i} className="flex-1 glass-card rounded-2xl p-3 text-center border border-[#E9D8FF]/50">
          <div className="text-lg mb-0.5">{s.icon}</div>
          <div className="text-sm font-bold text-[#6C3DBA] font-serif">{s.value}</div>
          <div className="text-[9px] text-[#8B7BA8]">{s.label}</div>
        </div>
      ))}
    </motion.div>

    <div className="grid gap-4 relative z-10">
      {[
        { title: 'Respiration lunaire', icon: Moon, duration: '5 min', desc: 'Apaiser le système nerveux', tag: 'Populaire', locked: false },
        { title: 'Ancrage', icon: Anchor, duration: '12 min', desc: 'Se reconnecter à son corps', tag: '', locked: false },
        { title: 'Lâcher-prise', icon: Feather, duration: '15 min', desc: 'Soulager les tensions pelviennes', tag: 'Premium', locked: true },
        { title: 'Sommeil réparateur', icon: Star, duration: '20 min', desc: 'Préparer une nuit paisible', tag: 'Premium', locked: true },
      ].map((session, i) => {
        const Icon = session.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09, duration: 0.5, ease: EASE_OUT }}
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.975 }}
            onClick={() => { if (!session.locked && i === 0) navigate('serenity'); else if (session.locked) navigate('premium'); }}
            className="glass-card p-5 rounded-[28px] flex items-center gap-4 cursor-pointer border border-[#E9D8FF]/50 relative overflow-hidden"
          >
            {session.locked && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-end pr-5 z-10">
                <div className="flex items-center gap-1.5 bg-[#E4B008] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                  ✦ Premium
                </div>
              </div>
            )}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EDE4FF] to-[#D4B8FF] flex items-center justify-center text-[#6C3DBA] shrink-0"
            >
              <Icon size={24} />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-[#2D1B69]">{session.title}</h3>
                {session.tag && !session.locked && (
                  <span className="text-[9px] bg-[#EDE4FF] text-[#6C3DBA] px-2 py-0.5 rounded-full font-medium">{session.tag}</span>
                )}
              </div>
              <p className="text-xs text-[#8B7BA8] mt-0.5">{session.desc}</p>
            </div>
            <div className="bg-[#FAF7FF] border border-[#E9D8FF] text-[#6C3DBA] px-3 py-1 rounded-full text-xs font-medium shrink-0">
              {session.duration}
            </div>
          </motion.div>
        );
      })}
    </div>
  </ScreenWrapper>
);

/* ─────────────────────────────────────────────────────────────────
   SERENITY (unchanged — already premium)
───────────────────────────────────────────────────────────────── */
export const Serenity = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const { isPlaying, toggle } = useAmbientAudio();
  const [breathPhase, setBreathPhase] = useState<'Inspirez...' | 'Expirez...'>('Inspirez...');
  const [secondsLeft, setSecondsLeft] = useState(300);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => { setSecondsLeft(s => Math.max(0, s - 1)); }, 1000);
      breathRef.current = setInterval(() => { setBreathPhase(p => p === 'Inspirez...' ? 'Expirez...' : 'Inspirez...'); }, 4500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breathRef.current) clearInterval(breathRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, [isPlaying]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');
  const progress = 1 - secondsLeft / 300;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="absolute inset-0 flex flex-col items-center justify-between p-6 pb-10 rounded-[36px]"
      style={{ background: 'linear-gradient(170deg, #0D0130 0%, #2D1B69 45%, #4A2899 75%, #7C4DCC 100%)' }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.12) 0%, rgba(184,146,255,0.18) 50%, transparent 75%)' }}
      />

      <div className="w-full flex items-center justify-between pt-8 relative z-10">
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => navigate('meditation')}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)' }}>
          <ChevronLeft size={22} className="text-white" />
        </motion.button>

        <div className="flex flex-col items-center">
          <img src={logoImg} alt="" className="w-7 h-7 object-contain opacity-80"
            style={{ filter: 'drop-shadow(0 0 8px rgba(228,176,8,0.7))' }} />
          <span className="text-white/70 text-xs mt-1 tracking-widest uppercase">Respiration lunaire</span>
        </div>

        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Volume2 size={16} className={isPlaying ? 'text-[#E4B008]' : 'text-white/50'} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 256 256">
            <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <motion.circle cx="128" cy="128" r="120" fill="none" stroke="rgba(228,176,8,0.7)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 120}`}
              animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress) }}
              transition={{ duration: 1, ease: 'linear' }} />
          </svg>

          <motion.div animate={isPlaying ? { scale: [1, 1.18, 1], opacity: [0.2, 0.08, 0.2] } : { scale: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full border border-white/20" />
          <motion.div animate={isPlaying ? { scale: [1, 1.12, 1], opacity: [0.3, 0.12, 0.3] } : { scale: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute inset-10 rounded-full border border-[#B892FF]/35" />

          <motion.div
            animate={isPlaying ? { scale: [1, 1.15, 1], boxShadow: ['0 0 30px rgba(228,176,8,0.25)', '0 0 60px rgba(228,176,8,0.5)', '0 0 30px rgba(228,176,8,0.25)'] } : { scale: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <img src={logoImg} alt="" className="w-16 h-16 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(228,176,8,0.6)) brightness(1.1)' }} />
          </motion.div>

          <div className="absolute bottom-6 w-full text-center">
            <AnimatePresence mode="wait">
              <motion.p key={isPlaying ? breathPhase : 'idle'}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6 }}
                className="text-white/80 text-sm font-serif tracking-widest">
                {isPlaying ? breathPhase : 'Prête ?'}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <motion.div animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white font-serif text-5xl font-light tracking-widest">
          {mins}:{secs}
        </motion.div>
      </div>

      <div className="flex items-center gap-8 relative z-10">
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => setSecondsLeft(300)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white/70"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <Activity size={20} />
        </motion.button>

        <motion.button whileTap={{ scale: 0.88 }} onClick={toggle}
          className="w-20 h-20 rounded-full text-white flex items-center justify-center relative"
          style={{
            background: isPlaying ? 'linear-gradient(135deg, #E4B008 0%, #C49B00 100%)' : 'linear-gradient(135deg, #7C4DCC 0%, #4A2899 100%)',
            boxShadow: isPlaying ? '0 0 40px rgba(228,176,8,0.5), 0 8px 24px rgba(228,176,8,0.3)' : '0 0 40px rgba(184,146,255,0.4), 0 8px 24px rgba(108,61,186,0.3)',
          }}>
          <AnimatePresence mode="wait">
            {isPlaying
              ? <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Pause size={30} /></motion.div>
              : <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Play size={30} className="ml-1" /></motion.div>}
          </AnimatePresence>
        </motion.button>

        <motion.button whileTap={{ scale: 0.85 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <MusicIcon className={isPlaying ? 'text-[#E4B008]' : 'text-white/70'} />
        </motion.button>
      </div>

      <p className="text-white/30 text-[11px] tracking-widest uppercase relative z-10">
        {isPlaying ? '♫ Musique zen · Ambient 432Hz' : 'Appuie pour commencer'}
      </p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   COMMUNITY
───────────────────────────────────────────────────────────────── */
export const Community = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [activeTag, setActiveTag] = useState('Tous');
  const [showWrite, setShowWrite] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set([3]));
  const [newPost, setNewPost] = useState('');

  const [activeFeed, setActiveFeed] = useState<'tendances' | 'recents' | 'populaires'>('tendances');
  const [searchQ, setSearchQ] = useState('');
  const tags = ['Tous', '#Témoignage', '#Soutien', '#Victoires', '#Conseils'];

  const toggleLike = (id: number) => setLikedPosts(s => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleSave = (id: number) => setSavedPosts(s => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <ScreenWrapper id="community">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-[#2D1B69] font-serif">Communauté</h1>
        <div className="flex items-center gap-1.5 bg-[#EDE4FF] text-[#6C3DBA] px-3 py-1.5 rounded-full text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          247 en ligne
        </div>
      </div>

      {/* Search bar */}
      <div className="glass-card flex items-center gap-2.5 px-4 py-3 rounded-2xl mb-4 border border-[#E9D8FF]/60">
        <Search size={16} className="text-[#C4B5D4] shrink-0" />
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Rechercher dans la communauté…"
          className="flex-1 bg-transparent text-sm text-[#2D1B69] placeholder:text-[#C4B5D4] focus:outline-none"
        />
      </div>

      {/* Feed tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { id: 'tendances', label: '🔥 Tendances' },
          { id: 'recents', label: '🕐 Récents' },
          { id: 'populaires', label: '⭐ Populaires' },
        ] as const).map(tab => (
          <motion.button key={tab.id} whileTap={{ scale: 0.93 }}
            onClick={() => setActiveFeed(tab.id)}
            className={`flex-1 py-2 rounded-full text-[11px] font-semibold transition-all ${activeFeed === tab.id ? 'bg-[#6C3DBA] text-white shadow-[0_4px_14px_rgba(108,61,186,0.3)]' : 'glass-card text-[#8B7BA8] border border-[#E9D8FF]'}`}>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Pinned post */}
      <div className="rounded-2xl p-4 mb-4 border border-[#E4B008]/25 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)' }}>
        <div className="text-lg shrink-0">📌</div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-[#C49B00] font-bold uppercase tracking-wide mb-1">Post épinglé · Admin</p>
          <p className="text-sm font-medium text-[#2D1B69] leading-snug">
            Bienvenue dans la communauté EndoSoul 💜 Partagez en toute bienveillance.
          </p>
        </div>
      </div>

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-4 -mx-1 px-1 no-scrollbar">
        {STORIES.map((s, i) => (
          <motion.div key={i} whileTap={{ scale: 0.92 }}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
            <div className="w-14 h-14 rounded-full p-0.5"
              style={{ background: s.isOwn ? 'linear-gradient(135deg, #B892FF, #E4B008)' : 'linear-gradient(135deg, #E9D8FF, #B892FF)' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center text-sm font-bold border-2 border-[#FAF7FF]"
                style={{ background: s.bg, color: s.color }}>
                {s.isOwn ? <Plus size={16} className="text-white" /> : s.initials}
              </div>
            </div>
            <span className="text-[9px] text-[#8B7BA8]">{s.isOwn ? 'Ma story' : `Anonyme`}</span>
          </motion.div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 no-scrollbar">
        {tags.map(tag => (
          <motion.button key={tag} whileTap={{ scale: 0.93 }}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeTag === tag ? 'bg-[#6C3DBA] text-white shadow-[0_4px_14px_rgba(108,61,186,0.3)]' : 'glass-card text-[#6C3DBA] border border-[#E9D8FF]'}`}>
            {tag}
          </motion.button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {COMMUNITY_POSTS.map((post, i) => (
          <motion.div key={post.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: EASE_OUT }}
            className="glass-card p-5 rounded-[24px] border border-[#E9D8FF]/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: post.bg, color: post.color }}>
                {post.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2D1B69] text-sm">{post.user}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: post.tagBg, color: post.tagColor }}>
                    {post.tag}
                  </span>
                </div>
                <div className="text-[10px] text-[#8B7BA8]">{post.time}</div>
              </div>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => toggleSave(post.id)}>
                <Bookmark size={16} className={savedPosts.has(post.id) ? 'text-[#E4B008] fill-[#E4B008]' : 'text-[#C4B5D4]'} />
              </motion.button>
            </div>
            <p className="text-[#2D1B69]/85 text-sm leading-relaxed mb-4">{post.text}</p>
            <div className="flex items-center gap-5 border-t border-[#E9D8FF] pt-3">
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 text-sm transition-colors">
                <Heart size={16} className={likedPosts.has(post.id) ? 'text-[#E46B6B] fill-[#E46B6B]' : 'text-[#C4B5D4]'} />
                <span className={likedPosts.has(post.id) ? 'text-[#E46B6B]' : 'text-[#8B7BA8]'}>
                  {post.hearts + (likedPosts.has(post.id) ? 1 : 0)}
                </span>
              </motion.button>
              <button className="flex items-center gap-1.5 text-[#8B7BA8] text-sm hover:text-[#6C3DBA]">
                <MessageCircle size={16} /> {post.replies}
              </button>
              <button className="flex items-center gap-1.5 text-[#8B7BA8] text-sm hover:text-[#6C3DBA] ml-auto">
                <TrendingUp size={14} /> Partager
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.08 }}
        onClick={() => setShowWrite(true)}
        className="fixed bottom-28 right-6 w-14 h-14 rounded-full text-white flex items-center justify-center z-40 shadow-premium"
        style={{ background: 'linear-gradient(135deg, #B892FF 0%, #6C3DBA 100%)' }}
      >
        <Plus size={24} />
      </motion.button>

      {/* Write post modal */}
      <AnimatePresence>
        {showWrite && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D1B69]/40 backdrop-blur-sm flex items-end rounded-[44px] overflow-hidden"
            onClick={() => setShowWrite(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={SPRING}
              className="bg-white w-full rounded-t-[36px] p-6 pb-10 shadow-premium"
              onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-[#E9D8FF] rounded-full mx-auto mb-5" />
              <h3 className="text-lg font-serif text-[#2D1B69] mb-4">Partager avec la communauté</h3>
              <textarea
                value={newPost} onChange={e => setNewPost(e.target.value)}
                placeholder="Ton témoignage, une question, une victoire…"
                className="w-full bg-[#FAF7FF] border border-[#E9D8FF] rounded-2xl p-4 text-sm text-[#2D1B69] placeholder:text-[#C4B5D4] resize-none focus:outline-none focus:border-[#B892FF] mb-4"
                rows={4}
                autoFocus
              />
              <div className="flex gap-2 mb-4 flex-wrap">
                {['#Témoignage', '#Soutien', '#Victoires', '#Question'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 bg-[#EDE4FF] text-[#6C3DBA] rounded-full text-xs font-medium">
                    {tag}
                  </button>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => setShowWrite(false)}
                className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <Send size={18} /> Publier
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   PRACTITIONERS + BOOKING
───────────────────────────────────────────────────────────────── */
export const Practitioners = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'Gynéco', 'Ostéo', 'Psy', 'Naturo'];

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => { setConfirmed(false); setSelectedDoc(null); setSelectedSlot(null); }, 2500);
  };

  const doc = selectedDoc !== null ? PRACTITIONERS[selectedDoc] : null;

  return (
    <ScreenWrapper id="practitioners">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl text-[#2D1B69] font-serif">Praticiens</h1>
        <button onClick={() => navigate('premium')}
          className="flex items-center gap-1.5 bg-[#FFF8E4] text-[#E4B008] px-3 py-1.5 rounded-full border border-[#E4B008]/25 text-xs font-semibold">
          <Star size={12} fill="currentColor" /> Premium
        </button>
      </div>

      {/* Search */}
      <div className="glass-card p-3 rounded-2xl flex items-center gap-3 mb-4 text-[#8B7BA8] border border-[#E9D8FF]/60">
        <Search size={18} />
        <input
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          placeholder="Rechercher un praticien…"
          className="flex-1 bg-transparent text-sm text-[#2D1B69] placeholder:text-[#C4B5D4] focus:outline-none"
        />
        <div className="flex items-center gap-1 text-[#6C3DBA] text-xs">
          <MapPin size={14} /> Paris
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {filters.map(f => (
          <motion.button key={f} whileTap={{ scale: 0.93 }}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${activeFilter === f ? 'bg-[#6C3DBA] text-white' : 'glass-card text-[#6C3DBA] border border-[#E9D8FF]'}`}>
            {f}
          </motion.button>
        ))}
      </div>

      {/* Practitioner cards */}
      <div className="space-y-3">
        {PRACTITIONERS.map((p, i) => (
          <motion.div key={p.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: EASE_OUT }}
            whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(108,61,186,0.12)' }}
            whileTap={{ scale: 0.985 }}
            onClick={() => { setSelectedDoc(i); setSelectedSlot(null); setConfirmed(false); }}
            className="glass-card p-4 rounded-[24px] flex gap-4 cursor-pointer border border-[#E9D8FF]/50">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0"
              style={{ background: p.bg }}>
              <span style={{ color: '#2D1B69' }}>{p.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[#2D1B69] text-sm">{p.name}</h3>
                  <p className="text-xs text-[#6C3DBA] mb-1.5">{p.spec}</p>
                </div>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${p.available ? 'bg-emerald-400' : 'bg-gray-300'}`} />
              </div>
              <div className="flex items-center gap-3 text-xs text-[#8B7BA8] mb-2">
                <span className="flex items-center gap-1 text-[#E4B008] font-semibold">
                  <Star size={11} fill="currentColor" /> {p.rating}
                  <span className="text-[#8B7BA8] font-normal">({p.reviews})</span>
                </span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {p.dist}</span>
                <span className="font-medium text-[#6C3DBA]">{p.price}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] bg-[#EDE4FF] text-[#6C3DBA] px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking bottom sheet */}
      <AnimatePresence>
        {selectedDoc !== null && doc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D1B69]/40 backdrop-blur-sm flex items-end rounded-[44px] overflow-hidden"
            onClick={() => setSelectedDoc(null)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={SPRING}
              className="bg-white w-full rounded-t-[40px] p-6 pb-12 shadow-premium max-h-[85%] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-[#E9D8FF] rounded-full mx-auto mb-5" />

              {/* Confirmed state */}
              <AnimatePresence>
                {confirmed && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white rounded-t-[40px] flex flex-col items-center justify-center gap-4 z-10">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, ...SPRING }}
                      className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl">
                      ✅
                    </motion.div>
                    <h3 className="text-xl font-serif text-[#2D1B69]">Rendez-vous confirmé !</h3>
                    <p className="text-[#8B7BA8] text-sm text-center">
                      {doc.name} · {BOOKING_DATES[selectedDate].full} · {selectedSlot}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Doctor header */}
              <div className="flex gap-4 mb-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
                  style={{ background: doc.bg }}>
                  <span style={{ color: '#2D1B69' }}>{doc.initials}</span>
                </div>
                <div>
                  <h2 className="text-xl text-[#6C3DBA] font-semibold font-serif">{doc.name}</h2>
                  <p className="text-[#8B7BA8] text-sm mb-1.5">{doc.spec}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[#FFF8E4] text-[#E4B008] px-2 py-1 rounded-lg border border-[#E4B008]/20 text-xs font-semibold">
                      <Star size={11} fill="currentColor" /> {doc.rating} ({doc.reviews} avis)
                    </span>
                    <span className="text-xs text-[#6C3DBA] font-semibold">{doc.price}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#2D1B69]/75 leading-relaxed mb-5">{doc.bio}</p>

              {/* Date selection */}
              <p className="text-sm font-semibold text-[#2D1B69] mb-3">Choisir une date</p>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
                {BOOKING_DATES.map((d, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.9 }}
                    onClick={() => { setSelectedDate(i); setSelectedSlot(null); }}
                    className={`flex flex-col items-center px-4 py-3 rounded-2xl shrink-0 border transition-all ${selectedDate === i ? 'bg-[#6C3DBA] border-[#6C3DBA] text-white' : 'bg-[#FAF7FF] border-[#E9D8FF] text-[#2D1B69]'}`}>
                    <span className="text-[10px] font-medium opacity-70">{d.label}</span>
                    <span className="text-lg font-bold font-serif">{d.date}</span>
                  </motion.button>
                ))}
              </div>

              {/* Time slots */}
              <p className="text-sm font-semibold text-[#2D1B69] mb-3">Créneaux disponibles</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {doc.slots.map(slot => (
                  <motion.button key={slot} whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${selectedSlot === slot ? 'bg-[#6C3DBA] border-[#6C3DBA] text-white shadow-[0_4px_14px_rgba(108,61,186,0.3)]' : 'bg-[#FAF7FF] border-[#E9D8FF] text-[#2D1B69]'}`}>
                    {slot}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={selectedSlot ? handleConfirm : undefined}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${selectedSlot ? 'bg-[#E4B008] text-white shadow-[0_8px_24px_rgba(228,176,8,0.35)]' : 'bg-[#F0E8FF] text-[#B892FF] cursor-not-allowed'}`}>
                {selectedSlot ? `Confirmer · ${BOOKING_DATES[selectedDate].full} à ${selectedSlot}` : 'Sélectionner un créneau'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   PREMIUM — Luxury redesign
───────────────────────────────────────────────────────────────── */
export const Premium = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [billing, setBilling] = useState<'month' | 'year'>('year');

  const features = [
    { icon: '🧘', title: 'Méditations illimitées', desc: '50+ programmes guidés' },
    { icon: '📊', title: 'Suivi avancé', desc: 'Prédictions & rapports IA' },
    { icon: '🩺', title: 'Praticiens prioritaires', desc: 'Accès direct & sans attente' },
    { icon: '👥', title: 'Groupes privés', desc: 'Cercles de parole exclusifs' },
    { icon: '📄', title: 'Rapports mensuels PDF', desc: 'Export complet de santé' },
    { icon: '🚫', title: 'Sans publicité', desc: 'Expérience 100% pure' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 overflow-y-auto pb-10 rounded-[36px]"
      style={{ background: 'linear-gradient(170deg, #08001E 0%, #1A0545 25%, #2D1B69 55%, #4A2899 80%, #6C3DBA 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-0 w-60 h-60 rounded-full blur-[60px]"
          style={{ background: 'rgba(184,146,255,0.12)' }} />
      </div>

      {/* Close */}
      <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('profile')}
        className="absolute top-16 left-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <X size={20} className="text-white" />
      </motion.button>

      {/* Header */}
      <div className="flex flex-col items-center pt-20 pb-6 px-6 relative z-10">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative mb-5">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: 'rgba(228,176,8,0.4)', transform: 'scale(2)' }} />
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)' }}>
            <img src={logoImg} alt="EndoSoul" className="w-12 h-12 object-contain"
              style={{ filter: 'drop-shadow(0 0 16px rgba(228,176,8,0.8))' }} />
          </div>
        </motion.div>

        <h1 className="text-3xl font-serif text-white mb-1">
          EndoSoul <span style={{ background: 'linear-gradient(135deg, #FAE88A, #E4B008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span>
        </h1>
        <p className="text-white/55 text-sm text-center max-w-[240px]">
          {"Accède à ton plein potentiel de guérison"}
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-6 px-6 relative z-10">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setBilling('month')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billing === 'month' ? 'bg-white text-[#2D1B69]' : 'text-white/60'}`}>
            Mensuel
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setBilling('year')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${billing === 'year' ? 'bg-white text-[#2D1B69]' : 'text-white/60'}`}>
            Annuel
            {billing === 'year' && <span className="text-[9px] bg-[#E4B008] text-white px-1.5 py-0.5 rounded-full">-35%</span>}
          </motion.button>
        </div>
      </div>

      {/* Pricing card */}
      <div className="mx-6 mb-6 relative z-10">
        <div className="rounded-[32px] p-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)' }}>
          <div className="text-center mb-6">
            {/* 30-day trial badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(228,176,8,0.18)', border: '1px solid rgba(228,176,8,0.35)' }}>
              <span className="text-[#E4B008] text-[10px] font-bold tracking-wide">✦ Essai gratuit 30 jours</span>
            </div>
            <div className="text-5xl font-serif text-white mb-1">
              <span style={{ background: 'linear-gradient(135deg, #FAE88A, #E4B008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {billing === 'year' ? '7,49 €' : '14,99 €'}
              </span>
              <span className="text-lg text-white/50 font-sans">/mois</span>
            </div>
            {billing === 'year' && (
              <p className="text-white/50 text-xs">
                Facturé 89,99 €/an · <span className="text-[#E4B008]">Économisez 90 €</span>
              </p>
            )}
            {billing === 'month' && (
              <p className="text-white/50 text-xs mt-1">14,99 €/mois · Sans engagement</p>
            )}
          </div>

          <ul className="space-y-3.5 mb-7">
            {features.map((f, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: 'rgba(228,176,8,0.2)', border: '1px solid rgba(228,176,8,0.3)' }}>
                  {f.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{f.title}</div>
                  <div className="text-white/45 text-xs">{f.desc}</div>
                </div>
                <Check size={16} className="text-[#E4B008] ml-auto shrink-0" strokeWidth={2.5} />
              </motion.li>
            ))}
          </ul>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => {}}
            className="w-full py-4 rounded-full text-white font-bold text-base relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E4B008 0%, #C49B00 100%)', boxShadow: '0 8px 32px rgba(228,176,8,0.45)' }}>
            {billing === 'year' ? 'Démarrer — 89,99 €/an' : 'Démarrer — 14,99 €/mois'}
          </motion.button>

          <p className="text-center text-white/30 text-[10px] mt-3">
            30 jours gratuits · Annulable à tout moment · Paiement sécurisé
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mx-6 mb-6 relative z-10">
        <h3 className="text-white/70 text-xs uppercase tracking-widest font-semibold text-center mb-4">Gratuit vs Premium</h3>
        <div className="rounded-[24px] overflow-hidden border border-white/10">
          <div className="grid grid-cols-3 text-center text-[10px] font-bold uppercase tracking-wider py-2.5 px-4"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="text-white/40 text-left">Fonctionnalité</div>
            <div className="text-white/50">Gratuit</div>
            <div style={{ background: 'linear-gradient(135deg, #FAE88A, #E4B008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</div>
          </div>
          {[
            { feat: 'Suivi cycle', free: true, prem: true },
            { feat: 'Journal symptômes', free: '5/mois', prem: 'Illimité' },
            { feat: 'Méditations', free: '2 sessions', prem: '50+ sessions' },
            { feat: 'Praticiens', free: false, prem: true },
            { feat: 'Rapports PDF', free: false, prem: true },
            { feat: 'Communauté privée', free: false, prem: true },
            { feat: 'Sans publicité', free: false, prem: true },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-3 text-center py-3 px-4 border-t border-white/8 ${i % 2 === 0 ? '' : ''}`}
              style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
              <div className="text-white/60 text-[11px] text-left">{row.feat}</div>
              <div className="text-[11px]">
                {row.free === true ? <span className="text-emerald-400">✓</span>
                  : row.free === false ? <span className="text-white/20">✗</span>
                  : <span className="text-white/40">{row.free}</span>}
              </div>
              <div className="text-[11px]">
                {row.prem === true ? <span className="text-[#E4B008]">✦</span>
                  : <span className="text-[#E4B008]">{row.prem}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-5 px-6 pb-4 relative z-10">
        {[{ icon: '🔒', label: 'RGPD' }, { icon: '🚫', label: 'Sans pub' }, { icon: '🔐', label: 'Chiffré' }].map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xl">{b.icon}</span>
            <span className="text-[9px] text-white/40">{b.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   PROFILE
───────────────────────────────────────────────────────────────── */
export const Profile = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [reminders, setReminders] = useState(true);

  const menuSections = [
    {
      title: 'Mon parcours',
      items: [
        { icon: Award, label: 'Mes succès', sub: '6 débloqués', onClick: () => navigate('achievements'), accent: '#E4B008' },
        { icon: TrendingUp, label: "Historique humeur", sub: '7 jours', onClick: () => navigate('moodhistory'), accent: '#B892FF' },
        { icon: FileText, label: 'Rapport mensuel', sub: 'Juillet 2025', onClick: () => navigate('report'), accent: '#6C3DBA' },
      ]
    },
    {
      title: 'Compte',
      items: [
        { icon: Star, label: 'Gérer mon abonnement', sub: 'Premium actif', onClick: () => navigate('premium'), accent: '#E4B008' },
        { icon: Bell, label: 'Notifications', sub: '3 non lues', onClick: () => navigate('notifications'), accent: '#B892FF' },
        { icon: Settings, label: 'Paramètres & RGPD', sub: '', onClick: () => navigate('settings'), accent: '#8B7BA8' },
        { icon: Shield, label: 'Confidentialité', sub: '', onClick: () => navigate('settings'), accent: '#6C3DBA' },
        { icon: LifeBuoy, label: 'Aide et support', sub: '', onClick: undefined, accent: '#8B7BA8' },
      ]
    }
  ];

  return (
    <ScreenWrapper id="profile">
      {/* Watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.04] overflow-hidden">
        <img src={logoImg} alt="" aria-hidden className="w-44 h-44 object-contain translate-x-8 -translate-y-8"
          style={{ filter: 'brightness(0) saturate(0)' }} />
      </div>

      <h1 className="text-2xl text-[#2D1B69] mb-6 font-serif relative z-10">Mon Profil</h1>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="relative mb-4">
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(228,176,8,0)', '0 0 0 8px rgba(228,176,8,0.15)', '0 0 0 0 rgba(228,176,8,0)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B892FF] to-[#6C3DBA] flex items-center justify-center text-white text-2xl font-serif"
          >
            NB
          </motion.div>
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(108,61,186,0.2)]">
            <img src={logoImg} alt="" className="w-6 h-6 object-contain"
              style={{ filter: 'drop-shadow(0 0 4px rgba(228,176,8,0.5))' }} />
          </div>
        </div>
        <h2 className="text-xl text-[#2D1B69] font-serif">Nour</h2>
        <div className="flex items-center gap-1.5 mt-1 bg-[#FFF8E4] border border-[#E4B008]/25 px-3 py-1 rounded-full">
          <Star size={12} className="text-[#E4B008]" fill="currentColor" />
          <span className="text-[#C49B00] text-xs font-semibold">Membre Premium</span>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-5 w-full justify-center">
          {[
            { label: 'Jours', value: '47' },
            { label: 'Sessions', value: '12' },
            { label: 'Série', value: '🔥 23j' },
          ].map(stat => (
            <motion.div key={stat.label} whileHover={{ y: -2 }}
              className="flex flex-col items-center glass-card rounded-2xl px-4 py-3 border border-[#E9D8FF]/60">
              <span className="text-lg font-serif text-[#6C3DBA] font-semibold">{stat.value}</span>
              <span className="text-[10px] text-[#8B7BA8] mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reminder toggle */}
      <div className="glass-card rounded-2xl p-4 flex items-center gap-4 mb-5 border border-[#E9D8FF]/50">
        <div className="w-10 h-10 rounded-full bg-[#EDE4FF] flex items-center justify-center text-[#6C3DBA]">
          <Zap size={18} />
        </div>
        <span className="flex-1 font-medium text-[#2D1B69] text-sm">Rappels quotidiens</span>
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setReminders(r => !r)}
          className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${reminders ? 'bg-[#B892FF]' : 'bg-[#E9D8FF]'}`}>
          <motion.div animate={{ x: reminders ? 24 : 0 }} transition={SPRING}
            className="w-4 h-4 rounded-full bg-white shadow" />
        </motion.div>
      </div>

      {/* Menu sections */}
      {menuSections.map(section => (
        <div key={section.title} className="mb-5">
          <h3 className="text-xs font-bold text-[#8B7BA8] uppercase tracking-wider mb-2 px-1">{section.title}</h3>
          <div className="space-y-2">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} whileTap={{ scale: 0.98 }}
                  onClick={item.onClick}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-[#E9D8FF]/50">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.accent}22` }}>
                    <Icon size={18} style={{ color: item.accent }} />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-[#2D1B69] text-sm">{item.label}</span>
                    {item.sub && <p className="text-[10px] text-[#8B7BA8] mt-0.5">{item.sub}</p>}
                  </div>
                  <ChevronRight size={18} className="text-[#C4B5D4]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <motion.button whileTap={{ scale: 0.97 }}
        onClick={() => navigate('onboarding')}
        className="w-full glass-card border border-rose-200 text-rose-500 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors">
        <LogOut size={20} />
        Déconnexion
      </motion.button>
    </ScreenWrapper>
  );
};
