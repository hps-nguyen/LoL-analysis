const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-site-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('is-open');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

function setupActiveNavigation() {
  const linkTargets = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !linkTargets.length || !navLinks.length) return;

  const activeObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0.15, 0.35, 0.6] }
  );

  linkTargets.forEach((section) => activeObserver.observe(section));
}

const readmeTarget = document.querySelector('[data-readme-content]');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderInline(value) {
  const codeParts = [];
  let safe = escapeHtml(value).replace(/`([^`]+)`/g, (_, code) => {
    codeParts.push(`<code>${code}</code>`);
    return `@@CODE${codeParts.length - 1}@@`;
  });

  safe = safe
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return safe.replace(/@@CODE(\d+)@@/g, (_, index) => codeParts[Number(index)]);
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\|?\s*:?-{2,}/.test(line.trim()))
    .map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));

  if (!rows.length) return '';

  const [head, ...body] = rows;
  const header = head.map((cell) => `<th>${renderInline(cell)}</th>`).join('');
  const bodyRows = body
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
    .join('');

  return `<div class="table-scroll"><table><thead><tr>${header}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

function renderIframe(block) {
  const src = block.match(/src="([^"]+)"/)?.[1];
  if (!src) return block;

  const title = src
    .split('/')
    .pop()
    .replace('.html', '')
    .replaceAll('_', ' ');

  return `<figure class="viz-card wide analysis-viz"><iframe src="${src}" title="${title}"></iframe></figure>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('<iframe')) {
      const iframeLines = [];
      while (index < lines.length) {
        iframeLines.push(lines[index]);
        if (lines[index].includes('</iframe>')) break;
        index += 1;
      }
      html.push(renderIframe(iframeLines.join('\n')));
      index += 1;
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      const [, marks, text] = trimmed.match(/^(#{1,6})\s+(.+)$/);
      const level = Math.min(marks.length + 1, 6);
      html.push(`<h${level} id="${slugify(text)}">${renderInline(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.includes('|') && lines[index + 1]?.includes('|') && lines[index + 1]?.includes('-')) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().includes('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(tableLines));
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().replace(/^-\s+/, ''))}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().replace(/^\d+\.\s+/, ''))}</li>`);
        index += 1;
      }
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,6}\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('<iframe') &&
      !/^-\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().includes('|') && lines[index + 1]?.includes('|') && lines[index + 1]?.includes('-'))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return html.join('\n');
}

async function loadOriginalAnalysis() {
  if (!readmeTarget) return;

  try {
    const response = await fetch('README.md');
    if (!response.ok) throw new Error('README request failed');

    const markdown = await response.text();
    readmeTarget.innerHTML = markdownToHtml(markdown);
    readmeTarget.closest('.full-analysis-section')?.classList.add('is-visible');
    setupPlotFrames(readmeTarget);
    setupActiveNavigation();
  } catch {
    readmeTarget.innerHTML =
      '<p>The full original report could not be loaded in this preview. Open <a href="README.md">README.md</a> to view the original analysis.</p>';
  }
}

loadOriginalAnalysis();
setupActiveNavigation();

function resizePlotFrame(frame) {
  try {
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    const graph = doc?.querySelector('.plotly-graph-div');

    if (!doc || !win || !graph) return;

    doc.documentElement.style.overflow = 'hidden';
    doc.body.style.margin = '0';
    doc.body.style.minHeight = '100%';
    doc.body.style.display = 'grid';
    doc.body.style.placeItems = 'center';
    doc.body.style.background = '#ffffff';

    const width = Math.max(320, frame.clientWidth - 24);
    const height = Math.max(340, frame.clientHeight - 28);
    const plotWidth = Math.max(320, Math.min(900, width - 44));

    graph.style.width = `${plotWidth}px`;
    graph.style.height = `${height}px`;

    if (win.Plotly) {
      win.Plotly.relayout(graph, {
        width: plotWidth,
        height,
        autosize: false,
        'margin.t': 56,
        'margin.r': 96,
        'margin.b': 72,
        'margin.l': 72,
      });
    }
  } catch {
    // If a browser blocks iframe access, the exported Plotly chart still renders normally.
  }
}

function setupPlotFrames(scope = document) {
  const frames = scope.querySelectorAll('.viz-card iframe');

  frames.forEach((frame) => {
    frame.addEventListener('load', () => {
      resizePlotFrame(frame);
      window.setTimeout(() => resizePlotFrame(frame), 400);
    });

    if (frame.contentDocument?.readyState === 'complete') {
      resizePlotFrame(frame);
    }
  });
}

setupPlotFrames();

window.addEventListener('resize', () => {
  document.querySelectorAll('.viz-card iframe').forEach((frame) => resizePlotFrame(frame));
});
