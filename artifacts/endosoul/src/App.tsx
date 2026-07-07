import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Calendar, Smile, User, BatteryMedium } from 'lucide-react';
import * as Screens from './screens';
import * as Screens2 from './screens2';
import LandingPage from './LandingPage';
import logoImg from '@assets/logo_1779998926197.png';
import lotusPhoto from '@assets/louts_1783417437105.png';

export type ScreenId =
  | 'onboarding'
  | 'auth'
  | 'dashboard'
  | 'cycle'
  | 'symptoms'
  | 'meditation'
  | 'serenity'
  | 'community'
  | 'practitioners'
  | 'premium'
  | 'profile'
  | 'notifications'
  | 'achievements'
  | 'settings'
  | 'report'
  | 'moodhistory';

type Phase = 'splash' | 'landing' | 'app';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  /* floating particle positions — stable, no random() at render time */
  const PARTICLES = [
    { x: '18%', y: '22%', s: 3, d: 0.3 },
    { x: '75%', y: '15%', s: 2, d: 0.7 },
    { x: '88%', y: '55%', s: 4, d: 0.5 },
    { x: '12%', y: '68%', s: 2, d: 1.1 },
    { x: '55%', y: '82%', s: 3, d: 0.9 },
    { x: '32%', y: '40%', s: 2, d: 1.4 },
    { x: '68%', y: '35%', s: 3, d: 0.2 },
    { x: '44%', y: '12%', s: 2, d: 0.6 },
    { x: '82%', y: '78%', s: 4, d: 1.0 },
    { x: '24%', y: '88%', s: 2, d: 0.4 },
  ];

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.65, ease: EASE_OUT }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(170deg, #04000F 0%, #0D0228 25%, #1E0A50 50%, #2D1B69 75%, #3D2280 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}
    >
      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0], y: [0, -30, -60] }}
          transition={{ delay: 0.8 + p.d, duration: 2.4, repeat: Infinity, repeatDelay: p.d * 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: p.x, top: p.y,
            width: p.s, height: p.s, borderRadius: '50%',
            background: '#E4B008', boxShadow: `0 0 ${p.s * 3}px rgba(228,176,8,0.9)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Breathing outer glow — calm pulsation */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,146,255,0.22) 0%, rgba(108,61,186,0.15) 50%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Expanding ring */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0.6 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ delay: 0.5, duration: 2.5, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 220, height: 220, borderRadius: '50%',
          border: '1px solid rgba(228,176,8,0.5)', pointerEvents: 'none',
        }}
      />

      {/* Core content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>

        {/* Lotus flower — "opens" from closed (small, dark) to full bloom */}
        <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Golden inner glow that grows as lotus opens */}
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 0.5, 1.2], opacity: [0, 0.6, 0.3] }}
            transition={{ delay: 0.1, duration: 2.2, ease: EASE_OUT }}
            style={{
              position: 'absolute',
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(228,176,8,0.55) 0%, rgba(184,146,255,0.3) 45%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Lotus photo — starts dark/small (closed), blooms open */}
          <motion.img
            src={lotusPhoto}
            alt=""
            aria-hidden
            initial={{ scale: 0.28, opacity: 0, filter: 'brightness(0.08) saturate(0)' }}
            animate={{
              scale: [0.28, 0.65, 1],
              opacity: [0, 0.7, 1],
              filter: [
                'brightness(0.08) saturate(0)',
                'brightness(0.55) saturate(0.6)',
                'brightness(1.05) saturate(1.15)',
              ],
            }}
            transition={{ delay: 0.05, duration: 2.0, ease: EASE_OUT }}
            style={{
              width: 200, height: 200, objectFit: 'contain', position: 'relative', zIndex: 2,
              filter: 'drop-shadow(0 0 40px rgba(228,176,8,0.7)) drop-shadow(0 0 80px rgba(184,146,255,0.45))',
            }}
          />

          {/* Gold logo icon emerges from lotus center */}
          <motion.img
            src={logoImg}
            alt="EndoSoul"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.9, ease: EASE_OUT }}
            style={{
              position: 'absolute', width: 56, height: 56, objectFit: 'contain', zIndex: 3,
              filter: 'drop-shadow(0 0 18px rgba(228,176,8,1)) drop-shadow(0 0 36px rgba(228,176,8,0.6))',
            }}
          />
        </div>

        {/* Brand name + slogan fade in after lotus opens */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.85, ease: EASE_OUT }}
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            color: 'white', fontSize: '2rem', fontWeight: 500, marginBottom: 4,
            textShadow: '0 0 30px rgba(184,146,255,0.4)',
          }}>
            EndoSoul
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.25, duration: 0.8 }}
            style={{
              color: 'rgba(228,176,8,0.95)', fontSize: '0.72rem',
              letterSpacing: '0.26em', textTransform: 'uppercase',
              textShadow: '0 0 14px rgba(228,176,8,0.5)',
            }}
          >
            Lumière sur ta guérison
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.9, ease: EASE_OUT }}
          style={{
            width: 80, height: 1, marginTop: 20,
            background: 'linear-gradient(90deg, transparent, rgba(228,176,8,0.7), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

function App() {
  const [phase, setPhase] = useState<Phase>('splash');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('onboarding');

  const FULLSCREEN_SCREENS: ScreenId[] = ['onboarding', 'auth', 'serenity', 'premium'];
  const showNav = !FULLSCREEN_SCREENS.includes(currentScreen);

  const navigate = (screen: ScreenId) => setCurrentScreen(screen);

  const navItems = [
    { id: 'dashboard',  icon: Home,     label: 'Accueil',    center: false },
    { id: 'cycle',      icon: Calendar, label: 'Cycle',      center: false },
    { id: 'meditation', icon: null,     label: 'Méditation', center: true  },
    { id: 'community',  icon: Smile,    label: 'Humeur',     center: false },
    { id: 'profile',    icon: User,     label: 'Profil',     center: false },
  ];

  const getNavActive = (id: string): boolean => {
    if (currentScreen === id) return true;
    if (id === 'dashboard'  && ['symptoms', 'notifications', 'moodhistory'].includes(currentScreen)) return true;
    if (id === 'community'  && currentScreen === 'community') return true;
    if (id === 'meditation' && currentScreen === 'serenity') return true;
    if (id === 'profile'    && ['practitioners', 'achievements', 'settings', 'report', 'premium'].includes(currentScreen)) return true;
    return false;
  };

  return (
    <AnimatePresence mode="wait">
      {phase === 'splash' && (
        <SplashScreen key="splash" onDone={() => setPhase('landing')} />
      )}

      {phase === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{ position: 'fixed', inset: 0, overflowY: 'auto', zIndex: 100 }}
        >
          <LandingPage onEnterApp={() => setPhase('app')} />
        </motion.div>
      )}

      {phase === 'app' && (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="w-[390px] h-[844px] bg-[#FAF7FF] rounded-[44px] overflow-hidden relative flex flex-col border-[8px] border-white shadow-[0_30px_80px_rgba(108,61,186,0.22),0_8px_24px_rgba(108,61,186,0.1)]"
        >
          {/* Status Bar */}
          <div className="absolute top-0 inset-x-0 h-14 z-50 flex justify-between items-center px-6 pointer-events-none text-[#2D1B69] font-medium text-[15px]">
            <span>9:41</span>
            <div className="w-32 h-7 bg-black rounded-full absolute left-1/2 -translate-x-1/2 mt-1" />
            <div className="flex items-center gap-1">
              <BatteryMedium size={20} strokeWidth={2} className="opacity-90" />
            </div>
          </div>

          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {currentScreen === 'onboarding'    && <Screens.Onboarding     key="onboarding"    navigate={navigate} />}
              {currentScreen === 'auth'          && <Screens.Auth            key="auth"          navigate={navigate} />}
              {currentScreen === 'dashboard'     && <Screens.Dashboard       key="dashboard"     navigate={navigate} />}
              {currentScreen === 'cycle'         && <Screens.Cycle           key="cycle"         navigate={navigate} />}
              {currentScreen === 'symptoms'      && <Screens.Symptoms        key="symptoms"      navigate={navigate} />}
              {currentScreen === 'meditation'    && <Screens.Meditation      key="meditation"    navigate={navigate} />}
              {currentScreen === 'serenity'      && <Screens.Serenity        key="serenity"      navigate={navigate} />}
              {currentScreen === 'community'     && <Screens.Community       key="community"     navigate={navigate} />}
              {currentScreen === 'practitioners' && <Screens.Practitioners   key="practitioners" navigate={navigate} />}
              {currentScreen === 'premium'       && <Screens.Premium         key="premium"       navigate={navigate} />}
              {currentScreen === 'profile'       && <Screens.Profile         key="profile"       navigate={navigate} />}
              {currentScreen === 'notifications' && <Screens2.Notifications  key="notifications" navigate={navigate} />}
              {currentScreen === 'achievements'  && <Screens2.Achievements   key="achievements"  navigate={navigate} />}
              {currentScreen === 'settings'      && <Screens2.Settings       key="settings"      navigate={navigate} />}
              {currentScreen === 'report'        && <Screens2.MonthlyReport  key="report"        navigate={navigate} />}
              {currentScreen === 'moodhistory'   && <Screens2.MoodHistory    key="moodhistory"   navigate={navigate} />}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="absolute bottom-0 inset-x-0 glass-card pb-8 pt-4 px-5 z-40 rounded-b-[36px]"
              >
                <div className="flex justify-between items-end">
                  {navItems.map((item) => {
                    const isActive = getNavActive(item.id);

                    if (item.center) {
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => navigate(item.id as ScreenId)}
                          data-testid={`nav-${item.id}`}
                          whileTap={{ scale: 0.88 }}
                          style={{ marginBottom: 8 }}
                          className="flex flex-col items-center gap-1 -mt-7 relative"
                        >
                          <motion.div
                            animate={isActive
                              ? { boxShadow: ['0 0 20px rgba(228,176,8,0.5)', '0 0 36px rgba(228,176,8,0.8)', '0 0 20px rgba(228,176,8,0.5)'] }
                              : { boxShadow: '0 6px 20px rgba(108,61,186,0.25)' }
                            }
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{
                              background: isActive
                                ? 'linear-gradient(135deg, #E4B008 0%, #B892FF 100%)'
                                : 'linear-gradient(135deg, #7C4DCC 0%, #4A2899 100%)',
                            }}
                          >
                            <img src={logoImg} alt="Méditation" className="w-8 h-8 object-contain"
                              style={{ filter: 'brightness(0) invert(1)' }} />
                          </motion.div>
                          <span className={`text-[10px] font-medium ${isActive ? 'text-[#E4B008]' : 'text-[#8B7BA8]'}`}>
                            {item.label}
                          </span>
                        </motion.button>
                      );
                    }

                    const Icon = item.icon!;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => navigate(item.id as ScreenId)}
                        data-testid={`nav-${item.id}`}
                        whileTap={{ scale: 0.85 }}
                        className={`flex flex-col items-center gap-1 transition-colors relative ${isActive ? 'text-[#6C3DBA]' : 'text-[#8B7BA8]'}`}
                      >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="nav-dot"
                            className="absolute -bottom-3 w-1 h-1 rounded-full bg-[#6C3DBA]"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
