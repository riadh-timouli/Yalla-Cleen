document.addEventListener('DOMContentLoaded', function() {
  console.log("Dashboard script loaded.");
  
  // --- Sidebar Navigation Logic ---
  const sidebarLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-link');
  const dashboardSections = document.querySelectorAll('.dashboard-content-area .dashboard-section');
  const mainHeaderTitle = document.querySelector('.dashboard-main-header h1');
  
  function setActiveSection(targetId) {
    dashboardSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active-section');
        if (mainHeaderTitle && section.querySelector('h2')) {
          mainHeaderTitle.textContent = section.querySelector('h2').textContent;
        }
      } else {
        section.classList.remove('active-section');
      }
    });
    
    sidebarLinks.forEach(link => {
      if (link.dataset.target === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    // For mobile: close sidebar after click if it's open
    if (document.body.classList.contains('sidebar-mobile-open')) {
      document.body.classList.remove('sidebar-mobile-open');
      document.querySelector('.dashboard-sidebar').classList.remove('open');
    }
  }
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.dataset.target;
      if (targetId) {
        setActiveSection(targetId);
        // Optional: Update URL hash for bookmarking/linking (can cause page jump if not handled)
        // window.location.hash = targetId;
      }
    });
  });
  
  // Check for hash on page load to set initial active section
  // if (window.location.hash) {
  //     const initialTargetId = window.location.hash.substring(1);
  //     const initialSection = document.getElementById(initialTargetId);
  //     if (initialSection) {
  //         setActiveSection(initialTargetId);
  //     } else {
  //         setActiveSection('dashboard-overview'); // Default if hash is invalid
  //     }
  // } else {
  setActiveSection('dashboard-overview'); // Default active section
  // }
  
  
  // --- Mobile Sidebar Toggle ---
  const sidebarToggleMobile = document.querySelector('.sidebar-toggle-mobile');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  
  if (sidebarToggleMobile && dashboardSidebar) {
    sidebarToggleMobile.addEventListener('click', () => {
      dashboardSidebar.classList.toggle('open');
      document.body.classList.toggle('sidebar-mobile-open'); // To potentially overlay content
    });
  }
  
  // --- Dashboard Theme Toggle ---
  const themeToggleDashboard = document.getElementById('theme-toggle-dashboard');
  const dashboardBody = document.querySelector('.dashboard-body');
  const dashboardThemeIcon = themeToggleDashboard ? themeToggleDashboard.querySelector('i') : null;
  
  function setDashboardTheme(theme) {
    if (dashboardBody) {
      if (theme === 'dark') {
        dashboardBody.classList.remove('light-mode');
        dashboardBody.classList.add('dark-mode');
        if (dashboardThemeIcon) {
          dashboardThemeIcon.classList.remove('fa-moon');
          dashboardThemeIcon.classList.add('fa-sun');
        }
        localStorage.setItem('yallaCleanDashboardTheme', 'dark');
      } else {
        dashboardBody.classList.remove('dark-mode');
        dashboardBody.classList.add('light-mode');
        if (dashboardThemeIcon) {
          dashboardThemeIcon.classList.remove('fa-sun');
          dashboardThemeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('yallaCleanDashboardTheme', 'light');
      }
    }
  }
  
  if (themeToggleDashboard) {
    themeToggleDashboard.addEventListener('click', () => {
      if (dashboardBody.classList.contains('light-mode')) {
        setDashboardTheme('dark');
      } else {
        setDashboardTheme('light');
      }
    });
    
    const savedDashboardTheme = localStorage.getItem('yallaCleanDashboardTheme');
    if (savedDashboardTheme) {
      setDashboardTheme(savedDashboardTheme);
    } else {
      setDashboardTheme('light'); // Default to light
    }
  }
  
  // --- Example: Chart.js for Overview (if Chart.js is included) ---
  if (typeof Chart !== 'undefined' && document.getElementById('bookingsChart')) {
    const ctx = document.getElementById('bookingsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line', // or 'bar', 'pie', etc.
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
        datasets: [{
          label: 'الحجوزات الشهرية',
          data: [65, 59, 80, 81, 56, 55, 125], // بيانات وهمية
          borderColor: 'var(--primary-color-dashboard)',
          backgroundColor: 'rgba(255, 107, 0, 0.2)',
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  // --- Example: Flatpickr for Report Date Range (if Flatpickr is included) ---
  const reportDateRangePicker = document.getElementById('reportDateRange');
  if (typeof flatpickr !== 'undefined' && reportDateRangePicker) {
    flatpickr(reportDateRangePicker, {
      mode: "range",
      dateFormat: "Y-m-d",
      locale: "ar"
    });
  }
  
  // --- Example: Add Region (Frontend Only) ---
  const addRegionBtn = document.getElementById('addRegionBtn');
  const newRegionInput = document.getElementById('newRegionInput');
  const regionsList = document.getElementById('regionsList');
  
  if (addRegionBtn && newRegionInput && regionsList) {
    addRegionBtn.addEventListener('click', function() {
      const regionName = newRegionInput.value.trim();
      if (regionName) {
        const listItem = document.createElement('li');
        listItem.textContent = regionName;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn btn-sm';
        deleteBtn.title = 'حذف';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.addEventListener('click', function() {
          listItem.remove();
          // Add backend call to delete region here
        });
        
        listItem.appendChild(deleteBtn);
        regionsList.appendChild(listItem);
        newRegionInput.value = ''; // Clear input
        // Add backend call to save region here
      } else {
        alert('يرجى إدخال اسم المنطقة.');
      }
    });
    
    // Add delete functionality to existing delete buttons (if any are hardcoded)
    regionsList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        btn.parentElement.remove();
        // Add backend call to delete region here
      });
    });
  }
  
  
  // --- Form Submission for Settings (Example) ---
  const settingsForm = document.getElementById('settingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Collect form data
      const companyName = document.getElementById('companyName').value;
      // ... get other values
      console.log("Settings saved (simulated):", { companyName, /* ... */ });
      alert("تم حفظ الإعدادات بنجاح (محاكاة)!");
      // Add backend call to save settings here
    });
  }
  
  
  console.log("Dashboard script fully initialized.");
});