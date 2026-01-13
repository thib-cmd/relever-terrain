// main.js - repro PDF + GPS pour Chrome mobile
// PDF.js worker configuration + rendering multi-page
if (window['pdfjsLib']) {
  // version CDN ; ajuste si tu veux servir localement
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js';
}

const logEl = document.getElementById('log');
const statusEl = document.getElementById('status');

function log(...args){
  const txt = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
  console.log(...args);
  logEl.textContent += txt + '\n';
  logEl.scrollTop = logEl.scrollHeight;
}
function setStatus(s){ statusEl.textContent = s; log('[status] ' + s); }

// -- Map init --
let map, marker, accuracyCircle;
function initMap(){
  const mapEl = document.getElementById('map');

  function adjustHeight(){
    const header = document.getElementById('header');
    const h = window.innerHeight - header.offsetHeight - 24;
    mapEl.style.height = Math.max(200, h) + 'px';
    if (map && map.invalidateSize) {
      setTimeout(()=>map.invalidateSize(), 120);
    }
  }
  window.addEventListener('resize', adjustHeight);
  adjustHeight();

  map = L.map('map', { zoomControl: true }).setView([0,0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  log('Carte initialisée (OpenStreetMap HTTPS)');
}

function showPositionOnMap(lat, lon, accuracy){
  if (!map) initMap();
  map.setView([lat, lon], 15, { animate: true });

  if (!marker) {
    marker = L.marker([lat, lon]).addTo(map);
  } else {
    marker.setLatLng([lat, lon]);
  }

  if (!accuracyCircle) {
    accuracyCircle = L.circle([lat, lon], { radius: accuracy || 0, color: '#136AEC', fillColor: '#136AEC', fillOpacity: 0.15 }).addTo(map);
  } else {
    accuracyCircle.setLatLng([lat, lon]);
    accuracyCircle.setRadius(accuracy || 0);
  }
  log(`Position affichée: ${lat.toFixed(6)}, ${lon.toFixed(6)} (±${accuracy} m)`);
}

// -- Geolocation permission & request --
async function requestGeolocation(){
  setStatus('Vérification permission géolocalisation...');
  if (!('geolocation' in navigator)) {
    setStatus('Géolocalisation non supportée par ce navigateur');
    log('navigator.geolocation absent');
    return;
  }

  try {
    if (navigator.permissions && navigator.permissions.query) {
      const perm = await navigator.permissions.query({ name: 'geolocation' });
      log('Permission geolocation state:', perm.state);
      if (perm.state === 'denied') {
        setStatus('Permission géoloc refusée - autorise la page dans les paramètres du navigateur.');
        return;
      }
    } else {
      log('Permissions API non disponible -> appel direct getCurrentPosition');
    }
  } catch (err) {
    log('Erreur Permissions API:', err);
  }

  setStatus('Demande de position...');
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude, accuracy } = pos.coords;
      setStatus(`Position obtenue: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
      showPositionOnMap(latitude, longitude, accuracy);
    },
    err => {
      setStatus('Erreur geolocation: ' + err.message);
      log('Geolocation error', err);
      if (err.code === 1) {
        setStatus('Permission refusée par l\'utilisateur (ERR_PERMISSION_DENIED)');
      } else if (err.code === 2) {
        setStatus('Position introuvable (ERR_POSITION_UNAVAILABLE)');
      } else if (err.code === 3) {
        setStatus('Timeout');
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
}

// -- File picker & PDF rendering (pdf.js) --
const fileInput = document.getElementById('fileInput');
const pdfPreview = document.getElementById('pdfPreview');
const pdfCanvasWrap = document.getElementById('pdf-canvas-wrap');
const pdfPrevBtn = document.getElementById('pdf-prev');
const pdfNextBtn = document.getElementById('pdf-next');
const pdfPageInfo = document.getElementById('pdf-page-info');
const pdfOpenIframeBtn = document.getElementById('pdf-open-iframe');

let currentPdf = null;
let currentPageNum = 1;
let totalPdfPages = 0;
let currentRenderTask = null;

async function openPdfPicker(){
  setStatus('Ouverture du sélecteur de fichier...');
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'PDF files',
          accept: { 'application/pdf': ['.pdf'] }
        }],
        multiple: false
      });
      const file = await handle.getFile();
      log('Fichier choisi (handle):', file.name, file.size);
      await displayPdfFile(file);
    } catch (err) {
      log('Erreur showOpenFilePicker or user cancelled:', err);
      setStatus('Sélecteur annulé ou erreur');
    }
    return;
  }

  log('showOpenFilePicker non disponible -> fallback input file');
  fileInput.click();
}

fileInput.addEventListener('change', async (ev) => {
  const f = ev.target.files && ev.target.files[0];
  if (!f) { setStatus('Aucun fichier choisi'); return; }
  log('Fichier choisi (input):', f.name, f.size);
  await displayPdfFile(f);
  fileInput.value = '';
});

async function displayPdfFile(file){
  if (!file) return;
  setStatus('Traitement du PDF: ' + file.name);
  // Reset viewer
  clearPdfViewer();

  try {
    await renderPdfWithPdfJs(file);
    // create blob url for "open in native viewer" fallback
    const blobUrl = URL.createObjectURL(file);
    pdfPreview.src = blobUrl;
    pdfPreview.style.display = 'none';
    pdfOpenIframeBtn.onclick = () => {
      // show iframe
      pdfPreview.style.display = '';
      // scroll iframe into view on mobile
      pdfPreview.scrollIntoView({behavior: 'smooth'});
    };
  } catch (err) {
    log('Erreur renderPdfWithPdfJs, fallback iframe:', err);
    setStatus('Rendu PDF via pdf.js impossible — ouverture dans le viewer natif.');
    // fallback: open via iframe / browser PDF viewer
    const blobUrl = URL.createObjectURL(file);
    pdfPreview.src = blobUrl;
    pdfPreview.style.display = '';
  }
}

function clearPdfViewer(){
  // cancel any running render
  if (currentRenderTask && currentRenderTask.cancel) {
    try { currentRenderTask.cancel(); } catch(e){ /* ignore */ }
  }
  currentPdf = null;
  currentPageNum = 1;
  totalPdfPages = 0;
  pdfPageInfo.textContent = '— / —';
  pdfPrevBtn.disabled = true;
  pdfNextBtn.disabled = true;
  // remove canvases
  pdfCanvasWrap.innerHTML = '';
  pdfPreview.src = '';
  pdfPreview.style.display = 'none';
}

async function renderPdfWithPdfJs(file){
  if (!window.pdfjsLib) throw new Error('pdfjsLib non disponible');
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  currentPdf = await loadingTask.promise;
  totalPdfPages = currentPdf.numPages;
  setStatus(`PDF chargé — ${totalPdfPages} page(s).`);
  log('PDF chargé, pages:', totalPdfPages);
  currentPageNum = 1;
  await renderPage(currentPageNum);
  updatePageControls();
}

async function renderPage(pageNum){
  if (!currentPdf) return;
  // cancel previous render if any
  if (currentRenderTask && currentRenderTask.cancel) {
    try { currentRenderTask.cancel(); } catch(e){ /* ignore */ }
  }
  pdfCanvasWrap.innerHTML = ''; // clear for new canvas
  const page = await currentPdf.getPage(pageNum);

  // viewport scale: fit width
  const unscaledViewport = page.getViewport({ scale: 1 });
  const containerWidth = pdfCanvasWrap.clientWidth || (document.getElementById('pdf-container').clientWidth - 16);
  const scale = containerWidth / unscaledViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d');
  pdfCanvasWrap.appendChild(canvas);

  setStatus(`Rendu page ${pageNum} / ${totalPdfPages}...`);
  currentRenderTask = page.render({ canvasContext: ctx, viewport });
  try {
    await currentRenderTask.promise;
    setStatus(`Page ${pageNum} rendue`);
    log(`Rendered page ${pageNum}`);
  } catch (err) {
    log('Render cancelled or failed:', err);
    throw err;
  }
  updatePageControls();
}

function updatePageControls(){
  pdfPageInfo.textContent = `${currentPageNum} / ${totalPdfPages || '—'}`;
  pdfPrevBtn.disabled = currentPageNum <= 1;
  pdfNextBtn.disabled = currentPageNum >= totalPdfPages;
}

pdfPrevBtn.addEventListener('click', async () => {
  if (!currentPdf) return;
  if (currentPageNum <= 1) return;
  currentPageNum--;
  await renderPage(currentPageNum);
});

pdfNextBtn.addEventListener('click', async () => {
  if (!currentPdf) return;
  if (currentPageNum >= totalPdfPages) return;
  currentPageNum++;
  await renderPage(currentPageNum);
});

// -- Setup UI events --
document.getElementById('btn-open-file').addEventListener('click', async () => {
  try { await openPdfPicker(); } catch (err) { log('Erreur openPdfPicker', err); }
});
document.getElementById('btn-input-file').addEventListener('click', () => { fileInput.click(); });
document.getElementById('btn-geoloc').addEventListener('click', async () => { await requestGeolocation(); });

// init
window.addEventListener('load', () => {
  initMap();
  setStatus('Prêt — ouvre ce lien dans Chrome mobile (HTTPS).');
  log('Page chargée');
  // handle orientation/resize for pdf canvas fitting
  window.addEventListener('resize', () => {
    if (currentPdf) renderPage(currentPageNum).catch(e=>log('Erreur rerender', e));
  });
});
