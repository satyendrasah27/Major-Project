const toast=document.getElementById('toast');let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
const cards=[...document.querySelectorAll('.issue-card')];let selectedPriority='All',activeTab='All Issues';
const searchInput=document.getElementById('issueSearch'),locationFilter=document.getElementById('locationFilter'),categoryFilter=document.getElementById('categoryFilter'),timeFilter=document.getElementById('timeFilter'),sourceFilter=document.getElementById('sourceFilter');
function applyFilters(){
 const query=searchInput.value.trim().toLowerCase(),location=locationFilter.value,category=categoryFilter.value,time=timeFilter.value,source=sourceFilter.value;
 let shown=0;
 cards.forEach((card,index)=>{
  const text=(card.dataset.title+' '+card.dataset.category+' '+card.dataset.location+' '+card.dataset.source+' '+card.querySelector('p').textContent).toLowerCase();
  let matches=(!query||text.includes(query))&&(location==='All Locations'||card.dataset.location===location||card.dataset.location==='India'&&location==='Maharashtra'&&false)&&(category==='All Categories'||card.dataset.category.toLowerCase().includes(category.toLowerCase()))&&(selectedPriority==='All'||card.dataset.priority===selectedPriority)&&(source==='All Sources'||card.dataset.source===source);
  if(time==='24h')matches=matches&&/hours ago/.test(card.dataset.time);
  if(time==='3d')matches=matches&&!/4 days ago/.test(card.dataset.time);
  if(activeTab==='Most Important')matches=matches&&card.dataset.priority==='High';
  if(activeTab==='In My Region')matches=matches&&['Pune','Maharashtra'].includes(card.dataset.location);
  if(activeTab==='Trending')matches=matches&&['Elections','Infrastructure','Education'].some(topic=>card.dataset.category.includes(topic));
  if(activeTab==='Latest')matches=matches&&['5 hours ago','8 hours ago','12 hours ago'].includes(card.dataset.time);
  card.hidden=!matches;if(matches)shown++;
 });
 document.getElementById('emptyState').hidden=shown!==0;
}
document.getElementById('applyFilters').addEventListener('click',()=>{applyFilters();notify('Filters applied to the displayed issue cards.')});
document.getElementById('resetFilters').addEventListener('click',()=>{searchInput.value='';document.getElementById('globalSearch').value='';locationFilter.value='All Locations';categoryFilter.value='All Categories';timeFilter.value='Any Time';sourceFilter.value='All Sources';selectedPriority='All';activeTab='All Issues';document.querySelectorAll('.priority-choice').forEach(button=>button.classList.toggle('selected',button.dataset.priority==='All'));document.querySelectorAll('.tab').forEach(button=>button.classList.toggle('active',button.dataset.tab==='All Issues'));applyFilters();notify('Filters reset.')});
document.querySelectorAll('.priority-choice').forEach(button=>button.addEventListener('click',()=>{selectedPriority=button.dataset.priority;document.querySelectorAll('.priority-choice').forEach(item=>item.classList.toggle('selected',item===button));applyFilters()}));
document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{activeTab=button.dataset.tab;document.querySelectorAll('.tab').forEach(item=>item.classList.toggle('active',item===button));applyFilters();notify(`${activeTab} selected.`)}));
document.getElementById('globalSearch').addEventListener('keydown',event=>{if(event.key==='Enter'){searchInput.value=event.target.value;applyFilters();document.getElementById('issues').scrollIntoView({behavior:'smooth'});notify('Search applied to political issues.')}});
searchInput.addEventListener('keydown',event=>{if(event.key==='Enter')applyFilters()});
document.querySelectorAll('.bookmark').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('saved');button.textContent=button.classList.contains('saved')?'▣':'♧';notify(button.classList.contains('saved')?'Issue saved to your topics.':'Issue removed from saved topics. This is a demo only.')}));
document.querySelectorAll('.more').forEach(button=>button.addEventListener('click',()=>{const title=button.closest('.issue-card').dataset.title;notify(`More options for: ${title}`)}));
document.querySelectorAll('.saved-search').forEach(button=>button.addEventListener('click',()=>{searchInput.value=button.dataset.query;categoryFilter.value=button.dataset.category;selectedPriority='All';document.querySelectorAll('.priority-choice').forEach(item=>item.classList.toggle('selected',item.dataset.priority==='All'));applyFilters();notify(`Saved search loaded: ${button.querySelector('b').textContent}`)}));
document.getElementById('viewTrending').addEventListener('click',()=>{activeTab='Trending';document.querySelectorAll('.tab').forEach(item=>item.classList.toggle('active',item.dataset.tab==='Trending'));applyFilters();notify('Showing issues related to trending topics.')});
document.getElementById('viewSavedSearches').addEventListener('click',()=>notify('Saved searches are demo examples. Connect a backend to save and synchronize them.'));
document.getElementById('notifications').addEventListener('click',()=>notify('You have no new demo notifications.'));
document.querySelectorAll('.nav-main a,.topic-nav a,.bottom-nav a').forEach(link=>link.addEventListener('click',event=>{if(link.getAttribute('href')==='#'){event.preventDefault();notify(`${link.textContent.trim()} navigation selected.`)}}));
applyFilters();