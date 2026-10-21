const toast=document.getElementById('toast');
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
const modalBackdrop=document.getElementById('modalBackdrop');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');
const modalRegion=document.getElementById('modalRegion');
const indianRegions=[
"Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];
indianRegions.forEach(region=>{const option=document.createElement('option');option.value=region;option.textContent=region;modalRegion.appendChild(option)});
modalRegion.value='Maharashtra';
function openModal(type){
  const copy={
    start:['Start exploring PolitiView','Choose a region in India and a topic to personalize your dashboard.'],
    login:['Log in to PolitiView','Login is a front-end demonstration in this prototype. No account will be created.'],
    demo:['PolitiView product demo','This demo previews the product workflow. A real video or guided walkthrough can be connected here.']
  }[type]||['Get started with PolitiView','Choose an Indian region to personalize your political information.'];
  modalTitle.textContent=copy[0];modalText.textContent=copy[1];
  modalBackdrop.classList.add('open');modalBackdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeModal(){modalBackdrop.classList.remove('open');modalBackdrop.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.getElementById('startExploring').addEventListener('click',()=>openModal('start'));
document.getElementById('getStartedTop').addEventListener('click',()=>openModal('start'));
document.getElementById('ctaStart').addEventListener('click',()=>openModal('start'));
document.getElementById('loginBtn').addEventListener('click',()=>openModal('login'));
document.getElementById('watchDemo').addEventListener('click',()=>openModal('demo'));
document.getElementById('searchOpen').addEventListener('click',()=>{
  const query=prompt('Search Indian political issues, leaders, regions or topics:');
  if(query&&query.trim())notify(`Search demo: ${query.trim()}`);
});
document.getElementById('exploreLens').addEventListener('click',()=>notify('Perspective Lens selected — connect verified sources and stakeholder analysis to enable this feature.'));
document.getElementById('modalClose').addEventListener('click',closeModal);
modalBackdrop.addEventListener('click',event=>{if(event.target===modalBackdrop)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});
document.getElementById('modalSubmit').addEventListener('click',()=>{
  const region=modalRegion.value;const interest=document.getElementById('modalInterest').value;
  document.getElementById('geoCurrent').textContent=region;
  closeModal();notify(`Selected ${region} · Interest: ${interest}. Demo only; no data was saved.`);
  document.getElementById('geography').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('.geo-location-card button').forEach(button=>button.addEventListener('click',()=>{
  const region=button.dataset.region;
  document.getElementById('geoCurrent').textContent=region;
  notify(`Geographic level selected: ${region}. Connect administrative boundary data for drill-down.`);
}));
document.querySelectorAll('.geo-flow button').forEach(button=>button.addEventListener('click',()=>{
  const level=button.dataset.level;
  notify(`${level} level selected. Connect India administrative datasets to browse this level.`);
}));
document.querySelectorAll('.time-card').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.time-card').forEach(card=>card.classList.remove('chosen'));
  button.classList.add('chosen');notify(`${button.dataset.mode} selected. Summary content is not connected yet.`);
}));
const menu=document.getElementById('mobileMenu'),nav=document.getElementById('mainNav');
menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'×':'☰'});
document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{
  document.querySelectorAll('.nav-link').forEach(item=>item.classList.toggle('active',item===link));
  nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');
}));