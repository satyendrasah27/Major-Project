const INDIA_REGIONS = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];
const regionSelect = document.getElementById('regionSelect');
const mapRegionSelect = document.getElementById('mapRegionSelect');
const toast = document.getElementById('toast');
let toastTimer, indiaMap, stateLayer, geojsonData;
const regionAliases = {
  "NCT of Delhi":"Delhi","National Capital Territory of Delhi":"Delhi","Orissa":"Odisha",
  "Jammu & Kashmir":"Jammu and Kashmir","Andaman & Nicobar Island":"Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli":"Dadra and Nagar Haveli and Daman and Diu","Daman and Diu":"Dadra and Nagar Haveli and Daman and Diu"
};
function notify(message){
  toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2400);
}
function normalizeRegion(name){return regionAliases[name]||name;}
function fillRegionSelect(select){
  select.innerHTML='';
  INDIA_REGIONS.forEach(region=>{
    const option=document.createElement('option');option.value=region;option.textContent=region;select.appendChild(option);
  });
}
fillRegionSelect(regionSelect);fillRegionSelect(mapRegionSelect);
regionSelect.value='Maharashtra';mapRegionSelect.value='Maharashtra';

function updateRegion(region){
  if(!INDIA_REGIONS.includes(region)) region='India';
  const display=region==='Maharashtra'?'Pune, Maharashtra':region;
  document.getElementById('weatherPlace').textContent=display;
  document.getElementById('heroRegion').textContent='⌖ '+region;
  document.getElementById('mapPlace').textContent=display;
  document.querySelectorAll('.dynamic-region').forEach(el=>{
    const suffix=el.innerHTML.includes('•')?el.innerHTML.substring(el.innerHTML.indexOf('<span>')):' <span>•</span> Updated recently';
    el.innerHTML=`${region}${suffix}`;
  });
  document.getElementById('cardRegion1').innerHTML=`${region} <span>•</span> 5 hours ago`;
  regionSelect.value=INDIA_REGIONS.includes(region)?region:'Maharashtra';
  mapRegionSelect.value=INDIA_REGIONS.includes(region)?region:'Maharashtra';
  if(stateLayer) highlightRegion(region);
  notify(`Region updated: ${region}`);
}
regionSelect.addEventListener('change',()=>updateRegion(regionSelect.value));
mapRegionSelect.addEventListener('change',()=>updateRegion(mapRegionSelect.value));

document.querySelectorAll('.save').forEach(button=>button.addEventListener('click',()=>{
  const saved=button.dataset.saved==='true';button.dataset.saved=String(!saved);
  button.textContent=saved?'♧':'▣';button.style.color=saved?'':'#0865f5';
  notify(saved?'Removed from saved topics':'Saved to your topics');
}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
  document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active',a===link));
}));
document.getElementById('understandBtn').addEventListener('click',()=>notify('Issue explainer demo — connect a verified article and summarization service.'));
document.getElementById('detailsBtn').addEventListener('click',()=>notify('Article details demo — connect a trusted Indian news source.'));
document.getElementById('perspectiveBtn').addEventListener('click',()=>notify('Perspective Lens demo — add stakeholder viewpoints and source citations.'));
document.getElementById('searchInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'){const q=e.target.value.trim();notify(q?`Searching Indian political topics for “${q}”`:'Enter a topic to search');}
});
document.getElementById('snapshotPeriod').addEventListener('change',e=>notify(`${e.target.value} snapshot selected (sample data)`));
document.getElementById('resetMap').addEventListener('click',e=>{
  e.preventDefault();regionSelect.value='Maharashtra';mapRegionSelect.value='Maharashtra';updateRegion('Maharashtra');
  if(indiaMap) indiaMap.setView([22.8,79],4.4);
});
document.querySelectorAll('.geo-list button').forEach(button=>button.addEventListener('click',()=>{
  const region=button.dataset.region;
  document.querySelectorAll('.geo-list button').forEach(b=>b.classList.toggle('selected',b===button));
  if(INDIA_REGIONS.includes(region)){updateRegion(region);return;}
  if(region==='Pune'){regionSelect.value='Maharashtra';mapRegionSelect.value='Maharashtra';updateRegion('Maharashtra');document.getElementById('mapPlace').textContent='Pune, Maharashtra';notify('Showing Pune, Maharashtra');}
}));

function getFeatureName(feature){
  const p=feature.properties||{};
  return normalizeRegion(p.st_nm||p.ST_NM||p.NAME_1||p.name||p.NAME||p.state||'');
}
function styleFeature(feature){
  const name=getFeatureName(feature);
  const selected=regionSelect.value===name;
  const seed=[...name].reduce((a,c)=>a+c.charCodeAt(0),0)%3;
  return {color:'#ffffff',weight:selected?2.2:1.1,opacity:1,fillColor:selected?'#0865f5':['#77aaff','#9fc4ff','#c4dcff'][seed],fillOpacity:selected?.95:.88};
}
function onEachFeature(feature,layer){
  const name=getFeatureName(feature);
  layer.bindTooltip(name,{sticky:true,direction:'auto'});
  layer.on({mouseover:e=>e.target.setStyle({weight:2.2,color:'#fff',fillColor:'#2f7df6',fillOpacity:1}),mouseout:e=>stateLayer&&stateLayer.resetStyle(e.target),click:()=>{
    const match=INDIA_REGIONS.find(r=>r===name);
    if(match){regionSelect.value=match;mapRegionSelect.value=match;updateRegion(match);}
    else notify(`Selected ${name}. Check state name mapping in app.js if needed.`);
  }});
}
function highlightRegion(region){
  if(!stateLayer)return;
  stateLayer.eachLayer(layer=>{
    const name=getFeatureName(layer.feature);
    layer.setStyle(styleFeature(layer.feature));
    if(name===region && layer.getBounds().isValid()) indiaMap.fitBounds(layer.getBounds(),{padding:[30,30],maxZoom:6});
  });
}
function initMap(){
  if(!window.L){document.getElementById('mapStatus').textContent='Map library unavailable. Check internet access.';return;}
  indiaMap=L.map('indiaMap',{zoomControl:false,scrollWheelZoom:false,attributionControl:true}).setView([22.8,79],4.4);
  L.control.zoom({position:'topleft'}).addTo(indiaMap);
  // India-only state and union-territory boundaries. The external GeoJSON source must remain reachable.
  const geoUrl='https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';
  fetch(geoUrl).then(r=>{if(!r.ok)throw new Error('Boundary data could not be loaded');return r.json();})
    .then(data=>{
      geojsonData=data;
      stateLayer=L.geoJSON(data,{style:styleFeature,onEachFeature}).addTo(indiaMap);
      indiaMap.fitBounds(stateLayer.getBounds(),{padding:[18,18]});
      document.getElementById('mapStatus').textContent='India state boundaries loaded · Select a state to explore';
      highlightRegion('Maharashtra');
    }).catch(()=>{
      document.getElementById('mapStatus').textContent='India map boundaries could not load. Check internet access or GeoJSON URL.';
      // Still keep a usable India-focused map even if the boundary source is unavailable.
      L.circleMarker([18.52,73.86],{radius:7,color:'#fff',weight:2,fillColor:'#0865f5',fillOpacity:1}).addTo(indiaMap).bindPopup('Pune, Maharashtra');
      L.circleMarker([28.61,77.2],{radius:6,color:'#fff',weight:2,fillColor:'#4c91fa',fillOpacity:1}).addTo(indiaMap).bindPopup('Delhi');
    });
}
initMap();