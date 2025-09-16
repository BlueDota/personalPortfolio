// Datos de proyectos (ejemplo, personalízalos)
  const PROJECTS = [
    {id:'p1', name:'Dashboard Analytics', cat:'web', tags:['web','ui'], desc:'Dashboard responsive con gráficas y tablas.', demo:'#', repo:'#'},
    {id:'p2', name:'UI Kit Components', cat:'ui', tags:['ui','tools'], desc:'Colección de componentes UI reutilizables.', demo:'#', repo:'#'},
    {id:'p3', name:'CLI Dev Tools', cat:'tools', tags:['tools'], desc:'Herramientas de línea de comandos para desarrolladores.', demo:'#', repo:'#'},
  ];

  const grid = document.getElementById('projGrid');
  const search = document.getElementById('search');
  const chips = Array.from(document.querySelectorAll('.filters .chip'));

  function card(p){
    return `
    <div class="card">
      <div class="body">
        <div><b>${p.name}</b> <span class="badge">${p.cat}</span></div>
        <div>${p.desc}</div>
      </div>
      <div class="actions">
        <button data-open="${p.id}" class="btn">Detalles</button>
        <a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>
        <a class="btn" href="${p.repo}" target="_blank" rel="noopener">Repo</a>
      </div>
    </div>`;
  }

  function render(){ grid.innerHTML = PROJECTS.map(card).join(''); }
  render();

  function applyFilters(){
    const q=(search.value||'').trim().toLowerCase();
    const active=new Set(chips.filter(c=>c.dataset.active==='true').map(c=>c.dataset.filter));
    const items = PROJECTS.filter(p => (
      (!q || (p.name.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q))) &&
      active.has(p.cat)
    ));
    grid.innerHTML = items.map(card).join('') || '<p>No hay resultados.</p>';
    bindOpen();
  }

  search.addEventListener('input', applyFilters);
  chips.forEach(ch=> ch.addEventListener('click', ()=>{ ch.dataset.active= ch.dataset.active==='true'?'false':'true'; applyFilters(); }));

  // Modal
  const modal=document.getElementById('modal');
  const mTitle=document.getElementById('mTitle');
  const mBody=document.getElementById('mBody');
  const mDemo=document.getElementById('mDemo');
  const mRepo=document.getElementById('mRepo');
  const mClose=document.getElementById('mClose');

  function bindOpen(){
    document.querySelectorAll('[data-open]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const p = PROJECTS.find(x=>x.id===btn.dataset.open);
        if(!p) return;
        mTitle.textContent=p.name;
        mBody.textContent=p.desc;
        mDemo.href=p.demo; mRepo.href=p.repo;
        modal.showModal();
      });
    });
  }
  bindOpen();
  mClose.addEventListener('click',()=>modal.close());

  // Contacto: mailto
  document.getElementById('contactForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const body=document.getElementById('msg').value.trim();
    const subject = encodeURIComponent(`Contacto Portafolio — ${name}`);
    const mailBody = encodeURIComponent(`Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${body}`);
    window.location.href = `mailto:bluedota.6@gmail.com?subject=${subject}&body=${mailBody}`;
  });

  // Print to PDF
  document.getElementById('printCv').addEventListener('click',()=>{ window.print(); });