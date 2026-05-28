import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Moon, Anchor, Feather, Star, Play, Pause, 
  MessageCircle, ThumbsUp, MapPin, Check, ChevronRight, ChevronLeft, Plus,
  Activity, Shield, Settings, LifeBuoy, LogOut, Bell, BookOpen, Calendar as CalendarIcon, Heart, Volume2
} from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { ScreenId } from './App';
import logoImg from '@assets/logo_1779998926197.png';
import { useAmbientAudio } from './useAmbientAudio';

const SPRING = { type: 'spring' as const, stiffness: 340, damping: 28 };
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ScreenWrapper = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
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

export const Onboarding = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease: EASE_OUT },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center overflow-hidden rounded-[36px]"
      style={{ background: 'linear-gradient(170deg, #04000F 0%, #130535 30%, #2A1266 60%, #4A2899 85%, #6B3DBE 100%)' }}
    >
      {/* Layered ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.14) 0%, rgba(108,61,186,0.18) 45%, transparent 72%)' }}
        />
        <div className="absolute top-[5%] left-[2%] w-56 h-56 bg-[#B892FF]/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-[28%] right-[-8%] w-72 h-72 bg-[#5B2DA8]/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[5%] w-52 h-52 bg-[#E4B008]/6 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Lotus watermark ghost */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: '60px' }}>
        <img src={logoImg} alt="" aria-hidden className="w-[320px] h-[320px] object-contain opacity-[0.035]"
          style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Expanding pulse rings — synced with logo position */}
      <div className="absolute flex items-center justify-center inset-0 pointer-events-none" style={{ paddingBottom: '140px' }}>
        <div className="absolute w-52 h-52 rounded-full border border-[#E4B008]/10 animate-lotus-ring" />
        <div className="absolute w-52 h-52 rounded-full border border-[#B892FF]/8 animate-lotus-ring" style={{ animationDelay: '1.4s' }} />
        <div className="absolute w-52 h-52 rounded-full border border-white/5 animate-lotus-ring" style={{ animationDelay: '2.8s' }} />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center">

        {/* Logo — cinematic entrance */}
        <motion.div
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE_OUT, delay: 0.15 }}
          className="relative mb-8"
        >
          {/* Breathing outer glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.5) 0%, rgba(184,146,255,0.25) 50%, transparent 75%)', transform: 'scale(2.4)' }}
          />
          {/* Inner lavender ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: 'rgba(184,146,255,0.3)', transform: 'scale(1.7)' }}
          />
          <img
            src={logoImg}
            alt="EndoSoul"
            className="relative w-44 h-44 object-contain"
            style={{ filter: 'drop-shadow(0 0 28px rgba(228,176,8,0.8)) drop-shadow(0 0 55px rgba(184,146,255,0.4)) drop-shadow(0 0 90px rgba(108,61,186,0.3))' }}
          />
        </motion.div>

        {/* Brand name */}
        <motion.h1 {...reveal(0.75)}
          className="text-[2.6rem] font-serif tracking-wide mb-1 leading-none"
          style={{ background: 'linear-gradient(135deg, #FAE88A 0%, #E4B008 45%, #C07A20 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          EndoSoul
        </motion.h1>

        <motion.p {...reveal(0.9)} className="text-white/30 text-[9px] mb-5 tracking-[0.42em] uppercase">
          Lumière &amp; Inspiration
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE_OUT }}
          className="w-16 h-px mb-5"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(228,176,8,0.55), transparent)' }}
        />

        {/* Tagline */}
        <motion.p {...reveal(1.1)} className="text-white/55 text-sm font-light leading-relaxed max-w-[190px] mb-1">
          Prenez soin de votre corps<br />et de votre âme
        </motion.p>
        <motion.p {...reveal(1.2)} className="text-[#E4B008]/65 text-sm italic mb-10 font-serif">
          Lumière sur ta guérison
        </motion.p>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: EASE_OUT }}
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.18)' }}
          whileTap={{ scale: 0.96 }}
          data-testid="btn-commencer"
          onClick={() => navigate('auth')}
          className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-4 rounded-full text-base font-medium"
          style={{ boxShadow: '0 0 35px rgba(228,176,8,0.18), 0 4px 24px rgba(184,146,255,0.14), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <span className="relative z-10">Commencer</span>
        </motion.button>

        <motion.p {...reveal(1.6)} className="text-white/18 text-[1.4rem] mt-10 tracking-widest">
          ॐ
        </motion.p>
      </div>
    </motion.div>
  );
};

export const Auth = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.5, ease: EASE_OUT }}
    className="absolute inset-0 bg-gradient-to-b from-[#EDE4FF] via-[#F5F0FF] to-[#FAF7FF] flex flex-col pt-24 pb-8 rounded-[36px]"
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT }}
      className="mx-4 flex-1 glass-card rounded-[36px] p-8 flex flex-col"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT }}
        className="flex justify-center mb-4"
      >
        <img src={logoImg} alt="EndoSoul" className="w-16 h-16 object-contain" style={{ filter: 'drop-shadow(0 0 10px rgba(228,176,8,0.4))' }} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
        className="text-2xl text-[#6C3DBA] text-center mb-10 font-serif"
      >
        Bienvenue
      </motion.h2>
      
      <div className="space-y-4 flex-1">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: EASE_OUT }}
          whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(108,61,186,0.1)' }}
          whileTap={{ scale: 0.97 }}
          data-testid="btn-google"
          onClick={() => navigate('dashboard')}
          className="w-full flex items-center justify-center gap-3 bg-white border border-[#E9D8FF] text-[#2D1B69] py-4 rounded-2xl shadow-sm"
        >
          <FaGoogle className="text-[#DB4437]" size={20} />
          <span className="font-medium">Continuer avec Google</span>
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE_OUT }}
          whileHover={{ scale: 1.02, backgroundColor: '#111' }}
          whileTap={{ scale: 0.97 }}
          data-testid="btn-apple"
          onClick={() => navigate('dashboard')}
          className="w-full flex items-center justify-center gap-3 bg-[#1A1A2E] text-white py-4 rounded-2xl shadow-sm"
        >
          <FaApple size={22} />
          <span className="font-medium">Continuer avec Apple</span>
        </motion.button>
        
        <div className="flex items-center gap-4 py-4">
          <div className="h-px bg-[#E9D8FF] flex-1"></div>
          <span className="text-sm text-[#8B7BA8]">ou</span>
          <div className="h-px bg-[#E9D8FF] flex-1"></div>
        </div>
        
        <button 
          data-testid="btn-email"
          onClick={() => navigate('dashboard')}
          className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] text-white py-4 rounded-2xl font-medium shadow-sm transition-opacity hover:opacity-90"
        >
          S'inscrire avec email
        </button>
      </div>
      
      <p className="text-[10px] text-center text-[#8B7BA8] mt-8">
        En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité (RGPD).
      </p>
    </motion.div>
  </motion.div>
);

export const Dashboard = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [activeMood, setActiveMood] = useState('Sereine');
  const [reminderOn, setReminderOn] = useState(true);

  const moods = [
    { label: 'Douleur', icon: '💜' },
    { label: 'Fatiguée', icon: '😴' },
    { label: 'Stressée', icon: '😰' },
    { label: 'Sereine', icon: '✨' },
    { label: 'Énergique', icon: '⚡' },
  ];

  return (
    <ScreenWrapper id="dashboard">
      {/* Lotus watermark — top-right corner */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <img src={logoImg} alt="" aria-hidden className="w-48 h-48 object-contain translate-x-10 -translate-y-10"
          style={{ filter: 'brightness(0) saturate(0)' }} />
      </div>

      <header className="mb-6 flex items-start justify-between relative z-10">
        <div>
          <p className="text-[#8B7BA8] text-sm font-medium mb-0.5">Bonjour,</p>
          <h1 className="text-2xl text-[#2D1B69] font-serif flex items-center gap-2">
            Nour <span className="text-[#E4B008] text-lg">✦</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="" className="w-7 h-7 object-contain opacity-60"
            style={{ filter: 'drop-shadow(0 0 4px rgba(228,176,8,0.4))' }} />
          <button className="w-9 h-9 glass-card rounded-full flex items-center justify-center text-[#8B7BA8]">
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Mood pills */}
      <div className="mb-6">
        <p className="text-[#2D1B69] text-sm font-medium mb-3">Comment te sens-tu aujourd'hui ?</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {moods.map(m => (
            <button
              key={m.label}
              onClick={() => setActiveMood(m.label)}
              data-testid={`mood-${m.label}`}
              className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeMood === m.label
                  ? 'bg-[#6C3DBA] text-white shadow-[0_4px_16px_rgba(108,61,186,0.35)]'
                  : 'glass-card text-[#8B7BA8]'
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ton espace bien-être */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#2D1B69] mb-3">Ton espace bien-être</h3>
        <div className="space-y-3">
          {[
            { icon: BookOpen, color: '#EDE4FF', iconColor: '#6C3DBA', title: 'Journal de bord', desc: 'Note tes symptômes, émotions et progrès', screen: 'symptoms' as ScreenId },
            { icon: Moon, color: '#F5F0FF', iconColor: '#B892FF', title: 'Méditations', desc: 'Apaise ton corps et ton esprit', screen: 'meditation' as ScreenId },
            { icon: CalendarIcon, color: '#FFF8E4', iconColor: '#E4B008', title: 'Programme', desc: 'Ton parcours personnalisé', screen: 'cycle' as ScreenId },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                whileHover={{ y: -3, scale: 1.015, boxShadow: '0 8px 28px rgba(108,61,186,0.14)' }}
                whileTap={{ scale: 0.975 }}
                onClick={() => navigate(item.screen)}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-[#E9D8FF]/60 transition-shadow"
                data-testid={`card-${item.title}`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={20} style={{ color: item.iconColor }} />
                </motion.div>
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

      {/* Rappels & suivi */}
      <div>
        <h3 className="text-base font-semibold text-[#2D1B69] mb-3">Rappels &amp; suivi</h3>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EDE4FF] rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell size={18} className="text-[#6C3DBA]" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#2D1B69] text-sm">Prendre mon traitement</p>
            <p className="text-xs text-[#8B7BA8]">Aujourd'hui à 20:00</p>
          </div>
          <button
            onClick={() => setReminderOn(r => !r)}
            data-testid="toggle-reminder"
            className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${reminderOn ? 'bg-[#6C3DBA]' : 'bg-[#E9D8FF]'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${reminderOn ? 'left-5' : 'left-0.5'}`}></div>
          </button>
        </div>

        <button 
          onClick={() => navigate('symptoms')}
          className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] text-white py-3.5 rounded-2xl mt-3 flex justify-center items-center gap-2 shadow-premium"
          data-testid="btn-nouveau-releve"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Nouveau relevé</span>
        </button>
      </div>
    </ScreenWrapper>
  );
};

export const Cycle = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <ScreenWrapper id="cycle">
    <h1 className="text-2xl text-[#2D1B69] mb-6 font-serif">Mon Cycle</h1>
    
    <div className="glass-card rounded-[32px] p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-[#2D1B69]">Novembre 2023</h3>
        <div className="flex gap-2">
          <ChevronLeft className="text-[#8B7BA8]" />
          <ChevronRight className="text-[#6C3DBA]" />
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-y-4 text-center mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => (
          <div key={idx} className="text-xs text-[#8B7BA8] font-medium">{d}</div>
        ))}
        {Array.from({length: 30}).map((_, i) => {
          const day = i + 1;
          let bg = "";
          let text = "text-[#2D1B69]";
          let ring = "";
          if (day >= 12 && day <= 16) { bg = "bg-[#B892FF]"; text = "text-white"; } // Period
          else if (day >= 22 && day <= 26) { bg = "bg-[#E9D8FF]"; text = "text-[#6C3DBA]"; } // Fertile
          
          if (day === 14) {
             ring = "ring-2 ring-[#E4B008] ring-offset-2 ring-offset-[#FAF7FF]";
          }
          
          return (
            <div key={i} className="flex justify-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${bg} ${text} ${ring}`}>
                {day}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex gap-4 mt-6 pt-4 border-t border-[#E9D8FF] text-xs">
        <div className="flex items-center gap-1 text-[#2D1B69]"><div className="w-2 h-2 rounded-full bg-[#B892FF]"></div> Règles</div>
        <div className="flex items-center gap-1 text-[#2D1B69]"><div className="w-2 h-2 rounded-full bg-[#E9D8FF]"></div> Fertilité</div>
      </div>
    </div>

    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-gradient-to-r from-[#E9D8FF] to-[#FAF7FF] p-4 rounded-2xl border border-[#E9D8FF]">
        <span className="text-xs text-[#6C3DBA] uppercase font-bold tracking-wider">Phase Actuelle</span>
        <h4 className="text-xl text-[#2D1B69] mt-1 font-serif">Menstruelle</h4>
        <p className="text-sm text-[#8B7BA8] mt-1">Jour 3 sur 28</p>
      </div>
    </div>

    <h3 className="text-xl text-[#2D1B69] mb-4 font-serif">Symptômes fréquents</h3>
    <div className="flex flex-wrap gap-2">
      {['Crampes pelviennes', 'Fatigue intense', 'Ballonnements', 'Maux de tête'].map(sym => (
        <span key={sym} className="px-4 py-2 glass-card rounded-full text-sm text-[#2D1B69]">
          {sym}
        </span>
      ))}
    </div>
  </ScreenWrapper>
);

export const Symptoms = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate('dashboard');
    }, 2000);
  };

  return (
    <ScreenWrapper id="symptoms">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('dashboard')} className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl text-[#2D1B69] font-serif">Comment vas-tu ?</h1>
      </div>

      <div className="space-y-8 glass-card p-6 rounded-[32px] border border-[#E9D8FF]">
        
        <div>
          <label className="block text-lg font-medium text-[#2D1B69] mb-4">Niveau de douleur</label>
          <input type="range" min="0" max="10" defaultValue="4" className="custom-slider mb-2" />
          <div className="flex justify-between text-sm text-[#8B7BA8] font-medium">
            <span>Aucune</span>
            <span>Insoutenable</span>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-[#2D1B69] mb-4">Humeur</label>
          <div className="flex justify-between glass-card p-2 rounded-2xl">
            {['😊', '😐', '😔', '😢', '😤'].map((emoji, i) => (
              <button key={emoji} className={`text-3xl p-2 rounded-xl transition-all ${i === 2 ? 'bg-[#E9D8FF] scale-110' : 'hover:bg-white/50'}`}>
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-[#2D1B69] mb-4">Fatigue</label>
          <input type="range" min="0" max="10" defaultValue="6" className="custom-slider mb-2" />
          <div className="flex justify-between text-sm text-[#8B7BA8] font-medium">
            <span>En forme</span>
            <span>Épuisée</span>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] border border-[#E4B008] text-white py-4 rounded-2xl text-lg font-medium shadow-premium relative overflow-hidden"
        >
          {submitted ? 'Enregistré ✨' : 'Enregistrer'}
        </button>
      </div>

      {submitted && (
        <div className="fixed top-12 left-6 right-6 glass-card border border-[#E9D8FF] text-[#6C3DBA] p-4 rounded-xl shadow-premium flex items-center justify-center gap-2 z-50">
          <Check size={20} className="text-[#E4B008]" />
          <span className="font-medium">Tes symptômes ont été notés. Repose-toi bien. 💜</span>
        </div>
      )}
    </ScreenWrapper>
  );
};

export const Meditation = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <ScreenWrapper id="meditation">
    {/* Lotus watermark — bottom center */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04]">
      <img src={logoImg} alt="" aria-hidden className="w-56 h-56 object-contain"
        style={{ filter: 'hue-rotate(260deg) saturate(0.3) brightness(0.4)' }} />
    </div>

    <div className="flex items-center gap-3 mb-2 relative z-10">
      <img src={logoImg} alt="" className="w-9 h-9 object-contain"
        style={{ filter: 'drop-shadow(0 0 6px rgba(228,176,8,0.5))' }} />
      <h1 className="text-2xl text-[#2D1B69] font-serif">Méditation & Reiki</h1>
    </div>
    <p className="text-[#8B7BA8] mb-8 relative z-10">Un moment de douceur pour toi.</p>

    <div className="grid gap-4 relative z-10">
      {[
        { title: 'Respiration lunaire', icon: Moon, duration: '5 min', desc: 'Apaiser le système nerveux' },
        { title: 'Ancrage', icon: Anchor, duration: '12 min', desc: 'Se reconnecter à son corps' },
        { title: 'Lâcher-prise', icon: Feather, duration: '15 min', desc: 'Soulager les tensions pelviennes' },
        { title: 'Sommeil réparateur', icon: Star, duration: '20 min', desc: 'Préparer une nuit paisible' }
      ].map((session, i) => {
        const Icon = session.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09, duration: 0.5, ease: EASE_OUT }}
            whileHover={{ y: -3, scale: 1.015, boxShadow: '0 10px 30px rgba(108,61,186,0.12)' }}
            whileTap={{ scale: 0.975 }}
            onClick={() => i === 0 && navigate('serenity')}
            className="glass-card p-5 rounded-[28px] flex items-center gap-5 cursor-pointer border border-[#E9D8FF]/50"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EDE4FF] to-[#D4B8FF] flex items-center justify-center text-[#6C3DBA] shrink-0"
            >
              <Icon size={24} />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-medium text-lg text-[#2D1B69] mb-1">{session.title}</h3>
              <p className="text-xs text-[#8B7BA8]">{session.desc}</p>
            </div>
            <div className="bg-[#FAF7FF] border border-[#E9D8FF] text-[#6C3DBA] px-3 py-1 rounded-full text-xs font-medium">
              {session.duration}
            </div>
          </motion.div>
        )
      })}
    </div>
  </ScreenWrapper>
);

export const Serenity = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const { isPlaying, toggle } = useAmbientAudio();
  const [breathPhase, setBreathPhase] = useState<'Inspirez...' | 'Expirez...'>('Inspirez...');
  const [secondsLeft, setSecondsLeft] = useState(300);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(s => Math.max(0, s - 1));
      }, 1000);
      breathRef.current = setInterval(() => {
        setBreathPhase(p => p === 'Inspirez...' ? 'Expirez...' : 'Inspirez...');
      }, 4500);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="absolute inset-0 flex flex-col items-center justify-between p-6 pb-10 rounded-[36px]"
      style={{ background: 'linear-gradient(170deg, #0D0130 0%, #2D1B69 45%, #4A2899 75%, #7C4DCC 100%)' }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.12) 0%, rgba(184,146,255,0.18) 50%, transparent 75%)' }}
      />

      {/* Header */}
      <div className="w-full flex items-center justify-between pt-8 relative z-10">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate('meditation')}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)' }}
        >
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

      {/* Breathing orb */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* SVG progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 256 256">
            <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <motion.circle
              cx="128" cy="128" r="120"
              fill="none"
              stroke="rgba(228,176,8,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 120}`}
              animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>

          {/* Breathing rings */}
          <motion.div
            animate={isPlaying ? { scale: [1, 1.18, 1], opacity: [0.2, 0.08, 0.2] } : { scale: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full border border-white/20"
          />
          <motion.div
            animate={isPlaying ? { scale: [1, 1.12, 1], opacity: [0.3, 0.12, 0.3] } : { scale: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute inset-10 rounded-full border border-[#B892FF]/35"
          />

          {/* Center glow + logo */}
          <motion.div
            animate={isPlaying
              ? { scale: [1, 1.15, 1], boxShadow: ['0 0 30px rgba(228,176,8,0.25)', '0 0 60px rgba(228,176,8,0.5)', '0 0 30px rgba(228,176,8,0.25)'] }
              : { scale: 1 }
            }
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <img src={logoImg} alt="" className="w-16 h-16 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(228,176,8,0.6)) brightness(1.1)' }} />
          </motion.div>

          {/* Breath phase text */}
          <div className="absolute bottom-6 w-full text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={isPlaying ? breathPhase : 'idle'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6 }}
                className="text-white/80 text-sm font-serif tracking-widest"
              >
                {isPlaying ? breathPhase : 'Prête ?'}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Timer */}
        <motion.div
          animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white font-serif text-5xl font-light tracking-widest"
        >
          {mins}:{secs}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 relative z-10">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setSecondsLeft(300)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white/70"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <Activity size={20} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggle}
          className="w-20 h-20 rounded-full text-white flex items-center justify-center relative"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #E4B008 0%, #C49B00 100%)'
              : 'linear-gradient(135deg, #7C4DCC 0%, #4A2899 100%)',
            boxShadow: isPlaying
              ? '0 0 40px rgba(228,176,8,0.5), 0 8px 24px rgba(228,176,8,0.3)'
              : '0 0 40px rgba(184,146,255,0.4), 0 8px 24px rgba(108,61,186,0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            {isPlaying
              ? <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Pause size={30} /></motion.div>
              : <motion.div key="play"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Play  size={30} className="ml-1" /></motion.div>
            }
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <MusicIcon className={isPlaying ? 'text-[#E4B008]' : 'text-white/70'} />
        </motion.button>
      </div>

      {/* Audio label */}
      <p className="text-white/30 text-[11px] tracking-widest uppercase relative z-10">
        {isPlaying ? '♫ Musique zen · Ambient 432Hz' : 'Appuie pour commencer'}
      </p>
    </motion.div>
  );
};

const MusicIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
);

export const Community = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <ScreenWrapper id="community">
    <h1 className="text-2xl text-[#2D1B69] mb-6 font-serif">Espace Communauté</h1>
    
    <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
      {['#Témoignage', '#Soutien', '#Victoires', '#Questions'].map((tag, i) => (
        <span key={tag} className={`px-4 py-2 glass-card rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-[#B892FF] text-white border-transparent' : 'text-[#6C3DBA]'}`}>
          {tag}
        </span>
      ))}
    </div>

    <div className="space-y-4">
      {[
        { initials: 'M', bg: 'bg-gradient-to-br from-[#EDE4FF] to-[#D4B8FF] text-[#6C3DBA]', user: 'Anonyme', time: 'Il y a 2h', text: "Aujourd'hui, j'ai enfin trouvé une gynécologue qui m'écoute vraiment. Ne perdez pas espoir les filles ! 💜", likes: 24, replies: 5 },
        { initials: 'L', bg: 'bg-gradient-to-br from-[#FFE4E4] to-[#FFC4C4] text-[#E46B6B]', user: 'Anonyme', time: 'Il y a 5h', text: "Grosse crise de douleur ce matin... vos astuces naturelles pour faire passer ça quand la bouillotte ne suffit plus ?", likes: 12, replies: 8 },
        { initials: 'A', bg: 'bg-gradient-to-br from-[#E4EDFF] to-[#C4D8FF] text-[#6B96E4]', user: 'Anonyme', time: 'Hier', text: "Premier jour post-opératoire (coelioscopie). C'est dur mais je me sens soulagée de savoir qu'on m'a enfin diagnostiquée officiellement.", likes: 156, replies: 32 }
      ].map((post, i) => (
        <div key={i} className="glass-card p-5 rounded-[24px]">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${post.bg}`}>
              {post.initials}
            </div>
            <div>
              <div className="font-medium text-[#2D1B69]">{post.user}</div>
              <div className="text-xs text-[#8B7BA8]">{post.time}</div>
            </div>
          </div>
          <p className="text-[#2D1B69]/90 text-sm leading-relaxed mb-4">{post.text}</p>
          <div className="flex gap-6 border-t border-[#E9D8FF] pt-3">
            <button className="flex items-center gap-1.5 text-[#8B7BA8] text-sm hover:text-[#6C3DBA]">
              <ThumbsUp size={16} /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-[#8B7BA8] text-sm hover:text-[#6C3DBA]">
              <MessageCircle size={16} /> {post.replies}
            </button>
          </div>
        </div>
      ))}
    </div>

    <button className="fixed bottom-28 right-6 w-14 h-14 bg-gradient-to-br from-[#B892FF] to-[#6C3DBA] text-white rounded-full shadow-premium flex items-center justify-center z-50">
      <MessageCircle size={24} />
    </button>
  </ScreenWrapper>
);

export const Practitioners = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [selected, setSelected] = useState(false);

  return (
    <ScreenWrapper id="practitioners">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-[#2D1B69] font-serif">Praticiens</h1>
        <button onClick={() => navigate('premium')} className="bg-[#FAF7FF] text-[#E4B008] p-2 rounded-full border border-[#E4B008]/20">
          <Star size={20} />
        </button>
      </div>

      <div className="glass-card p-3 rounded-2xl flex items-center gap-3 mb-6 text-[#8B7BA8]">
        <MapPin size={20} />
        <span className="text-sm">Autour de Paris, 75000</span>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Dr. Claire Dubois', spec: 'Gynécologue experte', dist: '2.4 km', rating: '4.9', bg: 'bg-gradient-to-tr from-[#E9D8FF] to-[#B892FF]/30' },
          { name: 'Nadia Lefort', spec: 'Ostéopathe pelvienne', dist: '3.1 km', rating: '4.8', bg: 'bg-gradient-to-tr from-[#FFF8E4] to-[#E4B008]/30' },
          { name: 'Marie Leroy', spec: 'Naturopathe', dist: '5.0 km', rating: '5.0', bg: 'bg-gradient-to-tr from-[#E4EDFF] to-[#B892FF]/20' },
        ].map((doc, i) => (
          <div key={i} onClick={() => setSelected(true)} className="glass-card p-4 rounded-[24px] flex gap-4 cursor-pointer hover:border-[#B892FF]/30">
            <div className={`w-16 h-16 rounded-xl ${doc.bg} shrink-0`}></div>
            <div className="flex-1">
              <h3 className="font-medium text-[#2D1B69]">{doc.name}</h3>
              <p className="text-sm text-[#6C3DBA] mb-2">{doc.spec}</p>
              <div className="flex items-center gap-3 text-xs text-[#8B7BA8]">
                <span className="flex items-center gap-1 text-[#E4B008] font-medium"><Star size={12} fill="currentColor" /> {doc.rating}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {doc.dist}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D1B69]/40 backdrop-blur-sm flex items-end justify-center rounded-[44px] overflow-hidden"
            onClick={() => setSelected(false)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white w-full rounded-t-[40px] p-6 pb-12 relative shadow-[0_-20px_60px_rgba(108,61,186,0.15)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-[#E9D8FF] rounded-full mx-auto mb-6"></div>
              <div className="flex gap-4 mb-6">
                 <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#E9D8FF] to-[#B892FF]/30 shrink-0`}></div>
                 <div>
                   <h2 className="text-2xl text-[#6C3DBA] font-medium font-serif">Dr. Claire Dubois</h2>
                   <p className="text-[#8B7BA8] mb-2">Gynécologue experte</p>
                   <span className="inline-flex items-center gap-1 bg-[#FAF7FF] text-[#E4B008] px-2 py-1 rounded-lg border border-[#E4B008]/20 text-sm font-medium">
                     <Star size={14} fill="currentColor" /> 4.9 (120 avis)
                   </span>
                 </div>
              </div>
              <p className="text-sm text-[#2D1B69]/80 leading-relaxed mb-8">
                Spécialisée dans la prise en charge des douleurs pelviennes chroniques et le diagnostic de l'endométriose. Approche bienveillante et pluridisciplinaire.
              </p>
              <button className="w-full bg-[#E4B008] text-white py-4 rounded-xl font-medium shadow-[0_8px_24px_rgba(228,176,8,0.3)] text-lg">
                Prendre rendez-vous
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
};

export const Premium = ({ navigate }: { navigate: (s: ScreenId) => void }) => (
  <ScreenWrapper id="premium" className="bg-gradient-to-br from-[#2D1B69] via-[#4A2899] to-[#B892FF]">
    <button onClick={() => navigate('profile')} className="absolute top-14 left-6 p-2 glass-card bg-white/20 text-white rounded-full z-10">
      <ChevronLeft size={24} />
    </button>
    
    <div className="text-center mt-12 mb-8 relative z-10">
      <div className="inline-block p-4 rounded-3xl glass-card bg-white/15 mb-6">
        <img src={logoImg} alt="EndoSoul" className="w-12 h-12 object-contain" style={{ filter: 'drop-shadow(0 0 12px rgba(228,176,8,0.5))' }} />
      </div>
      <h1 className="text-3xl text-white mb-2 font-serif">EndoSoul <span className="text-[#E4B008]">Premium</span></h1>
      <p className="text-white/80">Accédez à votre plein potentiel de guérison</p>
    </div>

    <div className="glass-card bg-white/10 rounded-[32px] p-6 mb-8 text-white z-10 relative">
      <ul className="space-y-4 mb-8">
        {[
          'Programmes de méditation illimités',
          'Suivi de cycle avancé et prédictions',
          'Rendez-vous prioritaires praticiens',
          'Accès aux groupes de parole privés'
        ].map((feat, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="bg-[#E4B008] rounded-full p-1 text-white">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium">{feat}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mb-6">
        <div className="text-4xl text-[#E4B008] font-serif mb-1">9,99€<span className="text-lg text-white/70 font-sans">/mois</span></div>
        <p className="text-xs text-white/60">Sans engagement, annulable à tout moment.</p>
      </div>

      <button className="w-full bg-[#E4B008] text-white py-4 rounded-full font-medium shadow-[0_8px_24px_rgba(228,176,8,0.4)] text-lg transition-transform active:scale-95">
        Essai gratuit 7 jours
      </button>
    </div>
  </ScreenWrapper>
);

export const Profile = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [reminders, setReminders] = useState(true);

  return (
    <ScreenWrapper id="profile">
      {/* Subtle lotus watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.04] overflow-hidden">
        <img src={logoImg} alt="" aria-hidden className="w-44 h-44 object-contain translate-x-8 -translate-y-8"
          style={{ filter: 'brightness(0) saturate(0)' }} />
      </div>

      <h1 className="text-2xl text-[#2D1B69] mb-8 font-serif relative z-10">Mon Profil</h1>
      
      <div className="flex flex-col items-center mb-10 relative z-10">
        {/* Avatar with lotus badge */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B892FF] to-[#6C3DBA] flex items-center justify-center text-white text-2xl font-serif shadow-premium">
            NB
          </div>
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(108,61,186,0.2)]">
            <img src={logoImg} alt="" className="w-6 h-6 object-contain"
              style={{ filter: 'drop-shadow(0 0 4px rgba(228,176,8,0.5))' }} />
          </div>
        </div>
        <h2 className="text-xl text-[#2D1B69] font-serif">Nour Benali</h2>
        <div className="flex items-center gap-1.5 mt-1">
          <Star size={12} className="text-[#E4B008]" fill="currentColor" />
          <p className="text-[#8B7BA8] text-sm">Membre Premium</p>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mt-6 w-full justify-center">
          {[
            { label: 'Jours', value: '47' },
            { label: 'Sessions', value: '12' },
            { label: 'Humeur moy.', value: '✨' },
          ].map(stat => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center glass-card rounded-2xl px-4 py-3"
            >
              <span className="text-xl font-serif text-[#6C3DBA] font-semibold">{stat.value}</span>
              <span className="text-[10px] text-[#8B7BA8] mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {[
          { icon: Settings, label: 'Paramètres du compte' },
          { icon: Shield, label: 'Confidentialité et données' },
          { icon: Star, label: 'Gérer mon abonnement', onClick: () => navigate('premium') },
          { icon: LifeBuoy, label: 'Aide et support' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} onClick={item.onClick} className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#B892FF]/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#E9D8FF] flex items-center justify-center text-[#6C3DBA]">
                <Icon size={20} />
              </div>
              <span className="flex-1 font-medium text-[#2D1B69]">{item.label}</span>
              <ChevronRight size={20} className="text-[#8B7BA8]" />
            </div>
          )
        })}

        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E9D8FF] flex items-center justify-center text-[#6C3DBA]">
            <Heart size={20} />
          </div>
          <span className="flex-1 font-medium text-[#2D1B69]">Rappels quotidiens</span>
          <div 
            onClick={() => setReminders(!reminders)}
            className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${reminders ? 'bg-[#B892FF]' : 'bg-[#E9D8FF]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${reminders ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('onboarding')} className="w-full glass-card border border-rose-200 text-rose-500 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 mt-auto hover:bg-rose-50 transition-colors">
        <LogOut size={20} />
        Déconnexion
      </button>
    </ScreenWrapper>
  );
};