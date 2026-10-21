const toast=document.getElementById('toast');let toastTimer;
function notify(text){toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
document.querySelectorAll('.bookmark').forEach(b=>b.addEventListener('click',()=>{const saved=b.dataset.saved==='true';b.dataset.saved=String(!saved);b.textContent=saved?'♧':'▣';b.style.color=saved?'':'#0865f5';notify(saved?'Removed from saved topics':'Issue saved to your topics')}));
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const isList=b.dataset.view==='list';document.getElementById('mapList').classList.toggle('hidden',!isList);document.getElementById('indiaMap').classList.toggle('hidden',isList);if(!isList&&window.indiaMapInstance){setTimeout(()=>window.indiaMapInstance.invalidateSize(),100)} }));
document.querySelectorAll('.view-toggle button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.view-toggle button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('issueList').classList.toggle('grid-mode',b.dataset.layout==='grid')}));
document.querySelectorAll('.details').forEach(b=>b.addEventListener('click',()=>notify('Issue details view is a demo — connect this button to your article page.')));
document.querySelectorAll('.quick-grid button').forEach(b=>b.addEventListener('click',()=>notify(`${b.innerText.trim()} selected`)));
document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(a.textContent.trim())notify(`${a.textContent.trim()} selected`)}));
document.getElementById('search').addEventListener('keydown',e=>{if(e.key==='Enter')notify(e.target.value.trim()?`Searching for “${e.target.value.trim()}”`:'Enter a search term')});
document.getElementById('mapSearch').addEventListener('keydown',e=>{if(e.key==='Enter')searchMap(e.target.value.trim())});
document.querySelectorAll('select').forEach(s=>s.addEventListener('change',()=>{notify(`${s.options[s.selectedIndex].text} selected`);if(s.closest('.location-steps')||s.classList.contains('location-select'))updateMapLocation()}));

const INDIA_STATES_GEOJSON='https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';
const PUNE=[18.5204,73.8567];
const MAHARASHTRA=[19.7515,75.7139];
let stateLayer=null, stateFeatures=[], markersLayer=null;
function initIndiaMap(){
  const el=document.getElementById('indiaMap');
  if(!el||!window.L)return;
  const map=L.map(el,{zoomControl:false,scrollWheelZoom:true}).setView(PUNE,6);
  window.indiaMapInstance=map;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:18, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  L.control.zoom({position:'topright'}).addTo(map);
  markersLayer=L.layerGroup().addTo(map);
  // Pune marker is explicitly an illustrative selected-region marker, not a live political-data point.
  L.circleMarker(PUNE,{radius:8,color:'#fff',weight:3,fillColor:'#0865f5',fillOpacity:1}).addTo(markersLayer)
    .bindPopup('<b>Pune, Maharashtra</b><br>Selected region<br>Political issue counts shown are sample UI data.')
    .bindTooltip('Pune',{permanent:true,direction:'right',className:'pune-map-label'});
  fetch(INDIA_STATES_GEOJSON)
    .then(r=>{if(!r.ok)throw new Error('GeoJSON could not be loaded');return r.json()})
    .then(data=>{
      stateFeatures=data.features||[];
      stateLayer=L.geoJSON(data,{
        style:feature=>{
          const name=String(feature.properties.st_nm||feature.properties.NAME_1||feature.properties.name||'').toLowerCase();
          const isMaharashtra=name.includes('maharashtra');
          return {color:'#fff',weight:1.2,fillColor:isMaharashtra?'#3985f7':'#a9ccf7',fillOpacity:isMaharashtra?.85:.48};
        },
        onEachFeature:(feature,layer)=>{
          const name=feature.properties.st_nm||feature.properties.NAME_1||feature.properties.name||'Indian state/UT';
          layer.bindTooltip(name,{sticky:true});
          layer.on('click',()=>{notify(`${name} selected`);if(String(name).toLowerCase().includes('maharashtra'))map.fitBounds(layer.getBounds(),{padding:[25,25]})});
        }
      }).addTo(map);
      // Keep the map centered on the user's selected region after state outlines load.
      map.setView(PUNE,6);
    })
    .catch(()=>notify('Map boundaries could not load. Check your internet connection.'));
  window.setIndiaMapView=(view)=>{
    if(view==='India'&&stateLayer)map.fitBounds(stateLayer.getBounds(),{padding:[12,12]});
    else if(view==='Maharashtra'&&stateLayer){
      const f=stateFeatures.find(x=>String(x.properties.st_nm||x.properties.NAME_1||x.properties.name||'').toLowerCase().includes('maharashtra'));
      if(f){const l=L.geoJSON(f);map.fitBounds(l.getBounds(),{padding:[20,20]})}else map.setView(MAHARASHTRA,6);
    }else map.setView(PUNE,10);
  };
}
function searchMap(query){
  if(!query){notify('Enter an Indian location to search');return}
  const known={
    pune:[18.5204,73.8567,10],mumbai:[19.076,72.8777,10],nashik:[19.9975,73.7898,10],
    nagpur:[21.1458,79.0882,10],thane:[19.2183,72.9781,10],solapur:[17.6599,75.9064,10],
    maharashtra:[19.7515,75.7139,7],india:[22.5,79,5],delhi:[28.6139,77.209,11],
    bengaluru:[12.9716,77.5946,10],hyderabad:[17.385,78.4867,10],kolkata:[22.5726,88.3639,10],
    chennai:[13.0827,80.2707,10],ahmedabad:[23.0225,72.5714,10],jaipur:[26.9124,75.7873,10],
    lucknow:[26.8467,80.9462,10],bhopal:[23.2599,77.4126,10],patna:[25.5941,85.1376,10]
  };
  const match=Object.keys(known).find(k=>k===query.toLowerCase());
  if(match&&window.indiaMapInstance){const [lat,lon,z]=known[match];window.indiaMapInstance.setView([lat,lon],z);notify(`Showing ${match[0].toUpperCase()+match.slice(1)}, India`)}
  else notify('Try an Indian city or state, such as Pune, Mumbai, Maharashtra, or India.');
}
function updateMapLocation(){
  const selects=[...document.querySelectorAll('.location-steps select')];
  const state=selects[1]?.value||'';
  if(state.toLowerCase().includes('maharashtra')&&window.setIndiaMapView)window.setIndiaMapView('Maharashtra');
}
document.querySelectorAll('.zoom button').forEach((b,i)=>b.addEventListener('click',()=>notify('Use the map zoom controls to zoom and pan.')));
window.addEventListener('load',initIndiaMap);

document.querySelectorAll('#mapList button[data-city]').forEach(button=>button.addEventListener('click',()=>{
  const city=button.dataset.city;
  document.getElementById('indiaMap').classList.remove('hidden');
  document.getElementById('mapList').classList.add('hidden');
  document.querySelector('.tabs button[data-view="map"]').classList.add('active');
  document.querySelector('.tabs button[data-view="list"]').classList.remove('active');
  searchMap(city);
}));
