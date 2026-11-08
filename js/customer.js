/**
 * Dream Travelkar - Customer Portal & Self-Service Controller
 * Handles customer dashboard, my enquiries, my bookings, payment receipts, and profile.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Only execute on customer portal views
    const portalContainer = document.getElementById('customer-portal-view');
    if (!portalContainer) return;

    initCustomerPortal();
});

function initCustomerPortal() {
    if (typeof StorageManager === 'undefined') return;

    let user = StorageManager.getCurrentUser();
    if (!user) {
        user = {
            id: "CUST-001",
            name: "Priya Sharma",
            email: "priya@example.com",
            phone: "+91 98200 12345",
            city: "Mumbai"
        };
        StorageManager.setCurrentUser(user);
    }

    // Set User Profile UI Elements
    const nameEls = document.querySelectorAll('.cust-user-name');
    nameEls.forEach(el => el.textContent = user.name);
    const emailEls = document.querySelectorAll('.cust-user-email');
    emailEls.forEach(el => el.textContent = user.email);
    const phoneEls = document.querySelectorAll('.cust-user-phone');
    phoneEls.forEach(el => el.textContent = user.phone || '+91 98200 12345');
    const avatarEls = document.querySelectorAll('.cust-user-avatar');
    avatarEls.forEach(el => el.textContent = (user.name || 'P')[0]);

    // Handle Tab Navigation if URL parameter ?tab= exists
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab') || 'overview';
    switchCustomerTab(activeTab);

    // Setup Tab click listeners
    const menuLinks = document.querySelectorAll('.customer-menu-item a[data-tab]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tabName = link.getAttribute('data-tab');
            switchCustomerTab(tabName);
        });
    });

    // Populate Overview, Enquiries, Bookings, Payments
    renderCustomerOverview(user);
    renderCustomerEnquiries(user);
    renderCustomerBookings(user);
    renderCustomerPayments(user);
    initProfileForm(user);

    // Customer Logout
    const logoutBtn = document.getElementById('cust-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            StorageManager.logoutCustomer();
            StorageManager.showToast('You have been logged out of the customer portal.', 'info');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 600);
        });
    }
}

function switchCustomerTab(tabName) {
    // Hide all panels
    const panels = document.querySelectorAll('.customer-tab-panel');
    panels.forEach(p => p.style.display = 'none');

    // Remove active class from menu items
    const menuItems = document.querySelectorAll('.customer-menu-item');
    menuItems.forEach(m => m.classList.remove('active'));

    // Show target panel
    const targetPanel = document.getElementById(`tab-panel-${tabName}`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }

    // Highlight menu
    const targetLink = document.querySelector(`.customer-menu-item a[data-tab="${tabName}"]`);
    if (targetLink && targetLink.parentElement) {
        targetLink.parentElement.classList.add('active');
    }
}

function renderCustomerOverview(user) {
    const allBookings = StorageManager.getBookings();
    const allEnquiries = StorageManager.getEnquiries();

    // Match bookings by email or name
    const myBookings = allBookings.filter(b => 
        (b.customerEmail && b.customerEmail.toLowerCase() === user.email.toLowerCase()) ||
        (b.customerName && b.customerName.toLowerCase() === user.name.toLowerCase())
    );

    const myEnquiries = allEnquiries.filter(e => 
        (e.email && e.email.toLowerCase() === user.email.toLowerCase()) ||
        (e.name && e.name.toLowerCase() === user.name.toLowerCase())
    );

    const totalSpent = myBookings.reduce((sum, b) => sum + (Number(b.advancePaid) || 0), 0);
    const pendingBalance = myBookings.reduce((sum, b) => sum + (Number(b.remainingAmount) || 0), 0);

    const kpiEnqs = document.getElementById('cust-kpi-enquiries');
    if (kpiEnqs) kpiEnqs.textContent = myEnquiries.length;
    const kpiBks = document.getElementById('cust-kpi-bookings');
    if (kpiBks) kpiBks.textContent = myBookings.length;
    const kpiPaid = document.getElementById('cust-kpi-spent');
    if (kpiPaid) kpiPaid.textContent = '₹' + totalSpent.toLocaleString('en-IN');
    const kpiPending = document.getElementById('cust-kpi-pending');
    if (kpiPending) kpiPending.textContent = '₹' + pendingBalance.toLocaleString('en-IN');
}

function renderCustomerEnquiries(user) {
    const tbody = document.getElementById('cust-enquiries-tbody');
    if (!tbody) return;

    const allEnquiries = StorageManager.getEnquiries();
    const myEnquiries = allEnquiries.filter(e => 
        (e.email && e.email.toLowerCase() === user.email.toLowerCase()) ||
        (e.name && e.name.toLowerCase() === user.name.toLowerCase())
    );

    if (myEnquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#64748b;">No active travel enquiries found. <a href="customize-tour.html" style="color:var(--color-ocean); font-weight:600;">Plan a customized tour now &rarr;</a></td></tr>`;
        return;
    }

    tbody.innerHTML = myEnquiries.map(e => `
        <tr>
            <td><strong>${e.id}</strong></td>
            <td><strong>${e.destination}</strong></td>
            <td>${StorageManager.formatDate(e.travelDate)}</td>
            <td>${e.travellers || 2} Pax</td>
            <td><span class="badge badge-${(e.status || 'new').toLowerCase()}">${e.status}</span></td>
            <td>
                <small style="color:#64748b;">${e.notes ? e.notes.slice(0, 45) + '...' : 'Submitted via portal'}</small>
            </td>
        </tr>
    `).join('');
}

function renderCustomerBookings(user) {
    const tbody = document.getElementById('cust-bookings-tbody');
    if (!tbody) return;

    const allBookings = StorageManager.getBookings();
    const myBookings = allBookings.filter(b => 
        (b.customerEmail && b.customerEmail.toLowerCase() === user.email.toLowerCase()) ||
        (b.customerName && b.customerName.toLowerCase() === user.name.toLowerCase())
    );

    if (myBookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#64748b;">You have no booked trips yet. <a href="packages.html" style="color:var(--color-ocean); font-weight:600;">Explore our tour packages &rarr;</a></td></tr>`;
        return;
    }

    tbody.innerHTML = myBookings.map(b => `
        <tr>
            <td><strong>${b.id}</strong></td>
            <td>
                <strong>${b.packageName}</strong><br>
                <small style="color:#64748b;">Scheduled: ${StorageManager.formatDate(b.travelDate)}</small>
            </td>
            <td>${b.travellers} Guests</td>
            <td><strong>₹${Number(b.totalAmount).toLocaleString('en-IN')}</strong></td>
            <td><span style="color:#16a34a; font-weight:600;">₹${Number(b.advancePaid || 0).toLocaleString('en-IN')}</span></td>
            <td><span class="badge ${b.bookingStatus === 'Confirmed' ? 'badge-confirmed' : 'badge-followup'}">${b.bookingStatus}</span></td>
            <td>
                <button class="btn btn-sm btn-gold" onclick="BookingController.showInvoiceModal('${b.id}')">
                    <i class="fa fa-print"></i> View Invoice
                </button>
            </td>
        </tr>
    `).join('');
}

function renderCustomerPayments(user) {
    const tbody = document.getElementById('cust-payments-tbody');
    if (!tbody) return;

    const allBookings = StorageManager.getBookings();
    const myBookings = allBookings.filter(b => 
        (b.customerEmail && b.customerEmail.toLowerCase() === user.email.toLowerCase()) ||
        (b.customerName && b.customerName.toLowerCase() === user.name.toLowerCase())
    );

    if (myBookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#64748b;">No payment records found.</td></tr>`;
        return;
    }

    tbody.innerHTML = myBookings.map(b => `
        <tr>
            <td><strong>TXN-${b.id.replace('BK-', '99')}</strong></td>
            <td>${StorageManager.formatDate(b.createdAt || '2026-11-01')}</td>
            <td><strong>₹${Number(b.advancePaid || 0).toLocaleString('en-IN')}</strong></td>
            <td>${b.paymentMethod || 'Online Transfer (Demo)'}</td>
            <td><span class="badge badge-confirmed">Settled (Demo)</span></td>
            <td>
                <button class="btn btn-sm btn-outline-navy" onclick="BookingController.showInvoiceModal('${b.id}')">
                    <i class="fa fa-file-text-o"></i> Receipt
                </button>
            </td>
        </tr>
    `).join('');
}

function initProfileForm(user) {
    const form = document.getElementById('cust-profile-form');
    if (!form) return;

    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');
    const cityInput = document.getElementById('profile-city');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (cityInput) cityInput.value = user.city || 'Mumbai';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const updated = {
            ...user,
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            city: cityInput.value.trim()
        };
        StorageManager.setCurrentUser(updated);
        StorageManager.showToast('Your profile details were updated successfully!', 'success');
        setTimeout(() => location.reload(), 800);
    });
}
