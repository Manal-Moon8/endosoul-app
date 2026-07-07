import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft, Download, Bell, Lock, Shield, Globe,
  Moon, Trash2, Check, FileText, TrendingUp, Award
} from 'lucide-react';
import { ScreenId } from './App';
import logoImg from '@assets/logo_1779998926197.png';
import {
  NOTIFICATIONS, ACHIEVEMENTS, MONTHLY_STATS, MOOD_HISTORY
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

/* ─────────────────────────────────────────────────────────────────
   NOTIFICATIONS
───────────────────────────────────────────────────────────────── */
export const Notifications = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [readAll, setReadAll] = useState(false);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const today = NOTIFICATIONS.filter(n => ['5 min', '23 min', '1h', '3h'].includes(n.time));
  const yesterday = NOTIFICATIONS.filter(n => n.time === 'Hier');
  const older = NOTIFICATIONS.filter(n => n.time === '2 jours');

  const dismiss = (id: number) => setDismissed(s => { const n = new Set(s); n.add(id); return n; });

  const NotifCard = ({ n }: { n: typeof NOTIFICATIONS[0] }) => {
    if (dismissed.has(n.id)) return null;
    return (
      <motion.div
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        layout
        className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${!readAll && !n.read ? 'border-[#B892FF]/30 bg-white' : 'border-[#E9D8FF]/40 glass-card'}`}
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: n.color }}>
          {n.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-[#2D1B69] text-sm">{n.title}</p>
            {!readAll && !n.read && (
              <span className="w-2 h-2 rounded-full bg-[#6C3DBA] shrink-0 mt-1.5" />
            )}
          </div>
          <p className="text-xs text-[#8B7BA8] mt-0.5 leading-relaxed">{n.body}</p>
          <p className="text-[10px] text-[#C4B5D4] mt-1">{n.time}</p>
        </div>
        <motion.button whileTap={{ scale: 0.8 }} onClick={() => dismiss(n.id)}
          className="p-1 text-[#C4B5D4] hover:text-[#8B7BA8] shrink-0 mt-0.5">
          ×
        </motion.button>
      </motion.div>
    );
  };

  return (
    <ScreenWrapper id="notifications">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('dashboard')}
            className="p-2 glass-card rounded-full text-[#6C3DBA]">
            <ChevronLeft size={22} />
          </motion.button>
          <h1 className="text-2xl text-[#2D1B69] font-serif">Notifications</h1>
        </div>
        <button onClick={() => setReadAll(true)}
          className="text-xs text-[#6C3DBA] font-semibold">
          Tout lire
        </button>
      </div>

      {/* Today */}
      <div className="mb-5">
        <p className="text-xs font-bold text-[#8B7BA8] uppercase tracking-wider mb-3">{"Aujourd'hui"}</p>
        <div className="space-y-2">
          <AnimatePresence>
            {today.map(n => <NotifCard key={n.id} n={n} />)}
          </AnimatePresence>
        </div>
      </div>

      {/* Yesterday */}
      <div className="mb-5">
        <p className="text-xs font-bold text-[#8B7BA8] uppercase tracking-wider mb-3">Hier</p>
        <div className="space-y-2">
          <AnimatePresence>
            {yesterday.map(n => <NotifCard key={n.id} n={n} />)}
          </AnimatePresence>
        </div>
      </div>

      {/* Older */}
      {older.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-bold text-[#8B7BA8] uppercase tracking-wider mb-3">Plus anciens</p>
          <div className="space-y-2">
            <AnimatePresence>
              {older.map(n => <NotifCard key={n.id} n={n} />)}
            </AnimatePresence>
          </div>
        </div>
      )}
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ACHIEVEMENTS
───────────────────────────────────────────────────────────────── */
export const Achievements = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const totalXP = ACHIEVEMENTS.filter(a => a.unlocked).reduce((s, a) => s + a.xp, 0);
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked);
  const inProgress = ACHIEVEMENTS.filter(a => !a.unlocked && !a.premium);
  const premium = ACHIEVEMENTS.filter(a => a.premium);

  return (
    <ScreenWrapper id="achievements">
      <div className="flex items-center gap-3 mb-5">
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('profile')}
          className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={22} />
        </motion.button>
        <h1 className="text-2xl text-[#2D1B69] font-serif">Mes Succès</h1>
      </div>

      {/* XP banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="rounded-[28px] p-5 mb-6 flex items-center gap-5"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #6C3DBA 100%)', boxShadow: '0 12px 32px rgba(108,61,186,0.3)' }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
          ⚡
        </div>
        <div className="flex-1">
          <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Total XP gagné</p>
          <p className="text-3xl font-serif font-bold text-white">{totalXP} <span className="text-lg text-white/50">XP</span></p>
          <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(totalXP / 500) * 100}%` }}
              transition={{ delay: 0.4, duration: 1.2, ease: EASE_OUT }}
              className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #E4B008, #FAE88A)' }} />
          </div>
          <p className="text-white/40 text-[10px] mt-1">Niveau 3 · Encore {500 - totalXP} XP pour le niveau 4</p>
        </div>
      </motion.div>

      {/* Unlocked */}
      <div className="mb-6">
        <p className="text-sm font-bold text-[#2D1B69] mb-3 flex items-center gap-2">
          <Award size={16} className="text-[#E4B008]" />
          Débloqués ({unlocked.length})
        </p>
        <div className="grid grid-cols-2 gap-3">
          {unlocked.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 + 0.1, ...SPRING }}
              className="glass-card rounded-2xl p-4 flex flex-col items-center text-center border border-[#E9D8FF]/60 relative overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
              <div className="text-3xl mb-2">{a.icon}</div>
              <p className="font-semibold text-[#2D1B69] text-xs mb-0.5">{a.title}</p>
              <p className="text-[9px] text-[#8B7BA8] leading-tight mb-2">{a.desc}</p>
              <span className="bg-[#FFF8E4] text-[#E4B008] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#E4B008]/20">
                +{a.xp} XP
              </span>
              {'date' in a && <p className="text-[8px] text-[#C4B5D4] mt-1.5">{a.date as string}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* In progress */}
      <div className="mb-6">
        <p className="text-sm font-bold text-[#2D1B69] mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-[#6C3DBA]" />
          En cours ({inProgress.length})
        </p>
        <div className="space-y-3">
          {inProgress.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.1, duration: 0.4 }}
              className="glass-card rounded-2xl p-4 border border-[#E9D8FF]/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{a.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2D1B69] text-sm">{a.title}</p>
                  <p className="text-xs text-[#8B7BA8]">{a.desc}</p>
                </div>
                <span className="text-xs text-[#6C3DBA] font-bold">{a.progress}/{a.total}</span>
              </div>
              <div className="h-2 bg-[#E9D8FF] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((a.progress ?? 0) / (a.total ?? 1)) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 1.0, ease: EASE_OUT }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #B892FF, #6C3DBA)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium locked */}
      <div className="mb-4">
        <p className="text-sm font-bold text-[#2D1B69] mb-3 flex items-center gap-2">
          <Lock size={16} className="text-[#E4B008]" />
          Exclusifs Premium ({premium.length})
        </p>
        <div className="grid grid-cols-2 gap-3">
          {premium.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 + 0.15, ...SPRING }}
              onClick={() => navigate('premium')}
              className="rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer border border-[#E4B008]/20"
              style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)' }}>
              <div className="text-3xl mb-2 opacity-40 grayscale">{a.icon}</div>
              <p className="font-semibold text-[#8B7BA8] text-xs mb-0.5">{a.title}</p>
              <p className="text-[9px] text-[#C4B5D4] leading-tight mb-2">{a.desc}</p>
              <div className="flex items-center gap-1 bg-[#E4B008] text-white text-[9px] font-bold px-2 py-1 rounded-full">
                <Lock size={8} /> Premium
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SETTINGS / RGPD
───────────────────────────────────────────────────────────────── */
export const Settings = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifMeds, setNotifMeds] = useState(true);
  const [notifMed, setNotifMed] = useState(true);
  const [notifCom, setNotifCom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [exported, setExported] = useState(false);

  const Toggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <motion.div whileTap={{ scale: 0.9 }} onClick={onToggle}
      className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors shrink-0 ${value ? 'bg-[#6C3DBA]' : 'bg-[#E9D8FF]'}`}>
      <motion.div animate={{ x: value ? 20 : 0 }} transition={SPRING}
        className="w-4 h-4 rounded-full bg-white shadow" />
    </motion.div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-5">
      <p className="text-xs font-bold text-[#8B7BA8] uppercase tracking-wider mb-2 px-1">{title}</p>
      <div className="glass-card rounded-2xl overflow-hidden border border-[#E9D8FF]/50 divide-y divide-[#E9D8FF]/50">
        {children}
      </div>
    </div>
  );

  const Row = ({ icon: Icon, label, sub, right, accent = '#6C3DBA', danger = false }:
    { icon: React.ElementType; label: string; sub?: string; right?: React.ReactNode; accent?: string; danger?: boolean }) => (
    <div className="flex items-center gap-3 p-4">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: danger ? '#FFF0F0' : `${accent}18` }}>
        <Icon size={18} style={{ color: danger ? '#E46B6B' : accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-[#E46B6B]' : 'text-[#2D1B69]'}`}>{label}</p>
        {sub && <p className="text-[10px] text-[#8B7BA8] mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );

  return (
    <ScreenWrapper id="settings">
      <div className="flex items-center gap-3 mb-6">
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('profile')}
          className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={22} />
        </motion.button>
        <h1 className="text-2xl text-[#2D1B69] font-serif">Paramètres</h1>
      </div>

      {/* Profile info */}
      <div className="glass-card rounded-2xl p-4 mb-5 flex items-center gap-4 border border-[#E9D8FF]/50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B892FF] to-[#6C3DBA] flex items-center justify-center text-white font-serif font-semibold">
          NB
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#2D1B69]">Nour Benali</p>
          <p className="text-xs text-[#8B7BA8]">nour.benali@example.com</p>
        </div>
        <button className="text-xs text-[#6C3DBA] font-semibold">Modifier</button>
      </div>

      <Section title="Apparence">
        <Row icon={Moon} label="Mode sombre" sub="Thème adapté à la nuit"
          right={<Toggle value={darkMode} onToggle={() => setDarkMode(v => !v)} />} />
        <Row icon={Globe} label="Langue" sub="Français"
          right={<span className="text-xs text-[#8B7BA8] font-medium">FR →</span>} accent="#8B7BA8" />
      </Section>

      <Section title="Notifications">
        <Row icon={Bell} label="Rappels médicaments" sub="Chaque soir à 20h00"
          right={<Toggle value={notifMeds} onToggle={() => setNotifMeds(v => !v)} />} />
        <Row icon={Bell} label="Rappels méditation" sub="Chaque matin à 9h00"
          right={<Toggle value={notifMed} onToggle={() => setNotifMed(v => !v)} />} accent="#B892FF" />
        <Row icon={Bell} label="Messages communauté" sub="Réponses à mes posts"
          right={<Toggle value={notifCom} onToggle={() => setNotifCom(v => !v)} />} accent="#E4B008" />
      </Section>

      <Section title="Confidentialité & RGPD">
        <Row icon={Shield} label="Analytiques anonymisées"
          sub="Améliorer l'application"
          right={<Toggle value={analytics} onToggle={() => setAnalytics(v => !v)} />} accent="#6C3DBA" />
        <motion.div whileTap={{ scale: 0.98 }}>
          <Row icon={Download} label="Exporter mes données"
            sub={exported ? '✅ Téléchargement lancé' : 'Format JSON — RGPD Art. 20'}
            accent="#E4B008"
            right={
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => setExported(true)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${exported ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-[#FFF8E4] text-[#C49B00] border-[#E4B008]/25'}`}>
                {exported ? <Check size={14} /> : 'Exporter'}
              </motion.button>
            } />
        </motion.div>
        <Row icon={FileText} label="Exporter en PDF"
          sub="Rapport complet de santé"
          accent="#6C3DBA"
          right={
            <button onClick={() => navigate('report')}
              className="text-xs font-semibold bg-[#EDE4FF] text-[#6C3DBA] px-3 py-1.5 rounded-full">
              Voir →
            </button>
          } />
        <Row icon={Shield} label="Politique de confidentialité"
          sub="RGPD · Données personnelles" accent="#8B7BA8"
          right={<span className="text-xs text-[#C4B5D4]">→</span>} />
      </Section>

      <Section title="Compte">
        <Row icon={Trash2} label="Supprimer mon compte"
          sub="Action irréversible"
          danger
          right={
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setShowDelete(true)}
              className="text-xs font-semibold bg-[#FFF0F0] text-[#E46B6B] px-3 py-1.5 rounded-full border border-rose-200">
              Supprimer
            </motion.button>
          } />
      </Section>

      {/* App version */}
      <div className="text-center py-4">
        <div className="flex justify-center mb-2">
          <img src={logoImg} alt="" className="w-8 h-8 object-contain opacity-30"
            style={{ filter: 'grayscale(1)' }} />
        </div>
        <p className="text-[10px] text-[#C4B5D4]">EndoSoul · Version 1.0.0</p>
        <p className="text-[9px] text-[#D4C8E8] mt-0.5">Fait avec 💜 pour chaque femme</p>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {showDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D1B69]/50 backdrop-blur-sm flex items-center justify-center rounded-[44px] overflow-hidden px-8">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={SPRING}
              className="bg-white rounded-3xl p-6 w-full shadow-premium">
              <div className="text-center mb-5">
                <div className="text-4xl mb-3">⚠️</div>
                <h3 className="text-lg font-serif text-[#2D1B69] mb-2">Supprimer mon compte</h3>
                <p className="text-sm text-[#8B7BA8] leading-relaxed">
                  Cette action est irréversible. Toutes tes données seront supprimées définitivement.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowDelete(false)}
                  className="flex-1 py-3 glass-card rounded-2xl text-[#2D1B69] font-semibold text-sm border border-[#E9D8FF]">
                  Annuler
                </button>
                <button onClick={() => setShowDelete(false)}
                  className="flex-1 py-3 rounded-2xl bg-[#E46B6B] text-white font-semibold text-sm">
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MONTHLY REPORT
───────────────────────────────────────────────────────────────── */
export const MonthlyReport = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [exported, setExported] = useState(false);
  const s = MONTHLY_STATS;

  return (
    <ScreenWrapper id="report">
      <div className="flex items-center gap-3 mb-5">
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('profile')}
          className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={22} />
        </motion.button>
        <div>
          <h1 className="text-xl text-[#2D1B69] font-serif">Rapport mensuel</h1>
          <p className="text-xs text-[#8B7BA8]">{s.monthName}</p>
        </div>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="rounded-[32px] p-6 mb-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #6C3DBA 100%)', boxShadow: '0 16px 40px rgba(108,61,186,0.35)' }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(228,176,8,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="flex items-center gap-3 mb-4">
          <img src={logoImg} alt="" className="w-8 h-8 object-contain opacity-90"
            style={{ filter: 'drop-shadow(0 0 6px rgba(228,176,8,0.6))' }} />
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wider">EndoSoul</p>
            <p className="text-white font-serif font-semibold">Bilan de santé · {s.monthName}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: s.daysTracked, label: 'Jours suivis', icon: '📅' },
            { value: `${s.avgPain}/10`, label: 'Douleur moy.', icon: '💊' },
            { value: `${s.avgMood}/10`, label: 'Humeur moy.', icon: '🌸' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="rounded-2xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-xl font-serif font-bold text-white">{stat.value}</div>
              <div className="text-[9px] text-white/50 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: '🧘', value: s.meditationSessions, label: 'Méditations', sub: `${s.totalMeditationMinutes} min`, color: '#EDE4FF', border: '#B892FF' },
          { icon: '📖', value: s.symptomsLogged, label: 'Entrées journal', sub: 'ce mois', color: '#E4F5E4', border: '#86C986' },
          { icon: '🔥', value: `${s.streakMax}j`, label: 'Série max', sub: 'jours consécutifs', color: '#FFF3E0', border: '#FFD080' },
          { icon: '👥', value: s.communityMessages, label: 'Messages', sub: 'dans la communauté', color: '#E4EDFF', border: '#A8CDFF' },
        ].map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.07, ...{ type: 'spring', stiffness: 340, damping: 28 } }}
            className="rounded-2xl p-4 border"
            style={{ backgroundColor: c.color, borderColor: `${c.border}50` }}>
            <div className="text-2xl mb-1.5">{c.icon}</div>
            <div className="text-2xl font-serif font-bold text-[#2D1B69]">{c.value}</div>
            <div className="text-sm font-medium text-[#2D1B69]">{c.label}</div>
            <div className="text-[10px] text-[#8B7BA8]">{c.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Mood chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="glass-card rounded-[24px] p-4 mb-5 border border-[#E9D8FF]/60">
        <p className="text-sm font-semibold text-[#2D1B69] mb-3">Évolution humeur · Dernière semaine</p>
        <svg width="100%" height={60} viewBox="0 0 210 60" preserveAspectRatio="xMidYMid meet">
          {MOOD_HISTORY.map((d, i) => {
            const x = i * 30 + 15;
            const h = (d.value / 10) * 48;
            const y = 52 - h;
            return (
              <g key={i}>
                <motion.rect x={x - 9} y={y} width={18} height={h} rx={5}
                  fill={i === 6 ? '#6C3DBA' : '#D4B8FF'}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                  style={{ transformOrigin: `${x}px 52px` }}
                />
                <text x={x} y={60} textAnchor="middle" fontSize={8} fill={i === 6 ? '#6C3DBA' : '#8B7BA8'}>
                  {d.day}
                </text>
                <text x={x} y={y - 3} textAnchor="middle" fontSize={8} fill="#8B7BA8">{d.value}</text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Cycle summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card rounded-[24px] p-4 mb-5 border border-[#E9D8FF]/60">
        <p className="text-sm font-semibold text-[#2D1B69] mb-3">Résumé cycle</p>
        <div className="flex gap-3">
          {[
            { label: 'Durée cycle', value: '28j' },
            { label: 'Durée règles', value: '5j' },
            { label: 'Douleur max', value: '7/10' },
          ].map((item, i) => (
            <div key={i} className="flex-1 bg-[#F5F0FF] rounded-2xl p-3 text-center">
              <div className="text-base font-bold font-serif text-[#6C3DBA]">{item.value}</div>
              <div className="text-[9px] text-[#8B7BA8] mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievement of the month */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="rounded-2xl p-4 mb-5 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #FFF8E4 0%, #FFFBF0 100%)', border: '1px solid rgba(228,176,8,0.2)' }}>
        <div className="text-3xl">🏆</div>
        <div>
          <p className="text-xs text-[#C49B00] font-bold uppercase tracking-wide">Succès du mois</p>
          <p className="font-semibold text-[#2D1B69] text-sm">7 jours de suite</p>
          <p className="text-xs text-[#8B7BA8]">Série de 7 jours consécutifs</p>
        </div>
        <div className="ml-auto bg-[#E4B008] text-white text-xs font-bold px-2 py-1 rounded-full">+50 XP</div>
      </motion.div>

      {/* Export button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setExported(true)}
        className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${exported ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-[#B892FF] to-[#6C3DBA] text-white shadow-premium'}`}
      >
        {exported ? <><Check size={20} /> Rapport exporté !</> : <><Download size={20} /> Exporter en PDF</>}
      </motion.button>
    </ScreenWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MOOD HISTORY
───────────────────────────────────────────────────────────────── */
export const MoodHistory = ({ navigate }: { navigate: (s: ScreenId) => void }) => {
  const [period, setPeriod] = useState<'7j' | '30j' | '3m'>('7j');

  const avgMood = (MOOD_HISTORY.reduce((s, d) => s + d.value, 0) / MOOD_HISTORY.length).toFixed(1);
  const best = MOOD_HISTORY.reduce((a, b) => a.value > b.value ? a : b);
  const worst = MOOD_HISTORY.reduce((a, b) => a.value < b.value ? a : b);

  return (
    <ScreenWrapper id="moodhistory">
      <div className="flex items-center gap-3 mb-5">
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => navigate('dashboard')}
          className="p-2 glass-card rounded-full text-[#6C3DBA]">
          <ChevronLeft size={22} />
        </motion.button>
        <h1 className="text-2xl text-[#2D1B69] font-serif">Historique humeur</h1>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 mb-5">
        {(['7j', '30j', '3m'] as const).map(p => (
          <motion.button key={p} whileTap={{ scale: 0.93 }}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${period === p ? 'bg-[#6C3DBA] text-white shadow-[0_4px_14px_rgba(108,61,186,0.3)]' : 'glass-card text-[#6C3DBA] border border-[#E9D8FF]'}`}>
            {p}
          </motion.button>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex gap-3 mb-5">
        {[
          { label: 'Moyenne', value: `${avgMood}/10`, emoji: '📊', color: '#EDE4FF', border: '#B892FF' },
          { label: 'Meilleur', value: `${best.value}/10 ${best.emoji}`, emoji: null, color: '#E4F5E4', border: '#86C986' },
          { label: 'Difficile', value: `${worst.value}/10 ${worst.emoji}`, emoji: null, color: '#FFF0F5', border: '#FFB8D0' },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 + 0.1 }}
            className="flex-1 rounded-2xl p-3 text-center border"
            style={{ backgroundColor: s.color, borderColor: `${s.border}60` }}>
            {s.emoji && <div className="text-lg mb-0.5">{s.emoji}</div>}
            <div className="text-sm font-bold font-serif text-[#2D1B69]">{s.value}</div>
            <div className="text-[9px] text-[#8B7BA8]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-card rounded-[24px] p-4 mb-5 border border-[#E9D8FF]/60">
        <p className="text-sm font-semibold text-[#2D1B69] mb-4">Évolution de l'humeur</p>
        <svg width="100%" height={80} viewBox="0 0 210 80" preserveAspectRatio="xMidYMid meet">
          {MOOD_HISTORY.map((d, i) => {
            const x = i * 30 + 15;
            const h = (d.value / 10) * 60;
            const y = 68 - h;
            return (
              <g key={i}>
                <motion.rect x={x - 10} y={y} width={20} height={h} rx={6}
                  fill={i === 6 ? '#6C3DBA' : '#B892FF'}
                  opacity={0.3 + (d.value / 10) * 0.7}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                  style={{ transformOrigin: `${x}px 68px` }}
                />
                <text x={x} y={68 - h - 4} textAnchor="middle" fontSize={9} fill="#6C3DBA" fontWeight="600">
                  {d.emoji}
                </text>
                <text x={x} y={78} textAnchor="middle" fontSize={9} fill={i === 6 ? '#6C3DBA' : '#8B7BA8'} fontWeight={i === 6 ? '600' : '400'}>
                  {d.short}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Timeline */}
      <p className="text-sm font-semibold text-[#2D1B69] mb-3">Détail quotidien</p>
      <div className="space-y-2">
        {[...MOOD_HISTORY].reverse().map((d, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 + 0.3, duration: 0.4 }}
            className="glass-card rounded-2xl p-3.5 flex items-center gap-4 border border-[#E9D8FF]/50">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ backgroundColor: `${d.value >= 7 ? '#E4F5E4' : d.value >= 5 ? '#EDE4FF' : '#FFF0F5'}` }}>
              {d.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#2D1B69] text-sm">{d.short}</span>
                <span className="text-sm font-bold text-[#6C3DBA] font-serif">{d.value}/10</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[#E9D8FF] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${d.value * 10}%` }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.7 }}
                  className="h-full rounded-full"
                  style={{ background: d.value >= 7 ? '#6C3DBA' : d.value >= 5 ? '#B892FF' : '#E46B6B' }}
                />
              </div>
              <span className="text-[9px] text-[#8B7BA8]">{d.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenWrapper>
  );
};
