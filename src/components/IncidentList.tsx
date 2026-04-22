import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Incident } from '../App';

interface IncidentListProps {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
  loading: boolean;
}

export default function IncidentList({ incidents, onSelect, loading }: IncidentListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-900/50 border border-brand-line rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <button
          key={incident.id}
          onClick={() => onSelect(incident)}
          className="w-full text-left p-3 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-brand-accent/50 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-tighter">PROVED: {incident.id.substr(-6)}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
              incident.urgency === 'Crítica' ? 'bg-red-500/20 text-red-400' :
              incident.urgency === 'Alta' ? 'bg-orange-500/20 text-orange-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {incident.urgency}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-slate-100 group-hover:text-brand-accent transition-colors">
            {incident.subcategory}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Regional Hub: {incident.location.address}
          </p>

          <div className="flex gap-1.5 mt-3">
            <div className="h-1 flex-1 bg-brand-accent rounded-full"></div>
            <div className="h-1 flex-1 bg-brand-accent rounded-full"></div>
            <div className={`h-1 flex-1 rounded-full ${incident.reputationScore > 50 ? 'bg-brand-accent' : 'bg-slate-700'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${incident.reputationScore > 80 ? 'bg-brand-accent' : 'bg-slate-700'}`}></div>
          </div>

          <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono italic">
            <span>{incident.reputationScore} Validations</span>
            <span>{incident.status}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
