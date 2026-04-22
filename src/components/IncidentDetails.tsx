import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  Activity, 
  MapPin, 
  FileText, 
  History,
  Lock,
  Cpu,
  Bookmark,
  Share2
} from 'lucide-react';
import { Incident } from '../App';
import { motion } from 'motion/react';
import { getCivicInsight } from '../services/geminiService';

interface IncidentDetailsProps {
  incident: Incident;
  onBack: () => void;
}

export default function IncidentDetails({ incident, onBack }: IncidentDetailsProps) {
  const [insight, setInsight] = useState<any>(incident.governance || null);
  const [loadingInsight, setLoadingInsight] = useState(!incident.governance);

  useEffect(() => {
    if (!incident.governance) {
      generateInsight();
    }
  }, [incident.id]);

  const generateInsight = async () => {
    setLoadingInsight(true);
    try {
      const data = await getCivicInsight(
        incident.subcategory,
        `${incident.subcategory} em ${incident.location.address}`,
        incident.category
      );
      setInsight(data);
    } catch (err) {
      console.error('Failed to generate insight', err);
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors text-xs uppercase font-bold tracking-wider"
        >
          <ArrowLeft size={16} /> BACK TO GRID
        </button>
        <div className="flex items-center gap-4">
          <button className="p-2 text-brand-secondary hover:text-brand-accent transition-colors border border-brand-line rounded-lg">
            <Bookmark size={18} />
          </button>
          <button className="p-2 text-brand-secondary hover:text-brand-accent transition-colors border border-brand-line rounded-lg">
            <Share2 size={18} />
          </button>
          <div className="h-4 w-px bg-brand-line" />
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-bold text-brand-accent mono-value uppercase tracking-widest">Live Protocol</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Data & Evidence */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="glass-panel p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="institutional-header">Protocol ID</span>
                <span className="mono-value text-brand-accent">{incident.id}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink">{incident.subcategory}</h2>
              <div className="flex items-center gap-3 text-xs text-brand-secondary">
                <span className="flex items-center gap-1"><MapPin size={14} className="text-brand-accent" /> {incident.location.address}</span>
                <span className="w-1 h-1 rounded-full bg-brand-line" />
                <span className="flex items-center gap-1"><Activity size={14} /> {incident.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-line">
              <DataMeta label="Reputation Index" value={`${incident.reputationScore}% Verified`} icon={ShieldCheck} />
              <DataMeta label="Evidence Hash" value={incident.evidenceHash.substring(0, 15) + '...'} icon={FileText} />
              <DataMeta label="Urgency Level" value={incident.urgency} icon={Scale} color={incident.urgency === 'Crítica' ? 'text-red-500' : 'text-emerald-500'} />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="institutional-header">Constitutional & Ethical Audit Trail</h3>
              <div className="relative pl-6 border-l-2 border-brand-accent/20 space-y-8 py-2">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-brand-accent" />
                <div className="space-y-1">
                  <div className="text-[10px] mono-value text-brand-secondary">TIMESTAMP: {new Date(incident.timestamp).toLocaleString()}</div>
                  <p className="text-sm text-brand-ink/90 font-medium">Registro imutável criado e assinado pelo nó Paulocunha.edsons@gmail.com</p>
                </div>

                <div className="absolute left-[-5px] top-[100px] w-2 h-2 rounded-full bg-brand-line" />
                <div className="space-y-1">
                  <div className="text-[10px] mono-value text-brand-secondary uppercase">Status: Pendente de Resposta Institucional</div>
                  <p className="text-sm text-brand-secondary italic">Aguardando confirmação do oráculo governamental local.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insight & Legal */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu size={120} />
            </div>
            
            <h3 className="institutional-header mb-6 flex items-center gap-2 text-brand-accent font-bold">
              <Cpu size={14} /> L4 Insight Motor
            </h3>

            {loadingInsight ? (
              <div className="space-y-4">
                <div className="h-4 bg-brand-accent/10 rounded animate-pulse w-3/4" />
                <div className="h-20 bg-brand-accent/10 rounded animate-pulse" />
                <div className="h-4 bg-brand-accent/10 rounded animate-pulse w-1/2" />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-6 relative z-10"
              >
                <div className="space-y-2">
                  <div className="text-[10px] uppercase text-brand-accent font-bold tracking-widest">Base Legal</div>
                  <div className="text-sm font-medium border-l-2 border-brand-accent pl-3 py-1 bg-brand-accent/5">
                    {insight?.legalBasis}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] uppercase text-brand-accent font-bold tracking-widest">Impacto Institucional</div>
                  <div className="text-xs text-brand-ink/80 leading-relaxed bg-brand-accent/5 p-3 rounded border border-brand-accent/10">
                    Nível: <span className="font-bold text-brand-accent uppercase">{insight?.impactLevel || 'ALTO'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] uppercase text-brand-accent font-bold tracking-widest">Análise Protetiva</div>
                  <p className="text-sm text-brand-ink italic leading-relaxed">
                    "{insight?.insight}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-brand-accent/20 flex items-center justify-between">
                  <span className="text-[10px] mono-value text-brand-accent/70 tracking-widest">MODEL: GEMINI-2.0-FLASH</span>
                  <button className="text-[10px] font-bold text-brand-accent flex items-center gap-1 hover:underline">
                    VIEW AUDIT LOG <Scale size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="glass-panel p-6">
            <h3 className="institutional-header mb-4 flex items-center gap-2">
              <History size={14} /> RECORRÊNCIA TERRITORIAL
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[78%]" />
              </div>
              <span className="text-xs mono-value font-bold text-orange-500 underline">+12 Relatos</span>
            </div>
            <p className="mt-3 text-[10px] text-brand-secondary leading-relaxed uppercase tracking-tighter">
              Este padrão foi detectado em 5 áreas adjacentes nos últimos 90 dias. Indicativo de falha infraestrutural crônica nesta jurisdição.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataMeta({ label, value, icon: Icon, color = 'text-brand-ink' }: { label: string; value: string; icon: any; color?: string }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] institutional-header">{label}</div>
      <div className={`flex items-center gap-2 text-xs font-bold mono-value ${color}`}>
        <Icon size={14} className="opacity-50" />
        {value}
      </div>
    </div>
  );
}
