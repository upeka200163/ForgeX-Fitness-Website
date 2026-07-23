import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight, 
  BellRing, 
  X, 
  CheckCircle2, 
  XCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Classes = () => {
  const [selectedCoaches, setSelectedCoaches] = React.useState({});
  const [joinedSessions, setJoinedSessions] = React.useState({});
  const [reminders, setReminders] = React.useState({});
  const [isFullScheduleOpen, setIsFullScheduleOpen] = React.useState(false);
  const [confirmingSessionId, setConfirmingSessionId] = React.useState(null);
  const [reminderTime, setReminderTime] = React.useState('15');
  const [selectedDate, setSelectedDate] = React.useState(1);
  const [calendarView, setCalendarView] = React.useState('monthly');

  const coachesList = {
    'Kasun Perera': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kasun' },
    'Chaminda Silva': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chaminda' },
    'Dilini Jayawardena': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilini' },
    'Roshan Fernando': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roshan' },
    'Amila Wijesinghe': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amila' }
  };

  const schedule = [
    { id: 1, title: 'HIIT Extreme', time: '18:00 - 19:00', defaultInstructor: 'Kasun Perera', coaches: ['Kasun Perera', 'Amila Wijesinghe'], location: 'Studio A', spots: '5 left', color: 'bg-red-500' },
    { id: 2, title: 'Core Power', time: '19:15 - 20:00', defaultInstructor: 'Chaminda Silva', coaches: ['Chaminda Silva', 'Roshan Fernando'], location: 'Studio B', spots: 'Full', color: 'bg-primary' },
    { id: 3, title: 'Yoga Flow', time: '07:00 - 08:00', defaultInstructor: 'Dilini Jayawardena', coaches: ['Dilini Jayawardena'], location: 'Zen Room', spots: '12 left', color: 'bg-blue-500' },
    { id: 4, title: 'Crossfit WOD', time: '17:00 - 18:00', defaultInstructor: 'Roshan Fernando', coaches: ['Roshan Fernando', 'Kasun Perera'], location: 'Main Floor', spots: '2 left', color: 'bg-orange-500' },
  ];

  const getSessionsForDay = (day) => {
    // Simulated logic to show different session counts based on the day
    if (day === 1 || day % 5 === 0) return schedule;
    if (day % 3 === 0) return [schedule[0], schedule[2]];
    if (day % 2 === 0) return [schedule[1], schedule[3]];
    return [schedule[0]];
  };

  const currentDaySessions = getSessionsForDay(selectedDate);

  const handleCoachSelect = (classId, coachName) => {
    setSelectedCoaches(prev => ({ ...prev, [classId]: coachName }));
  };

  const toggleJoin = (id) => {
    setJoinedSessions(prev => ({ ...prev, [id]: !prev[id] }));
    if (joinedSessions[id]) {
      setReminders(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleConfirmReservation = (id, enableReminder) => {
    setJoinedSessions(prev => ({ ...prev, [id]: true }));
    if (enableReminder) {
      setReminders(prev => ({ ...prev, [id]: true }));
    }
    setConfirmingSessionId(null);
  };

  const toggleReminder = (id) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    setIsFullScheduleOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-6 mb-4">
                <h1 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none">
                  Daily <span className="text-primary">Sessions</span>
                </h1>
                <button 
                  onClick={() => setIsFullScheduleOpen(true)}
                  className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all group shadow-2xl active:scale-90"
                >
                  <CalendarIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase">Protocol for May {selectedDate}, 2026</p>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Booking Windows Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentDaySessions.map((cls, i) => {
              const currentCoach = selectedCoaches[`${selectedDate}-${cls.id}`] || cls.defaultInstructor;
              const isJoined = joinedSessions[`${selectedDate}-${cls.id}`];
              const isReminded = reminders[`${selectedDate}-${cls.id}`];

              return (
                <motion.div 
                  key={`${selectedDate}-${cls.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl hover:bg-white/[0.08] transition-all group relative overflow-visible shadow-2xl"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 ${cls.color}`} />
                  
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="font-heading text-4xl uppercase tracking-tight mb-3 group-hover:text-primary transition-colors leading-none">{cls.title}</h3>
                      <div className="flex items-center gap-3 text-[11px] text-white/60 font-black uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                        <Clock className="w-4 h-4 text-primary" /> {cls.time}
                      </div>
                    </div>
                    <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${cls.spots === 'Full' ? 'bg-white/10 border-white/20 text-white/40' : 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_20px_rgba(211,165,35,0.2)]'}`}>
                      {cls.spots}
                    </div>
                  </div>

                  <div className="space-y-8 mb-12">
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">Assigned Instructors</div>
                      <div className="flex flex-wrap gap-3">
                        {cls.coaches.map(coach => (
                          <button 
                            key={coach}
                            onClick={() => handleCoachSelect(`${selectedDate}-${cls.id}`, coach)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all ${currentCoach === coach ? 'bg-primary/20 border-primary/50 text-white shadow-[0_0_20px_rgba(211,165,35,0.1)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                          >
                            <img src={coachesList[coach].img} alt={coach} className="w-6 h-6 rounded-full bg-white/10 shadow-lg" />
                            <span className="text-[11px] font-black tracking-widest">{coach.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-black/40 border border-white/5 shadow-inner">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10 shadow-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-black text-white/80 uppercase text-[12px] tracking-[0.2em]">{cls.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    {isJoined ? (
                      <div className="flex gap-4">
                        <button 
                          onClick={() => toggleJoin(`${selectedDate}-${cls.id}`)}
                          className="flex-1 py-5 rounded-[1.5rem] bg-green-500/20 text-green-500 border border-green-500/30 text-[12px] font-black uppercase tracking-[0.3em] shadow-xl flex items-center justify-center gap-3 transition-all hover:bg-green-500/30 active:scale-95"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Joined
                        </button>
                        <button 
                          onClick={() => toggleReminder(`${selectedDate}-${cls.id}`)}
                          className={`w-16 flex items-center justify-center rounded-[1.5rem] transition-all shadow-xl active:scale-90 ${isReminded ? 'bg-primary text-black' : 'bg-white/10 text-white/40 border border-white/10 hover:bg-white/20'}`}
                        >
                          <BellRing className="w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        disabled={cls.spots === 'Full'}
                        onClick={() => setConfirmingSessionId(`${selectedDate}-${cls.id}`)}
                        className={`w-full py-5 rounded-[1.5rem] flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[12px] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-95 ${
                          cls.spots === 'Full' 
                            ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
                            : 'bg-primary text-black hover:bg-white hover:scale-[1.02]'
                        }`}
                      >
                        {cls.spots === 'Full' ? 'Join Waitlist' : 'Confirm Booking'}
                        {cls.spots !== 'Full' && <ChevronRight className="w-5 h-5" />}
                      </button>
                    )}

                    {/* Elite Reminder Popup Overlay */}
                    <AnimatePresence>
                      {confirmingSessionId === `${selectedDate}-${cls.id}` && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="absolute bottom-full left-0 right-0 mb-8 z-[50] bg-[#121212] border border-white/20 rounded-[3rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,1)] backdrop-blur-3xl"
                        >
                          <div className="flex flex-col gap-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                              <div className="flex flex-col gap-2">
                                <span className="text-[14px] font-black uppercase tracking-[0.3em] text-primary">Reminder Setup</span>
                                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Enable session alerts</span>
                              </div>
                              <button
                                onClick={() => setReminderTime(reminderTime === '0' ? '15' : '0')}
                                className={`w-16 h-9 rounded-full transition-all relative ${reminderTime !== '0' ? 'bg-primary shadow-[0_0_20px_rgba(211,165,35,0.5)]' : 'bg-white/10'}`}
                              >
                                <div className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow-2xl transition-all ${reminderTime !== '0' ? 'right-1' : 'left-1'}`} />
                              </button>
                            </div>

                            {reminderTime !== '0' && (
                              <div className="space-y-5">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">Remind me before:</span>
                                <div className="grid grid-cols-3 gap-4">
                                  {['15', '30', '60'].map(t => (
                                    <button
                                      key={t}
                                      onClick={() => setReminderTime(t)}
                                      className={`py-4 rounded-2xl text-[12px] font-black border transition-all ${reminderTime === t ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(211,165,35,0.2)]' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'}`}
                                    >
                                      {t}m
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4">
                              <button
                                onClick={() => setConfirmingSessionId(null)}
                                className="flex-1 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white/30 text-[11px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleConfirmReservation(`${selectedDate}-${cls.id}`, reminderTime !== '0')}
                                className="flex-[2] py-5 rounded-[1.5rem] bg-primary text-black text-[12px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-[0_15px_30px_rgba(211,165,35,0.3)]"
                              >
                                Complete Booking
                              </button>
                            </div>
                          </div>
                          {/* Arrow down decorator */}
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#121212] border-r border-b border-white/20 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 p-12 rounded-[3.5rem] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden group shadow-2xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform group-hover:scale-150 duration-1000" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 rounded-[2rem] bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <Users className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="font-heading text-3xl uppercase tracking-[0.1em] mb-3 text-white">Community Protocol</h4>
                  <p className="text-white/40 text-sm font-medium max-w-lg leading-relaxed tracking-wide">
                    Sync your sessions with team members and track combined performance metrics. Elite members get priority waitlist access and custom workout programming.
                  </p>
                </div>
              </div>
              <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[12px] rounded-2xl hover:bg-primary transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95">
                Social List
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Full Schedule Modal (CALENDAR) */}
      <AnimatePresence>
        {isFullScheduleOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="w-full max-w-[1700px] h-[94vh] bg-gradient-to-b from-[#111] to-black border border-white/10 rounded-[4rem] shadow-[0_0_120px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-10 md:p-14 border-b border-white/10 flex justify-between items-center bg-white/[0.03]">
                <div>
                  <h2 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter mb-4">
                    Elite <span className="text-primary text-opacity-80">Calendar</span>
                  </h2>
                  <div className="flex items-center gap-6">
                    <p className="text-white/30 text-[11px] font-bold tracking-[0.5em] uppercase">May 2026 Protocol</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <p className="text-primary text-[11px] font-bold tracking-[0.5em] uppercase">Global Access</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 shadow-inner">
                    <button onClick={() => setCalendarView('monthly')} className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${calendarView === 'monthly' ? 'text-primary bg-white/10 shadow-lg' : 'text-white/20 hover:text-white'}`}>Monthly</button>
                    <button onClick={() => setCalendarView('weekly')} className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${calendarView === 'weekly' ? 'text-primary bg-white/10 shadow-lg' : 'text-white/20 hover:text-white'}`}>Weekly</button>
                  </div>
                  <button 
                    onClick={() => setIsFullScheduleOpen(false)}
                    className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all shadow-2xl"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-14">

                {/* ═══ MONTHLY VIEW ═══ */}
                {calendarView === 'monthly' && (
                  <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] mb-20">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="bg-black/60 p-8 text-center text-[12px] font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const dayNum = i - 4;
                      const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                      const isToday = dayNum === 1;
                      const isSelected = selectedDate === dayNum;
                      const isPast = dayNum < 1 && isCurrentMonth;
                      const daySessions = getSessionsForDay(dayNum);

                      return (
                        <motion.div 
                          key={i} 
                          whileHover={isCurrentMonth ? { y: -4, backgroundColor: 'rgba(255, 255, 255, 0.04)' } : {}}
                          onClick={() => isCurrentMonth && handleDateSelect(dayNum)}
                          className={`min-h-[280px] p-8 relative transition-all border-r border-b border-white/5 cursor-pointer group ${
                            !isCurrentMonth ? 'opacity-5 bg-transparent' : 
                            isSelected ? 'bg-gradient-to-br from-primary/10 to-transparent' : 
                            'bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.06]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 border-2 border-primary/30 shadow-[inset_0_0_40px_rgba(211,165,35,0.1)] z-10 pointer-events-none" />
                          )}

                          <div className="flex justify-between items-start mb-8 relative z-20">
                            <span className={`text-3xl font-heading tracking-tighter transition-colors ${
                              isSelected ? 'text-primary drop-shadow-[0_0_15px_rgba(211,165,35,0.5)]' : 
                              isToday ? 'text-white underline underline-offset-8 decoration-primary/50' : 
                              (isPast && isCurrentMonth) ? 'text-white/10' : 
                              'text-white/30 group-hover:text-white'
                            }`}>
                              {isCurrentMonth ? dayNum.toString().padStart(2, '0') : ''}
                            </span>
                            {isToday && (
                              <div className="px-4 py-1.5 rounded-full bg-primary text-black text-[8px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(211,165,35,0.4)]">
                                LIVE
                              </div>
                            )}
                          </div>

                          <div className="space-y-4 pointer-events-none relative z-20">
                            {isCurrentMonth && daySessions.length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-5 rounded-[1.5rem] border backdrop-blur-md transition-all shadow-2xl ${
                                  isPast ? 'bg-white/[0.01] border-white/5 grayscale opacity-30' : 
                                  isToday ? 'bg-primary/10 border-primary/30 shadow-[0_15px_30px_rgba(211,165,35,0.1)]' : 
                                  'bg-white/[0.05] border-white/10 group-hover:border-white/20'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className={`font-heading text-xs uppercase tracking-tight mb-2 ${isPast ? 'text-white/20' : 'text-white'}`}>
                                      {daySessions[0].title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">
                                      <Clock className="w-3 h-3 text-primary/60" /> {daySessions[0].time.split(' - ')[0]}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {isCurrentMonth && daySessions.length > 1 && (
                              <div className="pt-5 mt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">+{daySessions.length - 1} More Sessions</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.15em]">View All</span>
                                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black text-primary transition-all">
                                    <ChevronRightIcon className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* ═══ WEEKLY VIEW ═══ */}
                {calendarView === 'weekly' && (() => {
                  // Calculate the week containing the selected date
                  // May 1 is Friday (dayOfWeek=5). Week starts on Sunday.
                  const startOfWeek = Math.max(1, selectedDate - ((selectedDate + 4) % 7));
                  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek + i).filter(d => d >= 1 && d <= 31);

                  return (
                    <div className="space-y-6">
                      {/* Week Navigation */}
                      <div className="flex items-center justify-between mb-10">
                        <button 
                          onClick={() => setSelectedDate(Math.max(1, startOfWeek - 7))}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" /> Previous Week
                        </button>
                        <div className="text-center">
                          <h3 className="font-heading text-3xl text-white uppercase tracking-tight">
                            May {weekDays[0]} — {weekDays[weekDays.length - 1]}
                          </h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mt-2">Weekly Protocol</p>
                        </div>
                        <button 
                          onClick={() => setSelectedDate(Math.min(31, startOfWeek + 7))}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                        >
                          Next Week <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Weekly Grid - 7 Columns */}
                      <div className="grid grid-cols-7 gap-4">
                        {weekDays.map((dayNum) => {
                          const isToday = dayNum === 1;
                          const isSelected = selectedDate === dayNum;
                          const daySessions = getSessionsForDay(dayNum);
                          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          const dayOfWeek = (dayNum + 4) % 7; // May 1 = Friday = 5

                          return (
                            <motion.div
                              key={dayNum}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: dayNum * 0.03 }}
                              onClick={() => handleDateSelect(dayNum)}
                              className={`rounded-[2rem] border p-6 cursor-pointer transition-all group relative overflow-hidden ${
                                isSelected 
                                  ? 'bg-gradient-to-b from-primary/15 to-primary/5 border-primary/40 shadow-[0_20px_60px_rgba(211,165,35,0.15)]' 
                                  : 'bg-gradient-to-b from-white/[0.04] to-transparent border-white/10 hover:border-white/20 hover:from-white/[0.06]'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(211,165,35,0.5)]" />
                              )}

                              {/* Day Header */}
                              <div className="text-center mb-6 pb-5 border-b border-white/5">
                                <div className={`text-[12px] font-black uppercase tracking-[0.3em] mb-2 ${
                                  isToday ? 'text-primary' : 'text-white/20'
                                }`}>
                                  {dayNames[dayOfWeek]}
                                </div>
                                <div className={`text-5xl font-heading tracking-tighter ${
                                  isSelected ? 'text-primary drop-shadow-[0_0_10px_rgba(211,165,35,0.4)]' : 
                                  isToday ? 'text-white' : 'text-white/40'
                                }`}>
                                  {dayNum.toString().padStart(2, '0')}
                                </div>
                                {isToday && (
                                  <div className="mt-2 px-4 py-1.5 rounded-full bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] inline-block shadow-[0_0_15px_rgba(211,165,35,0.3)]">
                                    TODAY
                                  </div>
                                )}
                              </div>

                              {/* Featured Session */}
                              <div className="space-y-3">
                                {daySessions.length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-4 rounded-2xl border transition-all ${
                                      isToday ? 'bg-primary/10 border-primary/20' : 'bg-white/[0.04] border-white/5 group-hover:border-white/10'
                                    }`}
                                  >
                                    <h5 className="font-heading text-[13px] uppercase tracking-tight text-white mb-2">{daySessions[0].title}</h5>
                                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-2">
                                      <Clock className="w-3 h-3 text-primary/50" /> {daySessions[0].time}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-white/20 font-bold">
                                      <MapPin className="w-3 h-3 text-white/20" /> {daySessions[0].location}
                                    </div>
                                  </motion.div>
                                )}

                                {daySessions.length === 0 && (
                                  <div className="text-center py-8">
                                    <div className="text-white/10 text-[11px] font-black uppercase tracking-[0.3em]">Rest Day</div>
                                  </div>
                                )}
                              </div>

                              {/* View All Footer */}
                              {daySessions.length > 1 && (
                                <div className="mt-5 pt-4 border-t border-white/5">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">+{daySessions.length - 1} More</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.15em]">View All</span>
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black text-primary transition-all">
                                      <ChevronRightIcon className="w-3 h-3" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Single session count */}
                              {daySessions.length === 1 && (
                                <div className="mt-5 pt-4 border-t border-white/5 text-center">
                                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                    isToday ? 'text-primary/60' : 'text-white/15'
                                  }`}>
                                    1 Session
                                  </span>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Classes;
