/**
 * Dream Travelkar - Tour Packages Controller
 * Grid rendering, filtering, search, and dynamic package details.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check if on packages listing page
    const packagesContainer = document.getElementById('packages-grid-container');
    if (packagesContainer) {
        initPackagesListingPage();
    }

    // Check if on package details page
    const packageDetailsContainer = document.getElementById('package-details-container');
    if (packageDetailsContainer) {
        initPackageDetailsPage();
    }

    // Listen to language switch event across pages
    window.addEventListener('dtLanguageChanged', function () {
        if (document.getElementById('packages-grid-container')) {
            updateFilterControlsLanguage();
            populateDestinationFilter();
            filterAndRenderPackages();
        }
        if (document.getElementById('package-details-container')) {
            initPackageDetailsPage();
        }
    });
});

/**
 * Helper to localize duration string
 */
function getLocalizedDuration(duration) {
    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    if (!duration || lang === 'en') return duration;
    
    const match = duration.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
    if (match) {
        const d = match[1];
        const n = match[2];
        if (lang === 'mr') {
            const toMarathiDigits = (num) => num.replace(/\d/g, digit => "०१२३४५६७८९"[digit]);
            return `${toMarathiDigits(d)} दिवस / ${toMarathiDigits(n)} रात्री`;
        }
        if (lang === 'hi') {
            return `${d} दिन / ${n} रातें`;
        }
    }
    return duration;
}

/**
 * Initialize Packages Listing Page (packages.html)
 */
function initPackagesListingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('dest') || '';
    const typeParam = urlParams.get('type') || '';
    const maxBudgetParam = urlParams.get('budget') || '';
    const durationParam = urlParams.get('duration') || '';

    // Set filter control values if present in URL
    if (destParam && document.getElementById('filter-destination')) {
        document.getElementById('filter-destination').value = destParam;
    }
    if (typeParam && document.getElementById('filter-type')) {
        document.getElementById('filter-type').value = typeParam;
    }
    if (maxBudgetParam && document.getElementById('filter-budget')) {
        document.getElementById('filter-budget').value = maxBudgetParam;
    }
    if (durationParam && document.getElementById('filter-duration')) {
        document.getElementById('filter-duration').value = durationParam;
    }

    // Update filter options and labels language
    updateFilterControlsLanguage();

    // Populate destination dropdown dynamically
    populateDestinationFilter();

    // Initial render
    filterAndRenderPackages();

    // Listen to filter form submit or change
    const filterForm = document.getElementById('package-filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            filterAndRenderPackages();
        });
        filterForm.querySelectorAll('select, input').forEach(el => {
            el.addEventListener('change', filterAndRenderPackages);
        });
    }

    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (filterForm) filterForm.reset();
            filterAndRenderPackages();
        });
    }
}

/**
 * Update Tour Category, Budget options, and Filter button language
 */
function updateFilterControlsLanguage() {
    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    
    const typeSelect = document.getElementById('filter-type');
    if (typeSelect && typeSelect.options.length >= 3) {
        const curType = typeSelect.value;
        const allText = lang === 'mr' ? 'सर्व प्रकार (भारत व जग)' : (lang === 'hi' ? 'सभी प्रकार (भारत और विश्व)' : 'All Types (India & World)');
        const domText = lang === 'mr' ? 'भारतीय देशांतर्गत सहली' : (lang === 'hi' ? 'भारतीय घरेलू टूर्स' : 'India Domestic Tours');
        const intlText = lang === 'mr' ? 'आंतरराष्ट्रीय सहली' : (lang === 'hi' ? 'अंतरराष्ट्रीय टूर्स' : 'International Tours');
        typeSelect.options[0].textContent = allText;
        typeSelect.options[1].textContent = domText;
        typeSelect.options[2].textContent = intlText;
        typeSelect.value = curType;
    }

    const budgetSelect = document.getElementById('filter-budget');
    if (budgetSelect && budgetSelect.options.length >= 5) {
        const curBudget = budgetSelect.value;
        const anyBudget = lang === 'mr' ? 'कोणतेही बजेट' : (lang === 'hi' ? 'कोई भी बजट' : 'Any Budget');
        const up20 = lang === 'mr' ? '₹२०,००० पर्यंत' : (lang === 'hi' ? '₹20,000 तक' : 'Up to ₹20,000');
        const up30 = lang === 'mr' ? '₹३०,००० पर्यंत' : (lang === 'hi' ? '₹30,000 तक' : 'Up to ₹30,000');
        const up50 = lang === 'mr' ? '₹५०,००० पर्यंत' : (lang === 'hi' ? '₹50,000 तक' : 'Up to ₹50,000');
        const up100 = lang === 'mr' ? '₹१,००,००० पर्यंत' : (lang === 'hi' ? '₹1,00,000 तक' : 'Up to ₹1,00,000');
        budgetSelect.options[0].textContent = anyBudget;
        budgetSelect.options[1].textContent = up20;
        budgetSelect.options[2].textContent = up30;
        budgetSelect.options[3].textContent = up50;
        budgetSelect.options[4].textContent = up100;
        budgetSelect.value = curBudget;
    }

    const filterBtn = document.querySelector('.btn-filter-submit');
    if (filterBtn) {
        const btnText = lang === 'mr' ? 'फिल्टर करा' : (lang === 'hi' ? 'फिल्टर करें' : 'Filter');
        filterBtn.innerHTML = `<i class="fa fa-filter"></i> ${btnText}`;
    }
}

/**
 * Populate Destination dropdown in filter bar
 */
function populateDestinationFilter() {
    const destSelect = document.getElementById('filter-destination');
    if (!destSelect || typeof StorageManager === 'undefined') return;

    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    const dests = StorageManager.getDestinations();
    const allText = lang === 'mr' ? 'सर्व पर्यटन स्थळे' : (lang === 'hi' ? 'सभी प्रमुख गंतव्य' : 'All Destinations');
    const indiaText = lang === 'mr' ? 'भारत' : (lang === 'hi' ? 'भारत' : 'India');
    const intlText = lang === 'mr' ? 'आंतरराष्ट्रीय' : (lang === 'hi' ? 'अंतरराष्ट्रीय' : 'International');

    const curVal = destSelect.value;
    destSelect.innerHTML = `<option value="">${allText}</option>`;
    dests.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        let dName = d.name;
        if (typeof I18nManager !== 'undefined' && I18nManager.destinations && I18nManager.destinations[d.id] && I18nManager.destinations[d.id][lang]) {
            dName = I18nManager.destinations[d.id][lang].name;
        }
        opt.textContent = `${dName} (${d.type === 'domestic' ? indiaText : intlText})`;
        destSelect.appendChild(opt);
    });
    if (curVal) destSelect.value = curVal;
}

/**
 * Filter and render packages
 */
function filterAndRenderPackages() {
    const container = document.getElementById('packages-grid-container');
    const countEl = document.getElementById('packages-count-label');
    if (!container || typeof StorageManager === 'undefined') return;

    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    let packages = StorageManager.getPackages();

    // Get filter values
    const dest = document.getElementById('filter-destination') ? document.getElementById('filter-destination').value.toLowerCase() : '';
    const type = document.getElementById('filter-type') ? document.getElementById('filter-type').value.toLowerCase() : '';
    const budget = document.getElementById('filter-budget') ? parseInt(document.getElementById('filter-budget').value, 10) : 0;
    const duration = document.getElementById('filter-duration') ? document.getElementById('filter-duration').value : '';
    const searchKeyword = document.getElementById('filter-search') ? document.getElementById('filter-search').value.trim().toLowerCase() : '';

    const filtered = packages.filter(pkg => {
        // Destination match
        if (dest && pkg.destinationId.toLowerCase() !== dest && !pkg.destinationName.toLowerCase().includes(dest)) {
            return false;
        }
        // Type match (domestic vs international)
        if (type && pkg.type.toLowerCase() !== type) {
            return false;
        }
        // Budget match
        if (budget && pkg.price > budget) {
            return false;
        }
        // Duration match
        if (duration) {
            if (duration === 'short' && pkg.days > 5) return false;
            if (duration === 'medium' && (pkg.days < 6 || pkg.days > 8)) return false;
            if (duration === 'long' && pkg.days < 9) return false;
        }
        // Search keyword
        if (searchKeyword) {
            const haystack = `${pkg.title} ${pkg.destinationName} ${pkg.summary} ${pkg.hotelCategory}`.toLowerCase();
            if (!haystack.includes(searchKeyword)) return false;
        }
        return true;
    });

    if (countEl) {
        if (lang === 'mr') {
            countEl.textContent = `${filtered.length} निवडक टूर पॅकेजेस दर्शवित आहे`;
        } else if (lang === 'hi') {
            countEl.textContent = `${filtered.length} चुनिंदा टूर पैकेज दिखाए जा रहे हैं`;
        } else {
            countEl.textContent = `Showing ${filtered.length} curated tour ${filtered.length === 1 ? 'package' : 'packages'}`;
        }
    }

    if (filtered.length === 0) {
        const noResultsTitle = lang === 'mr' ? 'तुमच्या फिल्टरनुसार कोणतेही टूर पॅकेज सापडले नाही' : (lang === 'hi' ? 'आपके फिल्टर से मेल खाने वाला कोई टूर पैकेज नहीं मिला' : 'No tour packages match your filters');
        const noResultsDesc = lang === 'mr' ? 'आम्ही तुमच्या प्रवासाच्या तारखा आणि बजेटनुसार खास सानुकूल (कस्टमाइज) सहल आखून देऊ शकतो.' : (lang === 'hi' ? 'हम आपकी यात्रा की तारीखों और बजट के अनुसार विशेष कस्टमाइज यात्रा तैयार कर सकते हैं.' : 'We can customize a unique tailor-made itinerary specifically suited for your dates and budget.');
        const btnText = lang === 'mr' ? 'सानुकूल सहलीची मागणी करा' : (lang === 'hi' ? 'कस्टमाइज यात्रा का अनुरोध करें' : 'Request Customized Itinerary');

        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
                <i class="fa fa-compass" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 16px;"></i>
                <h3 style="font-size: 1.4rem; color: var(--color-navy); margin-bottom: 8px;">${noResultsTitle}</h3>
                <p style="color: var(--color-muted); max-width: 500px; margin: 0 auto 20px auto;">
                    ${noResultsDesc}
                </p>
                <a href="customize-tour.html" class="btn btn-gold">${btnText}</a>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(pkg => renderPackageCardHTML(pkg)).join('');
    if (typeof I18nManager !== 'undefined' && I18nManager.translateKnownPhrases) {
        I18nManager.translateKnownPhrases(lang);
    }
}

/**
 * Generate Package Card HTML
 */
function renderPackageCardHTML(pkg) {
    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    const formattedPrice = Number(pkg.price).toLocaleString('en-IN');
    const formattedOriginal = pkg.originalPrice ? Number(pkg.originalPrice).toLocaleString('en-IN') : '';

    // Localize Destination Name if available
    let destName = pkg.destinationName;
    if (typeof I18nManager !== 'undefined' && I18nManager.destinations && I18nManager.destinations[pkg.destinationId] && I18nManager.destinations[pkg.destinationId][lang]) {
        destName = I18nManager.destinations[pkg.destinationId][lang].name;
    }

    // Localize Type Badge
    let typeBadge = pkg.type === 'domestic' ? 'India Heritage' : 'International';
    if (lang === 'mr') {
        typeBadge = pkg.type === 'domestic' ? 'अतुल्य भारत' : 'आंतरराष्ट्रीय';
    } else if (lang === 'hi') {
        typeBadge = pkg.type === 'domestic' ? 'अतुल्य भारत' : 'अंतरराष्ट्रीय';
    }

    // Localize Features, Title, and Summary
    let pkgTitle = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.title, lang) : pkg.title;
    let pkgSummary = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.summary, lang) : pkg.summary;
    let mealsText = "Daily Breakfast & Dinners Included";
    let hotelText = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.hotelCategory || '4-Star Verified Stays', lang) : (pkg.hotelCategory || '4-Star Verified Stays');
    let transportText = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.transportation || 'AC Coach / Private Vehicle', lang) : (pkg.transportation || 'AC Coach / Private Vehicle');
    let perPersonText = '/ person';
    let detailsText = 'Details';
    let bookNowText = 'Book Now';

    if (lang === 'mr') {
        mealsText = "सकाळचा नाश्ता व रात्रीचे जेवण समाविष्ट";
        perPersonText = '/ व्यक्ती';
        detailsText = 'सविस्तर';
        bookNowText = 'आता बुक करा';
    } else if (lang === 'hi') {
        mealsText = "दैनिक नाश्ता और रात का भोजन शामिल";
        perPersonText = '/ व्यक्ति';
        detailsText = 'विवरण';
        bookNowText = 'अभी बुक करें';
    }

    const durationText = getLocalizedDuration(pkg.duration);

    return `
        <div class="pkg-card">
            <div class="pkg-card-img-wrap">
                <img src="${pkg.coverImage}" alt="${pkgTitle}" class="pkg-card-img" loading="lazy">
                <span class="pkg-type-badge ${pkg.type}">${typeBadge}</span>
                <span class="pkg-duration-badge">
                    <i class="fa fa-clock-o"></i> ${durationText}
                </span>
            </div>
            <div class="pkg-card-body">
                <div class="pkg-destination">
                    <i class="fa fa-map-marker"></i> ${destName}
                </div>
                <h3 class="pkg-title">
                    <a href="package-details.html?id=${pkg.id}">${pkgTitle}</a>
                </h3>
                <p class="pkg-summary">${pkgSummary}</p>
                
                <ul class="pkg-features-list">
                    <li class="pkg-feature-item">
                        <i class="fa fa-bed"></i> <span>${hotelText}</span>
                    </li>
                    <li class="pkg-feature-item">
                        <i class="fa fa-car"></i> <span>${transportText}</span>
                    </li>
                    <li class="pkg-feature-item">
                        <i class="fa fa-cutlery"></i> <span>${mealsText}</span>
                    </li>
                </ul>

                <div class="pkg-card-footer">
                    <div class="pkg-price-block">
                        ${formattedOriginal ? `<span class="pkg-price-original">₹${formattedOriginal}</span>` : ''}
                        <div class="pkg-price-current">
                            ₹${formattedPrice} <span class="pkg-price-unit">${perPersonText}</span>
                        </div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <a href="package-details.html?id=${pkg.id}" class="btn btn-sm btn-outline-navy" title="View Full Itinerary">
                            ${detailsText}
                        </a>
                        <button type="button" class="btn btn-sm btn-gold" onclick="openBookingModal('${pkg.id}')">
                            ${bookNowText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize Package Details Page (package-details.html)
 */
function initPackageDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('id') || 'pkg-raj-01'; // Default fallback
    const container = document.getElementById('package-details-container');

    if (!container || typeof StorageManager === 'undefined') return;

    const lang = typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    const pkg = StorageManager.getPackageById(packageId);
    if (!pkg) {
        const notFoundTitle = lang === 'mr' ? 'पॅकेज सापडले नाही' : (lang === 'hi' ? 'पैकेज नहीं मिला' : 'Package Not Found');
        const notFoundDesc = lang === 'mr' ? 'तुम्ही शोधत असलेले टूर पॅकेज अस्तित्वात नाही किंवा बदलले गेले आहे.' : (lang === 'hi' ? 'आपके द्वारा खोजा गया टूर पैकेज मौजूद नहीं है या बदल दिया गया है।' : 'The tour package you requested does not exist or has been modified.');
        const btnBrowse = lang === 'mr' ? 'सर्व पॅकेजेस पहा' : (lang === 'hi' ? 'सभी पैकेज देखें' : 'Browse All Packages');

        container.innerHTML = `
            <div style="text-align:center; padding:80px 20px;">
                <h2>${notFoundTitle}</h2>
                <p>${notFoundDesc}</p>
                <a href="packages.html" class="btn btn-primary" style="margin-top:16px;">${btnBrowse}</a>
            </div>
        `;
        return;
    }

    document.title = `${pkg.title} | Dream Travelkar`;

    // Localize strings for package details page
    let typeBadge = pkg.type === 'domestic' ? 'Incredible India' : 'World Discovery';
    let reviewsLabel = 'Reviews';
    let highlightsTitle = 'Trip Highlights & Accommodation';
    let stayLabel = 'Stay Category';
    let transferLabel = 'Transfers & Sightseeing';
    let itineraryTitle = 'Day-wise Detailed Itinerary';
    let daysPlannedText = `${pkg.itinerary ? pkg.itinerary.length : 0} Days Planned`;
    let inclusionsTitle = 'Inclusions';
    let exclusionsTitle = 'Exclusions';
    let policyTitle = 'Cancellation & Rescheduling Policy';
    let promoRateText = 'Special Promotional Rate';
    let perPersonText = '/ person';
    let bookHolidayText = 'Book This Holiday Now';
    let whatsappText = 'Ask Query on WhatsApp';
    let g1 = '100% Verified Accommodations';
    let g2 = 'Dedicated 24/7 Dream Travelkar Tour Escort';
    let g3 = 'Transparent Pricing - No Hidden Charges';
    let tokenHtml = `<strong>Book with 30% Token:</strong> Pay only ₹${Math.round(pkg.price * 0.30).toLocaleString('en-IN')} now to lock this departure date.`;

    if (lang === 'mr') {
        typeBadge = pkg.type === 'domestic' ? 'अतुल्य भारत' : 'जागतिक सहल';
        reviewsLabel = 'अभिप्राय';
        highlightsTitle = 'सहलीची वैशिष्ट्ये आणि निवास';
        stayLabel = 'निवास श्रेणी';
        transferLabel = 'वाहतूक व प्रेक्षणीय स्थळे';
        itineraryTitle = 'दिवसनिहाय सविस्तर सहल नियोजन';
        daysPlannedText = `${pkg.itinerary ? pkg.itinerary.length : 0} दिवसांचे नियोजन`;
        inclusionsTitle = 'समाविष्ट बाबी (Inclusions)';
        exclusionsTitle = 'असमाविष्ट बाबी (Exclusions)';
        policyTitle = 'रद्द करणे आणि पुनर्निर्धारण धोरण';
        promoRateText = 'विशेष सवलत दर';
        perPersonText = '/ व्यक्ती';
        bookHolidayText = 'ही सहल आत्ताच बुक करा';
        whatsappText = 'व्हॉट्सॲपवर माहिती विचारा';
        g1 = '१००% पडताळणी केलेले निवासस्थान';
        g2 = '२४/७ समर्पित ड्रीम ट्रॅव्हलकर टूर एस्कॉर्ट';
        g3 = 'पारदर्शक दर - कोणतेही छुपे शुल्क नाही';
        tokenHtml = `<strong>३०% टोकनने बुक करा:</strong> तुमची प्रवासाची तारीख निश्चित करण्यासाठी आता फक्त ₹${Math.round(pkg.price * 0.30).toLocaleString('en-IN')} भरा.`;
    } else if (lang === 'hi') {
        typeBadge = pkg.type === 'domestic' ? 'अतुल्य भारत' : 'विश्व यात्रा';
        reviewsLabel = 'समीक्षाएं';
        highlightsTitle = 'यात्रा की मुख्य विशेषताएं और आवास';
        stayLabel = 'आवास श्रेणी';
        transferLabel = 'परिवहन और दर्शनीय स्थल';
        itineraryTitle = 'दिन-वार विस्तृत यात्रा कार्यक्रम';
        daysPlannedText = `${pkg.itinerary ? pkg.itinerary.length : 0} दिनों का कार्यक्रम`;
        inclusionsTitle = 'शामिल सुविधाएं (Inclusions)';
        exclusionsTitle = 'शामिल नहीं (Exclusions)';
        policyTitle = 'रद्दीकरण और पुनर्निर्धारण नीति';
        promoRateText = 'विशेष प्रचार दर';
        perPersonText = '/ व्यक्ति';
        bookHolidayText = 'यह छुट्टी अभी बुक करें';
        whatsappText = 'व्हाट्सएप पर जानकारी पूछें';
        g1 = '100% सत्यापित आवास';
        g2 = '24/7 समर्पित ड्रीम ट्रॅव्हलकर टूर एस्कॉर्ट';
        g3 = 'पारदर्शी मूल्य निर्धारण - कोई छुपा शुल्क नहीं';
        tokenHtml = `<strong>30% टोकन पर बुक करें:</strong> अपनी यात्रा की तारीख सुरक्षित करने के लिए अभी केवल ₹${Math.round(pkg.price * 0.30).toLocaleString('en-IN')} दें.`;
    }

    let destName = pkg.destinationName;
    if (typeof I18nManager !== 'undefined' && I18nManager.destinations && I18nManager.destinations[pkg.destinationId] && I18nManager.destinations[pkg.destinationId][lang]) {
        destName = I18nManager.destinations[pkg.destinationId][lang].name;
    }

    const durationText = getLocalizedDuration(pkg.duration);

    const pkgTitle = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.title, lang) : pkg.title;
    const pkgSummary = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.summary, lang) : pkg.summary;
    const hotelText = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.hotelCategory, lang) : pkg.hotelCategory;
    const transportText = (typeof I18nManager !== 'undefined' && I18nManager.translateText) ? I18nManager.translateText(pkg.transportation, lang) : pkg.transportation;

    // Render Package Details HTML
    container.innerHTML = `
        <!-- Hero Banner -->
        <div style="position:relative; height:420px; background:linear-gradient(rgba(20,43,59,0.65), rgba(20,43,59,0.85)), url('${pkg.coverImage}') center/cover no-repeat; display:flex; align-items:flex-end; padding-bottom:50px; color:#ffffff;">
            <div class="container">
                <div style="max-width:850px;">
                    <div style="display:flex; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
                        <span style="background:var(--color-gold); color:var(--color-navy-dark); font-size:0.75rem; font-weight:700; text-transform:uppercase; padding:4px 12px; border-radius:var(--radius-sm);">
                            ${typeBadge}
                        </span>
                        <span style="background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); font-size:0.75rem; font-weight:600; padding:4px 12px; border-radius:var(--radius-sm);">
                            <i class="fa fa-map-marker"></i> ${destName}
                        </span>
                        <span style="background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); font-size:0.75rem; font-weight:600; padding:4px 12px; border-radius:var(--radius-sm);">
                            <i class="fa fa-clock-o"></i> ${durationText}
                        </span>
                        <span style="background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); font-size:0.75rem; font-weight:600; padding:4px 12px; border-radius:var(--radius-sm);">
                            <i class="fa fa-star" style="color:#f59e0b;"></i> ${pkg.rating} (${pkg.reviewsCount} ${reviewsLabel})
                        </span>
                    </div>
                    <h1 style="color:#ffffff; font-size:2.8rem; line-height:1.2; margin-bottom:10px;">${pkgTitle}</h1>
                    <p style="color:#e2e8f0; font-size:1.1rem; margin:0;">${pkgSummary}</p>
                </div>
            </div>
        </div>

        <!-- Main Details Content Grid -->
        <div class="section-padding">
            <div class="container">
                <div class="package-details-layout" style="display:grid; grid-template-columns: 2fr 1fr; gap:40px; align-items:start;">
                    
                    <!-- Left Column: Highlights, Itinerary, Inclusions/Exclusions -->
                    <div>
                        <!-- Overview Box -->
                        <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:32px; margin-bottom:32px; box-shadow:var(--shadow-sm);">
                            <h2 style="font-size:1.6rem; margin-bottom:16px;">${highlightsTitle}</h2>
                            <div class="package-features-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:24px;">
                                <div style="display:flex; gap:12px; align-items:center;">
                                    <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-sand-light); display:flex; align-items:center; justify-content:center; color:var(--color-ocean); font-size:1.2rem;">
                                        <i class="fa fa-hotel"></i>
                                    </div>
                                    <div>
                                        <span style="font-size:0.78rem; text-transform:uppercase; color:var(--color-muted); font-weight:600; display:block;">${stayLabel}</span>
                                        <strong style="font-size:0.95rem;">${hotelText}</strong>
                                    </div>
                                </div>
                                <div style="display:flex; gap:12px; align-items:center;">
                                    <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-sand-light); display:flex; align-items:center; justify-content:center; color:var(--color-ocean); font-size:1.2rem;">
                                        <i class="fa fa-bus"></i>
                                    </div>
                                    <div>
                                        <span style="font-size:0.78rem; text-transform:uppercase; color:var(--color-muted); font-weight:600; display:block;">${transferLabel}</span>
                                        <strong style="font-size:0.95rem;">${transportText}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Day-wise Itinerary Accordion -->
                        <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:32px; margin-bottom:32px; box-shadow:var(--shadow-sm);">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                                <h2 style="font-size:1.6rem; margin:0;">${itineraryTitle}</h2>
                                <span style="font-size:0.85rem; color:var(--color-ocean); font-weight:600;">${daysPlannedText}</span>
                            </div>

                            <div class="itinerary-timeline" style="display:flex; flex-direction:column; gap:18px;">
                                ${renderItineraryDaysHTML(pkg.itinerary, lang)}
                            </div>
                        </div>

                        <!-- Inclusions & Exclusions -->
                        <div class="package-inclusions-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:32px;">
                            <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:28px; box-shadow:var(--shadow-sm);">
                                <h3 style="font-size:1.25rem; color:#166534; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
                                    <i class="fa fa-check-circle"></i> ${inclusionsTitle}
                                </h3>
                                <ul style="list-style:none; padding:0; margin:0;">
                                    ${(pkg.inclusions || []).map(inc => `
                                        <li style="font-size:0.88rem; color:#374151; margin-bottom:10px; display:flex; align-items:flex-start; gap:8px;">
                                             <i class="fa fa-check" style="color:#16a34a; margin-top:4px; font-size:0.8rem;"></i>
                                             <span>${inc}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>

                            <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:28px; box-shadow:var(--shadow-sm);">
                                <h3 style="font-size:1.25rem; color:#991b1b; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
                                    <i class="fa fa-times-circle"></i> ${exclusionsTitle}
                                </h3>
                                <ul style="list-style:none; padding:0; margin:0;">
                                    ${(pkg.exclusions || []).map(exc => `
                                        <li style="font-size:0.88rem; color:#374151; margin-bottom:10px; display:flex; align-items:flex-start; gap:8px;">
                                            <i class="fa fa-times" style="color:#dc2626; margin-top:4px; font-size:0.8rem;"></i>
                                            <span>${exc}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>

                        <!-- Cancellation & Policies -->
                        <div style="background:var(--color-sand-light); border:1px solid rgba(185,154,98,0.3); border-radius:var(--radius-md); padding:24px;">
                            <h4 style="font-size:1.05rem; margin-bottom:8px; color:var(--color-navy);"><i class="fa fa-shield"></i> ${policyTitle}</h4>
                            <p style="font-size:0.88rem; color:#4b5563; margin:0;">${pkg.cancellationPolicy}</p>
                        </div>
                    </div>

                    <!-- Right Sticky Booking Card -->
                    <div style="position:sticky; top:100px;">
                        <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:32px; box-shadow:var(--shadow-lg);">
                            <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-gold); font-weight:700; display:block; margin-bottom:4px;">${promoRateText}</span>
                            <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:14px;">
                                <span style="font-size:2.4rem; font-weight:700; color:var(--color-navy);">₹${Number(pkg.price).toLocaleString('en-IN')}</span>
                                <span style="font-size:0.88rem; color:var(--color-muted);">${perPersonText}</span>
                                ${pkg.originalPrice ? `<span style="font-size:1rem; text-decoration:line-through; color:var(--color-muted-light); margin-left:auto;">₹${Number(pkg.originalPrice).toLocaleString('en-IN')}</span>` : ''}
                            </div>

                            <div style="background:var(--color-sand-light); padding:12px; border-radius:var(--radius-md); font-size:0.82rem; color:var(--color-charcoal); margin-bottom:20px;">
                                <i class="fa fa-bolt" style="color:var(--color-gold);"></i> ${tokenHtml}
                            </div>

                            <button type="button" class="btn btn-gold" style="width:100%; margin-bottom:12px; padding:14px;" onclick="openBookingModal('${pkg.id}')">
                                <i class="fa fa-calendar-check-o"></i> ${bookHolidayText}
                            </button>

                            <button type="button" class="btn btn-outline-navy dt-whatsapp-btn" data-package="${pkg.title}" style="width:100%; margin-bottom:20px; padding:12px;">
                                <i class="fa fa-whatsapp" style="color:#25D366; font-size:1.1rem;"></i> ${whatsappText}
                            </button>

                            <div style="border-top:1px solid var(--color-border-light); padding-top:20px; font-size:0.82rem; color:var(--color-muted);">
                                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                    <i class="fa fa-check-circle" style="color:#16a34a;"></i> ${g1}
                                </div>
                                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                    <i class="fa fa-check-circle" style="color:#16a34a;"></i> ${g2}
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <i class="fa fa-check-circle" style="color:#16a34a;"></i> ${g3}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;

    // Re-attach WhatsApp click
    if (typeof initWhatsAppButton === 'function') {
        initWhatsAppButton();
    }

    if (typeof I18nManager !== 'undefined' && I18nManager.translateKnownPhrases) {
        I18nManager.translateKnownPhrases(lang);
    }
}

/**
 * Render Day-wise Itinerary Accordion HTML
 */
function renderItineraryDaysHTML(itinerary, lang = 'mr') {
    if (!itinerary || !itinerary.length) {
        return '<p style="color:var(--color-muted);">Itinerary being customized. Inquire for day-wise sheet.</p>';
    }

    const dayPrefix = lang === 'mr' ? 'दिवस' : (lang === 'hi' ? 'दिन' : 'Day');
    const stayLabel = lang === 'mr' ? 'निवास:' : (lang === 'hi' ? 'आवास:' : 'Stay:');
    const mealsLabel = lang === 'mr' ? 'भोजन:' : (lang === 'hi' ? 'भोजन:' : 'Meals:');
    const highlightsLabel = lang === 'mr' ? 'वैशिष्ट्ये:' : (lang === 'hi' ? 'आकर्षण:' : 'Highlights:');

    return itinerary.map(item => `
        <div style="border:1px solid var(--color-border); border-radius:var(--radius-md); overflow:hidden;">
            <div style="background:var(--color-sand-light); padding:16px 20px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="background:var(--color-navy); color:#ffffff; font-size:0.8rem; font-weight:700; padding:4px 10px; border-radius:var(--radius-sm);">
                        ${dayPrefix} ${item.day}
                    </span>
                    <h4 style="font-size:1.1rem; margin:0; color:var(--color-navy);">${item.title}</h4>
                </div>
            </div>
            <div style="padding:20px; background:#ffffff; font-size:0.92rem; color:#4b5563; line-height:1.65;">
                <p style="margin-bottom:14px;">${item.description}</p>
                
                <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:0.82rem; padding-top:12px; border-top:1px dashed var(--color-border);">
                    ${item.hotel ? `<div><i class="fa fa-bed" style="color:var(--color-ocean);"></i> <strong>${stayLabel}</strong> ${item.hotel}</div>` : ''}
                    ${item.meals ? `<div><i class="fa fa-cutlery" style="color:var(--color-ocean);"></i> <strong>${mealsLabel}</strong> ${item.meals}</div>` : ''}
                    ${item.activities ? `<div><i class="fa fa-compass" style="color:var(--color-ocean);"></i> <strong>${highlightsLabel}</strong> ${item.activities}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}
