const fs = require('fs');
let code = fs.readFileSync('scenes.js', 'utf8');
code = code.replace(/export function resolveAssetUrl\(value\) \{[\s\S]*?\}/, `export function resolveAssetUrl(value) {
  if (!value || typeof value !== "string") return value;
  if (/^(?:data:|blob:|https?:|\\/\\/)/i.test(value)) return value;
  if (value.startsWith('/')) return value;
  return '/' + value;
}`);
fs.writeFileSync('scenes.js', code);
