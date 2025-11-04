
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, 'dist');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html file:', err);
      return res.status(404).send('Not Found');
    }
    
    const apiKey = process.env.API_KEY;
    let injectedHtml = htmlData;

    if (apiKey) {
      injectedHtml = htmlData.replace(
        '</head>',
        `<script>window.process = { env: { API_KEY: "${apiKey}" } };</script></head>`
      );
    } else {
      console.warn('API_KEY environment variable not set. The application might not work correctly.');
    }
    
    res.send(injectedHtml);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
