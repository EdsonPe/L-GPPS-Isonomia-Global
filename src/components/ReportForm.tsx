import { useState, FormEvent } from 'react';
import { 
  X, 
  MapPin, 
  Camera, 
  Shield, 
  ChevronRight, 
  AlertCircle,
  Clock,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

interface ReportFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ReportForm({ onSubmit, onCancel }: ReportFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: 'Infraestrutura',
    subcategory: '',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    urgency: 'Média',
    description: '',
  });

  const categories = [
    { id: 'infra', label: 'Infraestrutura', sub: ['Iluminação', 'Pavimentação', 'Saneamento'] },
    { id: 'safety', label: 'Segurança Pública', sub: ['Vigilância', 'Patrulhamento', 'Ocorrência'] },
    { id: 'health', label: 'Saúde', sub: ['Unidade Básica', 'Hospital', 'Vigilância Sanitária'] },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      location: { lat: -23.5616, lng: -46.6560, address: formData.address },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Initialize Civic Route</h2>
          <p className="text-brand-secondary text-sm">Protocol L-GPPS 2.0 / Node Global / Layer 1</p>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-brand-line rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="glass-panel p-8 relative overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 h-1 bg-brand-accent transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="institutional-header mb-4">Step 01: Identification & Context</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] institutional-header">Primary Category</span>
                  <select 
                    className="mt-1 w-full bg-slate-900 border border-brand-line rounded-md p-3 text-sm focus:border-brand-accent transition-colors"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c.id}>{c.label}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] institutional-header">Specific Issue (Subcategory)</span>
                  <input 
                    type="text" 
                    placeholder="e.g. Falha Sistêmica na Iluminação de Via Pública"
                    className="mt-1 w-full bg-slate-900 border border-brand-line rounded-md p-3 text-sm focus:border-brand-accent transition-colors"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    required
                  />
                </label>
              </div>
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-brand-accent text-brand-bg font-bold py-3 rounded-md text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                LOCATION PROTOCOL <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="institutional-header mb-4">Step 02: Georeference & Urgency</h3>
              <div className="space-y-4">
                <div className="relative">
                  <span className="text-[10px] institutional-header">Validated Address (GPS Lock)</span>
                  <div className="mt-1 flex items-center gap-3 bg-slate-900 border border-brand-line rounded-md p-3 text-sm">
                    <MapPin size={18} className="text-brand-accent" />
                    <span className="flex-1 opacity-80">{formData.address}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] institutional-header">Urgency Scale</span>
                    <select 
                      className="mt-1 w-full bg-slate-900 border border-brand-line rounded-md p-3 text-sm focus:border-brand-accent transition-colors"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    >
                      <option>Baixa</option>
                      <option>Média</option>
                      <option>Alta</option>
                      <option>Crítica</option>
                    </select>
                  </label>
                  <div className="flex flex-col">
                    <span className="text-[10px] institutional-header">Protocol Signature</span>
                    <div className="mt-1 flex-1 flex items-center justify-center bg-emerald-500/10 border border-brand-accent/20 rounded text-[10px] font-mono text-brand-accent uppercase tracking-widest">
                      ED25519-SIGNED
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-brand-line text-brand-secondary font-bold py-3 rounded-md text-sm hover:border-brand-accent transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Edit
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-brand-accent text-brand-bg font-bold py-3 rounded-md text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  Evidence Vault <Camera size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="institutional-header mb-4">Step 03: Final Evidence & Submission</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-brand-line rounded-xl p-10 flex flex-col items-center justify-center gap-4 hover:border-brand-accent/50 transition-colors cursor-pointer group">
                  <div className="p-4 bg-slate-900 rounded-full group-hover:text-brand-accent transition-colors">
                    <Camera size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Attach Immutable Média</p>
                    <p className="text-[10px] text-brand-secondary uppercase tracking-widest mt-1">Hashed on capture • No Metadata leak</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded border border-brand-line">
                  <Shield size={16} className="text-brand-accent" />
                  <p className="text-[10px] text-brand-secondary uppercase tracking-tighter">
                    Ao confirmar, este relato será transformado em uma Prova Digital de Existência (L0) auditável por qualquer nó governamental ou cívico internacional.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-brand-line text-brand-secondary font-bold py-3 rounded-md text-sm hover:border-brand-accent transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-brand-accent text-brand-bg font-black py-4 rounded-md text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  SUBMIT TO PROTOCOL <Lock size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
