import { 
  BarChart3, 
  Users, 
  MapPin, 
  Zap,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function StatsOverview() {
  const stats = [
    { label: 'Network Resilience', value: '99.98%', delta: '+0.02%', icon: ShieldCheck, color: 'text-brand-accent' },
    { label: 'Civic Reality Index', value: '4,281', delta: '+124 hoje', icon: MapPin, color: 'text-brand-accent' },
    { label: 'Mean Response Time', value: '2.4 days', delta: '-12%', icon: Zap, color: 'text-orange-500' },
    { label: 'Validated Proofs', value: '18.4M', delta: '+4.2M/s', icon: Users, color: 'text-brand-accent' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-900/90 border border-slate-700 backdrop-blur-sm p-4 rounded-xl group hover:border-brand-accent/50 transition-all cursor-default"
        >
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">{stat.label}</p>
          <div className="flex items-end gap-3">
            <span className={`text-2xl font-bold tracking-tight ${stat.color === 'text-brand-accent' ? 'text-brand-accent' : 'text-orange-500'}`}>
              {stat.value}
            </span>
            <span className="text-[9px] text-slate-400 pb-1 mono-value font-medium">{stat.delta}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
