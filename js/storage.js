/**
 * Dream Travelkar - LocalStorage Manager & Data Layer
 * Handles persistence, retrieval, seeding, and demo authentication.
 */

const DT_STORAGE_KEYS = {
    SETTINGS: 'dt_settings',
    PACKAGES: 'dt_packages',
    DESTINATIONS: 'dt_destinations',
    ENQUIRIES: 'dt_enquiries',
    BOOKINGS: 'dt_bookings',
    CUSTOMERS: 'dt_customers',
    TESTIMONIALS: 'dt_testimonials',
    HOTELS: 'dt_hotels',
    SUPPLIERS: 'dt_suppliers',
    CURRENT_USER: 'dt_current_user',
    ADMIN_LOGGED: 'dt_admin_logged'
};

const StorageManager = {
    init() {
        if (!localStorage.getItem(DT_STORAGE_KEYS.PACKAGES)) {
            this.seedData();
        }
        // Always ensure demo user exists
        if (!this.getCurrentUser()) {
            this.setCurrentUser({
                id: "CUST-001",
                name: "Priya Sharma",
                email: "priya@example.com",
                phone: "+91 98200 12345",
                city: "Mumbai",
                isDemo: true
            });
        }
    },

    seedData() {
        if (typeof INITIAL_DATA === 'undefined') return;
        localStorage.setItem(DT_STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_DATA.settings));
        localStorage.setItem(DT_STORAGE_KEYS.PACKAGES, JSON.stringify(INITIAL_DATA.packages));
        localStorage.setItem(DT_STORAGE_KEYS.DESTINATIONS, JSON.stringify(INITIAL_DATA.destinations));
        localStorage.setItem(DT_STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_DATA.enquiries));
        localStorage.setItem(DT_STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DATA.bookings));
        localStorage.setItem(DT_STORAGE_KEYS.CUSTOMERS, JSON.stringify(INITIAL_DATA.customers));
        localStorage.setItem(DT_STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_DATA.testimonials));
        localStorage.setItem(DT_STORAGE_KEYS.HOTELS, JSON.stringify(INITIAL_DATA.hotels));
        localStorage.setItem(DT_STORAGE_KEYS.SUPPLIERS, JSON.stringify(INITIAL_DATA.suppliers));
    },

    resetToDefaults() {
        localStorage.clear();
        this.seedData();
        this.setCurrentUser({
            id: "CUST-001",
            name: "Priya Sharma",
            email: "priya@example.com",
            phone: "+91 98200 12345",
            city: "Mumbai",
            isDemo: true
        });
        localStorage.removeItem(DT_STORAGE_KEYS.ADMIN_LOGGED);
        this.showToast('System data reset to default demo records.', 'info');
    },

    // Generic Get / Set
    get(key, fallback = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.error('Storage get error for ' + key, e);
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error for ' + key, e);
            return false;
        }
    },

    // Specific Getters
    getSettings() {
        return this.get(DT_STORAGE_KEYS.SETTINGS, INITIAL_DATA ? INITIAL_DATA.settings : {});
    },

    saveSettings(settings) {
        return this.set(DT_STORAGE_KEYS.SETTINGS, settings);
    },

    getPackages() {
        return this.get(DT_STORAGE_KEYS.PACKAGES, []);
    },

    getPackageById(id) {
        const pkgs = this.getPackages();
        return pkgs.find(p => p.id === id);
    },

    savePackage(pkg) {
        const pkgs = this.getPackages();
        const existingIdx = pkgs.findIndex(p => p.id === pkg.id);
        if (existingIdx >= 0) {
            pkgs[existingIdx] = pkg;
        } else {
            pkgs.unshift(pkg);
        }
        this.set(DT_STORAGE_KEYS.PACKAGES, pkgs);
        return pkg;
    },

    deletePackage(id) {
        const pkgs = this.getPackages().filter(p => p.id !== id);
        this.set(DT_STORAGE_KEYS.PACKAGES, pkgs);
        return true;
    },

    getDestinations() {
        return this.get(DT_STORAGE_KEYS.DESTINATIONS, []);
    },

    getDestinationById(id) {
        const dests = this.getDestinations();
        return dests.find(d => d.id === id);
    },

    saveDestination(dest) {
        const dests = this.getDestinations();
        const existingIdx = dests.findIndex(d => d.id === dest.id);
        if (existingIdx >= 0) {
            dests[existingIdx] = dest;
        } else {
            dests.push(dest);
        }
        this.set(DT_STORAGE_KEYS.DESTINATIONS, dests);
        return dest;
    },

    deleteDestination(id) {
        const dests = this.getDestinations().filter(d => d.id !== id);
        this.set(DT_STORAGE_KEYS.DESTINATIONS, dests);
        return true;
    },

    getEnquiries() {
        return this.get(DT_STORAGE_KEYS.ENQUIRIES, []);
    },

    getEnquiryById(id) {
        const enqs = this.getEnquiries();
        return enqs.find(e => e.id === id);
    },

    saveEnquiry(enquiry) {
        const enqs = this.getEnquiries();
        if (!enquiry.id) {
            const nextNum = enqs.length > 0 ? (Math.max(...enqs.map(e => parseInt((e.id || '').replace('ENQ-', '') || 1000))) + 1) : 1001;
            enquiry.id = 'ENQ-' + nextNum;
            enquiry.createdAt = new Date().toISOString().split('T')[0];
            if (!enquiry.status) enquiry.status = 'New';
            enqs.unshift(enquiry);
        } else {
            const idx = enqs.findIndex(e => e.id === enquiry.id);
            if (idx >= 0) enqs[idx] = enquiry;
            else enqs.unshift(enquiry);
        }
        this.set(DT_STORAGE_KEYS.ENQUIRIES, enqs);
        return enquiry;
    },

    deleteEnquiry(id) {
        const enqs = this.getEnquiries().filter(e => e.id !== id);
        this.set(DT_STORAGE_KEYS.ENQUIRIES, enqs);
        return true;
    },

    getBookings() {
        return this.get(DT_STORAGE_KEYS.BOOKINGS, []);
    },

    getBookingById(id) {
        const bks = this.getBookings();
        return bks.find(b => b.id === id);
    },

    saveBooking(booking) {
        const bks = this.getBookings();
        if (!booking.id) {
            const nextNum = bks.length > 0 ? (Math.max(...bks.map(b => parseInt((b.id || '').replace('BK-', '') || 5000))) + 1) : 5001;
            booking.id = 'BK-' + nextNum;
            booking.createdAt = new Date().toISOString().split('T')[0];
            if (!booking.bookingStatus) booking.bookingStatus = 'Confirmed';
            bks.unshift(booking);
        } else {
            const idx = bks.findIndex(b => b.id === booking.id);
            if (idx >= 0) bks[idx] = booking;
            else bks.unshift(booking);
        }
        this.set(DT_STORAGE_KEYS.BOOKINGS, bks);
        return booking;
    },

    deleteBooking(id) {
        const bks = this.getBookings().filter(b => b.id !== id);
        this.set(DT_STORAGE_KEYS.BOOKINGS, bks);
        return true;
    },

    getCustomers() {
        return this.get(DT_STORAGE_KEYS.CUSTOMERS, []);
    },

    getCustomerById(id) {
        return this.getCustomers().find(c => c.id === id);
    },

    saveCustomer(customer) {
        const custs = this.getCustomers();
        if (!customer.id) {
            const nextNum = custs.length + 1;
            customer.id = 'CUST-' + String(nextNum).padStart(3, '0');
            customer.joinedDate = new Date().toISOString().split('T')[0];
            customer.totalBookings = customer.totalBookings || 0;
            customer.totalSpent = customer.totalSpent || 0;
            custs.unshift(customer);
        } else {
            const idx = custs.findIndex(c => c.id === customer.id);
            if (idx >= 0) custs[idx] = customer;
            else custs.unshift(customer);
        }
        this.set(DT_STORAGE_KEYS.CUSTOMERS, custs);
        return customer;
    },

    deleteCustomer(id) {
        const custs = this.getCustomers().filter(c => c.id !== id);
        this.set(DT_STORAGE_KEYS.CUSTOMERS, custs);
        return true;
    },

    getHotels() {
        return this.get(DT_STORAGE_KEYS.HOTELS, []);
    },

    saveHotel(hotel) {
        const items = this.getHotels();
        if (!hotel.id) {
            hotel.id = 'HTL-' + String(items.length + 1).padStart(2, '0');
            items.push(hotel);
        } else {
            const idx = items.findIndex(h => h.id === hotel.id);
            if (idx >= 0) items[idx] = hotel;
            else items.push(hotel);
        }
        this.set(DT_STORAGE_KEYS.HOTELS, items);
        return hotel;
    },

    deleteHotel(id) {
        const items = this.getHotels().filter(h => h.id !== id);
        this.set(DT_STORAGE_KEYS.HOTELS, items);
        return true;
    },

    getSuppliers() {
        return this.get(DT_STORAGE_KEYS.SUPPLIERS, []);
    },

    saveSupplier(supplier) {
        const items = this.getSuppliers();
        if (!supplier.id) {
            supplier.id = 'SUP-' + String(items.length + 1).padStart(2, '0');
            items.push(supplier);
        } else {
            const idx = items.findIndex(s => s.id === supplier.id);
            if (idx >= 0) items[idx] = supplier;
            else items.push(supplier);
        }
        this.set(DT_STORAGE_KEYS.SUPPLIERS, items);
        return supplier;
    },

    deleteSupplier(id) {
        const items = this.getSuppliers().filter(s => s.id !== id);
        this.set(DT_STORAGE_KEYS.SUPPLIERS, items);
        return true;
    },

    getTestimonials() {
        return this.get(DT_STORAGE_KEYS.TESTIMONIALS, []);
    },

    // Session Management
    getCurrentUser() {
        return this.get(DT_STORAGE_KEYS.CURRENT_USER, null);
    },

    setCurrentUser(user) {
        this.set(DT_STORAGE_KEYS.CURRENT_USER, user);
    },

    logoutCustomer() {
        localStorage.removeItem(DT_STORAGE_KEYS.CURRENT_USER);
    },

    isAdminLogged() {
        return localStorage.getItem(DT_STORAGE_KEYS.ADMIN_LOGGED) === 'true';
    },

    setAdminLogged(status) {
        if (status) {
            localStorage.setItem(DT_STORAGE_KEYS.ADMIN_LOGGED, 'true');
        } else {
            localStorage.removeItem(DT_STORAGE_KEYS.ADMIN_LOGGED);
        }
    },

    // Toast Notification System
    showToast(message, type = 'success') {
        let container = document.getElementById('dt-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'dt-toast-container';
            container.className = 'dt-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `dt-toast dt-toast-${type}`;
        
        let icon = 'check-circle';
        if (type === 'error' || type === 'danger') icon = 'exclamation-circle';
        else if (type === 'warning') icon = 'exclamation-triangle';
        else if (type === 'info') icon = 'info-circle';

        toast.innerHTML = `
            <div class="dt-toast-icon"><i class="fa fa-${icon}"></i></div>
            <div class="dt-toast-msg">${message}</div>
            <button class="dt-toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('dt-toast-visible');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('dt-toast-visible');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    },

    // Helpers
    formatCurrency(num) {
        if (isNaN(num)) return '₹0';
        return '₹' + Number(num).toLocaleString('en-IN');
    },

    formatDate(str) {
        if (!str) return 'Flexible';
        try {
            const date = new Date(str);
            if (isNaN(date.getTime())) return str;
            return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch (e) {
            return str;
        }
    }
};

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    StorageManager.init();
}
