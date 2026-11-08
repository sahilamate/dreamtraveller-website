/**
 * Dream Travelkar - Master Frontend Script
 * Navigation, Hero Search, Global Modals, WhatsApp Integration, and Shared Utilities.
 */

function initApp() {
    // 1. Ensure Storage is initialized
    if (typeof StorageManager !== 'undefined') {
        StorageManager.init();
    }

    // 2. Setup Sticky Header on Scroll
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Setup Redesigned Navbar System (Desktop & Mobile)
    initNavbarSystem();

    // 4. Update Header User State (Login / My Account Dropdown)
    updateHeaderAccountState();

    // 5. Initialize Global WhatsApp Button Handler
    initWhatsAppButton();

    // 6. Initialize Hero Search Widget if present
    initHeroSearch();

    // 7. Initialize Hero Banner Slider & Testimonial Feature
    initHeroBannerSlider();

    // 8. Initialize Global Booking & Enquiry Modals
    initGlobalModals();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/**
 * Redesigned Navbar System: Dropdowns, Click-Outside, Language Selector, and Mobile Drawer
 */
function initNavbarSystem() {
    // Desktop Dropdown Toggles (Click & Accessibility)
    const dropdownTriggers = document.querySelectorAll('.nav-item.has-dropdown > .nav-link, .lang-trigger-btn, .account-user-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            // For destination link on desktop, allow clicking through or toggling
            const parent = trigger.closest('.has-dropdown, .nav-lang-dropdown, .nav-account-dropdown');
            if (parent) {
                const isOpen = parent.classList.contains('dropdown-open');
                // Close other open dropdowns first
                closeAllNavDropdowns();
                if (!isOpen) {
                    parent.classList.add('dropdown-open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });

    // Language Selector Options Handler
    const langOptions = document.querySelectorAll('.lang-option, .drawer-lang-btn');
    langOptions.forEach(opt => {
        opt.addEventListener('click', function (e) {
            e.preventDefault();
            const langCode = opt.getAttribute('data-lang');
            if (typeof I18nManager !== 'undefined') {
                I18nManager.setLanguage(langCode);
            }
            closeAllNavDropdowns();
        });
    });

    // Listen for language changes to refresh account state
    window.addEventListener('dtLanguageChanged', function () {
        updateHeaderAccountState();
    });

    // Mobile Navigation Drawer Controls
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    function openMobileDrawer() {
        if (drawer && backdrop) {
            drawer.classList.add('active');
            backdrop.classList.add('active');
            if (mobileToggle) mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeMobileDrawer() {
        if (drawer && backdrop) {
            drawer.classList.remove('active');
            backdrop.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (drawer && drawer.classList.contains('active')) {
                closeMobileDrawer();
            } else {
                openMobileDrawer();
            }
        });
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileDrawer);
    }

    // Mobile Accordion Toggle for Destinations
    const drawerDropdownToggles = document.querySelectorAll('.drawer-dropdown-toggle');
    drawerDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = toggle.closest('.drawer-has-dropdown');
            if (parent) {
                parent.classList.toggle('open');
            }
        });
    });

    // Auto-close mobile drawer when tapping direct navigation links inside drawer
    const directDrawerLinks = document.querySelectorAll('.drawer-nav-menu a:not(.drawer-dropdown-toggle), .drawer-submenu a, .drawer-cta-wrapper a, .drawer-user-card a');
    directDrawerLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileDrawer();
        });
    });

    // Global Click Outside Behavior for Navbar Dropdowns
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-dropdown') && !e.target.closest('.nav-lang-dropdown') && !e.target.closest('.nav-account-dropdown')) {
            closeAllNavDropdowns();
        }
    });

    // Escape Key to Close Dropdowns and Drawer
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllNavDropdowns();
            closeMobileDrawer();
        }
    });
}

function closeAllNavDropdowns() {
    document.querySelectorAll('.dropdown-open').forEach(el => {
        el.classList.remove('dropdown-open');
        const trigger = el.querySelector('[aria-expanded]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Update Header Account State dynamically from localStorage (Priya / Logged in)
 */
function updateHeaderAccountState() {
    const accountDropdownEl = document.getElementById('nav-account-dropdown');
    const drawerUserCard = document.getElementById('drawer-user-card');
    if (!accountDropdownEl || typeof StorageManager === 'undefined') return;

    const user = StorageManager.getCurrentUser();
    
    if (user && user.name) {
        const firstName = user.name.split(' ')[0];
        const signedInAs = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_signed_in', 'Signed in as') : 'Signed in as';
        const vipBadge = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_vip_badge', 'VIP Explorer') : 'VIP Explorer';
        const dashboard = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_dashboard', 'Dashboard Overview') : 'Dashboard Overview';
        const profile = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_profile', 'My Profile') : 'My Profile';
        const bookings = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_bookings', 'My Bookings') : 'My Bookings';
        const enquiries = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_enquiries', 'My Enquiries') : 'My Enquiries';
        const payments = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_payments', 'Payment History') : 'Payment History';
        const logout = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_logout', 'Logout') : 'Logout';
        const myTrips = (typeof I18nManager !== 'undefined') ? I18nManager.t('drawer_my_trips', 'My Trips') : 'My Trips';
        
        // Desktop Dropdown
        accountDropdownEl.innerHTML = `
            <button type="button" class="account-user-trigger" aria-haspopup="true" aria-expanded="false" title="Account Menu">
                <span class="account-avatar-icon"><i class="fa fa-user-circle"></i></span>
                <span class="account-name">${firstName}</span>
                <i class="fa fa-angle-down nav-caret"></i>
            </button>
            <div class="dropdown-menu account-menu" role="menu">
                <div class="dropdown-user-header">
                    <div class="user-greeting">${signedInAs}</div>
                    <div class="user-name-full">${user.name}</div>
                    <div class="user-badge"><i class="fa fa-star"></i> ${vipBadge}</div>
                </div>
                <ul class="account-menu-items">
                    <li><a href="customer-dashboard.html?tab=overview"><i class="fa fa-th-large"></i> ${dashboard}</a></li>
                    <li><a href="my-profile.html"><i class="fa fa-user-o"></i> ${profile}</a></li>
                    <li><a href="my-bookings.html"><i class="fa fa-suitcase"></i> ${bookings}</a></li>
                    <li><a href="my-enquiries.html"><i class="fa fa-paper-plane-o"></i> ${enquiries}</a></li>
                    <li><a href="payment-history.html"><i class="fa fa-credit-card"></i> ${payments}</a></li>
                    <li class="dropdown-divider"></li>
                    <li><a href="javascript:void(0)" id="nav-logout-action" style="color:var(--color-danger); font-weight:600;"><i class="fa fa-sign-out"></i> ${logout}</a></li>
                </ul>
            </div>
        `;

        // Mobile Drawer User Card
        if (drawerUserCard) {
            drawerUserCard.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:42px; height:42px; border-radius:50%; background:var(--color-sand-light); border:1.5px solid var(--color-gold); color:var(--color-navy); display:flex; align-items:center; justify-content:center; font-size:1.1rem; font-weight:700;">
                        ${(user.name || 'P')[0]}
                    </div>
                    <div>
                        <div style="font-weight:700; color:var(--color-navy); font-size:0.95rem;">${user.name}</div>
                        <div style="font-size:0.75rem; color:#166534;"><i class="fa fa-circle" style="font-size:0.6rem;"></i> ${vipBadge}</div>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:14px;">
                    <a href="customer-dashboard.html" class="btn btn-sm btn-outline-navy" style="font-size:0.78rem; padding:6px 10px;">
                        <i class="fa fa-th-large"></i> ${dashboard}
                    </a>
                    <a href="my-bookings.html" class="btn btn-sm btn-outline-navy" style="font-size:0.78rem; padding:6px 10px;">
                        <i class="fa fa-suitcase"></i> ${myTrips}
                    </a>
                </div>
            `;
        }

        // Attach Logout Action
        const logoutLink = document.getElementById('nav-logout-action');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                StorageManager.logoutCustomer();
                StorageManager.showToast('You have been logged out.', 'info');
                setTimeout(() => window.location.href = 'index.html', 500);
            });
        }

    } else {
        // Logged Out State
        const loginText = (typeof I18nManager !== 'undefined') ? I18nManager.t('nav_login', 'Login / Portal') : 'Login / Portal';
        accountDropdownEl.innerHTML = `
            <a href="login.html" class="account-user-trigger" title="Customer Login">
                <span class="account-avatar-icon"><i class="fa fa-user-circle-o"></i></span>
                <span class="account-name">${loginText}</span>
            </a>
        `;

        if (drawerUserCard) {
            drawerUserCard.innerHTML = `
                <a href="login.html" class="btn btn-sm btn-primary" style="width:100%; display:flex; justify-content:center; gap:8px;">
                    <i class="fa fa-sign-in"></i> ${loginText}
                </a>
            `;
        }
    }
}

/**
 * Initialize WhatsApp Integration with configured phone number and pre-filled text
 */
function initWhatsAppButton() {
    const waButtons = document.querySelectorAll('.dt-whatsapp-btn, .dt-whatsapp-float');
    if (!waButtons.length) return;

    const settings = typeof StorageManager !== 'undefined' ? StorageManager.getSettings() : { whatsapp: '919867807837' };
    const phone = settings.whatsapp || '919867807837';

    waButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const pkgName = btn.getAttribute('data-package') || '';
            const destName = btn.getAttribute('data-destination') || '';
            
            let message = "Namaste Dream Travelkar! I would like to inquire about holiday packages.";
            if (pkgName) {
                message = `Namaste Dream Travelkar! I am interested in booking the "${pkgName}" tour package. Please share details and availability.`;
            } else if (destName) {
                message = `Namaste Dream Travelkar! I am planning a trip to ${destName}. Please provide customized holiday options.`;
            }

            const encodedMsg = encodeURIComponent(message);
            const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
            window.open(waUrl, '_blank');
        });
    });
}

/**
 * Hero Search Box Submission
 */
function initHeroSearch() {
    const searchForm = document.getElementById('hero-search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const destination = document.getElementById('search-destination') ? document.getElementById('search-destination').value : '';
        const month = document.getElementById('search-month') ? document.getElementById('search-month').value : '';
        const travellers = document.getElementById('search-travellers') ? document.getElementById('search-travellers').value : '2';

        const params = new URLSearchParams();
        if (destination) params.set('dest', destination);
        if (month) params.set('month', month);
        if (travellers) params.set('guests', travellers);

        window.location.href = `packages.html?${params.toString()}`;
    });
}

/**
 * Hero Banner Slider Controller
 * Auto-rotates between Nepal, Chardham, and Kerala images with interactive controls
 */
function initHeroBannerSlider() {
    const bgSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slide-dot');
    const prevBtn = document.getElementById('hero-banner-prev') || document.getElementById('hero-test-prev');
    const nextBtn = document.getElementById('hero-banner-next') || document.getElementById('hero-test-next');
    const heroSection = document.querySelector('.hero-section');

    if (!bgSlides.length) return;

    let currentIndex = 0;
    const totalSlides = bgSlides.length;
    let autoInterval = null;

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;

        // Update background slides
        bgSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    // Bind arrows
    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            goToSlide(currentIndex - 1);
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
            goToSlide(currentIndex + 1);
            startAutoSlide();
        });
    }

    // Bind dots
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            goToSlide(idx);
            startAutoSlide();
        });
    });

    // Pause on hover
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
        heroSection.addEventListener('touchstart', stopAutoSlide, { passive: true });
        heroSection.addEventListener('touchend', startAutoSlide, { passive: true });
    }

    startAutoSlide();
}

/**
 * Global Modals (Booking Modal & Enquiry Modal)
 */
function initGlobalModals() {
    // Close modal on backdrop click or close button
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('dt-modal-backdrop') || e.target.classList.contains('dt-modal-close')) {
            const activeModal = document.querySelector('.dt-modal-backdrop.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.dt-modal-backdrop.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });
}

/**
 * Open Booking Modal for a given Package ID
 */
function openBookingModal(packageId) {
    if (typeof StorageManager === 'undefined') return;
    const pkg = StorageManager.getPackageById(packageId);
    if (!pkg) {
        StorageManager.showToast('Package details not found', 'error');
        return;
    }

    let modal = document.getElementById('dt-booking-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dt-booking-modal';
        modal.className = 'dt-modal-backdrop';
        document.body.appendChild(modal);
    }

    const advanceRate = 0.30;
    const basePrice = pkg.price;
    const initialAdvance = Math.round(basePrice * 2 * advanceRate);
    const initialTotal = basePrice * 2;
    const today = new Date().toISOString().split('T')[0];

    modal.innerHTML = `
        <div class="dt-modal-content">
            <div class="dt-modal-header">
                <div>
                    <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-gold); font-weight:700;">Hassle-Free Booking Flow</span>
                    <h3 class="dt-modal-title" style="margin:2px 0 0 0;">Book Tour: ${pkg.title}</h3>
                </div>
                <button class="dt-modal-close">&times;</button>
            </div>
            <div class="dt-modal-body">
                <form id="dt-booking-form" onsubmit="handleBookingSubmission(event, '${pkg.id}')">
                    <div style="background:var(--color-sand-light); padding:14px; border-radius:var(--radius-md); margin-bottom:18px; font-size:0.88rem;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <strong>Destination:</strong> <span>${pkg.destinationName}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <strong>Duration:</strong> <span>${pkg.duration}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <strong>Starting Price:</strong> <span>₹${Number(pkg.price).toLocaleString('en-IN')} / person</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" id="bk-cust-name" class="form-control" value="Priya Sharma" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email Address *</label>
                            <input type="email" id="bk-cust-email" class="form-control" value="priya@example.com" required>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div class="form-group">
                            <label class="form-label">Phone Number (WhatsApp) *</label>
                            <input type="tel" id="bk-cust-phone" class="form-control" value="+91 98200 12345" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Travel Date *</label>
                            <input type="date" id="bk-travel-date" class="form-control" min="${today}" value="2026-12-15" required>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div class="form-group">
                            <label class="form-label">Number of Travellers</label>
                            <select id="bk-travellers" class="form-control" onchange="updateBookingCalculation(${pkg.price})">
                                <option value="1">1 Person (Solo)</option>
                                <option value="2" selected>2 Persons (Couple/Twin)</option>
                                <option value="3">3 Persons</option>
                                <option value="4">4 Persons (Family)</option>
                                <option value="5">5 Persons</option>
                                <option value="6">6+ Persons (Group)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Payment Choice</label>
                            <select id="bk-payment-choice" class="form-control" onchange="updateBookingCalculation(${pkg.price})">
                                <option value="advance" selected>30% Advance Token (Lock Booking)</option>
                                <option value="full">100% Full Payment</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Special Requests / Preferences</label>
                        <textarea id="bk-special-requests" class="form-control" rows="2" placeholder="e.g. Vegetarian/Jain food, flower decoration, extra bed, early check-in"></textarea>
                    </div>

                    <!-- Live Calculation Box -->
                    <div style="border:1.5px solid var(--color-border); border-radius:var(--radius-md); padding:16px; background:#fafafa; margin-top:10px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:6px;">
                            <span>Package Rate (<span id="calc-guests-count">2</span> Guests):</span>
                            <span id="calc-subtotal" style="font-weight:600;">₹${initialTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:6px; color:var(--color-ocean);">
                            <span>Taxes, Driver & Tour Guide:</span>
                            <span style="font-weight:600;">Included</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:700; color:var(--color-navy); border-top:1px dashed var(--color-border); padding-top:8px; margin-top:8px;">
                            <span>Amount Payable Now (Demo):</span>
                            <span id="calc-payable" style="color:#16a34a;">₹${initialAdvance.toLocaleString('en-IN')}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--color-muted); margin-top:4px;">
                            <span>Balance at Check-in:</span>
                            <span id="calc-remaining">₹${(initialTotal - initialAdvance).toLocaleString('en-IN')}</span>
                        </div>
                        <div style="margin-top:10px; font-size:0.75rem; color:#854d0e; background:#fef9c3; padding:6px 10px; border-radius:var(--radius-sm);">
                            <i class="fa fa-info-circle"></i> Frontend Demonstration Mode: Simulated transaction only. No real payment required.
                        </div>
                    </div>

                    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
                        <button type="button" class="btn btn-sm btn-outline-navy dt-modal-close">Cancel</button>
                        <button type="submit" class="btn btn-gold" id="btn-confirm-booking">
                            <i class="fa fa-check-circle"></i> Confirm Simulated Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

/**
 * Update dynamic booking calculations
 */
function updateBookingCalculation(unitPrice) {
    const guests = parseInt(document.getElementById('bk-travellers').value || '1', 10);
    const choice = document.getElementById('bk-payment-choice').value;

    const total = unitPrice * guests;
    let payable = choice === 'advance' ? Math.round(total * 0.30) : total;
    let remaining = total - payable;

    document.getElementById('calc-guests-count').textContent = guests;
    document.getElementById('calc-subtotal').textContent = '₹' + total.toLocaleString('en-IN');
    document.getElementById('calc-payable').textContent = '₹' + payable.toLocaleString('en-IN');
    document.getElementById('calc-remaining').textContent = '₹' + remaining.toLocaleString('en-IN');
}

/**
 * Handle simulated booking submission
 */
function handleBookingSubmission(e, packageId) {
    e.preventDefault();
    if (typeof StorageManager === 'undefined') return;

    const pkg = StorageManager.getPackageById(packageId);
    const name = document.getElementById('bk-cust-name').value.trim();
    const email = document.getElementById('bk-cust-email').value.trim();
    const phone = document.getElementById('bk-cust-phone').value.trim();
    const travelDate = document.getElementById('bk-travel-date').value;
    const guests = parseInt(document.getElementById('bk-travellers').value, 10);
    const choice = document.getElementById('bk-payment-choice').value;
    const specialRequests = document.getElementById('bk-special-requests').value.trim();

    const totalAmount = pkg.price * guests;
    const advancePaid = choice === 'advance' ? Math.round(totalAmount * 0.30) : totalAmount;
    const remainingAmount = totalAmount - advancePaid;

    const newBooking = {
        packageId: pkg.id,
        packageName: pkg.title,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        travelDate: travelDate,
        travellers: guests,
        totalAmount: totalAmount,
        advancePaid: advancePaid,
        remainingAmount: remainingAmount,
        paymentStatus: remainingAmount === 0 ? "Paid" : "Partial",
        bookingStatus: "Confirmed",
        paymentMethod: choice === 'advance' ? "30% Advance Token (Demo)" : "Full Payment (Demo)",
        specialRequests: specialRequests
    };

    const saved = StorageManager.saveBooking(newBooking);

    // Also register or update customer record if not exists
    let existingCust = StorageManager.getCustomers().find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!existingCust) {
        StorageManager.saveCustomer({
            name: name,
            email: email,
            phone: phone,
            city: "Mumbai",
            totalBookings: 1,
            totalSpent: advancePaid,
            status: "Active"
        });
    }

    // Set current active user if not already
    StorageManager.setCurrentUser({
        name: name,
        email: email,
        phone: phone,
        city: "Mumbai"
    });

    // Close modal
    const modal = document.getElementById('dt-booking-modal');
    if (modal) modal.classList.remove('active');

    StorageManager.showToast(`Booking Successful! Booking Reference ID: ${saved.id}`, 'success');

    // Update header account state
    updateHeaderAccountState();

    // Redirect to customer dashboard bookings after 1 second
    setTimeout(() => {
        window.location.href = 'customer-dashboard.html?tab=bookings';
    }, 1200);
}
