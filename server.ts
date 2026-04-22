import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // L-GPPS Protocol Simulation State (Demo only)
  const incidents = [
    {
      id: 'LGPPS-8f2a1b9c',
      location: { lat: -23.5505, lng: -46.6333, address: 'Praça da Sé, São Paulo' },
      category: 'Infraestrutura Crítica',
      subcategory: 'Iluminação Pública - Falha Sistêmica',
      urgency: 'Crítica',
      status: 'Aberto',
      evidenceHash: 'sha256:7e06a38b...',
      timestamp: new Date().toISOString(),
      governance: {
        legalBasis: 'Constituição Federal, Art. 144',
        insight: 'A manutenção da iluminação pública é dever municipal e essencial à segurança pública.',
      },
      reputationScore: 98,
    }
  ];

  // API Routes
  app.get('/api/incidents', (req, res) => {
    res.json(incidents);
  });

  app.post('/api/incidents', (req, res) => {
    const newIncident = {
      id: `LGPPS-${Math.random().toString(36).substr(2, 9)}`,
      ...req.body,
      status: 'Registrado',
      timestamp: new Date().toISOString(),
      evidenceHash: `sha256:${Math.random().toString(16).substr(2, 40)}`,
      reputationScore: 50,
    };
    incidents.push(newIncident);
    res.status(201).json(newIncident);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`L-GPPS 2.0 Protocol Active on http://localhost:${PORT}`);
  });
}

startServer();
