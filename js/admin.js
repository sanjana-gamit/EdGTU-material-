// admin.js - client-side admin tools (for convenience/testing only)

function loginAdmin(){
  const u = document.getElementById('adminUser').value;
  const p = document.getElementById('adminPass').value;
  // default credentials: admin / admin123  (change before sharing)
  if(u==='admin' && p==='admin123'){
    // redirect to dashboard
    window.location.href = 'admin-dashboard.html';
  } else {
    alert('Invalid credentials. Use admin / admin123 for testing.');
  }
}

function adminAddMaterial(){
  const code = document.getElementById('m_code').value.trim();
  const title = document.getElementById('m_title').value.trim();
  const type = document.getElementById('m_type').value;
  const name = document.getElementById('m_name').value.trim();
  const link = document.getElementById('m_link').value.trim();
  if(!code || !title || !name || !link){ alert('Fill all fields'); return; }

  // load local materials from localStorage for preview
  const stored = localStorage.getItem('gtu_materials_preview');
  const data = stored ? JSON.parse(stored) : {};
  if(!data[code]) data[code] = { title: title, materials: [] };
  data[code].materials.push({ name:name, link:link, type:type });
  localStorage.setItem('gtu_materials_preview', JSON.stringify(data));
  document.getElementById('preview').textContent = JSON.stringify(data, null, 2);
  alert('Added to local preview. To publish for all users, add to materials.json in the repo (see README).');
}

// On admin dashboard load, show preview if exists
document.addEventListener('DOMContentLoaded', ()=>{
  const p = document.getElementById('preview');
  if(p){
    const stored = localStorage.getItem('gtu_materials_preview');
    p.textContent = stored ? stored : 'No local preview materials yet.';
  }
});
