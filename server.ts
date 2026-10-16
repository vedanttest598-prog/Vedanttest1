import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve static assets
app.use(express.static(distPath));

// Health check endpoint
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Single Page Application fallback for client-side routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CampusConnect server running on port ${PORT}`);
});
