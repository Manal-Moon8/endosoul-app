import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Calendar, Smile, User, BatteryMedium } from 'lucide-react';
import * as Screens from './screens';
import LandingPage from './LandingPage';
import logoImg from '@assets/logo_1779998926197.png';

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
  | 'profile';

type Phase = 'splash' | 'landing' | 'app';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(170deg, #04000F 0%, #130535 30%, #2A1266 60%, #4A2899 85%, #6B3DBE 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Ambient radial glow */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,176,8,0.2) 0%, rgba(108,61,186,0.25) 50%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />
      {/* Lotus ring */}
      <motion.div
        animate={{ scale: [0.9, 1.55], opacity: [0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 260, height: 260, borderRadius: '50%',
          border: '1px solid rgba(228,176,8,0.4)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <motion.img
          src={logoImg}
          alt="EndoSoul"
          initial={{ scale: 0.45, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.3, ease: EASE_OUT }}
          style={{
            width: 148, height: 148, objectFit: 'contain',
            filter: 'drop-shadow(0 0 36px rgba(228,176,8,0.85)) drop-shadow(0 0 72px rgba(184,146,255,0.5))',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE_OUT }}
          style={{ textAlign: 'center', marginTop: 24 }}
        >
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'white', fontSize: '2.1rem', fontWeight: 500, marginBottom: 6 }}>
            EndoSoul
          </h1>
          <p style={{ color: 'rgba(228,176,8,0.92)', fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Lumière sur ta guérison
          </p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.0, ease: EASE_OUT }}
          style={{
            width: 90, height: 1, marginTop: 28,
            background: 'linear-gradient(90deg, transparent, rgba(228,176,8,0.65), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

function App() {
  const [phase, setPhase] = useState<Phase>('splash');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('onboarding');

  const showNav = !['onboarding', 'auth', 'serenity'].includes(currentScreen);

  const navigate = (screen: ScreenId) => setCurrentScreen(screen);

  const navItems = [
    { id: 'dashboard',  icon: Home,     label: 'Accueil',    center: false },
    { id: 'cycle',      icon: Calendar, label: 'Cycle',      center: false },
    { id: 'meditation', icon: null,     label: 'Méditation', center: true  },
    { id: 'community',  icon: Smile,    label: 'Humeur',     center: false },
    { id: 'profile',    icon: User,     label: 'Profil',     center: false },
  ];

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
              {currentScreen === 'onboarding'   && <Screens.Onboarding   key="onboarding"   navigate={navigate} />}
              {currentScreen === 'auth'         && <Screens.Auth          key="auth"         navigate={navigate} />}
              {currentScreen === 'dashboard'    && <Screens.Dashboard     key="dashboard"    navigate={navigate} />}
              {currentScreen === 'cycle'        && <Screens.Cycle         key="cycle"        navigate={navigate} />}
              {currentScreen === 'symptoms'     && <Screens.Symptoms      key="symptoms"     navigate={navigate} />}
              {currentScreen === 'meditation'   && <Screens.Meditation    key="meditation"   navigate={navigate} />}
              {currentScreen === 'serenity'     && <Screens.Serenity      key="serenity"     navigate={navigate} />}
              {currentScreen === 'community'    && <Screens.Community     key="community"    navigate={navigate} />}
              {currentScreen === 'practitioners'&& <Screens.Practitioners key="practitioners" navigate={navigate} />}
              {currentScreen === 'premium'      && <Screens.Premium       key="premium"      navigate={navigate} />}
              {currentScreen === 'profile'      && <Screens.Profile       key="profile"      navigate={navigate} />}
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
                    const isActive =
                      currentScreen === item.id ||
                      (item.id === 'dashboard'  && currentScreen === 'symptoms') ||
                      (item.id === 'community'  && currentScreen === 'community') ||
                      (item.id === 'meditation' && currentScreen === 'serenity') ||
                      (item.id === 'profile'    && ['practitioners', 'premium'].includes(currentScreen));

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
                            <img
                              src={logoImg}
                              alt="Méditation"
                              className="w-8 h-8 object-contain"
                              style={{ filter: 'brightness(0) invert(1)' }}
                            />
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
                        className={`flex flex-col items-center gap-1 transition-colors relative ${
                          isActive ? 'text-[#6C3DBA]' : 'text-[#8B7BA8]'
                        }`}
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
