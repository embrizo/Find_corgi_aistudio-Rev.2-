const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css += `
@media (max-width: 860px) {
  .header-left {
    gap: 6px;
  }
  .header-logo-small {
    margin-left: auto;
  }
}
@media (max-width: 400px) {
  .header-logo-small {
    display: none !important;
  }
}
`;
fs.writeFileSync('style.css', css);
