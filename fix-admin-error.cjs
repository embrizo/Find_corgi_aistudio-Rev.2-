const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

html = html.replace(
  "tbody.innerHTML = '<tr><td colspan=\"4\" style=\"padding: 16px; text-align: center; color: var(--red);\">Error loading users.</td></tr>';",
  "tbody.innerHTML = `<tr><td colspan=\"4\" style=\"padding: 16px; text-align: center; color: var(--red);\">Error loading users: ${e.message}</td></tr>`;"
);

fs.writeFileSync('admin.html', html);
