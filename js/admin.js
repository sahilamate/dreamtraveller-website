/**
 * Dream Travelkar - Admin & CRM Business Management System Controller
 * Dashboard analytics, charts, CRUD operations, dynamic itinerary builder, and CRM follow-ups.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Check Admin Auth on admin pages (except admin-login.html and admin/login.html)
    checkAdminAuth();

    // 2. Route current admin page logic based on container presence
    if (document.getElementById('admin-dashboard-view')) {
        initAdminDashboard();
    }
    if (document.getElementById('manage-packages-view')) {
        initManagePackages();
    }
    if (document.getElementById('add-edit-package-form')) {
        initPackageEditor();
    }
    if (document.getElementById('manage-enquiries-view')) {
        initManageEnquiries();
    }
    if (document.getElementById('manage-customers-view')) {
        initManageCustomers();
    }
    if (document.getElementById('manage-bookings-view')) {
        initManageBookings();
    }
    if (document.getElementById('manage-hotels-view')) {
        initManageHotels();
    }
    if (document.getElementById('manage-suppliers-view')) {
        initManageSuppliers();
    }
    if (document.getElementById('manage-destinations-view')) {
        initManageDestinations();
    }
    if (document.getElementById('admin-reports-view')) {
        initAdminReports();
    }
    if (document.getElementById('admin-settings-view')) {
        initAdminSettings();
    }

    // Admin Logout button handler
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            StorageManager.setAdminLogged(false);
            StorageManager.showToast('Logged out of Admin Portal.', 'info');
            setTimeout(() => {
                window.location.href = 'admin-login.html';
            }, 600);
        });
    }

    // Reset Demo Data Handler
    const resetDataBtn = document.getElementById('btn-reset-demo-data');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to reset all demo packages, enquiries, bookings, and customers to factory defaults?')) {
                StorageManager.resetToDefaults();
                location.reload();
            }
        });
    }
});

/**
 * Authentication verification for admin views
 */
function checkAdminAuth() {
    const isLoginView = window.location.pathname.includes('login') || window.location.pathname.includes('admin-login');
    const isAdminView = window.location.pathname.includes('admin') || 
                          window.location.pathname.includes('manage-') || 
                          window.location.pathname.includes('reports.html') || 
                          window.location.pathname.includes('website-settings.html') ||
                          window.location.pathname.includes('add-package.html');

    if (isAdminView && !isLoginView) {
        if (!StorageManager.isAdminLogged()) {
            StorageManager.showToast('Administrator authentication required.', 'error');
            setTimeout(() => {
                window.location.href = 'admin-login.html';
            }, 300);
            return;
        }
    }
}

/**
 * Initialize Admin Dashboard Overview
 */
function initAdminDashboard() {
    if (typeof StorageManager === 'undefined') return;

    const enquiries = StorageManager.getEnquiries();
    const bookings = StorageManager.getBookings();
    const customers = StorageManager.getCustomers();

    // 1. Calculate KPI Metrics
    const totalEnquiries = enquiries.length;
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const pendingPayments = bookings.reduce((sum, b) => sum + (Number(b.remainingAmount) || 0), 0);
    const totalCustomers = customers.length;

    // Render KPI values
    setText('kpi-total-enquiries', totalEnquiries);
    setText('kpi-total-bookings', totalBookings);
    setText('kpi-confirmed-bookings', confirmedBookings);
    setText('kpi-pending-payments', '₹' + pendingPayments.toLocaleString('en-IN'));
    setText('kpi-total-customers', totalCustomers);
    setText('kpi-total-revenue', '₹' + totalRevenue.toLocaleString('en-IN'));

    // 2. Render Recent Bookings Table
    const recentBookingsTbody = document.getElementById('recent-bookings-tbody');
    if (recentBookingsTbody) {
        const recent = bookings.slice(0, 5);
        recentBookingsTbody.innerHTML = recent.map(b => `
            <tr>
                <td><strong>${b.id}</strong></td>
                <td>
                    <strong>${b.customerName}</strong><br>
                    <small style="color:#64748b;">${b.customerPhone}</small>
                </td>
                <td>${b.packageName}</td>
                <td>${StorageManager.formatDate(b.travelDate)}</td>
                <td><strong>₹${Number(b.totalAmount).toLocaleString('en-IN')}</strong></td>
                <td><span class="badge ${b.bookingStatus === 'Confirmed' ? 'badge-confirmed' : 'badge-followup'}">${b.bookingStatus}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-navy" onclick="BookingController.showInvoiceModal('${b.id}')" title="Invoice">
                        <i class="fa fa-file-text-o"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // 3. Render Recent Enquiries Table
    const recentEnquiriesTbody = document.getElementById('recent-enquiries-tbody');
    if (recentEnquiriesTbody) {
        const recentEnqs = enquiries.slice(0, 6);
        recentEnquiriesTbody.innerHTML = recentEnqs.map(e => `
            <tr>
                <td><strong>${e.id}</strong></td>
                <td>
                    <strong>${e.name}</strong><br>
                    <small style="color:#64748b;">${e.phone}</small>
                </td>
                <td>${e.destination}</td>
                <td>${StorageManager.formatDate(e.travelDate)}</td>
                <td><span class="badge badge-${(e.status || 'new').toLowerCase()}">${e.status}</span></td>
                <td>
                    <select class="form-control" style="padding:4px 8px; font-size:0.78rem; width:auto;" onchange="updateEnquiryStatus('${e.id}', this.value)">
                        <option value="New" ${e.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Interested" ${e.status === 'Interested' ? 'selected' : ''}>Interested</option>
                        <option value="Follow-up" ${e.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
                        <option value="Confirmed" ${e.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Cancelled" ${e.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `).join('');
    }

    // 4. Initialize Chart.js Analytics
    renderDashboardCharts();
}

/**
 * Render Chart.js Monthly Revenue & Enquiry Conversion
 */
function renderDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    // Revenue Chart
    const revenueCtx = document.getElementById('admin-revenue-chart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov (Current)', 'Dec (Projected)'],
                datasets: [{
                    label: 'Revenue (₹ Lakhs)',
                    data: [4.2, 5.8, 6.4, 8.1, 9.5, 12.8, 16.4],
                    backgroundColor: '#246B83',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(val) { return '₹' + val + 'L'; }
                        }
                    }
                }
            }
        });
    }

    // Conversion Doughnut Chart
    const conversionCtx = document.getElementById('admin-conversion-chart');
    if (conversionCtx) {
        const enquiries = StorageManager.getEnquiries();
        const counts = {
            Confirmed: enquiries.filter(e => e.status === 'Confirmed').length,
            Interested: enquiries.filter(e => e.status === 'Interested').length,
            FollowUp: enquiries.filter(e => e.status === 'Follow-up').length,
            New: enquiries.filter(e => e.status === 'New').length,
            Cancelled: enquiries.filter(e => e.status === 'Cancelled').length
        };

        new Chart(conversionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Confirmed', 'Follow-up', 'Interested', 'New Leads', 'Cancelled'],
                datasets: [{
                    data: [counts.Confirmed, counts.FollowUp, counts.Interested, counts.New, counts.Cancelled],
                    backgroundColor: ['#16a34a', '#f97316', '#eab308', '#0284c7', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
                }
            }
        });
    }
}

/**
 * Update Enquiry Status from dropdown
 */
function updateEnquiryStatus(enquiryId, newStatus) {
    const enq = StorageManager.getEnquiryById(enquiryId);
    if (!enq) return;

    enq.status = newStatus;
    StorageManager.saveEnquiry(enq);
    StorageManager.showToast(`Enquiry ${enquiryId} status updated to "${newStatus}"`, 'success');
}

/**
 * Manage Packages View Controller
 */
function initManagePackages() {
    const tbody = document.getElementById('packages-admin-tbody');
    if (!tbody) return;

    function renderTable() {
        const packages = StorageManager.getPackages();
        const searchVal = document.getElementById('pkg-search-input') ? document.getElementById('pkg-search-input').value.toLowerCase() : '';
        const filterDest = document.getElementById('pkg-dest-filter') ? document.getElementById('pkg-dest-filter').value.toLowerCase() : '';

        const filtered = packages.filter(p => {
            if (searchVal && !p.title.toLowerCase().includes(searchVal) && !p.destinationName.toLowerCase().includes(searchVal)) return false;
            if (filterDest && p.destinationId.toLowerCase() !== filterDest) return false;
            return true;
        });

        tbody.innerHTML = filtered.map(pkg => `
            <tr>
                <td>
                    <img src="${pkg.coverImage}" alt="${pkg.title}" style="width:60px; height:45px; object-fit:cover; border-radius:4px;">
                </td>
                <td>
                    <strong>${pkg.title}</strong><br>
                    <small style="color:#64748b;">${pkg.destinationName} &bull; ${pkg.duration}</small>
                </td>
                <td><span class="badge ${pkg.type === 'domestic' ? 'badge-confirmed' : 'badge-new'}">${pkg.type}</span></td>
                <td><strong>₹${Number(pkg.price).toLocaleString('en-IN')}</strong></td>
                <td><i class="fa fa-star" style="color:#f59e0b;"></i> ${pkg.rating}</td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <a href="add-package.html?edit=${pkg.id}" class="btn btn-sm btn-outline-navy" title="Edit Package">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <button class="btn btn-sm btn-outline-navy" style="color:var(--color-danger); border-color:#fca5a5;" onclick="confirmDeletePackage('${pkg.id}')" title="Delete Package">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderTable();

    const searchInput = document.getElementById('pkg-search-input');
    if (searchInput) searchInput.addEventListener('input', renderTable);
    const destFilter = document.getElementById('pkg-dest-filter');
    if (destFilter) destFilter.addEventListener('change', renderTable);
}

/**
 * Delete Package
 */
function confirmDeletePackage(pkgId) {
    if (confirm(`Are you sure you want to delete tour package (${pkgId})?`)) {
        StorageManager.deletePackage(pkgId);
        StorageManager.showToast(`Package ${pkgId} deleted successfully.`, 'info');
        initManagePackages();
    }
}

/**
 * Dynamic Day-wise Itinerary & Package Editor
 */
let currentItineraryDays = [];

function initPackageEditor() {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const form = document.getElementById('add-edit-package-form');
    const pageTitle = document.getElementById('package-editor-title');

    // Populate Destination Dropdown in Add Package
    const destSelect = document.getElementById('pkg-dest-select');
    if (destSelect) {
        destSelect.innerHTML = StorageManager.getDestinations().map(d => `
            <option value="${d.id}" data-name="${d.name}" data-type="${d.type}">${d.name} (${d.type === 'domestic' ? 'India' : 'International'})</option>
        `).join('');
    }

    if (editId) {
        const pkg = StorageManager.getPackageById(editId);
        if (pkg) {
            if (pageTitle) pageTitle.textContent = `Edit Tour Package: ${pkg.title}`;
            document.getElementById('pkg-id-hidden').value = pkg.id;
            document.getElementById('pkg-title').value = pkg.title;
            if (destSelect) destSelect.value = pkg.destinationId;
            document.getElementById('pkg-price').value = pkg.price;
            document.getElementById('pkg-original-price').value = pkg.originalPrice || '';
            document.getElementById('pkg-duration').value = pkg.duration;
            document.getElementById('pkg-days').value = pkg.days;
            document.getElementById('pkg-nights').value = pkg.nights;
            document.getElementById('pkg-hotel').value = pkg.hotelCategory || '';
            document.getElementById('pkg-transport').value = pkg.transportation || '';
            document.getElementById('pkg-cover-image').value = pkg.coverImage || '';
            document.getElementById('pkg-summary').value = pkg.summary || '';
            document.getElementById('pkg-inclusions').value = (pkg.inclusions || []).join('\n');
            document.getElementById('pkg-exclusions').value = (pkg.exclusions || []).join('\n');
            document.getElementById('pkg-cancellation').value = pkg.cancellationPolicy || '';
            
            currentItineraryDays = pkg.itinerary ? [...pkg.itinerary] : [];
        }
    } else {
        // Defaults for new package
        currentItineraryDays = [
            { day: 1, title: "Arrival & Welcome", description: "Airport/Station pickup and transfer to hotel. Evening welcome briefing and dinner.", hotel: "4-Star Hotel", meals: "Dinner", activities: "Welcome briefing, Local stroll" },
            { day: 2, title: "City Sightseeing & Heritage Exploration", description: "Full day guided excursion covering major historic and cultural highlights.", hotel: "4-Star Hotel", meals: "Breakfast & Dinner", activities: "Sightseeing tour" }
        ];
    }

    renderItineraryBuilder();

    // Add Day Button
    const addDayBtn = document.getElementById('btn-add-itinerary-day');
    if (addDayBtn) {
        addDayBtn.addEventListener('click', function () {
            const nextDayNum = currentItineraryDays.length + 1;
            currentItineraryDays.push({
                day: nextDayNum,
                title: `Day ${nextDayNum} Exploration`,
                description: "Guided excursion and cultural experiences.",
                hotel: "Hotel / Resort",
                meals: "Breakfast & Dinner",
                activities: "Excursion"
            });
            renderItineraryBuilder();
        });
    }

    // Cover Image Preview
    const coverInput = document.getElementById('pkg-cover-image');
    const coverPreview = document.getElementById('cover-image-preview');
    if (coverInput && coverPreview) {
        coverInput.addEventListener('input', function () {
            if (coverInput.value.trim()) {
                coverPreview.src = coverInput.value.trim();
                coverPreview.style.display = 'block';
            }
        });
    }

    // Form Submit Handler
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            savePackageFromForm();
        });
    }
}

/**
 * Render Itinerary Builder in Admin
 */
function renderItineraryBuilder() {
    const container = document.getElementById('itinerary-builder-container');
    if (!container) return;

    if (currentItineraryDays.length === 0) {
        container.innerHTML = '<p style="color:#64748b; font-size:0.9rem;">No itinerary days added yet. Click "+ Add Itinerary Day" below.</p>';
        return;
    }

    container.innerHTML = currentItineraryDays.map((item, index) => `
        <div class="itinerary-day-box" data-index="${index}">
            <div class="day-header">
                <span><i class="fa fa-calendar-o"></i> Day ${index + 1}</span>
                <button type="button" class="btn-remove-day" onclick="removeItineraryDay(${index})">
                    <i class="fa fa-trash"></i> Remove Day
                </button>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
                <div>
                    <label style="font-size:0.75rem; font-weight:700; color:#475569;">Day Title *</label>
                    <input type="text" class="form-control day-title-input" value="${item.title}" oninput="updateItineraryDay(${index}, 'title', this.value)" required>
                </div>
                <div>
                    <label style="font-size:0.75rem; font-weight:700; color:#475569;">Hotel / Stay</label>
                    <input type="text" class="form-control" value="${item.hotel || ''}" oninput="updateItineraryDay(${index}, 'hotel', this.value)">
                </div>
            </div>
            <div style="margin-bottom:12px;">
                <label style="font-size:0.75rem; font-weight:700; color:#475569;">Description *</label>
                <textarea class="form-control" rows="2" oninput="updateItineraryDay(${index}, 'description', this.value)" required>${item.description}</textarea>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div>
                    <label style="font-size:0.75rem; font-weight:700; color:#475569;">Meals Provided</label>
                    <input type="text" class="form-control" value="${item.meals || 'Breakfast & Dinner'}" oninput="updateItineraryDay(${index}, 'meals', this.value)">
                </div>
                <div>
                    <label style="font-size:0.75rem; font-weight:700; color:#475569;">Activities / Sights</label>
                    <input type="text" class="form-control" value="${item.activities || ''}" oninput="updateItineraryDay(${index}, 'activities', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

function updateItineraryDay(index, field, value) {
    if (currentItineraryDays[index]) {
        currentItineraryDays[index][field] = value;
    }
}

function removeItineraryDay(index) {
    currentItineraryDays.splice(index, 1);
    // Re-number days
    currentItineraryDays.forEach((item, idx) => item.day = idx + 1);
    renderItineraryBuilder();
}

/**
 * Save Package from Add/Edit Form
 */
function savePackageFromForm() {
    const editId = document.getElementById('pkg-id-hidden').value;
    const destSelect = document.getElementById('pkg-dest-select');
    const selectedDestOpt = destSelect.options[destSelect.selectedIndex];

    const title = document.getElementById('pkg-title').value.trim();
    const destinationId = destSelect.value;
    const destinationName = selectedDestOpt.getAttribute('data-name');
    const type = selectedDestOpt.getAttribute('data-type');
    const price = parseInt(document.getElementById('pkg-price').value, 10);
    const originalPrice = document.getElementById('pkg-original-price').value ? parseInt(document.getElementById('pkg-original-price').value, 10) : price + 4000;
    const duration = document.getElementById('pkg-duration').value.trim();
    const days = parseInt(document.getElementById('pkg-days').value, 10);
    const nights = parseInt(document.getElementById('pkg-nights').value, 10);
    const hotel = document.getElementById('pkg-hotel').value.trim();
    const transport = document.getElementById('pkg-transport').value.trim();
    const coverImage = document.getElementById('pkg-cover-image').value.trim() || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80';
    const summary = document.getElementById('pkg-summary').value.trim();
    const inclusions = document.getElementById('pkg-inclusions').value.split('\n').map(s => s.trim()).filter(Boolean);
    const exclusions = document.getElementById('pkg-exclusions').value.split('\n').map(s => s.trim()).filter(Boolean);
    const cancellation = document.getElementById('pkg-cancellation').value.trim();

    const packageData = {
        id: editId || 'pkg-' + Date.now().toString().slice(-6),
        title: title,
        destinationId: destinationId,
        destinationName: destinationName,
        type: type,
        duration: duration,
        days: days,
        nights: nights,
        price: price,
        originalPrice: originalPrice,
        rating: 4.9,
        reviewsCount: 24,
        featured: true,
        coverImage: coverImage,
        summary: summary,
        hotelCategory: hotel,
        transportation: transport,
        inclusions: inclusions,
        exclusions: exclusions,
        cancellationPolicy: cancellation,
        itinerary: currentItineraryDays
    };

    StorageManager.savePackage(packageData);
    StorageManager.showToast(`Package "${title}" saved successfully!`, 'success');

    setTimeout(() => {
        window.location.href = 'manage-packages.html';
    }, 1000);
}

/**
 * Manage Enquiries CRM Controller
 */
function initManageEnquiries() {
    const tbody = document.getElementById('enquiries-admin-tbody');
    if (!tbody) return;

    function renderEnquiries() {
        const enquiries = StorageManager.getEnquiries();
        const statusFilter = document.getElementById('enq-status-filter') ? document.getElementById('enq-status-filter').value : '';
        const searchInput = document.getElementById('enq-search-input') ? document.getElementById('enq-search-input').value.toLowerCase() : '';

        const filtered = enquiries.filter(e => {
            if (statusFilter && e.status !== statusFilter) return false;
            if (searchInput && !e.name.toLowerCase().includes(searchInput) && !e.destination.toLowerCase().includes(searchInput) && !e.phone.includes(searchInput)) return false;
            return true;
        });

        tbody.innerHTML = filtered.map(e => `
            <tr>
                <td><strong>${e.id}</strong><br><small style="color:#64748b;">${StorageManager.formatDate(e.createdAt)}</small></td>
                <td>
                    <strong>${e.name}</strong>
                    ${e.isInternational ? `<span style="background:#B99A62; color:#142B3B; font-size:0.68rem; font-weight:700; padding:2px 6px; border-radius:4px; margin-left:4px;">INTL (${e.country || 'Overseas'})</span>` : ''}
                    <br>
                    <small style="color:#64748b;">${e.email}</small>
                </td>
                <td>
                    <a href="https://wa.me/${(e.phone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--color-ocean); font-weight:600;">
                        <i class="fa fa-whatsapp" style="color:#25D366;"></i> ${e.phone}
                    </a>
                </td>
                <td>
                    <strong>${e.destination}</strong><br>
                    <small style="color:#64748b;">Date: ${StorageManager.formatDate(e.travelDate)} (${e.travellers || 2} Pax)</small>
                </td>
                <td>
                    <select class="form-control" style="font-size:0.8rem; padding:4px 8px;" onchange="updateEnquiryStatus('${e.id}', this.value)">
                        <option value="New" ${e.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Interested" ${e.status === 'Interested' ? 'selected' : ''}>Interested</option>
                        <option value="Follow-up" ${e.status === 'Follow-up' ? 'selected' : ''}>Follow-up</option>
                        <option value="Confirmed" ${e.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Cancelled" ${e.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <input type="date" class="form-control" style="font-size:0.8rem; padding:4px 8px;" value="${e.followUpDate || ''}" onchange="updateFollowUpDate('${e.id}', this.value)">
                </td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn btn-sm btn-outline-navy" onclick="showEnquiryNotesModal('${e.id}')" title="View / Edit Notes">
                            <i class="fa fa-commenting-o"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-navy" style="color:var(--color-danger); border-color:#fca5a5;" onclick="deleteEnquiryRow('${e.id}')" title="Delete">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderEnquiries();

    const filterEl = document.getElementById('enq-status-filter');
    if (filterEl) filterEl.addEventListener('change', renderEnquiries);
    const searchEl = document.getElementById('enq-search-input');
    if (searchEl) searchEl.addEventListener('input', renderEnquiries);
}

function updateFollowUpDate(enqId, newDate) {
    const enq = StorageManager.getEnquiryById(enqId);
    if (!enq) return;
    enq.followUpDate = newDate;
    StorageManager.saveEnquiry(enq);
    StorageManager.showToast(`Follow-up date for ${enqId} set to ${StorageManager.formatDate(newDate)}`, 'info');
}

function showEnquiryNotesModal(enqId) {
    const enq = StorageManager.getEnquiryById(enqId);
    if (!enq) return;

    const newNotes = prompt(`Internal CRM Notes for ${enq.name} (${enq.id}):`, enq.notes || '');
    if (newNotes !== null) {
        enq.notes = newNotes;
        StorageManager.saveEnquiry(enq);
        StorageManager.showToast('CRM notes updated successfully.', 'success');
    }
}

function deleteEnquiryRow(enqId) {
    if (confirm(`Delete enquiry ${enqId}?`)) {
        StorageManager.deleteEnquiry(enqId);
        StorageManager.showToast(`Enquiry ${enqId} removed.`, 'info');
        initManageEnquiries();
    }
}

/**
 * Manage Customers View Controller
 */
function initManageCustomers() {
    const tbody = document.getElementById('customers-admin-tbody');
    if (!tbody) return;

    const customers = StorageManager.getCustomers();
    tbody.innerHTML = customers.map(c => `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td>
                <strong>${c.name}</strong><br>
                <small style="color:#64748b;">${c.email}</small>
            </td>
            <td>${c.phone}</td>
            <td>${c.city || 'Mumbai'}</td>
            <td>${StorageManager.formatDate(c.joinedDate)}</td>
            <td><span class="badge badge-confirmed">${c.totalBookings || 1} Bookings</span></td>
            <td><strong>₹${Number(c.totalSpent || 0).toLocaleString('en-IN')}</strong></td>
            <td><span class="badge ${c.status.includes('VIP') ? 'badge-interested' : 'badge-new'}">${c.status}</span></td>
        </tr>
    `).join('');
}

/**
 * Manage Bookings & Payments View Controller
 */
function initManageBookings() {
    const tbody = document.getElementById('bookings-admin-tbody');
    if (!tbody) return;

    function renderBookings() {
        const bookings = StorageManager.getBookings();
        tbody.innerHTML = bookings.map(b => `
            <tr>
                <td><strong>${b.id}</strong></td>
                <td>
                    <strong>${b.customerName}</strong><br>
                    <small style="color:#64748b;">${b.customerPhone}</small>
                </td>
                <td>${b.packageName}</td>
                <td>${StorageManager.formatDate(b.travelDate)}</td>
                <td><strong>₹${Number(b.totalAmount).toLocaleString('en-IN')}</strong></td>
                <td><span style="color:#16a34a; font-weight:600;">₹${Number(b.advancePaid || 0).toLocaleString('en-IN')}</span></td>
                <td><span style="color:${b.remainingAmount > 0 ? '#b91c1c' : '#16a34a'}; font-weight:600;">₹${Number(b.remainingAmount || 0).toLocaleString('en-IN')}</span></td>
                <td><span class="badge ${b.bookingStatus === 'Confirmed' ? 'badge-confirmed' : 'badge-followup'}">${b.bookingStatus}</span></td>
                <td>
                    <button class="btn btn-sm btn-gold" onclick="BookingController.showInvoiceModal('${b.id}')">
                        <i class="fa fa-print"></i> Invoice
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderBookings();
}

/**
 * Manage Hotels View Controller
 */
function initManageHotels() {
    const tbody = document.getElementById('hotels-admin-tbody');
    if (!tbody) return;

    const hotels = StorageManager.getHotels();
    tbody.innerHTML = hotels.map(h => `
        <tr>
            <td><strong>${h.id}</strong></td>
            <td><strong>${h.name}</strong></td>
            <td>${h.destination}</td>
            <td>${h.category}</td>
            <td>${h.contactPerson} (${h.phone})</td>
            <td><strong>${h.contractedRate}</strong></td>
            <td><span class="badge badge-confirmed">${h.status}</span></td>
        </tr>
    `).join('');
}

/**
 * Manage Suppliers View Controller
 */
function initManageSuppliers() {
    const tbody = document.getElementById('suppliers-admin-tbody');
    if (!tbody) return;

    const suppliers = StorageManager.getSuppliers();
    tbody.innerHTML = suppliers.map(s => `
        <tr>
            <td><strong>${s.id}</strong></td>
            <td><strong>${s.name}</strong></td>
            <td>${s.serviceType}</td>
            <td>${s.contactPerson}</td>
            <td>${s.phone}</td>
            <td>${s.fleet}</td>
            <td><span class="badge badge-confirmed">${s.status}</span></td>
        </tr>
    `).join('');
}

/**
 * Manage Destinations View Controller
 */
function initManageDestinations() {
    const tbody = document.getElementById('destinations-admin-tbody');
    if (!tbody) return;

    const dests = StorageManager.getDestinations();
    tbody.innerHTML = dests.map(d => `
        <tr>
            <td>
                <img src="${d.cardImage}" alt="${d.name}" style="width:50px; height:40px; object-fit:cover; border-radius:4px;">
            </td>
            <td><strong>${d.name}</strong></td>
            <td><span class="badge ${d.type === 'domestic' ? 'badge-confirmed' : 'badge-new'}">${d.type}</span></td>
            <td><strong>₹${Number(d.startingPrice).toLocaleString('en-IN')}</strong></td>
            <td>${d.duration}</td>
            <td>${d.bestSeason}</td>
            <td><i class="fa fa-star" style="color:#f59e0b;"></i> ${d.rating}</td>
        </tr>
    `).join('');
}

/**
 * Admin Reports & Analytics View
 */
function initAdminReports() {
    // Generate simulated conversion metrics
    const bookings = StorageManager.getBookings();
    const enquiries = StorageManager.getEnquiries();

    setText('report-total-leads', enquiries.length);
    setText('report-total-bookings', bookings.length);
    const convRate = enquiries.length > 0 ? ((bookings.length / enquiries.length) * 100).toFixed(1) : '0';
    setText('report-conversion-rate', convRate + '%');

    if (typeof Chart !== 'undefined') {
        const destChartCtx = document.getElementById('report-dest-chart');
        if (destChartCtx) {
            new Chart(destChartCtx, {
                type: 'pie',
                data: {
                    labels: ['Rajasthan', 'Kerala', 'Himachal', 'Thailand', 'Andaman', 'Dubai'],
                    datasets: [{
                        data: [28, 22, 18, 14, 10, 8],
                        backgroundColor: ['#b99a62', '#16a34a', '#0284c7', '#f97316', '#06b6d4', '#8b5cf6']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'right' } }
                }
            });
        }
    }
}

/**
 * Website Settings View Controller
 */
function initAdminSettings() {
    const form = document.getElementById('website-settings-form');
    if (!form) return;

    const settings = StorageManager.getSettings();

    // Populate existing values
    setVal('set-company-name', settings.companyName);
    setVal('set-tagline', settings.tagline);
    setVal('set-phone-primary', settings.phonePrimary);
    setVal('set-phone-secondary', settings.phoneSecondary);
    setVal('set-whatsapp', settings.whatsapp);
    setVal('set-email-primary', settings.emailPrimary);
    setVal('set-email-sales', settings.emailSales);
    setVal('set-address', settings.address);
    setVal('set-advance-pct', settings.advancePercentage || 30);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const updated = {
            ...settings,
            companyName: getVal('set-company-name'),
            tagline: getVal('set-tagline'),
            phonePrimary: getVal('set-phone-primary'),
            phoneSecondary: getVal('set-phone-secondary'),
            whatsapp: getVal('set-whatsapp'),
            emailPrimary: getVal('set-email-primary'),
            emailSales: getVal('set-email-sales'),
            address: getVal('set-address'),
            advancePercentage: parseInt(getVal('set-advance-pct'), 10) || 30
        };

        StorageManager.saveSettings(updated);
        StorageManager.showToast('Website configurations and contact details updated successfully!', 'success');
    });
}

// Helper DOM utilities
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
}
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}
