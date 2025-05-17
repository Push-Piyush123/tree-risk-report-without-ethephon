// admin.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase Config
const supabaseUrl = 'https://sklgbhgblgklyjutvami.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbGdiaGdibGdrbHlqdXR2YW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NjI5NDgsImV4cCI6MjA2MjQzODk0OH0.rhCuiYnd05KpEcZvFC6kEDYD2_tZNpO8Q2MV2ixjMDY'; // Truncated for security
const supabase = createClient(supabaseUrl, supabaseKey);

// Elements
const reportsList = document.getElementById('reportsList');
const refreshBtn = document.getElementById('refreshBtn');
const filterSelect = document.getElementById('riskFilter');
const riskyDashboardBtn = document.getElementById('riskyDashboardBtn');
const actionDashboardBtn = document.getElementById('actionDashboardBtn');

// Load Reports
async function loadReports(filter = 'all') {
  reportsList.innerHTML = `
    <div class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading reports...</p>
    </div>`;

  let query = supabase.from('tree_reports').select('*').order('timestamp', { ascending: false });

  if (filter === 'risky') query = query.eq('isRisky', true);
  if (filter === 'safe') query = query.eq('isRisky', false);
  if (filter === 'action_taken') query = query.eq('action_taken', true);

  const { data, error } = await query;

  if (error) {
    reportsList.innerHTML = `<p>Error loading data. Check Supabase setup.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    reportsList.innerHTML = `<p>No reports found.</p>`;
    return;
  }

  reportsList.innerHTML = '';
  data.forEach(report => {
    const div = document.createElement('div');
    div.className = `report-card ${report.isRisky ? 'risky' : 'safe'}`;

    const markBtn = (!report.action_taken && report.isRisky)
      ? `<button class="mark-action-btn" data-id="${report.id}">✅ Mark Action Taken</button>`
      : report.isRisky
  ? `<p><strong>Action:</strong> ${report.action_taken 
      ? `✅ Done on ${new Date(report.action_date).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata', hour12: true, year: 'numeric',
          month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
        })}` 
      : '❌ Not Yet'}</p>`
  : `<p><strong>Action:</strong> 🚫 Not Required</p>`;

    div.innerHTML = `
      <div class="report-header">
        <h3>${report.treeId}</h3>
        <span>${report.isRisky ? '⚠️ Risky' : '✅ Safe'}</span>
      </div>
      <div class="report-details">
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Confidence:</strong> ${Math.round(report.riskLevel * 100)}%</p>
        <p><strong>Time:</strong> ${new Date(report.timestamp).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata', hour12: true, year: 'numeric',
          month: 'numeric', day: 'numeric', hour: 'numeric',
          minute: 'numeric', second: 'numeric'
        })}</p>
        ${markBtn}
      </div>
      ${report.imageUrl ? `<div class="report-image"><img src="${report.imageUrl}" /></div>` : ''}
    `;

    reportsList.appendChild(div);
  });

  attachMarkActionListeners(); // Attach listeners to new buttons
}

// Mark action taken
function attachMarkActionListeners() {
  document.querySelectorAll('.mark-action-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const { error } = await supabase
        .from('tree_reports')
        .update({
          action_taken: true,
          action_date: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        alert('❌ Failed to mark as action taken');
      } else {
        alert('✅ Marked as action taken');
        loadReports('risky'); // Refresh risky view
      }
    });
  });
}

// Event Listeners
refreshBtn.addEventListener('click', () => loadReports(filterSelect.value));
filterSelect.addEventListener('change', () => loadReports(filterSelect.value));
riskyDashboardBtn.addEventListener('click', () => loadReports('risky'));
actionDashboardBtn.addEventListener('click', () => loadReports('action_taken'));

// Initial load
loadReports();
