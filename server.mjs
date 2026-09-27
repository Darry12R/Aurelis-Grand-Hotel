import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.txt':'text/plain; charset=utf-8' };
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
// HTTPS upgrading and HSTS belong to the deployed HTTPS origin, not the local preview.
delete headers['Strict-Transport-Security'];
headers['Content-Security-Policy'] = headers['Content-Security-Policy'].replace('; upgrade-insecure-requests', '');
http.createServer((req,res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { ...headers, Allow:'GET, HEAD' }); res.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400, headers); res.end(); return; }
  if (pathname === '/') pathname = '/index.html';
  if (['/room-service', '/room-service/'].includes(pathname)) pathname = '/room-service/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403, headers); res.end(); return; }
  fs.readFile(file, (err, data) => {
    res.writeHead(err ? 404 : 200, { ...headers, 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : err ? 'Not found' : data);
  });
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${process.env.PORT || 4173}`));
