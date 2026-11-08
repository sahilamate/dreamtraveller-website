/**
 * Dream Travelkar - Multi-Language Translation System (i18n)
 * Supports: Marathi (मराठी - मी मावळा), English, and Hindi (हिन्दी)
 * Client-side, zero-framework, persistent with localStorage.
 */

const I18nManager = (function () {
    const STORAGE_KEY = 'dt_language';

    // Comprehensive Dictionary for Interface & Content
    const DICTIONARY = {
        mr: {
            // Header & Navbar
            "nav_home": "मुख्यपृष्ठ",
            "nav_destinations": "पर्यटन स्थळे",
            "nav_packages": "टूर पॅकेजेस",
            "nav_customize": "कस्टमाइझ टूर",
            "nav_about": "आमच्याबद्दल",
            "nav_reviews": "अभिप्राय",
            "nav_contact": "संपर्क",
            "nav_plan_trip": "सहलीचे नियोजन करा",
            "nav_login": "लॉगिन / ग्राहक पोर्टल",
            "nav_portal": "ग्राहक पोर्टल",
            "nav_signed_in": "लॉगिन केले आहे",
            "nav_vip_badge": "व्ही.आय.पी. एक्सप्लोरर",
            "nav_dashboard": "डॅशबोर्ड आढावा",
            "nav_profile": "माझे प्रोफाइल",
            "nav_bookings": "माझी बुकिंग्ज",
            "nav_enquiries": "माझ्या चौकशी",
            "nav_payments": "पेमेंट इतिहास",
            "nav_logout": "लॉगआउट",
            "dropdown_india": "अतुल्य भारत",
            "dropdown_world": "आंतरराष्ट्रीय सहली",
            "dropdown_all_dest": "सर्व १२+ पर्यटन स्थळे पहा →",
            "badge_popular": "लोकप्रिय",
            "badge_bestseller": "बेस्टसेलर",

            // Top Bar
            "topbar_call": "आम्हाला कॉल करा:",
            "topbar_email": "info@dreamtravelkar.com",
            "topbar_address": "वरळी, मुंबई - ४०००१८",
            "topbar_tagline": "•|| गडकोट गडकोट जय शिवराय ||•",
            "topbar_heritage": "मी मावळा हेरिटेज टूर",
            "topbar_admin": "अ‍ॅडमिन CRM",

            // Mobile Drawer
            "drawer_language": "भाषा निवडा",
            "drawer_dashboard": "डॅशबोर्ड",
            "drawer_my_trips": "माझ्या सहली",
            "drawer_plan_trip": "सहलीचे नियोजन करा",
            "drawer_helpline": "+९१ ९८६७८०७८३७ (वरळी, मुंबई)",

            // Hero Section
            "hero_badge": "विश्वसनीय टूर ऑपरेटर्स • वरळी, मुंबई",
            "hero_title": "जगाचा शोध घ्या. आयुष्यभरासाठी आठवणी बनवा.",
            "hero_desc": "अविस्मरणीय पर्यटन स्थळे, विचारपूर्वक डिझाइन केलेल्या सहली आणि आयुष्यभर सोबत राहणारे अनुभव. भारताच्या विश्वासार्ह ट्रॅव्हल तज्ज्ञांकडून.",
            "hero_explore": "पर्यटन स्थळे पहा",
            "hero_customize": "तुमची सहल डिझाइन करा",
            "search_dest_label": "पर्यटन स्थळ",
            "search_dest_placeholder": "तुम्हाला कुठे फिरायला जायचे आहे?",
            "search_date_label": "प्रवासाची तारीख / महिना",
            "search_month_any": "कोणताही महिना",
            "search_travellers_label": "प्रवासी संख्या",
            "search_btn": "पॅकेजेस शोधा",

            // Trust Highlights
            "trust_title_1": "विचारपूर्वक निवडलेल्या सहली",
            "trust_desc_1": "प्रत्येक सहल आणि हॉटेल आमच्या मुंबई टीमने तपासलेले असते.",
            "trust_title_2": "वैयक्तिक सहल नियोजन",
            "trust_desc_2": "तुमच्या आवडीनुसार, बजेटनुसार आणि कुटुंबाच्या सोयीनुसार नियोजन.",
            "trust_title_3": "विश्वासार्ह प्रवास सहाय्य",
            "trust_desc_3": "प्रवासादरम्यान २४x७ थेट टूर एस्कॉर्ट आणि मुंबई सपोर्ट.",
            "trust_title_4": "संस्मरणीय प्रवास अनुभव",
            "trust_desc_4": "कौटुंबिक सहली आणि ऐतिहासिक गडकोट मोहिमांचा आनंद.",

            // Destinations Section
            "dest_domestic_title": "देशांतर्गत पर्यटन स्थळे",
            "dest_domestic_desc": "भारताचा समृद्ध ऐतिहासिक वारसा, शांत बॅकवॉटर्स आणि बर्फाच्छादित शिखरे अनुभवा.",
            "dest_intl_title": "आंतरराष्ट्रीय पर्यटन स्थळे",
            "dest_intl_desc": "दुबई, थायलंड, सिंगापूर आणि स्वित्झर्लंडच्या जागतिक दर्जाच्या सहली.",
            "dest_explore_btn": "सविस्तर माहिती पहा →",
            "dest_start_from": "किंमत सुरू:",
            "dest_view_all": "सर्व पर्यटन स्थळे पहा",

            // Packages Section
            "pkg_sec_title": "लोकप्रिय टूर पॅकेजेस",
            "pkg_sec_desc": "हॉटेल, खाजगी प्रवास आणि प्रेक्षणीय स्थळांचा समावेश असलेल्या संपूर्ण सहली.",
            "pkg_filter_all": "सर्व पॅकेजेस",
            "pkg_filter_domestic": "देशांतर्गत (भारत)",
            "pkg_filter_intl": "आंतरराष्ट्रीय",
            "pkg_view_details": "सविस्तर माहिती",
            "pkg_book_now": "सहल बुक करा",
            "pkg_duration": "कालावधी",
            "pkg_stay": "मुक्काम श्रेणी",
            "pkg_transport": "प्रवास सोय",
            "pkg_itinerary": "दिवसवार तपशीलवार कार्यक्रम",
            "pkg_inclusions": "समाविष्ट गोष्टी",
            "pkg_exclusions": "असमाविष्ट गोष्टी",

            // Custom Tour Banner & Form
            "custom_banner_title": "तुमचा प्रवास. तुमची पसंती.",
            "custom_banner_desc": "कुटुंब किंवा ग्रुपसाठी वैयक्तिक टूर प्लॅन हवा आहे? आम्हाला सांगा, आम्ही २ तासांत विनामूल्य कोटेशन देऊ.",
            "custom_banner_btn": "कस्टमाइज टूर प्लॅन करा",
            "form_name": "पूर्ण नाव *",
            "form_phone": "व्हॉट्सॲप / फोन नंबर *",
            "form_email": "ईमेल पत्ता *",
            "form_city": "राहण्याचे शहर",
            "form_dest": "कोणत्या ठिकाणी जायचे आहे? *",
            "form_date": "संभाव्य प्रवासाची तारीख",
            "form_travellers": "प्रवासी संख्या",
            "form_stay": "हॉटेल श्रेणी",
            "form_budget": "अंदाजे बजेट (प्रति व्यक्ती)",
            "form_submit": "विनामूल्य कोटेशन मिळवा",
            "form_mimavala_check": "मी मावळा हेरिटेज विशेष: छत्रपती शिवाजी महाराज गडकोट / कोकण जलदुर्ग / अष्टविनायक दर्शन",

            // Features / Why Choose Us
            "feat_title": "ड्रीम ट्रॅव्हलकरची वैशिष्ट्ये",
            "feat_desc": "मुंबईकरांचा आणि जगभरातील मराठी कुटुंबांचा विश्वास.",
            "feat_1_title": "पारदर्शकता आणि सचोटी",
            "feat_1_desc": "कोणतेही छुपे खर्च नाहीत. आम्ही जे वचन देतो तेच देतो.",
            "feat_2_title": "उत्कृष्ट निवास सोय",
            "feat_2_desc": "स्वच्छ, सुरक्षित आणि कौटुंबिक वातावरणातील नामांकित हॉटेल्स.",
            "feat_3_title": "ज्येष्ठ नागरिक व कुटुंब काळजी",
            "feat_3_desc": "आरामदायी प्रवास, योग्य विश्रांती आणि आपुलकीची सेवा.",

            // Testimonials
            "review_sec_title": "ग्राहकांचे मनोगत व अभिप्राय",
            "review_sec_desc": "आमच्यासोबत प्रवास केलेल्या समाधानी पर्यटकांचे अनुभव.",
            "review_submit_title": "तुमचा अनुभव शेअर करा",

            // Footer
            "footer_desc": "वरळी, मुंबईस्थित ड्रीम ट्रॅव्हलकर ही देशांतर्गत आणि आंतरराष्ट्रीय कौटुंबिक सहलींसाठीची आघाडीची पर्यटन संस्था आहे.",
            "footer_quick_links": "महत्त्वाचे दुवे",
            "footer_top_dest": "प्रमुख पर्यटन स्थळे",
            "footer_contact_info": "संपर्क माहिती",
            "footer_copyright": "© २०२६ ड्रीम ट्रॅव्हलकर. सर्व हक्क राखीव. बीडीडी चाळ नं. ४६/७, डॉ. जी.एम. भोसले मार्ग, वरळी, मुंबई - ४०००१८.",

            // WhatsApp & Chatbot
            "whatsapp_btn_text": "व्हॉट्सॲपवर संपर्क करा",
            "chatbot_title": "ड्रीम ट्रॅव्हल असिस्टंट",
            "chatbot_placeholder": "सहलीबद्दल काहीही विचारा..."
        },

        hi: {
            // Header & Navbar
            "nav_home": "मुख्य पृष्ठ",
            "nav_destinations": "प्रमुख गंतव्य",
            "nav_packages": "टूर पैकेज",
            "nav_customize": "कस्टमाइज टूर",
            "nav_about": "हमारे बारे में",
            "nav_reviews": "समीक्षाएं",
            "nav_contact": "संपर्क",
            "nav_plan_trip": "अपनी यात्रा प्लान करें",
            "nav_login": "लॉगिन / ग्राहक पोर्टल",
            "nav_portal": "ग्राहक पोर्टल",
            "nav_signed_in": "लॉग इन हैं",
            "nav_vip_badge": "वीआईपी एक्सप्लोरर",
            "nav_dashboard": "डैशबोर्ड अवलोकन",
            "nav_profile": "मेरी प्रोफाइल",
            "nav_bookings": "मेरी बुकिंग्स",
            "nav_enquiries": "मेरी पूछताछ",
            "nav_payments": "भुगतान इतिहास",
            "nav_logout": "लॉग आउट",
            "dropdown_india": "अतुल्य भारत",
            "dropdown_world": "अंतरराष्ट्रीय छुट्टियां",
            "dropdown_all_dest": "सभी १२+ गंतव्य देखें →",
            "badge_popular": "लोकप्रिय",
            "badge_bestseller": "बेस्टसेलर",

            // Top Bar
            "topbar_call": "हमें कॉल करें:",
            "topbar_email": "info@dreamtravelkar.com",
            "topbar_address": "वर्ली, मुंबई - ४०००१८",
            "topbar_tagline": "•|| गडकोट गडकोट जय शिवराय ||•",
            "topbar_heritage": "मी मावळा हेरिटेज टूर",
            "topbar_admin": "एडमिन CRM",

            // Mobile Drawer
            "drawer_language": "भाषा चुनें",
            "drawer_dashboard": "डैशबोर्ड",
            "drawer_my_trips": "मेरी यात्राएं",
            "drawer_plan_trip": "अपनी यात्रा प्लान करें",
            "drawer_helpline": "+९१ ९८६७८०७८३७ (वर्ली, मुंबई)",

            // Hero Section
            "hero_badge": "विश्वसनीय टूर ऑपरेटर्स • वर्ली, मुंबई",
            "hero_title": "दुनिया की खोज करें. जीवनभर के लिए यादें बनाएं.",
            "hero_desc": "अविस्मरणीय गंतव्य, सोच-समझकर डिज़ाइन की गई छुट्टियां और जीवनभर साथ रहने वाले अनुभव. भारत के विश्वसनीय यात्रा विशेषज्ञों द्वारा.",
            "hero_explore": "गंतव्य देखें",
            "hero_customize": "अपनी ट्रिप प्लान करें",
            "search_dest_label": "गंतव्य",
            "search_dest_placeholder": "आप कहां यात्रा करना चाहते हैं?",
            "search_date_label": "यात्रा की तारीख / महीना",
            "search_month_any": "कोई भी महीना",
            "search_travellers_label": "यात्रियों की संख्या",
            "search_btn": "पैकेज खोजें",

            // Trust Highlights
            "trust_title_1": "सोच-समझकर तैयार की गई छुट्टियां",
            "trust_desc_1": "प्रत्येक टूर और होटल हमारी मुंबई टीम द्वारा व्यक्तिगत रूप से जांची गई है.",
            "trust_title_2": "व्यक्तिगत यात्रा योजना",
            "trust_desc_2": "आपकी पसंद, बजट और परिवार की सुविधा के अनुसार सर्वोत्तम योजना.",
            "trust_title_3": "विश्वसनीय यात्रा सहायता",
            "trust_desc_3": "यात्रा के दौरान २४x७ सीधा टूर एस्कॉर्ट और मुंबई सहायता.",
            "trust_title_4": "यादगार यात्रा अनुभव",
            "trust_desc_4": "पारिवारिक छुट्टियों और ऐतिहासिक धरोहरों का अविस्मरणीय आनंद.",

            // Destinations Section
            "dest_domestic_title": "घरेलू गंतव्य",
            "dest_domestic_desc": "भारत की समृद्ध सांस्कृतिक विरासत, शांत बैकवाटर्स और बर्फ से ढकी चोटियों का अनुभव करें.",
            "dest_intl_title": "अंतरराष्ट्रीय गंतव्य",
            "dest_intl_desc": "दुबई, थाईलैंड, सिंगापुर और स्विट्जरलैंड की विश्वस्तरीय छुट्टियां.",
            "dest_explore_btn": "विस्तृत जानकारी देखें →",
            "dest_start_from": "शुरुआती कीमत:",
            "dest_view_all": "सभी गंतव्य देखें",

            // Packages Section
            "pkg_sec_title": "लोकप्रिय टूर पैकेज",
            "pkg_sec_desc": "होटल, निजी वाहन और दर्शनीय स्थलों के साथ संपूर्ण हॉलिडे पैकेज.",
            "pkg_filter_all": "सभी पैकेज",
            "pkg_filter_domestic": "घरेलू (भारत)",
            "pkg_filter_intl": "अंतरराष्ट्रीय",
            "pkg_view_details": "विवरण देखें",
            "pkg_book_now": "ट्रिप बुक करें",
            "pkg_duration": "अवधि",
            "pkg_stay": "होटल श्रेणी",
            "pkg_transport": "परिवहन सुविधा",
            "pkg_itinerary": "दिन-वार विस्तृत कार्यक्रम",
            "pkg_inclusions": "शामिल सुविधाएं",
            "pkg_exclusions": "शामिल नहीं",

            // Custom Tour Banner & Form
            "custom_banner_title": "आपकी यात्रा. आपकी पसंद.",
            "custom_banner_desc": "परिवार या समूह के लिए विशेष टूर प्लान चाहिए? हमें बताएं, हम २ घंटे में निःशुल्क प्रस्ताव देंगे.",
            "custom_banner_btn": "कस्टमाइज टूर प्लान करें",
            "form_name": "पूरा नाम *",
            "form_phone": "व्हाट्सएप / फोन नंबर *",
            "form_email": "ईमेल पता *",
            "form_city": "निवास का शहर",
            "form_dest": "किस स्थान पर जाना चाहते हैं? *",
            "form_date": "संभावित यात्रा तिथि",
            "form_travellers": "यात्रियों की संख्या",
            "form_stay": "होटल श्रेणी",
            "form_budget": "अनुमानित बजट (प्रति व्यक्ति)",
            "form_submit": "मुफ्त कोटेशन प्राप्त करें",
            "form_mimavala_check": "मी मावळा हेरिटेज विशेष: छत्रपति शिवाजी महाराज किले / कोंकण जलदुर्ग / अष्टविनायक दर्शन",

            // Features / Why Choose Us
            "feat_title": "ड्रीम ट्रॅव्हलकर की विशेषताएं",
            "feat_desc": "मुंबई और देश-विदेश के परिवारों का अटूट भरोसा.",
            "feat_1_title": "पारदर्शिता और ईमानदारी",
            "feat_1_desc": "कोई छिपा हुआ शुल्क नहीं. जो वादा किया जाता है वही दिया जाता है.",
            "feat_2_title": "उत्कृष्ट आवास सुविधा",
            "feat_2_desc": "साफ-सुथरे, सुरक्षित और पारिवारिक वातावरण वाले बेहतरीन होटल.",
            "feat_3_title": "वरिष्ठ नागरिक व परिवार की देखभाल",
            "feat_3_desc": "आरामदायक यात्रा, पर्याप्त विश्राम और सम्मानजनक सेवा.",

            // Testimonials
            "review_sec_title": "ग्राहकों के अनुभव और समीक्षाएं",
            "review_sec_desc": "हमारे साथ यात्रा करने वाले संतुष्ट पर्यटकों की सच्ची राय.",
            "review_submit_title": "अपना अनुभव साझा करें",

            // Footer
            "footer_desc": "वर्ली, मुंबई स्थित ड्रीम ट्रॅव्हलकर घरेलू और अंतरराष्ट्रीय पारिवारिक छुट्टियों के लिए एक अग्रणी टूर ऑपरेटर है.",
            "footer_quick_links": "त्वरित लिंक",
            "footer_top_dest": "प्रमुख गंतव्य",
            "footer_contact_info": "संपर्क विवरण",
            "footer_copyright": "© २०२६ ड्रीम ट्रॅव्हलकर. सर्वाधिकार सुरक्षित. बीडीडी चॉल नं. ४६/७, डॉ. जी.एम. भोसले मार्ग, वर्ली, मुंबई - ४०००१८.",

            // WhatsApp & Chatbot
            "whatsapp_btn_text": "व्हाट्सएप पर संपर्क करें",
            "chatbot_title": "ड्रीम ट्रैवल असिस्टेंट",
            "chatbot_placeholder": "यात्रा के बारे में कुछ भी पूछें..."
        },

        en: {
            // Header & Navbar
            "nav_home": "Home",
            "nav_destinations": "Destinations",
            "nav_packages": "Tour Packages",
            "nav_customize": "Customize Tour",
            "nav_about": "About Us",
            "nav_reviews": "Reviews",
            "nav_contact": "Contact",
            "nav_plan_trip": "Plan Your Trip",
            "nav_login": "Login / Portal",
            "nav_portal": "Customer Portal",
            "nav_signed_in": "Signed in as",
            "nav_vip_badge": "VIP Explorer",
            "nav_dashboard": "Dashboard Overview",
            "nav_profile": "My Profile",
            "nav_bookings": "My Bookings",
            "nav_enquiries": "My Enquiries",
            "nav_payments": "Payment History",
            "nav_logout": "Logout",
            "dropdown_india": "Incredible India",
            "dropdown_world": "World Holidays",
            "dropdown_all_dest": "Explore All 12+ Destinations →",
            "badge_popular": "Popular",
            "badge_bestseller": "Bestseller",

            // Top Bar
            "topbar_call": "Call Us:",
            "topbar_email": "info@dreamtravelkar.com",
            "topbar_address": "Worli, Mumbai - 400018",
            "topbar_tagline": "•|| गडकोट गडकोट जय शिवराय ||•",
            "topbar_heritage": "मी मावळा हेरिटेज टूर",
            "topbar_admin": "Admin CRM",

            // Mobile Drawer
            "drawer_language": "Language",
            "drawer_dashboard": "Dashboard",
            "drawer_my_trips": "My Trips",
            "drawer_plan_trip": "Plan Your Trip",
            "drawer_helpline": "+91 9867807837 (Worli, Mumbai)",

            // Hero Section
            "hero_badge": "Established Tour Operators • Worli, Mumbai",
            "hero_title": "Discover the World. Create Memories That Last Forever.",
            "hero_desc": "Explore unforgettable destinations, thoughtfully designed holidays and experiences that stay with you for a lifetime. Curated by India's trusted travel specialists.",
            "hero_explore": "Explore Destinations",
            "hero_customize": "Customize Your Trip",
            "search_dest_label": "Destination",
            "search_dest_placeholder": "Where do you want to travel?",
            "search_date_label": "Travel Date / Month",
            "search_month_any": "Any Month",
            "search_travellers_label": "Travellers",
            "search_btn": "Search Packages",

            // Trust Highlights
            "trust_title_1": "Carefully Curated Holidays",
            "trust_desc_1": "Every itinerary and property personally vetted by our Mumbai team.",
            "trust_title_2": "Personalized Travel Planning",
            "trust_desc_2": "Flexible paces, handpicked meals, and custom departure dates.",
            "trust_title_3": "Trusted Travel Assistance",
            "trust_desc_3": "24/7 on-tour ground escort support and verified logistics.",
            "trust_title_4": "Memorable Travel Experiences",
            "trust_desc_4": "Heritage trails, cultural circuits, and relaxing family vacations.",

            // Destinations Section
            "dest_domestic_title": "Domestic Destinations",
            "dest_domestic_desc": "Experience the timeless cultural grandeur, tranquil backwaters, and pristine snow peaks of India.",
            "dest_intl_title": "International Destinations",
            "dest_intl_desc": "Discover world-class global cities, tropical islands, and alpine beauty with Dream Travelkar.",
            "dest_explore_btn": "Explore Destination →",
            "dest_start_from": "Starting from:",
            "dest_view_all": "View All Destinations",

            // Packages Section
            "pkg_sec_title": "Popular Tour Packages",
            "pkg_sec_desc": "Carefully crafted itineraries with verified stays, private cabs, and day-wise excursions.",
            "pkg_filter_all": "All Packages",
            "pkg_filter_domestic": "Domestic (India)",
            "pkg_filter_intl": "International",
            "pkg_view_details": "View Details",
            "pkg_book_now": "Book Trip",
            "pkg_duration": "Duration",
            "pkg_stay": "Stay Category",
            "pkg_transport": "Transfers & Sightseeing",
            "pkg_itinerary": "Day-wise Detailed Itinerary",
            "pkg_inclusions": "Inclusions",
            "pkg_exclusions": "Exclusions",

            // Custom Tour Banner & Form
            "custom_banner_title": "Your Journey. Your Way.",
            "custom_banner_desc": "Need a tailor-made holiday for your family or group? Tell us your preferences and get a customized quote within 2 hours.",
            "custom_banner_btn": "Customize Your Trip",
            "form_name": "Full Name *",
            "form_phone": "Contact Number (WhatsApp) *",
            "form_email": "Email Address *",
            "form_city": "City of Residence",
            "form_dest": "Target Destination(s) *",
            "form_date": "Approximate Travel Date",
            "form_travellers": "Travellers",
            "form_stay": "Stay Category",
            "form_budget": "Target Budget (Per Person)",
            "form_submit": "Submit Custom Enquiry",
            "form_mimavala_check": "मी मावळा Heritage Special: Chhatrapati Shivaji Maharaj Forts / Konkan Sea-Forts / Ashtavinayak Pilgrimage",

            // Features / Why Choose Us
            "feat_title": "Why Choose Dream Travelkar",
            "feat_desc": "Trusted by thousands of families and discerning travelers across Mumbai and India.",
            "feat_1_title": "Trust & Transparency",
            "feat_1_desc": "Clear pricing with no surprise taxes or forced tipping.",
            "feat_2_title": "Curated Stays",
            "feat_2_desc": "Hygiene-inspected premium hotels, deluxe houseboats, and resorts.",
            "feat_3_title": "Family & Elder Care",
            "feat_3_desc": "Gentle pacing, elder-friendly halts, and respectful escort assistance.",

            // Testimonials
            "review_sec_title": "Traveler Stories & Verified Reviews",
            "review_sec_desc": "Read authentic experiences from families and travelers who toured with us.",
            "review_submit_title": "Share Your Journey Experience",

            // Footer
            "footer_desc": "Worli, Mumbai based premier travel company offering customized domestic and international holidays, heritage circuits, and family tours.",
            "footer_quick_links": "Quick Links",
            "footer_top_dest": "Top Destinations",
            "footer_contact_info": "Contact Details",
            "footer_copyright": "© 2026 Dream Travelkar. BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli, Mumbai - 400018.",

            // WhatsApp & Chatbot
            "whatsapp_btn_text": "WhatsApp Us",
            "chatbot_title": "Dream Travel Assistant",
            "chatbot_placeholder": "Ask about destinations, packages, or pricing..."
        }
    };

    // Destination names and taglines translation
    const DESTINATIONS_I18N = {
        "dest-rajasthan": {
            mr: { name: "राजस्थान", tagline: "महाराजांचा भूमी, शाही किल्ले आणि सोनेरी वाळवंट" },
            hi: { name: "राजस्थान", tagline: "महाराजाओं की भूमि, भव्य किले और सुनहरी रेत" },
            en: { name: "Rajasthan", tagline: "The Land of Maharajas, Forts & Golden Sands" }
        },
        "dest-kerala": {
            mr: { name: "केरळ", tagline: "देवभूमी, बॅकवॉटर्स आणि मसाल्यांच्या टेकड्या" },
            hi: { name: "केरल", tagline: "ईश्वर का अपना घर, बैकवाटर्स और मुन्नार" },
            en: { name: "Kerala", tagline: "God's Own Country, Backwaters & Spice Hills" }
        },
        "dest-himachal": {
            mr: { name: "हिमाचल प्रदेश", tagline: "बर्फाच्छादित शिखरे, कुलू मनाली आणि देवदार खोरी" },
            hi: { name: "हिमाचल प्रदेश", tagline: "बर्फ से ढकी चोटियां और खूबसूरत वादियां" },
            en: { name: "Himachal Pradesh", tagline: "Land of Snow Clad Peaks & Pine Valleys" }
        },
        "dest-andaman": {
            mr: { name: "अंदमान व निकोबार", tagline: "नीळेशार समुद्रकिनारे, प्रवाळ आणि हॅवलॉक बेट" },
            hi: { name: "अंडमान और निकोबार", tagline: "नीले समंदर, कोरल रीफ और हैवलॉक द्वीप" },
            en: { name: "Andaman & Nicobar", tagline: "Turquoise Waters, Coral Reefs & White Sands" }
        },
        "dest-konkan": {
            mr: { name: "ड्रीम कोकण (मी मावळा)", tagline: "सिंधुदुर्ग जलदुर्ग, मालवणी आतिथ्य आणि नितांत सुंदर किनारे" },
            hi: { name: "ड्रीम कोंकण (मी मावळा)", tagline: "सिंधुदुर्ग जलदुर्ग और खूबसूरत तटीय नज़ारे" },
            en: { name: "Dream Konkan", tagline: "Historic Sea-Forts, Malvan Cuisine & Unspoiled Beaches" }
        },
        "dest-kashmir": {
            mr: { name: "काश्मीर खोरे", tagline: "पृथ्वीवरील स्वर्ग, दल लेक, गुलमर्ग आणि पहलगाम" },
            hi: { name: "कश्मीर घाटी", tagline: "धरती का स्वर्ग, डल झील, गुलमर्ग और सोनमर्ग" },
            en: { name: "Kashmir Valley", tagline: "Paradise on Earth, Dal Lake & Snow-capped Pir Panjal" }
        },
        "dest-thailand": {
            mr: { name: "थायलंड", tagline: "बँकॉॉकची मंदिरे, पट्टाया समुद्रकिनारे आणि कोरल बेट" },
            hi: { name: "थाईलैंड", tagline: "बैंकॉक के मंदिर, पटाया बीच और कोरल द्वीप" },
            en: { name: "Thailand", tagline: "Vibrant Bangkok, Pattaya Beaches & Coral Islands" }
        },
        "dest-dubai": {
            mr: { name: "दुबई व अबुधाबी", tagline: "बुर्ज खलिफा, वाळवंट सफारी आणि आधुनिक चमत्कार" },
            hi: { name: "दुबई और अबू धाबी", tagline: "बुर्ज खलीफा, डेजर्ट सफारी और आधुनिक शहर" },
            en: { name: "Dubai & Abu Dhabi", tagline: "Futuristic Skylines, Luxury Shopping & Desert Safaris" }
        },
        "dest-bali": {
            mr: { name: "बाली (इंडोनेशिया)", tagline: "उबुदची संस्कृती, निसर्गरम्य धबधबे आणि नुसा पेनिडा" },
            hi: { name: "बाली (इंडोनेशिया)", tagline: "उबुद की संस्कृति और खूबसूरत समुद्री दृश्य" },
            en: { name: "Bali Tropical Paradise", tagline: "Lush Rice Terraces, Ancient Temples & Azure Oceans" }
        },
        "dest-switzerland": {
            mr: { name: "स्वित्झर्लंड", tagline: "आल्प्स पर्वत, युंगफ्राऊ आणि नितांत सुंदर सरोवरे" },
            hi: { name: "स्विट्जरलैंड", tagline: "आल्प्स पर्वत श्रृंखला, जंगफ्राउ और खूबसूरत झीलें" },
            en: { name: "Switzerland", tagline: "Alpine Splendour, Scenic Rail Journeys & Glacial Valleys" }
        },
        "dest-singapore": {
            mr: { name: "सिंगापूर व सेंटोसा", tagline: "मरिना बे सँड्स, युनिव्हर्सल स्टुडिओ आणि गार्डन्स" },
            hi: { name: "सिंगापुर और सेंटोसा", tagline: "मरीना बे सैंड्स और यूनिवर्सल स्टूडियो" },
            en: { name: "Singapore & Sentosa", tagline: "Futuristic Gardens, Sentosa Island & Night Safari" }
        },
        "dest-vietnam": {
            mr: { name: "व्हिएतनाम", tagline: "हा लाँग बे क्रूझ, दा नांग आणि गोल्डन ब्रिज" },
            hi: { name: "वियतनाम", tagline: "हा लोंग बे क्रूज, दा नांग और गोल्डन ब्रिज" },
            en: { name: "Vietnam", tagline: "Ha Long Bay Cruises, Ba Na Hills & Heritage Towns" }
        }
    };

    // Direct String Mapping Dictionary for Fast Phrase Translation
    const PHRASE_MAP = [
        // Brand & Hero
        { en: "Discover the World. Create Memories That Last Forever.", mr: "जगाचा शोध घ्या. आयुष्यभरासाठी आठवणी बनवा.", hi: "दुनिया की खोज करें. जीवनभर के लिए यादें बनाएं." },
        { en: "Explore unforgettable destinations, thoughtfully designed holidays and experiences that stay with you for a lifetime. Curated by India's trusted travel specialists.", mr: "अविस्मरणीय पर्यटन स्थळे, विचारपूर्वक डिझाइन केलेल्या सहली आणि आयुष्यभर सोबत राहणारे अनुभव. भारताच्या विश्वासार्ह ट्रॅव्हल तज्ज्ञांकडून.", hi: "अविस्मरणीय गंतव्य, सोच-समझकर डिज़ाइन की गई छुट्टियां और जीवनभर साथ रहने वाले अनुभव. भारत के विश्वसनीय यात्रा विशेषज्ञों द्वारा." },
        { en: "Established Tour Operators • Worli, Mumbai", mr: "विश्वासार्ह टूर ऑपरेटर्स • वरळी, मुंबई", hi: "विश्वसनीय टूर ऑपरेटर्स • वर्ली, मुंबई" },
        { en: "Explore Destinations", mr: "पर्यटन स्थळे पहा", hi: "गंतव्य देखें" },
        { en: "Customize Your Trip", mr: "तुमची सहल डिझाइन करा", hi: "अपनी ट्रिप प्लान करें" },
        { en: "Plan Your Trip", mr: "सहलीचे नियोजन करा", hi: "अपनी यात्रा प्लान करें" },
        { en: "Search Packages", mr: "पॅकेजेस शोधा", hi: "पैकेज खोजें" },
        { en: "Where do you want to travel?", mr: "तुम्हाला कुठे फिरायला जायचे आहे?", hi: "आप कहां यात्रा करना चाहते हैं?" },
        { en: "Any Month", mr: "कोणताही महिना", hi: "कोई भी महीना" },
        { en: "Travellers", mr: "प्रवासी संख्या", hi: "यात्रियों की संख्या" },
        { en: "Destination", mr: "पर्यटन स्थळ", hi: "गंतव्य स्थान" },
        { en: "Travel Date / Month", mr: "प्रवासाची तारीख / महिना", hi: "यात्रा की तारीख / महीना" },

        // Trust
        { en: "Carefully Curated Holidays", mr: "विचारपूर्वक निवडलेल्या सहली", hi: "सोच-समझकर तैयार की गई छुट्टियां" },
        { en: "Personalized Travel Planning", mr: "वैयक्तिक सहल नियोजन", hi: "व्यक्तिगत यात्रा योजना" },
        { en: "Trusted Travel Assistance", mr: "विश्वासार्ह प्रवास सहाय्य", hi: "विश्वसनीय यात्रा सहायता" },
        { en: "Memorable Travel Experiences", mr: "संस्मरणीय प्रवास अनुभव", hi: "यादगार यात्रा अनुभव" },

        // Sections
        { en: "Domestic Destinations", mr: "देशांतर्गत पर्यटन स्थळे", hi: "घरेलू गंतव्य" },
        { en: "International Destinations", mr: "आंतरराष्ट्रीय पर्यटन स्थळे", hi: "अंतरराष्ट्रीय गंतव्य" },
        { en: "Popular Tour Packages", mr: "लोकप्रिय टूर पॅकेजेस", hi: "लोकप्रिय टूर पैकेज" },
        { en: "Your Journey. Your Way.", mr: "तुमचा प्रवास. तुमची पसंती.", hi: "आपकी यात्रा. आपकी पसंद." },
        { en: "Why Choose Dream Travelkar", mr: "ड्रीम ट्रॅव्हलकरची निवड का करावी?", hi: "ड्रीम ट्रॅव्हलकर को क्यों चुनें?" },
        { en: "Traveler Stories & Verified Reviews", mr: "ग्राहकांचे मनोगत व अभिप्राय", hi: "ग्राहकों के अनुभव और समीक्षाएं" },
        { en: "View All Destinations", mr: "सर्व पर्यटन स्थळे पहा", hi: "सभी गंतव्य देखें" },
        { en: "View Details", mr: "सविस्तर माहिती", hi: "विवरण देखें" },
        { en: "Book Trip", mr: "सहल बुक करा", hi: "ट्रिप बुक करें" },
        { en: "Book Your Trip", mr: "सहल बुक करा", hi: "ट्रिप बुक करें" },
        { en: "Starting from", mr: "किंमत सुरू:", hi: "शुरुआती कीमत:" },
        { en: "Starting Price", mr: "किंमत सुरू", hi: "शुरुआती कीमत" },
        { en: "Explore Destination", mr: "सविस्तर पहा", hi: "विस्तार से देखें" },

        // Common Nav & Buttons
        { en: "Home", mr: "मुख्यपृष्ठ", hi: "मुख्य पृष्ठ" },
        { en: "Destinations", mr: "पर्यटन स्थळे", hi: "प्रमुख गंतव्य" },
        { en: "Tour Packages", mr: "टूर पॅकेजेस", hi: "टूर पैकेज" },
        { en: "Customize Tour", mr: "कस्टमाइझ टूर", hi: "कस्टमाइज टूर" },
        { en: "About Us", mr: "आमच्याबद्दल", hi: "हमारे बारे में" },
        { en: "About", mr: "आमच्याबद्दल", hi: "हमारे बारे में" },
        { en: "Reviews", mr: "अभिप्राय", hi: "समीक्षाएं" },
        { en: "Contact", mr: "संपर्क", hi: "संपर्क करें" },
        { en: "Dashboard Overview", mr: "डॅशबोर्ड आढावा", hi: "डैशबोर्ड अवलोकन" },
        { en: "My Profile", mr: "माझे प्रोफाइल", hi: "मेरी प्रोफाइल" },
        { en: "My Bookings", mr: "माझी बुकिंग्ज", hi: "मेरी बुकिंग्स" },
        { en: "My Enquiries", mr: "माझ्या चौकशी", hi: "मेरी पूछताछ" },
        { en: "Payment History", mr: "पेमेंट इतिहास", hi: "भुगतान इतिहास" },
        { en: "Logout", mr: "लॉगआउट", hi: "लॉग आउट" },
        { en: "Incredible India", mr: "अतुल्य भारत", hi: "अतुल्य भारत" },
        { en: "World Holidays", mr: "आंतरराष्ट्रीय सहली", hi: "अंतरराष्ट्रीय छुट्टियां" },
        { en: "Explore All 12+ Destinations →", mr: "सर्व १२+ पर्यटन स्थळे पहा →", hi: "सभी १२+ गंतव्य देखें →" },
        { en: "Popular", mr: "लोकप्रिय", hi: "लोकप्रिय" },
        { en: "Bestseller", mr: "बेस्टसेलर", hi: "बेस्टसेलर" },
        { en: "Admin CRM", mr: "अ‍ॅडमिन CRM", hi: "एडमिन CRM" },
        { en: "Admin", mr: "अ‍ॅडमिन", hi: "एडमिन" },
        { en: "Admin Portal", mr: "अ‍ॅडमिन पोर्टल", hi: "एडमिन पोर्टल" },
        { en: "WhatsApp Us", mr: "व्हॉट्सॲप करा", hi: "व्हाट्सएप करें" },

        // Page Headings
        { en: "About Dream Travelkar", mr: "ड्रीम ट्रॅव्हलकरबद्दल", hi: "ड्रीम ट्रॅव्हलकर के बारे में" },
        { en: "Contact Dream Travelkar", mr: "ड्रीम ट्रॅव्हलकरशी संपर्क साधा", hi: "ड्रीम ट्रॅव्हलकर से संपर्क करें" },
        { en: "Frequently Asked Questions", mr: "सतत विचारले जाणारे प्रश्न (FAQ)", hi: "अक्सर पूछे जाने वाले प्रश्न" },
        { en: "Tailor-Made Tour Consultation", mr: "सानुकूल सहल सल्लागार सेवा", hi: "कस्टमाइज टूर परामर्श सेवा" },
        { en: "Tell Us About Your Travel Plans", mr: "तुमच्या प्रवासाच्या नियोजनाबद्दल सांगा", hi: "अपनी यात्रा योजनाओं के बारे में बताएं" },
        { en: "Customer Portal", mr: "ग्राहक पोर्टल", hi: "ग्राहक पोर्टल" },
        { en: "Create Customer Account", mr: "ग्राहक खाते तयार करा", hi: "ग्राहक खाता बनाएं" },
        { en: "Access Your Bookings, Enquiries & Invoices", mr: "तुमची बुकिंग्ज, चौकशी आणि पावत्या पहा", hi: "अपनी बुकिंग, पूछताछ और बिल देखें" },
        { en: "Curated Tour Packages", mr: "निवडक टूर पॅकेजेस", hi: "चुनिंदा टूर पैकेज" },

        // Forms & Inputs
        { en: "Full Name *", mr: "पूर्ण नाव *", hi: "पूरा नाम *" },
        { en: "Full Name", mr: "पूर्ण नाव", hi: "पूरा नाम" },
        { en: "Email Address *", mr: "ईमेल पत्ता *", hi: "ईमेल पता *" },
        { en: "Email Address", mr: "ईमेल पत्ता", hi: "ईमेल पता" },
        { en: "Contact Number (WhatsApp) *", mr: "संपर्क क्रमांक (व्हॉट्सॲप) *", hi: "संपर्क नंबर (व्हाट्सएप) *" },
        { en: "Phone Number (WhatsApp) *", mr: "फोन नंबर (व्हॉट्सॲप) *", hi: "फोन नंबर (व्हाट्सएप) *" },
        { en: "Your City of Residence", mr: "तुमचे राहण्याचे शहर", hi: "आपका निवास शहर" },
        { en: "Target Destination(s) *", mr: "लक्ष्य पर्यटन स्थळ *", hi: "लक्षित गंतव्य स्थान *" },
        { en: "Target Destination(s)", mr: "लक्ष्य पर्यटन स्थळ", hi: "लक्षित गंतव्य स्थान" },
        { en: "Approximate Travel Date", mr: "अंदाजे प्रवासाची तारीख", hi: "अनुमानित यात्रा की तारीख" },
        { en: "Stay Category", mr: "निवास श्रेणी", hi: "आवास श्रेणी" },
        { en: "Target Budget (Per Person)", mr: "अपेक्षित बजेट (प्रति व्यक्ती)", hi: "लक्षित बजट (प्रति व्यक्ति)" },
        { en: "Meal & Sightseeing Preferences", mr: "भोजन व प्रेक्षणीय स्थळे पसंती", hi: "भोजन और दर्शनीय स्थल प्राथमिकताएं" },
        { en: "Additional Requests / Itinerary Notes", mr: "अतिरिक्त मागण्या / विशेष नोंदी", hi: "अतिरिक्त अनुरोध / विशेष नोट्स" },
        { en: "Submit Itinerary Request to Travelkar Team", mr: "ट्रॅव्हलकर टीमला सहल मागणी पाठवा", hi: "ट्रॅव्हलकर टीम को यात्रा अनुरोध भेजें" },
        { en: "Quick Login as Priya Sharma (Demo)", mr: "प्रिया शर्मा म्हणून लॉगिन करा (डेमो)", hi: "प्रिया शर्मा के रूप में लॉगिन करें (डेमो)" },
        { en: "Travel Date *", mr: "प्रवासाची तारीख *", hi: "यात्रा की तारीख *" },
        { en: "Number of Travellers", mr: "प्रवासी संख्या", hi: "यात्रियों की संख्या" },
        { en: "Payment Choice", mr: "पेमेंट पर्याय", hi: "भुगतान विकल्प" },
        { en: "Special Requests / Preferences", mr: "विशेष मागण्या / पसंती", hi: "विशेष अनुरोध / प्राथमिकताएं" },
        { en: "Confirm Simulated Booking", mr: "बुकिंग पुष्टी करा (डेमो)", hi: "बुकिंग की पुष्टि करें (डेमो)" },
        { en: "name@email.com", mr: "name@email.com", hi: "name@email.com" },
        { en: "Cancel", mr: "रद्द करा", hi: "रद्द करें" },

        // Banner Testimonial Feature
        { en: "Verified Traveler Story", mr: "पडताळणी केलेले प्रवाशांचे मनोगत", hi: "सत्यापित यात्री अनुभव" },
        { en: "Nepal Himalayan Circuit • Mumbai", mr: "नेपाळ हिमालय सर्किट • मुंबई", hi: "नेपाल हिमालय सर्किट • मुंबई" },
        { en: "Sacred Chardham Yatra • Pune", mr: "पवित्र चारधाम यात्रा • पुणे", hi: "पवित्र चारधाम यात्रा • पुणे" },
        { en: "Kerala Backwaters & Munnar • Thane", mr: "केरळ बॅकवॉटर्स व मुन्नार • ठाणे", hi: "केरल बैकवाटर्स और मुन्नार • ठाणे" },

        // Package Details & Highlights
        { en: "Trip Highlights & Accommodation", mr: "सहलीची वैशिष्ट्ये आणि निवास", hi: "यात्रा की मुख्य विशेषताएं और आवास" },
        { en: "Transfers & Sightseeing", mr: "वाहतूक व प्रेक्षणीय स्थळे", hi: "परिवहन और दर्शनीय स्थल" },
        { en: "Day-wise Detailed Itinerary", mr: "दिवसनिहाय सविस्तर सहल नियोजन", hi: "दिन-वार विस्तृत यात्रा कार्यक्रम" },
        { en: "Inclusions", mr: "समाविष्ट बाबी (Inclusions)", hi: "शामिल सुविधाएं (Inclusions)" },
        { en: "Exclusions", mr: "असमाविष्ट बाबी (Exclusions)", hi: "शामिल नहीं (Exclusions)" },
        { en: "Cancellation & Rescheduling Policy", mr: "रद्द करणे आणि पुनर्निर्धारण धोरण", hi: "रद्दीकरण और पुनर्निर्धारण नीति" },
        { en: "Special Promotional Rate", mr: "विशेष सवलत दर", hi: "विशेष प्रचार दर" },
        { en: "Book This Holiday Now", mr: "ही सहल आत्ताच बुक करा", hi: "यह छुट्टी अभी बुक करें" },
        { en: "Ask Query on WhatsApp", mr: "व्हॉट्सॲपवर माहिती विचारा", hi: "व्हाट्सएप पर जानकारी पूछें" },
        { en: "100% Verified Accommodations", mr: "१००% पडताळणी केलेले निवासस्थान", hi: "100% सत्यापित आवास" },
        { en: "Dedicated 24/7 Dream Travelkar Tour Escort", mr: "२४/७ समर्पित ड्रीम ट्रॅव्हलकर टूर एस्कॉर्ट", hi: "24/7 समर्पित ड्रीम ट्रॅव्हलकर टूर एस्कॉर्ट" },
        { en: "Transparent Pricing - No Hidden Charges", mr: "पारदर्शक दर - कोणतेही छुपे शुल्क नाही", hi: "पारदर्शी मूल्य निर्धारण - कोई छुपा शुल्क नहीं" },
        { en: "Daily Breakfast & Dinners Included", mr: "सकाळचा नाश्ता व रात्रीचे जेवण समाविष्ट", hi: "दैनिक नाश्ता और रात का भोजन शामिल" },
        { en: "Details", mr: "सविस्तर माहिती", hi: "विवरण" },
        { en: "Book Now", mr: "आता बुक करा", hi: "अभी बुक करें" },
        { en: "/ person", mr: "/ व्यक्ती", hi: "/ व्यक्ति" },

        // Filters
        { en: "Filter Packages", mr: "पॅकेजेस फिल्टर करा", hi: "पैकेज फ़िल्टर करें" },
        { en: "Search Packages...", mr: "पॅकेज शोधा...", hi: "पैकेज खोजें..." },
        { en: "All Durations", mr: "सर्व कालावधी", hi: "सभी अवधियां" },
        { en: "Short (1-5 Days)", mr: "अल्प मुदत (१-५ दिवस)", hi: "अल्पकालिक (1-5 दिन)" },
        { en: "Medium (6-8 Days)", mr: "मध्यम (६-८ दिवस)", hi: "मध्यम (6-8 दिन)" },
        { en: "Long (9+ Days)", mr: "दीर्घ (९+ दिवस)", hi: "दीर्घ (9+ दिन)" },
        { en: "All Types", mr: "सर्व प्रकार", hi: "सभी प्रकार" },
        { en: "Domestic (India)", mr: "देशांतर्गत (भारत)", hi: "घरेलू (भारत)" },
        { en: "Any Budget", mr: "कोणतेही बजेट", hi: "कोई भी बजट" },
        { en: "Apply Filters", mr: "फिल्टर लागू करा", hi: "फ़िल्टर लागू करें" },
        { en: "Reset Filters", mr: "फिल्टर रीसेट करा", hi: "फ़िल्टर रीसेट करें" },

        // About & Contact Sections
        { en: "The Principles Guiding Every Itinerary", mr: "आमच्या प्रत्येक सहलीची मार्गदर्शक तत्त्वे", hi: "हमारी प्रत्येक यात्रा के मार्गदर्शक सिद्धांत" },
        { en: "Trust & Transparency", mr: "विश्वास आणि पारदर्शकता", hi: "विश्वास और पारदर्शिता" },
        { en: "Curated Stays", mr: "उत्कृष्ट दर्जाचा मुक्काम", hi: "उत्कृष्ट आवास" },
        { en: "Family & Elder Care", mr: "कुटुंब आणि ज्येष्ठांची विशेष काळजी", hi: "परिवार और वरिष्ठ नागरिकों की विशेष देखभाल" },
        { en: "Visit Our Worli Mumbai Office", mr: "आमच्या वरळी मुंबई कार्यालयाला भेट द्या", hi: "हमारे वर्ली मुंबई कार्यालय में आएं" },
        { en: "Need Immediate Advice?", mr: "तातडीने सल्ला हवा आहे का?", hi: "तुरंत सलाह चाहिए?" },
        { en: "Our Headquarters", mr: "आमचे मुख्य कार्यालय", hi: "हमारा मुख्यालय" },
        { en: "Instant WhatsApp Assistance", mr: "तातडीने व्हॉट्सॲप सहाय्य", hi: "तुरंत व्हाट्सएप सहायता" },
        { en: "Send Us an Inquiry", mr: "आम्हाला विचारणा पाठवा", hi: "हमें अपनी पूछताछ भेजें" },
        { en: "Still have questions?", mr: "अजूनही काही प्रश्न आहेत का?", hi: "क्या अभी भी कोई प्रश्न हैं?" },
        { en: "Contact Our Worli Office", mr: "आमच्या वरळी ऑफिसशी संपर्क साधा", hi: "हमारे वर्ली कार्यालय से संपर्क करें" },

        // FAQ Questions
        { en: "How do I book a tour package with Dream Travelkar?", mr: "ड्रीम ट्रॅव्हलकरसोबत टूर पॅकेज कसे बुक करावे?", hi: "ड्रीम ट्रॅव्हलकर के साथ टूर पैकेज कैसे बुक करें?" },
        { en: "What is your cancellation and refund policy?", mr: "तुमचे सहल रद्द करणे आणि परतावा (रिफंड) धोरण काय आहे?", hi: "आपकी रद्दीकरण और रिफंड नीति क्या है?" },
        { en: "Are Indian and vegetarian food options guaranteed on international tours?", mr: "आंतरराष्ट्रीय सहलींवर भारतीय आणि शाकाहारी भोजनाची खात्री आहे का?", hi: "क्या अंतरराष्ट्रीय दौरों पर भारतीय और शाकाहारी भोजन की गारंटी है?" },
        { en: "What is the special \"मी मावळा\" heritage circuit?", mr: "विशेष \"मी मावळा\" हेरिटेज सर्किट नेमके काय आहे?", hi: "विशेष \"मी मावळा\" हेरिटेज सर्किट क्या है?" },
        { en: "Do you provide customized pickup for families from Mumbai & Pune?", mr: "आपण मुंबई आणि पुण्यातील कुटुंबांसाठी सानुकूल पिकअप देता का?", hi: "क्या आप मुंबई और पुणे से परिवारों के लिए पिकअप सुविधा प्रदान करते हैं?" },
        { en: "How do I access my booking voucher or invoice?", mr: "मी माझे बुकिंग व्हाउचर किंवा पावती कशी पाहू शकेन?", hi: "मैं अपना बुकिंग वाउचर या रसीद कैसे देख सकता हूँ?" }
,
        { en: "Handcrafted itineraries verified by seasoned travel specialists.", mr: "अनुभवी प्रवास तज्ज्ञांनी पडताळणी केलेले विचारपूर्वक सहल नियोजन.", hi: "अनुभवी यात्रा विशेषज्ञों द्वारा सत्यापित सोच-समझकर तैयार यात्रा योजनाएं।" },
        { en: "Flexible schedules, private vehicles, and custom dining choices.", mr: "लवचिक वेळापत्रक, खाजगी वाहने आणि आवडीच्या भोजनाची सोय.", hi: "लचीला कार्यक्रम, निजी वाहन और अपनी पसंद के भोजन की सुविधा।" },
        { en: "24/7 dedicated support from booking to your safe return home.", mr: "बुकिंगपासून ते सुखरूप घरी परतेपर्यंत २४/७ थेट सहाय्य.", hi: "बुकिंग से लेकर घर वापसी तक 24/7 समर्पित सहायता।" },
        { en: "Authentic local flavor, historic heritage, and joyful memories.", mr: "स्थानिक खाद्यसंस्कृती, ऐतिहासिक गडकोट वारसा आणि आनंददायी आठवणी.", hi: "स्थानीय स्वाद, ऐतिहासिक धरोहर और सुखद यादें।" },
        { en: "Explore Domestic Destinations", mr: "देशांतर्गत पर्यटन स्थळे एक्सप्लोर करा", hi: "घरेलू पर्यटन स्थलों का अन्वेषण करें" },
        { en: "From the regal palaces of Rajasthan and misty tea estates of Munnar to the pristine coral beaches of Andaman and sacred sea-forts of Konkan.", mr: "राजस्थानच्या भव्य महालांपासून आणि मुन्नारच्या चहाच्या मळ्यांपासून ते अंदमानच्या निळेशार समुद्रापर्यंत आणि कोकणातील ऐतिहासिक जलदुर्गांपर्यंत.", hi: "राजस्थान के शाही महलों और मुन्नार के चाय बागानों से लेकर अंडमान के खूबसूरत समुद्र तटों और कोंकण के ऐतिहासिक समुद्री किलों तक।" },
        { en: "Heritage Royal", mr: "शाही वारसा", hi: "शाही विरासत" },
        { en: "Land of Maharajas, living golden fortresses, camel dunes, and romantic lakes.", mr: "महाराजांची भूमी, जिवंत सोनेरी किल्ले, वाळवंट आणि मनमोहक सरोवरे.", hi: "महाराजाओं की भूमि, भव्य सुनहरे किले, रेगिस्तान और खूबसूरत झीलें।" },
        { en: "Nature & Hills", mr: "निसर्ग व पर्वत", hi: "प्रकृति और वादियां" },
        { en: "Misty Munnar hills, fragrant spices, tranquil Alleppey houseboats, and Kovalam shores.", mr: "धुके भरलेल्या मुन्नारच्या टेकड्या, मसाल्यांची शेती, शांत अलेप्पी हाऊसबोट आणि कोवलम किनारे.", hi: "मुन्नार की खूबसूरत पहाड़ियां, मसालों के बागान, शांत अलेप्पी हाउसबोट और कोवलम तट।" },
        { en: "Snow Peaks", mr: "बर्फाच्छादित शिखरे", hi: "बर्फ से ढकी चोटियां" },
        { en: "Shimla Mall Road walks, Solang snow sports, Atal Tunnel drives, and Beas river valleys.", mr: "शिमला मॉल रोड, सोलांग व्हॅली स्नो स्पोर्ट्स, अटल टनेल आणि बियास नदीचे खोरे.", hi: "शिमला मॉल रोड, सोलांग स्नो स्पोर्ट्स, अटल टनल और ब्यास नदी की वादियां।" },
        { en: "मी मावळा वारसा", mr: "मी मावळा वारसा", hi: "मी मावळा विरासत" },
        { en: "Sindhudurg sea fort heritage, clear water scuba in Tarkarli, and Ganpatipule beach temple.", mr: "सिंधुदुर्ग जलदुर्ग वारसा, तारकर्लीतील स्वच्छ पाण्याचे स्कुबा डायव्हिंग आणि गणपतीपुळे समुद्रकिनारा.", hi: "सिंधुदुर्ग समुद्री किला, तारकरली में स्कूबा डाइविंग और गणपतिपुले समुद्र तट मंदिर।" },
        { en: "Starting From", mr: "किंमत सुरू", hi: "शुरुआती कीमत" },
        { en: "Explore", mr: "सविस्तर पहा", hi: "विस्तार से देखें" },
        { en: "View All Domestic Destinations", mr: "सर्व देशांतर्गत पर्यटन स्थळे पहा", hi: "सभी घरेलू पर्यटन स्थल देखें" },
        { en: "World Discovery", mr: "जागतिक पर्यटन", hi: "विश्व भ्रमण" },
        { en: "Immerse in futuristic skylines, tropical island retreats, and historic European landscapes with guaranteed Indian meals and expert local guides.", mr: "आधुनिक शहरे, उष्णकटिबंधीय बेटे आणि युरोपियन सौंदर्य अनुभवा; खात्रीशीर भारतीय भोजन आणि तज्ज्ञ मार्गदर्शकांसह.", hi: "आधुनिक शहर, खूबसूरत द्वीप और ऐतिहासिक यूरोपीय नजारों का अनुभव करें; भारतीय भोजन और स्थानीय गाइड के साथ।" },
        { en: "Bangkok grand temples, Coral Island speedboats, Alcazar shows, and shopping paradises.", mr: "बँकॉकची भव्य मंदिरे, कोरल आयलँड स्पीडबोट, अल्काझार शो आणि खरेदीची नंदनवने.", hi: "बैंकॉक के भव्य मंदिर, कोरल द्वीप स्पीडबोट, अलकाजार शो और शॉपिंग बाजार।" },
        { en: "Futuristic Luxury", mr: "अत्याधुनिक लक्झरी", hi: "अल्ट्रा लग्जरी" },
        { en: "Burj Khalifa 124th floor vistas, 4x4 desert dune safari, Marina Dhow cruises, and shopping malls.", mr: "बुर्ज खलिफा १२४ व्या मजल्यावरील दृश्य, ४x४ वाळवंट सफारी, मरिना क्रूझ आणि भव्य मॉल्स.", hi: "बुर्ज खलीफा 124वीं मंजिल का नजारा, 4x4 डेजर्ट सफारी, मरीना क्रूज और विश्व प्रसिद्ध मॉल।" },
        { en: "Tropical Haven", mr: "निसर्गरम्य बेट", hi: "उष्णकटिबंधीय स्वर्ग" },
        { en: "Bali, Indonesia", mr: "बाली (इंडोनेशिया)", hi: "बाली (इंडोनेशिया)" },
        { en: "Private pool villas, iconic Ubud jungle swings, sacred cliff temples, and Nusa Penida islands.", mr: "खाजगी पूल व्हिला, प्रसिद्ध उबुद जंगल स्विंग्स, प्राचीन मंदिरे आणि नुसा पेनिडा बेटे.", hi: "प्राइवेट पूल विला, प्रसिद्ध उबुद स्विंग, प्राचीन मंदिर और नुसा पेनिडा द्वीप।" },
        { en: "Alpine Masterpiece", mr: "आल्प्सचे सौंदर्य", hi: "अल्पाइन सौंदर्य" },
        { en: "Jungfraujoch Top of Europe, Mt. Titlis revolving Rotair, Lake Lucerne cruises, and Swiss trains.", mr: "युंगफ्राऊ टॉप ऑफ युरोप, माउंट टिटलिस रोटायर, ल्युसर्न लेक क्रूझ आणि स्विस रेल्वे प्रवास.", hi: "जंगफ्राउ टॉप ऑफ यूरोप, माउंट टिटलिस रोटेयर, ल्यूसर्न झील क्रूज और स्विस ट्रेन यात्रा।" },
        { en: "Browse All International Tours", mr: "सर्व आंतरराष्ट्रीय सहली पहा", hi: "सभी अंतरराष्ट्रीय यात्राएं देखें" },
        { en: "Signature Holidays", mr: "विशेष सहली", hi: "सिग्नेचर हॉलिडेज" },
        { en: "Carefully planned packages with verified hotels, seasoned tour escorts, and 100% transparent pricing.", mr: "पडताळणी केलेली हॉटेल्स, अनुभवी टूर एस्कॉर्ट्स आणि १००% पारदर्शक दरांसह विचारपूर्वक नियोजित पॅकेजेस.", hi: "सत्यापित होटल, अनुभवी टूर एस्कॉर्ट और 100% पारदर्शी कीमतों के साथ精心 नियोजित पैकेज।" },
        { en: "Royal Rajasthan Marwad & Mewar Grand Circuit", mr: "रॉयल राजस्थान मारवाड व मेवाड ग्रँड सर्किट", hi: "रॉयल राजस्थान मारवाड़ और मेवाड़ ग्रैंड सर्किट" },
        { en: "Jaipur, Jodhpur, Jaisalmer & Udaipur. Amber fort jeep ride, Sam dunes camel safari, and Lake Pichola cruise.", mr: "जयपूर, जोधपूर, जैसलमेर आणि उदयपूर. आमेर फोर्ट जीप राईड, सॅम वाळवंट उंट सफारी आणि पिछोला लेक क्रूझ.", hi: "जयपुर, जोधपुर, जैसलमेर और उदयपुर। आमेर किला जीप सफारी, रेगिस्तान ऊंट सफारी और पिछोला झील बोटिंग।" },
        { en: "4-Star Heritage Haveli & Desert Camp", mr: "४-स्टार हेरिटेज हवेली व वाळवंट कॅम्प", hi: "4-स्टार हेरिटेज हवेली और रेगिस्तानी कैंप" },
        { en: "Daily Breakfast & Authentic Marwari Dinners", mr: "दररोज नाश्ता आणि अस्सल मारवाडी जेवण", hi: "दैनिक नाश्ता और प्रामाणिक मारवाड़ी भोजन" },
        { en: "AC Vehicle & Tour Manager Assistance", mr: "वातानुकूलित वाहन आणि टूर व्यवस्थापक सहाय्य", hi: "वातानुकूलित वाहन और टूर मैनेजर सहायता" },
        { en: "Kerala Backwaters, Munnar Hills & Kovalam", mr: "केरळ बॅकवॉटर्स, मुन्नार हिल्स आणि कोवलम", hi: "केरल बैकवाटर्स, मुन्नार हिल्स और कोवलम" },
        { en: "Tea gardens in Munnar, Periyar wildlife boat safari, overnight private Alleppey houseboat cruise, and Kovalam beach.", mr: "मुन्नारमधील चहाचे मळे, पेरियार वन्यजीव सफारी, अलेप्पी खाजगी हाऊसबोट क्रूझ आणि कोवलम बीच.", hi: "मुन्नार के चाय बागान, पेरियार वन्यजीव सफारी, अलेप्पी प्राइवेट हाउसबोट और कोवलम समुद्र तट।" },
        { en: "4-Star Hill Resorts & Private AC Houseboat", mr: "४-स्टार हिल रिसॉर्ट्स व खाजगी एसी हाऊसबोट", hi: "4-स्टार हिल रिसॉर्ट और प्राइवेट एसी हाउसबोट" },
        { en: "All Meals on Houseboat + Daily Breakfasts", mr: "हाऊसबोटवरील सर्व भोजन + दररोज नाश्ता", hi: "हाउसबोट पर सभी भोजन + दैनिक नाश्ता" },
        { en: "Dedicated AC Chauffeur throughout", mr: "संपूर्ण प्रवासात समर्पित एसी वाहन चालक", hi: "पूरी यात्रा में समर्पित एसी वाहन चालक" },
        { en: "Himachal Snow & Valley Panorama (Shimla & Manali)", mr: "हिमाचल स्नो आणि व्हॅली पॅनोरमा (शिमला व मनाली)", hi: "हिमाचल स्नो और वैली पैनोरमा (शिमला और मनाली)" },
        { en: "Solang Valley snow point, Atal Tunnel drive, Shimla Ridge, Kullu Beas river, and Hadimba forest temple.", mr: "सोलंग व्हॅली स्नो पॉईंट, अटल टनेल, शिमला रिज, कुल्लू बियास नदी आणि हिडिंबा मंदिर.", hi: "सोलांग वैली स्नो पॉइंट, अटल टनल, शिमला रिज, कुल्लू ब्यास नदी और हिडिम्बा देवी मंदिर।" },
        { en: "3 & 4-Star Premium Mountain View Hotels", mr: "३ आणि ४-स्टार प्रीमियम माउंटन व्ह्यू हॉटेल्स", hi: "3 और 4-स्टार प्रीमियम माउंटेन व्यू होटल" },
        { en: "Daily Breakfast & Multi-Cuisine Dinners", mr: "दररोज नाश्ता आणि बहु-व्यंजन जेवण", hi: "दैनिक नाश्ता और स्वादिष्ट बहु-व्यंजन भोजन" },
        { en: "AC Deluxe Coach / Private Hill Vehicle", mr: "वातानुकूलित डिलक्स कोच / खाजगी वाहन", hi: "वातानुकूलित डीलक्स कोच / निजी वाहन" },
        { en: "Magical Bangkok & Pattaya Island Carnival", mr: "जादुई बँकॉक आणि पट्टाया आयलँड कार्निव्हल", hi: "जादुई बैंकॉक और पटाया आइलैंड कार्निवल" },
        { en: "Coral Island speedboat ride with Indian lunch, Alcazar VIP cabaret show, Golden Buddha temple, and Chao Phraya cruise.", mr: "कोरल आयलँड स्पीडबोट व भारतीय लंच, अल्काझार व्हीआयपी शो, गोल्डन बुद्ध मंदिर आणि चाओ फ्राया क्रूझ.", hi: "कोरल द्वीप स्पीडबोट और भारतीय दोपहर का भोजन, अलकाजार शो, गोल्डन बुद्धा मंदिर और चाओ फ्राया क्रूज।" },
        { en: "4-Star Centrally Located City Hotels", mr: "शहराच्या मध्यवर्ती भागातील ४-स्टार हॉटेल्स", hi: "शहर के केंद्र में स्थित 4-स्टार होटल" },
        { en: "Daily Indian Breakfast & Indian Dinners", mr: "दररोज भारतीय नाश्ता आणि भारतीय रात्रीचे जेवण", hi: "दैनिक भारतीय नाश्ता और भारतीय रात का भोजन" },
        { en: "Private AC Coach & English Speaking Guide", mr: "खाजगी एसी कोच आणि इंग्रजी भाषिक मार्गदर्शक", hi: "निजी एसी कोच और अंग्रेजी भाषी टूर गाइड" },
        { en: "Exotic Andaman Coral Island & Havelock Escape", mr: "अंदमान प्रवाळ बेटे व हॅवलॉक सफारी", hi: "अंडमान कोरल द्वीप और हैवलॉक एस्केप" },
        { en: "Cellular Jail history, high-speed Makruzz catamaran cruise, Radhanagar sunset beach, and Elephant beach snorkeling.", mr: "सेल्युलर जेलचा इतिहास, हाय-स्पीड मकरुझ क्रूझ, राधानगर सूर्यास्त बीच आणि एलिफंट बीच स्नॉर्कलिंग.", hi: "सेल्युलर जेल इतिहास, हाई-स्पीड मकरूज क्रूज, राधानगर बीच और एलीफेंट बीच स्नॉर्कलिंग।" },
        { en: "4-Star Beach Resorts & Port Blair Stays", mr: "४-स्टार बीच रिसॉर्ट्स व पोर्ट ब्लेअर मुक्काम", hi: "4-स्टार बीच रिसॉर्ट्स और पोर्ट ब्लेयर प्रवास" },
        { en: "Gourmet Seafood & Vegetarian Meals", mr: "स्वादिष्ट सीफूड आणि शाकाहारी भोजन", hi: "स्वादिष्ट समुद्री भोजन और शाकाहारी व्यंजन" },
        { en: "Luxury Catamaran Ferry Tickets Included", mr: "लक्झरी कॅटामारन फेरी तिकिटे समाविष्ट", hi: "लग्जरी कैटामारन फेरी टिकट शामिल" },
        { en: "मी मावळा विशेष", mr: "मी मावळा विशेष", hi: "मी मावळा विशेष" },
        { en: "Dream Konkan Coastal Heritage & Fort Trail", mr: "ड्रीम कोकण सागरी वारसा आणि किल्ले मोहीम", hi: "ड्रीम कोंकण तटीय धरोहर और किला ट्रेल" },
        { en: "Sindhudurg sea fortress exploration, Malvan clear water scuba diving, Ganpatipule beach temple, and authentic Malvani feasts.", mr: "सिंधुदुर्ग जलदुर्ग दर्शन, मालवण स्कुबा डायव्हिंग, गणपतीपुळे मंदिर आणि अस्सल मालवणी मेजवानी.", hi: "सिंधुदुर्ग समुद्री किला भ्रमण, मालवन स्कूबा डाइविंग, गणपतिपुले मंदिर और प्रामाणिक मालवणी भोजन।" },
        { en: "Premium Beachfront Konkani Eco-Resorts", mr: "समुद्रकिनाऱ्यावरील प्रीमियम कोकणी इको-रिसॉर्ट्स", hi: "समुद्र तट के प्रीमियम कोंकणी इको-रिसॉर्ट्स" },
        { en: "Fresh Surmai/Pomfret & Vegetarian Thalis", mr: "ताजी सुरमई/पापलेट आणि शाकाहारी थाळी", hi: "ताजा सुरमई/पॉम्फ्रेट और शाकाहारी थाली" },
        { en: "Scuba Diving & Fort Boat Safari Included", mr: "स्कुबा डायव्हिंग आणि किल्ला बोट सफारी समाविष्ट", hi: "स्कूबा डाइविंग और किला बोट सफारी शामिल" },
        { en: "Explore All 12+ Tour Packages", mr: "सर्व १२+ टूर पॅकेजेस पहा", hi: "सभी 12+ टूर पैकेज देखें" },
        { en: "Bespoke Travel Planning", mr: "सानुकूल सहल नियोजन", hi: "कस्टमाइज यात्रा योजना" },
        { en: "Overwhelm yourself with the virgin beauty of shimmering lakes, gurgling rivers, proud mountains, beautiful heritage cities and warm loving people.", mr: "चमकणारी सरोवरे, खळखळणाऱ्या नद्या, उत्तुंग पर्वत, ऐतिहासिक शहरे आणि प्रेमळ माणसांच्या सहवासात निसर्गाचा आनंद घ्या.", hi: "चमकती झीलों, कलकल बहती नदियों, भव्य पर्वतों, सुंदर ऐतिहासिक शहरों और स्नेही लोगों के साथ प्रकृति का आनंद लें।" },
        { en: "Just by customizing your journey with us, you unlock tailored hotel categories, private chauffeurs, flexible meal plans, and personalized pacing for senior citizens or families with infants.", mr: "आमच्याकडे सहल कस्टमाइज केल्याने तुम्हाला पसंतीनुसार हॉटेल्स, खाजगी वाहनचालक, आवडीचे जेवण आणि ज्येष्ठ नागरिक वा लहान मुलांसाठी सोयीस्कर वेळापत्रक मिळते.", hi: "हमारे साथ यात्रा कस्टमाइज करके आप अपनी पसंद के होटल, निजी ड्राइवर, लचीली भोजन योजना और वरिष्ठ नागरिकों या बच्चों के लिए आरामदायक समय तय कर सकते हैं।" },
        { en: "Happy Travellers Guided", mr: "समाधानी प्रवाशांना मार्गदर्शन", hi: "संतुष्ट यात्रियों को मार्गदर्शन" },
        { en: "Hospitality Experience", mr: "पर्यटन क्षेत्रातील अनुभव", hi: "आतिथ्य क्षेत्र का अनुभव" },
        { en: "Design Your Dream Trip", mr: "तुमच्या स्वप्नातील सहल डिझाइन करा", hi: "अपनी सपनों की यात्रा डिजाइन करें" },
        { en: "Destination of Interest *", mr: "आवडीचे पर्यटन स्थळ *", hi: "पसंदीदा गंतव्य स्थान *" },
        { en: "Estimated Budget", mr: "अंदाजे बजेट", hi: "अनुमानित बजट" },
        { en: "Preferences / Special Notes", mr: "विशेष पसंती / नोंदी", hi: "विशेष प्राथमिकताएं / नोट्स" },
        { en: "Submit Customized Enquiry", mr: "सानुकूल चौकशी पाठवा", hi: "कस्टमाइज पूछताछ भेजें" },
        { en: "Standard (₹20k - ₹35k)", mr: "स्टँडर्ड (₹२० हजार - ₹३५ हजार)", hi: "स्टैंडर्ड (₹20 हजार - ₹35 हजार)" },
        { en: "Deluxe (₹35k - ₹60k)", mr: "डिलक्स (₹३५ हजार - ₹६० हजार)", hi: "डीलक्स (₹35 हजार - ₹60 हजार)" },
        { en: "Luxury (₹60k - ₹1.2L)", mr: "लक्झरी (₹६० हजार - ₹१.२ लाख)", hi: "लग्जरी (₹60 हजार - ₹1.2 लाख)" },
        { en: "Ultra Luxury (₹1.2L+)", mr: "अल्ट्रा लक्झरी (₹१.२ लाख+)", hi: "अल्ट्रा लग्जरी (₹1.2 लाख+)" },
        { en: "2 Persons (Couple)", mr: "२ व्यक्ती (जोडपे)", hi: "2 व्यक्ति (जोड़ा)" },
        { en: "4 Persons (Family)", mr: "४ व्यक्ती (कुटुंब)", hi: "4 व्यक्ति (परिवार)" },
        { en: "6+ Persons (Group)", mr: "६+ व्यक्ती (ग्रुप)", hi: "6+ व्यक्ति (समूह)" },
        { en: "1 Solo", mr: "१ व्यक्ती (सोलो)", hi: "1 व्यक्ति (अकेले)" },
        { en: "The Travelkar Difference", mr: "ड्रीम ट्रॅव्हलकरची वैशिष्ट्ये", hi: "ड्रीम ट्रॅव्हलकर की विशेषताएं" },
        { en: "\"Beautiful dream begins with dreamers and the journey to make that beautiful dream come true begins. Our dream is to make everyone possible to explore the beauty of world by making tourism affordable.\"", mr: "\"सुंदर स्वप्ने पाहणाऱ्यांसोबतच एका सुंदर प्रवासाची सुरुवात होते. पर्यटन परवडणारे आणि सुरक्षित बनवून प्रत्येकाला जगाचे सौंदर्य अनुभवता यावे, हेच आमचे स्वप्न आहे.\"", hi: "\"सुंदर सपने देखने वालों के साथ ही एक खूबसूरत यात्रा शुरू होती है। पर्यटन को किफायती और सुलभ बनाकर हर किसी को दुनिया की सुंदरता दिखाना ही हमारा सपना है।\"" },
        { en: "Personalized Itineraries", mr: "वैयक्तिक सहल नियोजन", hi: "व्यक्तिगत यात्रा योजनाएं" },
        { en: "Every itinerary is handcrafted according to your family's pace, preferences, and holiday goals. No rigid, rushed sightseeing tours.", mr: "प्रत्येक सहल तुमच्या कुटुंबाच्या सोयीनुसार, आवडीनुसार आणि सुट्टीच्या उद्दिष्टानुसार तयार केली जाते. कोणतीही घाईगडबड नसते.", hi: "प्रत्येक यात्रा कार्यक्रम आपके परिवार की गति, पसंद और प्राथमिकताओं के अनुसार तैयार किया जाता है। कोई जल्दबाजी नहीं होती।" },
        { en: "Transparent Pricing", mr: "पारदर्शक दर", hi: "पारदर्शी मूल्य निर्धारण" },
        { en: "No hidden extras or surprise surcharges. We clearly articulate inclusions, monument charges, taxes, and optional activities beforehand.", mr: "कोणतेही छुपे शुल्क किंवा अचानक येणारे जादा दर नाहीत. आम्ही समाविष्ट बाबी, कर आणि प्रवेश शुल्क आधीच स्पष्ट सांगतो.", hi: "कोई छिपा हुआ शुल्क या अतिरिक्त अधिभार नहीं। हम सभी सुविधाएं, स्मारक शुल्क और कर पहले से स्पष्ट करते हैं।" },
        { en: "Quality Accommodations", mr: "उत्कृष्ट दर्जाचे निवासस्थान", hi: "गुणवत्तापूर्ण आवास" },
        { en: "We only book verified 3-star, 4-star, and luxury heritage hotels personally inspected by our team for cleanliness, comfort, and service.", mr: "आम्ही केवळ स्वच्छ, आरामदायी आणि उत्तम सेवा देणारी ३-स्टार, ४-स्टार व हेरिटेज हॉटेल्सच निवडतो, ज्यांची आम्ही स्वतः पाहणी केलेली असते.", hi: "हम केवल स्वच्छता, आराम और सेवा के लिए हमारी टीम द्वारा व्यक्तिगत रूप से जांची गई 3-स्टार, 4-स्टार और हेरिटेज होटलों को ही बुक करते हैं।" },
        { en: "Experienced Planning", mr: "अनुभवी नियोजन", hi: "अनुभवी योजना" },
        { en: "Our Worli, Mumbai tour leaders bring decades of ground coordination knowledge across Indian heritage circuits and international ports.", mr: "आमचे वरळी, मुंबई येथील टूर लीडर्स भारतीय ऐतिहासिक सहली आणि आंतरराष्ट्रीय सहलींचे अनेक दशकांचे सखोल ज्ञान बाळगतात.", hi: "हमारे वर्ली, मुंबई के टूर लीडर्स भारतीय ऐतिहासिक स्थलों और अंतरराष्ट्रीय दौरों के दशकों का जमीनी अनुभव रखते हैं।" },
        { en: "Pure Indian Food Abroad", mr: "परदेशात शुद्ध भारतीय भोजन", hi: "विदेश में शुद्ध भारतीय भोजन" },
        { en: "Travelling to Thailand, Dubai, or Europe? We arrange authentic Indian dining, vegetarian, and Jain culinary options so you always feel at home.", mr: "थायलंड, दुबई किंवा युरोपला जात आहात? आम्ही अस्सल भारतीय, शाकाहारी आणि जैन जेवणाची सोय करतो, जेणेकरून तुम्हाला घरासारखे वाटेल.", hi: "थाईलैंड, दुबई या यूरोप की यात्रा? हम प्रामाणिक भारतीय भोजन, शाकाहारी और जैन व्यंजनों की व्यवस्था करते हैं ताकि आप घर जैसा महसूस करें।" },
        { en: "24/7 Ground Assistance", mr: "२४/७ थेट सहाय्य", hi: "24/7 जमीनी सहायता" },
        { en: "From prompt airport pickups to responsive WhatsApp assistance throughout your trip, you are never left unattended on your journey.", mr: "विमानतळावरून वेळेवर पिकअप करण्यापासून ते संपूर्ण प्रवासात व्हॉट्सॲप सहाय्यापर्यंत, आम्ही प्रत्येक क्षणी आपल्यासोबत असतो.", hi: "हवाई अड्डे से समय पर पिकअप से लेकर पूरी यात्रा के दौरान त्वरित व्हाट्सएप सहायता तक, आप कभी अकेले नहीं होते।" },
        { en: "Real Traveler Stories", mr: "प्रवाशांचे खरे अनुभव", hi: "यात्रियों के वास्तविक अनुभव" },
        { en: "Customer Testimonials", mr: "ग्राहकांचे मनोगत", hi: "ग्राहकों की समीक्षाएं" },
        { en: "Read genuine feedback from families, couples, and group travelers who trusted Dream Travelkar for their cherished holidays.", mr: "आपल्या सहलींसाठी ड्रीम ट्रॅव्हलकरवर विश्वास ठेवणाऱ्या कुटुंबे, जोडपे आणि ग्रुप्सचे खरे अभिप्राय वाचा.", hi: "अपनी छुट्टियों के लिए ड्रीम ट्रॅव्हलकर पर भरोसा करने वाले परिवारों, जोड़ों और समूहों की वास्तविक समीक्षाएं पढ़ें।" },
        { en: "\"Just finished Mumbai darshan and coastal trip with Dream Travelkar and it was the best experience I had traveling throughout Mumbai. The guides were extremely knowledgeable, punctual, and cordial. I will definitely be looking forward to booking other domestic and international tours with Dream Travelkar!\"", mr: "\"ड्रीम ट्रॅव्हलकरसोबत नुकतीच मुंबई दर्शन आणि किनारपट्टीची सहल पूर्ण केली आणि मुंबई भ्रमणाचा हा माझा आजवरचा सर्वोत्तम अनुभव ठरला. गाईड्स अत्यंत हुशार, वक्तशीर आणि मनमिळावू होते. मी नक्कीच इतर सहलींसाठी ड्रीम ट्रॅव्हलकरचीच निवड करेन!\"", hi: "\"ड्रीम ट्रॅव्हलकर के साथ अभी मुंबई दर्शन और तटीय यात्रा पूरी की और यह मेरा सबसे अच्छा अनुभव रहा। गाइड बहुत जानकार, समयनिष्ठ और विनम्र थे। मैं निश्चित रूप से अन्य यात्राओं के लिए भी ड्रीम ट्रॅव्हलकर को ही चुनूँगा!\"" },
        { en: "Mumbai Darshan Trip", mr: "मुंबई दर्शन सहल", hi: "मुंबई दर्शन यात्रा" },
        { en: "\"All the executives right from booking the tour and giving detailed information from the Worli office took great care of us. The food preparation was up to the standards and getting authentic Indian food in Bangkok and Pattaya was a matter of great comfort to tourists like us. We congratulate the Dream Travelkar team and wish them the very best!\"", mr: "\"वरळी कार्यालयातून सहल बुक करण्यापासून आणि सविस्तर माहिती देण्यापर्यंत सर्व अधिकाऱ्यांनी आमची खूप छान काळजी घेतली. बँकॉक आणि पट्टायामध्ये अस्सल भारतीय जेवण मिळणे आमच्यासारख्या पर्यटकांसाठी खूप सोयीचे ठरले. ड्रीम ट्रॅव्हलकर टीमचे अभिनंदन आणि शुभेच्छा!\"", hi: "\"वर्ली कार्यालय से टूर बुक करने और विस्तृत जानकारी देने तक सभी कर्मचारियों ने हमारी बहुत अच्छी देखभाल की। बैंकॉक और पटाया में प्रामाणिक भारतीय भोजन मिलना हमारे लिए बहुत आरामदायक रहा। पूरी टीम को बधाई और शुभकामनाएं!\"" },
        { en: "Bangkok & Pattaya Tour", mr: "बँकॉक व पट्टाया टूर", hi: "बैंकॉक और पटाया टूर" },
        { en: "\"It was a wonderful trip to Munnar. Best place we have ever visited—it truly felt like heaven! Special thanks to Dream Travelkar and their services. Hotels, rooms, and food were excellent, the houseboat was immaculate, and the morning breakfast buffet was delicious.\"", mr: "\"मुन्नारची सहल खूपच अप्रतिम झाली. आम्ही भेट दिलेले सर्वोत्तम ठिकाण—अगदी स्वर्गासारखे वाटले! ड्रीम ट्रॅव्हलकर आणि त्यांच्या उत्कृष्ट सेवेचे मनःपूर्वक आभार. हॉटेल्स, खोल्या आणि जेवण उत्तम होते, हाऊसबोट अत्यंत स्वच्छ होती आणि सकाळचा नाश्ता स्वादिष्ट होता.\"", hi: "\"मुन्नार की यात्रा बहुत ही शानदार रही। हमने जो सबसे बेहतरीन जगह देखी—सचमुच स्वर्ग जैसा लगा! ड्रीम ट्रॅव्हलकर और उनकी सेवाओं का विशेष धन्यवाद। होटल, कमरे और भोजन बेहतरीन थे, हाउसबोट बहुत साफ थी और नाश्ता स्वादिष्ट था।\"" },
        { en: "Kerala Tour", mr: "केरळ सहल", hi: "केरल टूर" },
        { en: "Read All Customer Reviews", mr: "सर्व ग्राहकांचे अभिप्राय वाचा", hi: "सभी ग्राहकों की समीक्षाएं पढ़ें" },
        { en: "Reach Our Travel Specialists", mr: "आमच्या प्रवास तज्ज्ञांशी संपर्क साधा", hi: "हमारे यात्रा विशेषज्ञों से संपर्क करें" },
        { en: "Get In Touch", mr: "संपर्क करा", hi: "संपर्क में रहें" },
        { en: "Have questions about dates, pricing, or customized group departures? Visit our Worli office or drop an inquiry.", mr: "तारखा, दर किंवा ग्रुप सहलींबद्दल प्रश्न आहेत? आमच्या वरळी कार्यालयाला भेट द्या किंवा विचारणा पाठवा.", hi: "तारीखों, कीमतों या समूह यात्राओं के बारे में प्रश्न हैं? हमारे वर्ली कार्यालय आएं या अपनी पूछताछ भेजें।" },
        { en: "Our Head Office", mr: "आमचे मुख्य कार्यालय", hi: "हमारा मुख्य कार्यालय" },
        { en: "Office Address", mr: "कार्यालयाचा पत्ता", hi: "कार्यालय का पता" },
        { en: "Worli, Mumbai - 400018, Maharashtra, India", mr: "वरळी, मुंबई - ४०००१८, महाराष्ट्र, भारत", hi: "वर्ली, मुंबई - 400018, महाराष्ट्र, भारत" },
        { en: "Direct Phone Lines", mr: "थेट संपर्क फोन", hi: "सीधे फोन नंबर" },
        { en: "Email Addresses", mr: "ईमेल पत्ते", hi: "ईमेल पते" },
        { en: "Office Hours", mr: "कार्यालयीन वेळ", hi: "कार्यालय का समय" },
        { en: "Monday – Saturday: 9:30 AM – 7:30 PM", mr: "सोमवार – शनिवार: सकाळी ९:३० – संध्याकाळी ७:३०", hi: "सोमवार – शनिवार: सुबह 9:30 – शाम 7:30" },
        { en: "Sunday: By Prior Appointment", mr: "रविवार: पूर्व नियोजित भेटीनुसार", hi: "रविवार: पूर्व नियुक्ति द्वारा" },
        { en: "Talk To Us", mr: "आमच्याशी बोला", hi: "हमसे बात करें" },
        { en: "Your Name *", mr: "आपले नाव *", hi: "आपका नाम *" },
        { en: "Travel Destination", mr: "प्रवासाचे ठिकाण", hi: "यात्रा का गंतव्य" },
        { en: "Your Message or Query", mr: "आपला संदेश किंवा विचारणा", hi: "आपका संदेश या प्रश्न" },
        { en: "Send Message", mr: "संदेश पाठवा", hi: "संदेश भेजें" },
        { en: "Our dream is to make everyone possible to explore the beauty of the world by making tourism affordable, safe, and memorable. From Maharashtra & Konkan heritage tours to bespoke international escapes.", mr: "पर्यटन परवडणारे, सुरक्षित आणि संस्मरणीय बनवून प्रत्येकाला जगाचे सौंदर्य अनुभवता यावे हेच आमचे स्वप्न आहे. महाराष्ट्र व कोकण हेरिटेज सहलींपासून ते परदेशातील मनमोहक सहलींपर्यंत.", hi: "पर्यटन को किफायती, सुरक्षित और यादगार बनाकर हर किसी को दुनिया की सुंदरता का अनुभव कराना ही हमारा सपना है। महाराष्ट्र और कोंकण हेरिटेज यात्राओं से लेकर अंतरराष्ट्रीय छुट्टियों तक।" },
        { en: "Quick Links", mr: "महत्त्वाचे दुवे", hi: "त्वरित लिंक" },
        { en: "All Destinations", mr: "सर्व पर्यटन स्थळे", hi: "सभी गंतव्य" },
        { en: "Customized Tours", mr: "सानुकूल सहली", hi: "कस्टमाइज टूर" },
        { en: "Customer Reviews", mr: "ग्राहकांचे अभिप्राय", hi: "ग्राहक समीक्षाएं" },
        { en: "FAQ & Policies", mr: "नेहमीचे प्रश्न व नियम", hi: "अक्सर पूछे जाने वाले प्रश्न और नीतियां" },
        { en: "Popular Tours", mr: "लोकप्रिय सहली", hi: "लोकप्रिय यात्राएं" },
        { en: "Rajasthan Marwad", mr: "राजस्थान मारवाड", hi: "राजस्थान मारवाड़" },
        { en: "Kerala Backwaters", mr: "केरळ बॅकवॉटर्स", hi: "केरल बैकवाटर्स" },
        { en: "Himachal Snow Valley", mr: "हिमाचल स्नो व्हॅली", hi: "हिमाचल स्नो वैली" },
        { en: "Dream Konkan Forts", mr: "ड्रीम कोकण किल्ले", hi: "ड्रीम कोंकण किले" },
        { en: "Bangkok & Pattaya", mr: "बँकॉक आणि पट्टाया", hi: "बैंकॉक और पटाया" },
        { en: "Dubai Desert Safari", mr: "दुबई डेझर्ट सफारी", hi: "दुबई डेजर्ट सफारी" },
        { en: "Head Office", mr: "मुख्य कार्यालय", hi: "मुख्य कार्यालय" },
        { en: "Subscribe to Newsletter", mr: "न्यूजलेटर सदस्यता घ्या", hi: "न्यूजलेटर की सदस्यता लें" },
        { en: "© 2026 Dream Travelkar. All Rights Reserved. Crafted with care in Mumbai.", mr: "© २०२६ ड्रीम ट्रॅव्हलकर. सर्व हक्क राखीव. मुंबईत प्रेमाने साकारलेले.", hi: "© 2026 ड्रीम ट्रॅव्हलकर. सर्वाधिकार सुरक्षित। मुंबई में निर्मित।" },
        { en: "Terms & Conditions", mr: "नियम आणि अटी", hi: "नियम और शर्तें" },
        { en: "Privacy Policy", mr: "गोपनीयता धोरण", hi: "गोपनीयता नीति" },

        { en: "Premium Holidays & Tours", mr: "प्रीमियम सहली व टूर्स", hi: "प्रीमियम छुट्टियां और टूर्स" },
        { en: "Rajasthan Forts & Deserts", mr: "राजस्थान किल्ले व वाळवंट", hi: "राजस्थान किले और रेगिस्तान" },
        { en: "Himachal Pradesh (Manali/Shimla)", mr: "हिमाचल प्रदेश (मनाली/शिमला)", hi: "हिमाचल प्रदेश (मनाली/शिमला)" },
        { en: "Andaman Coral Islands", mr: "अंदमान प्रवाळ बेटे", hi: "अंडमान कोरल द्वीप" },
        { en: "Dream Konkan & Sindhudurg", mr: "ड्रीम कोकण व सिंधुदुर्ग", hi: "ड्रीम कोंकण और सिंधुदुर्ग" },
        { en: "Majestic Kashmir Valley", mr: "काश्मीर खोरे", hi: "कश्मीर घाटी" },
        { en: "Thailand (Bangkok & Pattaya)", mr: "थायलंड (बँकॉक व पट्टाया)", hi: "थाईलैंड (बैंकॉक और पटाया)" },
        { en: "Dubai Desert & Skylines", mr: "दुबई वाळवंट व आधुनिक शहरे", hi: "दुबई रेगिस्तान और आधुनिक शहर" },
        { en: "Switzerland Alpine Grandeur", mr: "स्वित्झर्लंड आल्प्स सौंदर्य", hi: "स्विट्जरलैंड आल्प्स सौंदर्य" },
        { en: "Vietnam & Ha Long Bay", mr: "व्हिएतनाम व हा लाँग बे", hi: "वियतनाम और हा लोंग बे" },
        { en: "Logged In (Customer Portal)", mr: "लॉगिन केले आहे (ग्राहक पोर्टल)", hi: "लॉग इन हैं (ग्राहक पोर्टल)" },
        { en: "View All Destinations →", mr: "सर्व पर्यटन स्थळे पहा →", hi: "सभी गंतव्य देखें →" },
        { en: "India Heritage", mr: "अतुल्य भारत", hi: "अतुल्य भारत" },
        { en: "9D / 8N", mr: "९ दिवस / ८ रात्री", hi: "9 दिन / 8 रातें" },
        { en: "10D / 9N", mr: "१० दिवस / ९ रात्री", hi: "10 दिन / 9 रातें" },
        { en: "6D / 5N", mr: "६ दिवस / ५ रात्री", hi: "6 दिन / 5 रातें" },
        { en: "5D / 4N", mr: "५ दिवस / ४ रात्री", hi: "5 दिन / 4 रातें" },
        { en: "10,000+", mr: "१०,०००+", hi: "10,000+" },
        { en: "12+ Years", mr: "१२+ वर्षे", hi: "12+ वर्ष" },
        { en: "Email *", mr: "ईमेल पत्ता *", hi: "ईमेल पता *" },
        { en: "Phone (WhatsApp) *", mr: "फोन नंबर (व्हॉट्सॲप) *", hi: "फोन नंबर (व्हाट्सएप) *" },
        { en: "Monday – Saturday: 9:30 AM – 7:30 PM", mr: "सोमवार – शनिवार: सकाळी ९:३० – संध्याकाळी ७:३०", hi: "सोमवार – शनिवार: सुबह 9:30 – शाम 7:30" },
        { en: "Monday &ndash; Saturday: 9:30 AM &ndash; 7:30 PM", mr: "सोमवार – शनिवार: सकाळी ९:३० – संध्याकाळी ७:३०", hi: "सोमवार – शनिवार: सुबह 9:30 – शाम 7:30" },
        { en: "Beautiful dream begins with dreamers and the journey to make that beautiful dream come true begins. Our dream is to make everyone possible to explore the beauty of world by making tourism affordable.", mr: "सुंदर स्वप्ने पाहणाऱ्यांसोबतच एका सुंदर प्रवासाची सुरुवात होते. पर्यटन परवडणारे आणि सुरक्षित बनवून प्रत्येकाला जगाचे सौंदर्य अनुभवता यावे, हेच आमचे स्वप्न आहे.", hi: "सुंदर सपने देखने वालों के साथ ही एक खूबसूरत यात्रा शुरू होती है। पर्यटन को किफायती और सुलभ बनाकर हर किसी को दुनिया की सुंदरता दिखाना ही हमारा सपना है।" },
        { en: "Just finished Mumbai darshan and coastal trip with Dream Travelkar and it was the best experience I had traveling throughout Mumbai. The guides were extremely knowledgeable, punctual, and cordial. I will definitely be looking forward to booking other domestic and international tours with Dream Travelkar!", mr: "ड्रीम ट्रॅव्हलकरसोबत नुकतीच मुंबई दर्शन आणि किनारपट्टीची सहल पूर्ण केली आणि मुंबई भ्रमणाचा हा माझा आजवरचा सर्वोत्तम अनुभव ठरला. गाईड्स अत्यंत हुशार, वक्तशीर आणि मनमिळावू होते. मी नक्कीच इतर सहलींसाठी ड्रीम ट्रॅव्हलकरचीच निवड करेन!", hi: "ड्रीम ट्रॅव्हलकर के साथ अभी मुंबई दर्शन और तटीय यात्रा पूरी की और यह मेरा सबसे अच्छा अनुभव रहा। गाइड बहुत जानकार, समयनिष्ठ और विनम्र थे। मैं निश्चित रूप से अन्य यात्राओं के लिए भी ड्रीम ट्रॅव्हलकर को ही चुनूँगा!" },
        { en: "All the executives right from booking the tour and giving detailed information from the Worli office took great care of us. The food preparation was up to the standards and getting authentic Indian food in Bangkok and Pattaya was a matter of great comfort to tourists like us. We congratulate the Dream Travelkar team and wish them the very best!", mr: "वरळी कार्यालयातून सहल बुक करण्यापासून आणि सविस्तर माहिती देण्यापर्यंत सर्व अधिकाऱ्यांनी आमची खूप छान काळजी घेतली. बँकॉक आणि पट्टायामध्ये अस्सल भारतीय जेवण मिळणे आमच्यासारख्या पर्यटकांसाठी खूप सोयीचे ठरले. ड्रीम ट्रॅव्हलकर टीमचे अभिनंदन आणि शुभेच्छा!", hi: "वर्ली कार्यालय से टूर बुक करने और विस्तृत जानकारी देने तक सभी कर्मचारियों ने हमारी बहुत अच्छी देखभाल की। बैंकॉक और पटाया में प्रामाणिक भारतीय भोजन मिलना हमारे लिए बहुत आरामदायक रहा। पूरी टीम को बधाई और शुभकामनाएं!" },
        { en: "It was a wonderful trip to Munnar. Best place we have ever visited—it truly felt like heaven! Special thanks to Dream Travelkar and their services. Hotels, rooms, and food were excellent, the houseboat was immaculate, and the morning breakfast buffet was delicious.", mr: "मुन्नारची सहल खूपच अप्रतिम झाली. आम्ही भेट दिलेले सर्वोत्तम ठिकाण—अगदी स्वर्गासारखे वाटले! ड्रीम ट्रॅव्हलकर आणि त्यांच्या उत्कृष्ट सेवेचे मनःपूर्वक आभार. हॉटेल्स, खोल्या आणि जेवण उत्तम होते, हाऊसबोट अत्यंत स्वच्छ होती आणि सकाळचा नाश्ता स्वादिष्ट होता.", hi: "मुन्नार की यात्रा बहुत ही शानदार रही। हमने जो सबसे बेहतरीन जगह देखी—सचमुच स्वर्ग जैसा लगा! ड्रीम ट्रॅव्हलकर और उनकी सेवाओं का विशेष धन्यवाद। होटल, कमरे और भोजन बेहतरीन थे, हाउसबोट बहुत साफ थी और नाश्ता स्वादिष्ट था।" },

        { en: "Curated Travel Circuits", mr: "खास निवडक पर्यटन सर्किट्स", hi: "विशेष चयनित यात्रा सर्किट्स" },
        { en: "Explore Handcrafted Destinations", mr: "विचारपूर्वक डिझाइन केलेली पर्यटन स्थळे", hi: "सोच-समझकर तैयार किए गए गंतव्य" },
        { en: "Discover royal forts, tranquil emerald backwaters, snow-crested mountain peaks, and world-class global escapes.", mr: "शाही किल्ले, शांत बॅकवॉटर्स, बर्फाच्छादित पर्वत आणि जागतिक दर्जाच्या नयनरम्य सहलींचा शोध घ्या.", hi: "शाही किलों, शांत बैकवाटर्स, बर्फ से ढके पर्वतों और विश्वस्तरीय छुट्टियों का आनंद लें।" },
        { en: "All Destinations (12)", mr: "सर्व पर्यटन स्थळे (१२)", hi: "सभी पर्यटन स्थल (12)" },
        { en: "India Domestic (6)", mr: "भारतातील स्थळे (६)", hi: "भारत घरेलू (6)" },
        { en: "International Holidays (6)", mr: "आंतरराष्ट्रीय सहली (६)", hi: "अंतरराष्ट्रीय छुट्टियां (6)" },
        { en: "Transparent • Quality Verified", mr: "पारदर्शक • गुणवत्ता पडताळणी केलेले", hi: "पारदर्शी • गुणवत्ता सत्यापित" },
        { en: "Our Complete Tour Packages", mr: "आमची संपूर्ण टूर पॅकेजेस", hi: "हमारे संपूर्ण टूर पैकेज" },
        { en: "Explore domestic Indian heritage circuits and international holiday packages with guaranteed accommodations and day-wise itineraries.", mr: "खात्रीशीर मुक्काम आणि दिवसनिहाय नियोजनासह देशांतर्गत भारतीय वारसा सहली आणि आंतरराष्ट्रीय पॅकेजेसचा आनंद घ्या.", hi: "गारंटीड आवास और दिन-वार यात्रा कार्यक्रम के साथ घरेलू भारतीय विरासत और अंतरराष्ट्रीय हॉलिडे पैकेज का अन्वेषण करें।" },
        { en: "Search By Name / Place", mr: "नाव किंवा ठिकाणानुसार शोधा", hi: "नाम या स्थान से खोजें" },
        { en: "Tour Category", mr: "सहल श्रेणी", hi: "टूर श्रेणी" },
        { en: "All Types (India & World)", mr: "सर्व प्रकार (भारत व जग)", hi: "सभी प्रकार (भारत और विश्व)" },
        { en: "India Domestic Tours", mr: "भारतीय देशांतर्गत सहली", hi: "भारतीय घरेलू टूर्स" },
        { en: "Max Budget (₹)", mr: "कमाल बजेट (₹)", hi: "अधिकतम बजट (₹)" },
        { en: "Up to ₹20,000", mr: "₹२०,००० पर्यंत", hi: "₹20,000 तक" },
        { en: "Up to ₹30,000", mr: "₹३०,००० पर्यंत", hi: "₹30,000 तक" },
        { en: "Up to ₹50,000", mr: "₹५०,००० पर्यंत", hi: "₹50,000 तक" },
        { en: "Up to ₹1,00,000", mr: "₹१,००,००० पर्यंत", hi: "₹1,00,000 तक" },
        { en: "100% Demo Booking Available", mr: "१००% डेमो बुकिंग उपलब्ध", hi: "100% डेमो बुकिंग उपलब्ध" },
        { en: "Bespoke Holiday Planning", mr: "सानुकूल सहल नियोजन", hi: "कस्टमाइज हॉलिडे प्लानिंग" },
        { en: "Tell us where you dream to go. Our seasoned planners in Worli, Mumbai will build an itinerary matching your exact dates, pace, and lifestyle.", mr: "तुम्हाला कुठे जायचे आहे ते सांगा. वरळी, मुंबई येथील आमचे तज्ज्ञ नियोजक तुमच्या तारखा, वेग आणि जीवनशैलीनुसार सहल आखून देतील.", hi: "बताएं कि आप कहां जाना चाहते हैं। वर्ली, मुंबई के हमारे अनुभवी योजनाकार आपकी तारीखों और प्राथमिकताओं के अनुसार यात्रा कार्यक्रम तैयार करेंगे।" },
        { en: "Fill in this form and our senior holiday consultant will reach out via WhatsApp/Call with a detailed proposal within 2 hours.", mr: "हा फॉर्म भरा आणि आमचे वरिष्ठ सहल सल्लागार २ तासांत व्हॉट्सॲप किंवा कॉलद्वारे सविस्तर प्रस्तावासह आपल्याशी संपर्क साधतील.", hi: "यह फॉर्म भरें और हमारे वरिष्ठ टूर सलाहकार 2 घंटे के भीतर व्हाट्सएप या कॉल के माध्यम से विस्तृत प्रस्ताव के साथ संपर्क करेंगे।" },
        { en: "2 Adults (Couple)", mr: "२ प्रौढ (जोडपे)", hi: "2 वयस्क (जोड़ा)" },
        { en: "3 Adults", mr: "३ प्रौढ", hi: "3 वयस्क" },
        { en: "4 (Family with kids)", mr: "४ (लहान मुलांसह कुटुंब)", hi: "4 (बच्चों सहित परिवार)" },
        { en: "6+ (Group Tour)", mr: "६+ (ग्रुप टूर)", hi: "6+ (समूह यात्रा)" },
        { en: "3-Star Verified", mr: "३-स्टार पडताळणी केलेले", hi: "3-स्टार सत्यापित" },
        { en: "4-Star Deluxe", mr: "४-स्टार डिलक्स", hi: "4-स्टार डीलक्स" },
        { en: "5-Star Luxury", mr: "५-स्टार लक्झरी", hi: "5-स्टार लग्जरी" },
        { en: "Heritage / Villa", mr: "हेरिटेज / व्हिला", hi: "हेरिटेज / विला" },
        { en: "₹15k - ₹25k", mr: "₹१५ हजार - ₹२५ हजार", hi: "₹15 हजार - ₹25 हजार" },
        { en: "₹25k - ₹45k", mr: "₹२५ हजार - ₹४५ हजार", hi: "₹25 हजार - ₹45 हजार" },
        { en: "₹45k - ₹80k", mr: "₹४५ हजार - ₹८० हजार", hi: "₹45 हजार - ₹80 हजार" },
        { en: "₹80k+", mr: "₹८० हजार+", hi: "₹80 हजार+" },
        { en: "Interested in Chhatrapati Shivaji Maharaj Forts / Konkan Sea-Forts / Ashtavinayak Pilgrimage", mr: "छत्रपती शिवाजी महाराज गडकोट / कोकण जलदुर्ग / अष्टविनायक यात्रेमध्ये विशेष स्वारस्य", hi: "छत्रपति शिवाजी महाराज किले / कोंकण समुद्री किले / अष्टविनायक तीर्थयात्रा में रुचि" },
        { en: "How Custom Planning Works", mr: "सानुकूल नियोजन कसे कार्य करते", hi: "कस्टमाइज प्लानिंग कैसे काम करती है" },
        { en: "Share Preferences", mr: "पसंती सांगा", hi: "प्राथमिकताएं बताएं" },
        { en: "Submit your dates, family member count, and destination vision.", mr: "तुमच्या प्रवासाच्या तारखा, कुटुंबातील सदस्यांची संख्या आणि आवडीचे ठिकाण सांगा.", hi: "अपनी तारीखें, परिवार के सदस्यों की संख्या और पसंद की जगह बताएं।" },
        { en: "Day-Wise Draft Proposal", mr: "दिवसनिहाय मसुदा प्रस्ताव", hi: "दिन-वार प्रारूप प्रस्ताव" },
        { en: "We tailor hotels, private vehicles, meal plans, and day-wise attractions.", mr: "आम्ही हॉटेल्स, खाजगी वाहने, जेवणाचे नियोजन आणि पर्यटन स्थळे ठरवतो.", hi: "हम होटल, निजी वाहन, भोजन योजना और दर्शनीय स्थलों को अनुकूलित करते हैं।" },
        { en: "Confirm & Pack Bags", mr: "निश्चित करा आणि बॅग भरा", hi: "पुष्टि करें और बैग पैक करें" },
        { en: "Lock dates with 30% advance token and receive complete hotel vouchers.", mr: "३०% टोकन रकमेसह तारखा निश्चित करा आणि हॉटेल व्हाउचर मिळवा.", hi: "30% एडवांस टोकन के साथ तारीखें सुरक्षित करें और होटल वाउचर प्राप्त करें।" },
        { en: "Prefer to Speak Directly?", mr: "थेट बोलणे पसंत कराल का?", hi: "क्या सीधे बात करना पसंद करेंगे?" },
        { en: "Our travel planners are available Monday through Saturday at our Worli office.", mr: "आमचे सहल नियोजक सोमवार ते शनिवार वरळी कार्यालयात उपलब्ध असतात.", hi: "हमारे टूर प्लानर सोमवार से शनिवार वर्ली कार्यालय में उपलब्ध हैं।" },
        { en: "Chat on WhatsApp", mr: "व्हॉट्सॲपवर चॅट करा", hi: "व्हाट्सएप पर चैट करें" },
        { en: "Rooted in Mumbai • Respected Worldwide", mr: "मुंबैकरांचा विश्वास • जगभरात नावलौकिक", hi: "मुंबई की विरासत • दुनिया भर में सम्मानित" },
        { en: "Our Founding Vision", mr: "आमचा मूळ संकल्प", hi: "हमारा संस्थापक दृष्टिकोण" },
        { en: "Making Extraordinary Travel Enriching & Accessible", mr: "असाधारण प्रवास समृद्ध आणि सर्वांसाठी सुलभ करणे", hi: "असाधारण यात्रा को समृद्ध और सुलभ बनाना" },
        { en: "Our Commitments", mr: "आमची बांधिलकी", hi: "हमारी प्रतिबद्धताएं" },
        { en: "We judge our success by the smiles, photographs, and long-lasting memories of our travelers.", mr: "आमच्या प्रवाशांचे समाधान, हास्य आणि सुंदर आठवणी हेच आमच्या यशाचे खरे मोजमाप आहे.", hi: "यात्रियों के चेहरे की मुस्कान और सुखद यादें ही हमारी वास्तविक सफलता हैं।" },
        { en: "Clear line-item breakdowns without surprise hidden taxes, service fees, or forced tipping. What we promise is what you receive.", mr: "कोणतेही छुपे कर किंवा सेवा शुल्क नाही. आम्ही जे वचन देतो तेच तुम्हाला मिळते.", hi: "कोई छिपा हुआ कर या अतिरिक्त शुल्क नहीं। जो वादा हम करते हैं वही आपको मिलता है।" },
        { en: "Every hotel, deluxe houseboat, and Swiss desert tent is inspected for hygiene, safety, prime location, and hospitality standards.", mr: "प्रत्येक हॉटेल आणि हाऊसबोट स्वच्छता, सुरक्षितता आणि उत्कृष्ट आदरातिथ्यासाठी बारकाईने तपासली जाते.", hi: "प्रत्येक होटल और हाउसबोट की स्वच्छता, सुरक्षा और आतिथ्य मानकों की जांच की जाती है।" },
        { en: "We understand the pace required for family travel with senior citizens and young kids. Thoughtful halts, smooth transfers, and respectful escorts.", mr: "ज्येष्ठ नागरिक आणि लहान मुलांसाठी सोयीस्कर वेळापत्रक, वेळेवर विश्रांती आणि आदरयुक्त मार्गदर्शन.", hi: "वरिष्ठ नागरिकों और बच्चों के साथ पारिवारिक यात्रा की जरूरतों को समझते हुए विचारशील योजना।" },
        { en: "Drop By For Chai & Planning", mr: "वरळी कार्यालयात चहा आणि सहल नियोजनासाठी या", hi: "चाय और यात्रा योजना के लिए पधारें" },
        { en: "Headquartered in Mumbai • Serving Travelers Worldwide", mr: "मुख्य कार्यालय मुंबई • जगभरातील प्रवाशांना सेवा", hi: "मुख्यालय मुंबई • दुनिया भर के यात्रियों की सेवा में" },
        { en: "Have a question or planning your next family holiday? Reach out to our dedicated travel advisers today.", mr: "काही प्रश्न आहेत किंवा कुटुंबाच्या सुट्टीचे नियोजन करत आहात? आजच आमच्या तज्ज्ञ सहल सल्लागारांशी संपर्क साधा.", hi: "कोई प्रश्न है या अपनी अगली पारिवारिक छुट्टी की योजना बना रहे हैं? आज ही हमारे टूर सलाहकारों से संपर्क करें।" },
        { en: "Registered Address", mr: "नोंदणीकृत पत्ता", hi: "पंजीकृत पता" },
        { en: "Telephone Lines", mr: "दूरध्वनी क्रमांक", hi: "टेलीफोन नंबर" },
        { en: "Primary:", mr: "मुख्य:", hi: "प्राथमिक:" },
        { en: "Support:", mr: "सपोर्ट:", hi: "सहायता:" },
        { en: "Email Inquiries", mr: "ईमेल चौकशी", hi: "ईमेल पूछताछ" },
        { en: "General:", mr: "सामान्य:", hi: "सामान्य:" },
        { en: "Sales:", mr: "सेल्स:", hi: "बिक्री:" },
        { en: "Business Hours", mr: "कामकाजाची वेळ", hi: "कार्य समय" },
        { en: "Chat with our holiday planner on +91 9867807837 for quick quotes.", mr: "त्वरित कोटेशनसाठी +९१ ९८६७८०७८३७ वर आमच्या सहल नियोजकाशी चॅट करा.", hi: "त्वरित कोटेशन के लिए +91 9867807837 पर हमारे प्लानर से चैट करें।" },
        { en: "Open WhatsApp Chat", mr: "व्हॉट्सॲप चॅट उघडा", hi: "व्हाट्सएप चैट खोलें" },
        { en: "Please provide your details below and our team will get in touch with you promptly.", mr: "कृपया आपले तपशील खाली भरा आणि आमची टीम तातडीने आपल्याशी संपर्क साधेल.", hi: "कृपया नीचे अपना विवरण भरें और हमारी टीम तुरंत आपसे संपर्क करेगी।" },
        { en: "How Can We Help You?", mr: "आम्ही आपल्याला कशी मदत करू शकतो?", hi: "हम आपकी क्या सहायता कर सकते हैं?" },
        { en: "Submit Contact Inquiry", mr: "संपर्क चौकशी पाठवा", hi: "संपर्क पूछताछ भेजें" },
        { en: "4.9 / 5 Average Rating • 1,200+ Verified Holidays", mr: "४.९ / ५ सरासरी रेटिंग • १,२००+ यशस्वी सहली", hi: "4.9 / 5 औसत रेटिंग • 1,200+ सत्यापित यात्राएं" },
        { en: "Traveler Reviews & Testimonials", mr: "प्रवाशांचे अभिप्राय आणि मनोगत", hi: "यात्रियों की समीक्षाएं और अनुभव" },
        { en: "Read genuine impressions and stories from travelers who experienced the comfort, authenticity, and hospitality of Dream Travelkar.", mr: "ड्रीम ट्रॅव्हलकरच्या सोयीसुविधा, अस्सलता आणि आदरातिथ्याचा अनुभव घेतलेल्या प्रवाशांचे खरे अनुभव वाचा.", hi: "ड्रीम ट्रॅव्हलकर के आराम और आतिथ्य का अनुभव करने वाले यात्रियों की वास्तविक समीक्षाएं पढ़ें।" },
        { en: "Help & Transparency", mr: "मदत आणि पारदर्शकता", hi: "सहायता और पारदर्शिता" },
        { en: "Clear answers to common questions about booking procedures, advance tokens, cancellation refunds, and customized travel.", mr: "बुकिंग प्रक्रिया, टोकन रक्कम, परतावा नियम आणि सानुकूल सहलींबद्दलच्या प्रश्नांची स्पष्ट उत्तरे.", hi: "बुकिंग प्रक्रिया, अग्रिम टोकन, रद्दीकरण रिफंड और कस्टमाइज यात्रा से संबंधित प्रश्नों के स्पष्ट उत्तर।" },

        {"en":"All the executives right from booking the tour and giving detailed information from the Worli office took great care of us. The food preparation was up to the standards and getting delicious authentic Indian food in Bangkok and Pattaya was a matter of great comfort to tourists like us. We congratulate the Dream Travelkar team and wish them the very best!","mr":"वरळी कार्यालयातून सहल बुक करण्यापासून आणि सविस्तर माहिती देण्यापर्यंत सर्व अधिकाऱ्यांनी आमची खूप छान काळजी घेतली. जेवणाचा दर्जा उत्तम होता आणि बँकॉक व पट्टायामध्ये अस्सल चवदार भारतीय जेवण मिळणे आमच्यासारख्या पर्यटकांसाठी मोठा दिलासा ठरला. ड्रीम ट्रॅव्हलकर टीमचे अभिनंदन आणि शुभेच्छा!","hi":"वर्ली कार्यालय से टूर बुक करने और विस्तृत जानकारी देने तक सभी कर्मचारियों ने हमारी बहुत अच्छी देखभाल की। भोजन का स्तर बेहतरीन था और बैंकॉक व पटाया में स्वादिष्ट प्रामाणिक भारतीय भोजन मिलना हमारे लिए बहुत आरामदायक रहा। हम ड्रीम ट्रॅव्हलकर टीम को बधाई और शुभकामनाएं देते हैं!"},
        {"en":"It was a wonderful trip to Munnar and Alleppey! Best place we have ever visited—it truly felt like heaven. Special thanks to Dream Travelkar and their seamless services. Hotels, rooms, and food were excellent, the houseboat was immaculate, and the morning breakfast buffet was delicious.","mr":"मुन्नार आणि अलेप्पीची सहल खूपच अप्रतिम झाली! आम्ही भेट दिलेले सर्वोत्तम ठिकाण—अगदी स्वर्गासारखे वाटले. ड्रीम ट्रॅव्हलकर आणि त्यांच्या अखंड सेवेचे मनःपूर्वक आभार. हॉटेल्स, खोल्या आणि जेवण उत्कृष्ट होते, हाऊसबोट अत्यंत स्वच्छ होती आणि सकाळचा नाश्ता स्वादिष्ट होता.","hi":"मुन्नार और अल्लेप्पी की यात्रा बहुत ही अद्भुत रही! हमने जो सबसे बेहतरीन जगह देखी—सचमुच स्वर्ग जैसा लगा। ड्रीम ट्रॅव्हलकर और उनकी सहज सेवाओं का विशेष धन्यवाद। होटल, कमरे और भोजन बेहतरीन थे, हाउसबोट बेहद साफ थी और सुबह का नाश्ता स्वादिष्ट था।"},
        {"en":"Our 9-day Rajasthan trip was organized with royal finesse! From the heritage Havelis in Jaipur and Udaipur to the mesmerizing evening at Sam Sand Dunes camp under starry skies. Everything was on time, driver was like family, and Dream Travelkar's 24/7 assistance gave us complete peace of mind.","mr":"आमची ९ दिवसांची राजस्थान सहल अत्यंत राजेशाही थाटात आयोजित करण्यात आली होती! जयपूर आणि उदयपूरमधील ऐतिहासिक हवेल्यांपासून ते ताऱ्यांच्या प्रकाशात सॅम सँड ड्युन्स कॅम्पवरील विलोभनीय संध्याकाळपर्यंत सर्व काही अप्रतिम होते. सर्व नियोजन वेळेवर होते, ड्रायव्हर कुटुंबासारखा होता आणि ड्रीम ट्रॅव्हलकरच्या २४/७ सहाय्याने आम्हाला पूर्ण निश्चिंती दिली.","hi":"हमारी 9 दिनों की राजस्थान यात्रा राजसी अंदाज में आयोजित की गई थी! जयपुर और उदयपुर की हेरिटेज हवेलियों से लेकर तारों भरे आसमान के नीचे सैम सैंड ड्यून्स कैंप की मनमोहक शाम तक सब कुछ बेहतरीन था। सब कुछ समय पर था, ड्राइवर परिवार जैसा था, और ड्रीम ट्रॅव्हलकर की 24/7 सहायता ने हमें पूरी मानसिक शांति दी।"},
        {"en":"Dream Travelkar crafted our honeymoon to the Andaman Islands beyond our wildest expectations. The private catamaran transfers, candlelight dinner on the beach at Havelock, and scuba diving at Elephant beach were simply unforgettable. Thank you for making our dreams come true!","mr":"ड्रीम ट्रॅव्हलकरने आमची अंदमान बेटांची हनीमून सहल आमच्या कल्पनेपेक्षाही सुंदर साकारली. खाजगी कॅटामारन ट्रान्सफर्स, हॅव्हलॉक समुद्रकिनाऱ्यावरील कँडललाइट डिनर आणि एलिफंट बीचवरील स्कूबा डायव्हिंग खरोखरच अविस्मरणीय होते. आमचे स्वप्न सत्यात उतरवल्याबद्दल मनापासून धन्यवाद!","hi":"ड्रीम ट्रॅव्हलकर ने अंडमान द्वीप समूह के हमारे हनीमून को हमारी उम्मीदों से कहीं अधिक खूबसूरत बना दिया। प्राइवेट कैटामारन ट्रांसफर, हैवलॉक बीच पर कैंडललाइट डिनर और एलिफेंट बीच पर स्कूबा डाइविंग सचमुच अविस्मरणीय रहे। हमारे सपनों को सच करने के लिए धन्यवाद!"},
        {"en":"As history lovers, visiting Sindhudurg Fort and experiencing authentic Malvani culture with Dream Travelkar was deeply fulfilling. The respect for Chhatrapati Shivaji Maharaj's heritage and the personal touch from the Worli team is rare to find. Recommended to all fellow Maharashtrians!","mr":"इतिहासप्रेमी म्हणून, ड्रीम ट्रॅव्हलकरसोबत सिंधुदुर्ग किल्ल्याला भेट देणे आणि अस्सल मालवणी संस्कृती अनुभवणे मनाला समाधान देणारे होते. छत्रपती शिवाजी महाराजांच्या ऐतिहासिक वारशाबद्दलचा आदर आणि वरळी टीमची आपुलकी दुर्मिळ आहे. सर्व महाराष्ट्रीयन बांधवांना आमची मनःपूर्वक शिफारस!","hi":"इतिहास प्रेमी होने के नाते, ड्रीम ट्रॅव्हलकर के साथ सिंधुदुर्ग किले का भ्रमण और प्रामाणिक मालवणी संस्कृति का अनुभव अत्यंत संतोषजनक रहा। छत्रपति शिवाजी महाराज की धरोहर के प्रति सम्मान और वर्ली टीम का आत्मीय व्यवहार वाकई सराहनीय है। सभी पर्यटकों के लिए अत्यधिक अनुशंसित!"},
        {"en":"Jason Lalla","mr":"जेसन लाला","hi":"जेसन लाला"},
        {"en":"Mr. & Mrs. Parab","mr":"श्री आणि सौ. परब","hi":"श्री एवं श्रीमती परब"},
        {"en":"Mr. & Mrs. Warang","mr":"श्री आणि सौ. वारंग","hi":"श्री एवं श्रीमती वारंग"},
        {"en":"Adv. Rajesh Kothari & Family","mr":"अ‍ॅड. राजेश कोठारी आणि परिवार","hi":"एडवोकेट राजेश कोठारी एवं परिवार"},
        {"en":"Siddhesh & Neha Patil","mr":"सिद्धेश आणि नेहा पाटील","hi":"सिद्धेश एवं नेहा पाटिल"},
        {"en":"Dr. Sandeep Deshpande","mr":"डॉ. संदीप देशपांडे","hi":"डॉ. संदीप देशपांडे"},
        {"en":"Mumbai Darshan & Coastal Heritage Trip","mr":"मुंबई दर्शन व किनारपट्टी हेरिटेज सहल","hi":"मुंबई दर्शन और तटीय हेरिटेज यात्रा"},
        {"en":"Bangkok & Pattaya International Holiday","mr":"बँकॉक व पट्टाया आंतरराष्ट्रीय सहल","hi":"बैंकॉक और पटाया अंतरराष्ट्रीय टूर"},
        {"en":"Kerala Backwaters & Munnar Hills","mr":"केरळ बॅकवॉटर्स व मुन्नार हिल्स","hi":"केरल बैकवाटर्स और मुन्नार हिल्स"},
        {"en":"Royal Rajasthan Marwad & Udaipur Circuit","mr":"रॉयल राजस्थान मारवाड व उदयपूर सर्किट","hi":"रॉयल राजस्थान मारवाड़ और उदयपुर सर्किट"},
        {"en":"Exotic Andaman & Havelock Coral Escape","mr":"एक्झॉटिक अंदमान व हॅव्हलॉक प्रवाळ सहल","hi":"एग्जॉटिक अंडमान और हैवलॉक कोरल टूर"},
        {"en":"Dream Konkan & Sindhudurg Sea Fort ('मी मावळा')","mr":"ड्रीम कोकण व सिंधुदुर्ग सागरी किल्ला ('मी मावळा')","hi":"ड्रीम कोंकण और सिंधुदुर्ग जलदुर्ग ('मी मावळा')"},
        {"en":"Dream Konkan & Sindhudurg Sea Fort ('Me Mavala')","mr":"ड्रीम कोकण व सिंधुदुर्ग सागरी किल्ला ('मी मावळा')","hi":"ड्रीम कोंकण और सिंधुदुर्ग जलदुर्ग ('मी मावळा')"},
        {"en":"Mumbai Darshan & Coastal Heritage Trip • October 2026","mr":"मुंबई दर्शन व किनारपट्टी हेरिटेज सहल • ऑक्टोबर २०२६","hi":"मुंबई दर्शन और तटीय हेरिटेज यात्रा • अक्टूबर 2026"},
        {"en":"Bangkok & Pattaya International Holiday • September 2026","mr":"बँकॉक व पट्टाया आंतरराष्ट्रीय सहल • सप्टेंबर २०२६","hi":"बैंकॉक और पटाया अंतरराष्ट्रीय टूर • सितंबर 2026"},
        {"en":"Kerala Backwaters & Munnar Hills • August 2026","mr":"केरळ बॅकवॉटर्स व मुन्नार हिल्स • ऑगस्ट २०२६","hi":"केरल बैकवाटर्स और मुन्नार हिल्स • अगस्त 2026"},
        {"en":"Royal Rajasthan Marwad & Udaipur Circuit • October 2026","mr":"रॉयल राजस्थान मारवाड व उदयपूर सर्किट • ऑक्टोबर २०२६","hi":"रॉयल राजस्थान मारवाड़ और उदयपुर सर्किट • अक्टूबर 2026"},
        {"en":"Exotic Andaman & Havelock Coral Escape • September 2026","mr":"एक्झॉटिक अंदमान व हॅव्हलॉक प्रवाळ सहल • सप्टेंबर २०२६","hi":"एग्जॉटिक अंडमान और हैवलॉक कोरल टूर • सितंबर 2026"},
        {"en":"Dream Konkan & Sindhudurg Sea Fort ('मी मावळा') • July 2026","mr":"ड्रीम कोकण व सिंधुदुर्ग सागरी किल्ला ('मी मावळा') • जुलै २०२६","hi":"ड्रीम कोंकण और सिंधुदुर्ग जलदुर्ग ('मी मावळा') • जुलाई 2026"},
        {"en":"October 2026","mr":"ऑक्टोबर २०२६","hi":"अक्टूबर 2026"},
        {"en":"September 2026","mr":"सप्टेंबर २०२६","hi":"सितंबर 2026"},
        {"en":"August 2026","mr":"ऑगस्ट २०२६","hi":"अगस्त 2026"},
        {"en":"July 2026","mr":"जुलै २०२६","hi":"जुलाई 2026"},
        {"en":"Verified","mr":"सत्यापित","hi":"सत्यापित"},
        {"en":"Verified Traveller","mr":"सत्यापित प्रवासी","hi":"सत्यापित यात्री"},
        {"en":"Family Holiday","mr":"कौटुंबिक सहल","hi":"पारिवारिक अवकाश"},
        {"en":"Couple Travel","mr":"जोडीदाराची सहल","hi":"युगल यात्रा"},
        {"en":"Royal Circuit","mr":"शाही सहल","hi":"शाही सर्किट"},
        {"en":"Honeymooners","mr":"हनीमून प्रवास","hi":"हनीमून टूर"},
        {"en":"Heritage Group","mr":"हेरिटेज गट","hi":"धरोहर समूह"},
        {"en":"© 2026 Dream Travelkar. BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli Mumbai - 400018.","mr":"© २०२६ ड्रीम ट्रॅव्हलकर. बीडीडी ब्लॉक क्र. ४६/७, डॉ. जी. एम. भोसले मार्ग, वरळी, मुंबई - ४०००१८.","hi":"© 2026 ड्रीम ट्रॅव्हलकर। बीडीडी ब्लॉक नं. 46/7, डॉ. जी. एम. भोसले मार्ग, वर्ली, मुंबई - 400018।"},
        {"en":"&copy; 2026 Dream Travelkar. BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli Mumbai - 400018.","mr":"© २०२६ ड्रीम ट्रॅव्हलकर. बीडीडी ब्लॉक क्र. ४६/७, डॉ. जी. एम. भोसले मार्ग, वरळी, मुंबई - ४०००१८.","hi":"© 2026 ड्रीम ट्रॅव्हलकर। बीडीडी ब्लॉक नं. 46/7, डॉ. जी. एम. भोसले मार्ग, वर्ली, मुंबई - 400018।"},
        {"en":"BDD Block No. 46/7,","mr":"बीडीडी ब्लॉक क्र. ४६/७,","hi":"बीडीडी ब्लॉक नं. 46/7,"},
        {"en":"BDD Block No. 46/7","mr":"बीडीडी ब्लॉक क्र. ४६/७","hi":"बीडीडी ब्लॉक नं. 46/7"},
        {"en":"Dr. G.M.Bhosale Marg, Worli,","mr":"डॉ. जी. एम. भोसले मार्ग, वरळी,","hi":"डॉ. जी. एम. भोसले मार्ग, वर्ली,"},
        {"en":"Dr. G.M.Bhosale Marg, Worli","mr":"डॉ. जी. एम. भोसले मार्ग, वरळी","hi":"डॉ. जी. एम. भोसले मार्ग, वर्ली"},
        {"en":"Dr. G.M.Bhosale Marg,","mr":"डॉ. जी. एम. भोसले मार्ग,","hi":"डॉ. जी. एम. भोसले मार्ग,"},
        {"en":"Mumbai - 400018, Maharashtra, India","mr":"मुंबई – ४०००१८, महाराष्ट्र, भारत","hi":"मुंबई – 400018, महाराष्ट्र, भारत"},
        {"en":"Worli, Mumbai - 400018, Maharashtra, India","mr":"वरळी, मुंबई – ४०००१८, महाराष्ट्र, भारत","hi":"वर्ली, मुंबई – 400018, महाराष्ट्र, भारत"},
        {"en":"Monday – Saturday: 09:30 AM – 07:30 PM","mr":"सोमवार – शनिवार: सकाळी ०९:३० – संध्याकाळी ०७:३०","hi":"सोमवार – शनिवार: सुबह 09:30 – शाम 07:30"},
        {"en":"Monday &ndash; Saturday: 09:30 AM &ndash; 07:30 PM","mr":"सोमवार – शनिवार: सकाळी ०९:३० – संध्याकाळी ०७:३०","hi":"सोमवार – शनिवार: सुबह 09:30 – शाम 07:30"},
        {"en":"Sunday: By Prior Appointment","mr":"रविवार: पूर्व नियोजित भेटीनुसार","hi":"रविवार: पूर्व निर्धारित अपॉइंटमेंट पर"},
        {"en":"Destination of Interest","mr":"पसंतीचे पर्यटन स्थळ","hi":"पसंदीदा पर्यटन स्थल"},
        {"en":"Travel Destination","mr":"पर्यटन स्थळ","hi":"यात्रा गंतव्य"},
        {"en":"Our Headquarters","mr":"आमचे मुख्य कार्यालय","hi":"हमारा मुख्य कार्यालय"},
        {"en":"Send Us an Inquiry","mr":"आम्हाला विचारणा पाठवा","hi":"हमें पूछताछ भेजें"},
        {"en":"Enter your full name","mr":"तुमचे पूर्ण नाव प्रविष्ट करा","hi":"अपना पूरा नाम दर्ज करें"},
        {"en":"+91 98200 XXXXX","mr":"+९१ ९८२०० XXXXX","hi":"+९१ ९८२०० XXXXX"},
        {"en":"e.g. Rajasthan, Kerala, Himachal, Thailand, Bali","mr":"उदा. राजस्थान, केरळ, हिमाचल, थायलंड, बाली","hi":"उदा. राजस्थान, केरल, हिमाचल, थाईलैंड, बाली"},
        {"en":"e.g. Rajasthan, Kerala, Thailand, Dubai","mr":"उदा. राजस्थान, केरळ, थायलंड, दुबई","hi":"उदा. राजस्थान, केरल, थाईलैंड, दुबई"},
        {"en":"e.g. Rajasthan, Kerala, Bali","mr":"उदा. राजस्थान, केरळ, बाली","hi":"उदा. राजस्थान, केरल, बाली"},
        {"en":"e.g. Rajasthan + Agra, Kerala Munnar, Thailand","mr":"उदा. राजस्थान + आग्रा, केरळ मुन्नार, थायलंड","hi":"उदा. राजस्थान + आगरा, केरल मुन्नार, थाईलैंड"},
        {"en":"Mention tentative dates, group size, or custom questions...","mr":"अंदाजे प्रवासाची तारीख, व्यक्तींची संख्या किंवा आपले प्रश्न येथे लिहा...","hi":"संभावित यात्रा तिथियां, सदस्यों की संख्या या अपने प्रश्न लिखें..."},
        {"en":"Tell us about dates, number of people, or specific requirements...","mr":"तारीख, व्यक्तींची संख्या किंवा कोणत्याही विशेष गरजांबद्दल आम्हाला सांगा...","hi":"तिथियों, व्यक्तियों की संख्या या अपनी विशेष आवश्यकताओं के बारे में बताएं..."},
        {"en":"e.g. Pure Vegetarian/Jain meals, senior-friendly vehicle, photography focus","mr":"उदा. शुद्ध शाकाहारी/जैन भोजन, ज्येष्ठ नागरिकांसाठी सोयीचे वाहन, फोटोग्राफी","hi":"उदा. शुद्ध शाकाहारी/जैन भोजन, बुजुर्गों के अनुकूल वाहन, फोटोग्राफी"},
        {"en":"e.g. Pure vegetarian meals, elderly friendly vehicle, honeymoon room decor","mr":"उदा. शुद्ध शाकाहारी जेवण, ज्येष्ठ नागरिकांसाठी सोयीचे वाहन, हनीमून रूम सजावट","hi":"उदा. शुद्ध शाकाहारी भोजन, वरिष्ठ नागरिकों के लिए वाहन, हनीमून रूम डेकोरेशन"},
        {"en":"Tell us if you need airport pickup from Dadar/Andheri, wheelchair assistance, anniversary decorations, etc.","mr":"दादर/अंधेरी येथून विमानतळ पिकअप, व्हीलचेअर सहाय्य, विशेष सजावट इत्यादी हवे असल्यास सांगा.","hi":"दादर/अंधेरी से एयरपोर्ट पिकअप, व्हीलचेयर सहायता, सालगिरह सजावट आदि की आवश्यकता बताएं।"},
        {"en":"Your email address","mr":"तुमचा ईमेल पत्ता","hi":"आपका ईमेल पता"},
        {"en":"Enter password","mr":"पासवर्ड टाका","hi":"पासवर्ड दर्ज करें"},
        {"en":"Create password","mr":"नवीन पासवर्ड तयार करा","hi":"पासवर्ड बनाएं"},
        {"en":"Search by lead name, phone, destination...","mr":"नाव, फोन किंवा पर्यटन स्थळावरून शोधा...","hi":"नाम, फोन या गंतव्य द्वारा खोजें..."},
        {"en":"Search package by title, destination...","mr":"शीर्षक किंवा पर्यटन स्थळावरून पॅकेज शोधा...","hi":"शीर्षक या गंतव्य द्वारा पैकेज खोजें..."},
        {"en":"e.g. Rajasthan, Houseboat, Coral","mr":"उदा. राजस्थान, हाऊसबोट, प्रवाळ","hi":"उदा. राजस्थान, हाउसबोट, कोरल"},
        {"en":"e.g. Anand Kulkarni","mr":"उदा. आनंद कुलकर्णी","hi":"उदा. आनंद कुलकर्णी"},
        {"en":"e.g. Ramesh Patel","mr":"उदा. रमेश पटेल","hi":"उदा. रमेश पटेल"},
        {"en":"e.g. Ramesh Kulkarni","mr":"उदा. रमेश कुलकर्णी","hi":"उदा. रमेश कुलकर्णी"},
        {"en":"e.g. Mumbai, Pune, Thane","mr":"उदा. मुंबई, पुणे, ठाणे","hi":"उदा. मुंबई, पुणे, ठाणे"},
        {"en":"e.g. Mumbai, Pune","mr":"उदा. मुंबई, पुणे","hi":"उदा. मुंबई, पुणे"},
        {"en":"Beautiful dream begins with dreamers and the journey to make that beautiful dream come true begins.","mr":"सुंदर स्वप्ने पाहणाऱ्यांसोबतच एका सुंदर स्वप्नाची आणि ते सत्यात उतरवण्याच्या प्रवासाची सुरुवात होते.","hi":"खूबसूरत सपने देखने वालों के साथ ही एक खूबसूरत सपने और उसे साकार करने की यात्रा की शुरुआत होती है।"},
        {"en":"\"Beautiful dream begins with dreamers and the journey to make that beautiful dream come true begins.\"","mr":"\"सुंदर स्वप्ने पाहणाऱ्यांसोबतच एका सुंदर स्वप्नाची आणि ते सत्यात उतरवण्याच्या प्रवासाची सुरुवात होते.\"","hi":"\"खूबसूरत सपने देखने वालों के साथ ही एक खूबसूरत सपने और उसे साकार करने की यात्रा की शुरुआत होती है।\""},
        {"en":"Beautiful dream begins with dreamers, and the journey to make that beautiful dream come true begins with Dream Travelkar. Headquartered in Worli, Mumbai, our mission is to make it possible for families, working professionals, senior citizens, and young travelers to explore the magnificent wonders of the world by making tourism reliable and affordable.","mr":"सुंदर स्वप्ने पाहणाऱ्यांसोबतच एका सुंदर स्वप्नाची सुरुवात होते, आणि ते स्वप्न सत्यात उतरवण्याचा प्रवास ड्रीम ट्रॅव्हलकरसोबत सुरू होतो. वरळी, मुंबई येथे मुख्य कार्यालय असलेली आमची संस्था, पर्यटन विश्वासार्ह आणि परवडणारे बनवून कुटुंबे, नोकरदार, ज्येष्ठ नागरिक आणि तरुण प्रवाशांना जगातील नयनरम्य आश्चर्ये अनुभवणे शक्य करण्यासाठी कटिबद्ध आहे.","hi":"खूबसूरत सपने देखने वालों के साथ ही सपनों की शुरुआत होती है, और उस सपने को सच करने की यात्रा ड्रीम ट्रॅव्हलकर के साथ शुरू होती है। वर्ली, मुंबई में स्थित हमारे मुख्यालय का उद्देश्य पर्यटन को विश्वसनीय और किफायती बनाकर परिवारों, कामकाजी पेशेवरों, वरिष्ठ नागरिकों और युवाओं के लिए दुनिया के अद्भुत अजूबों को देखना सुलभ बनाना है।"},
        {"en":"We arrange innovative guided group tours, specialty cultural circuits, and customized holidays suitable for all ages with the core objective of delivering a meaningful, memorable, and valuable travel experience. It is reassuring to know you are in the hands of professionals who have truly been there and genuinely understand traveler needs.","mr":"प्रत्येक प्रवाशाला एक अर्थपूर्ण, संस्मरणीय आणि मोलाचा प्रवास अनुभव मिळावा या मुख्य उद्देशाने आम्ही सर्व वयोगटांसाठी अभिनव मार्गदर्शित ग्रुप टूर्स, वैशिष्ट्यपूर्ण सांस्कृतिक सर्किट्स आणि सानुकूल सहलींचे आयोजन करतो. प्रत्यक्ष त्या स्थळांचा अनुभव घेतलेल्या आणि प्रवाशांच्या गरजा खऱ्या अर्थाने समजणाऱ्या व्यावसायिकांच्या हाती तुम्ही आहात, हीच आमची विश्वासार्हता आहे.","hi":"सभी उम्र के यात्रियों को एक सार्थक, यादगार और मूल्यवान यात्रा अनुभव प्रदान करने के मुख्य उद्देश्य के साथ हम अभिनव निर्देशित समूह यात्राएं, विशेष सांस्कृतिक सर्किट्स और कस्टमाइज्ड छुट्टियों का आयोजन करते हैं। ऐसे पेशेवरों के मार्गदर्शन में होना अत्यंत आश्वस्त करने वाला है, जिन्होंने स्वयं उन स्थलों का अनुभव किया है और जो यात्रियों की आवश्यकताओं को भली-भांति समझते हैं।"},
        {"en":"Our tribute to the historical sea-forts and mountain bastions of Chhatrapati Shivaji Maharaj through our flagship \"मी मावळा\" heritage expeditions.","mr":"आमच्या विशेष \"मी मावळा\" हेरिटेज सहलींच्या माध्यमातून छत्रपती शिवाजी महाराजांच्या ऐतिहासिक जलदुर्गांना आणि गडकोटांना आमचे कृतज्ञतापूर्वक वंदन.","hi":"हमारे प्रमुख \"मी मावळा\" हेरिटेज अभियानों के माध्यम से छत्रपति शिवाजी महाराज के ऐतिहासिक जलदुर्गों और पहाड़ी किलों को हमारी भावपूर्ण श्रद्धांजलि।"},
        {"en":"Rajasthan Heritage","mr":"राजस्थान ऐतिहासिक वारसा","hi":"राजस्थान ऐतिहासिक धरोहर"},
        {"en":"BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli, Mumbai - 400018.","mr":"बीडीडी ब्लॉक क्र. ४६/७, डॉ. जी. एम. भोसले मार्ग, वरळी, मुंबई - ४०००१८.","hi":"बीडीडी ब्लॉक नं. 46/7, डॉ. जी. एम. भोसले मार्ग, वर्ली, मुंबई - 400018."},
        {"en":"Direct Call: +91 9867807837 / +91 9821871072","mr":"थेट कॉल: +९१ ९८६७८०७८३७ / +९१ ९८२१८७१०७२","hi":"सीधा कॉल: +91 9867807837 / +91 9821871072"},
        {"en":"Email: info@dreamtravelkar.com","mr":"ईमेल: info@dreamtravelkar.com","hi":"ईमेल: info@dreamtravelkar.com"},
        {"en":"Get In Touch →","mr":"संपर्क साधा →","hi":"संपर्क करें →"},
        {"en":"Get In Touch &rarr;","mr":"संपर्क साधा →","hi":"संपर्क करें →"},
        {"en":"Get In Touch","mr":"संपर्क साधा","hi":"संपर्क करें"},
        {"en":"WhatsApp our senior tour leader directly for instant answers.","mr":"तातडीने उत्तरांसाठी आमच्या वरिष्ठ सहल प्रमुखांशी थेट व्हॉट्सॲपवर संपर्क साधा.","hi":"तुरंत उत्तर पाने के लिए हमारे वरिष्ठ टूर लीडर से सीधे व्हाट्सएप पर चैट करें।"},
        {"en":"© 2026 Dream Travelkar. All Rights Reserved. Worli, Mumbai.","mr":"© २०२६ ड्रीम ट्रॅव्हलकर. सर्व हक्क राखीव. वरळी, मुंबई.","hi":"© 2026 ड्रीम ट्रॅव्हलकर। सर्वाधिकार सुरक्षित। वर्ली, मुंबई।"},
        {"en":"&copy; 2026 Dream Travelkar. All Rights Reserved. Worli, Mumbai.","mr":"© २०२६ ड्रीम ट्रॅव्हलकर. सर्व हक्क राखीव. वरळी, मुंबई.","hi":"© 2026 ड्रीम ट्रॅव्हलकर। सर्वाधिकार सुरक्षित। वर्ली, मुंबई।"},
        {"en":"Packages","mr":"टूर पॅकेजेस","hi":"टूर पैकेज"},
        {"en":"Need Immediate Advice?","mr":"तातडीने सल्ला हवा आहे का?","hi":"तुरंत सलाह चाहिए?"},
        {"en":"Visit Our Worli Mumbai Office","mr":"आमच्या वरळी मुंबई कार्यालयाला भेट द्या","hi":"हमारे वर्ली मुंबई कार्यालय पर पधारें"},
        {"en":"Drop By For Chai & Planning","mr":"वरळी कार्यालयात चहा आणि सहल नियोजनासाठी या","hi":"चाय और यात्रा योजना के लिए पधारें"},
        {"en":"Drop By For Chai &amp; Planning","mr":"वरळी कार्यालयात चहा आणि सहल नियोजनासाठी या","hi":"चाय और यात्रा योजना के लिए पधारें"},
        {"en":"The Principles Guiding Every Itinerary","mr":"आमच्या प्रत्येक सहलीची मार्गदर्शक तत्त्वे","hi":"प्रत्येक यात्रा कार्यक्रम का मार्गदर्शन करने वाले सिद्धांत"},
        {"en":"We judge our success by the smiles, photographs, and long-lasting memories of our travelers.","mr":"आमच्या प्रवाशांचे समाधान, हास्य आणि सुंदर आठवणी हेच आमच्या यशाचे खरे मोजमाप आहे.","hi":"हम अपनी सफलता को अपने यात्रियों की मुस्कान, तस्वीरों और सुखद यादों से मापते हैं।"},
        {"en":"Clear line-item breakdowns without surprise hidden taxes, service fees, or forced tipping. What we promise is what you receive.","mr":"कोणतेही छुपे कर, सेवा शुल्क किंवा सक्तीचे टिपिंग नाही. आम्ही जे वचन देतो तेच तुम्हाला मिळते.","hi":"बिना किसी छिपे कर, सेवा शुल्क या जबरन टिपिंग के स्पष्ट विवरण। हम जो वादा करते हैं, वही आपको मिलता है।"},
        {"en":"Curated Stays","mr":"उत्कृष्ट दर्जाचा मुक्काम","hi":"चयनित और आरामदायक प्रवास"},
        {"en":"Every hotel, deluxe houseboat, and Swiss desert tent is inspected for hygiene, safety, prime location, and hospitality standards.","mr":"प्रत्येक हॉटेल, डिलक्स हाऊसबोट आणि स्विस डेझर्ट टेंट स्वच्छता, सुरक्षितता आणि उत्कृष्ट आदरातिथ्यासाठी तपासले जाते.","hi":"प्रत्येक होटल, डीलक्स हाउसबोट और स्विस टेंट की स्वच्छता, सुरक्षा और आतिथ्य मानकों की जांच की जाती है।"},
        {"en":"Family & Elder Care","mr":"कुटुंब आणि ज्येष्ठांची विशेष काळजी","hi":"परिवार और वरिष्ठ नागरिकों की विशेष देखभाल"},
        {"en":"Family &amp; Elder Care","mr":"कुटुंब आणि ज्येष्ठांची विशेष काळजी","hi":"परिवार और वरिष्ठ नागरिकों की विशेष देखभाल"},
        {"en":"Making Extraordinary Travel Enriching & Accessible","mr":"असाधारण प्रवास समृद्ध आणि सर्वांसाठी सुलभ करणे","hi":"असाधारण यात्रा को समृद्ध और सभी के लिए सुलभ बनाना"},
        {"en":"Making Extraordinary Travel Enriching &amp; Accessible","mr":"असाधारण प्रवास समृद्ध आणि सर्वांसाठी सुलभ करणे","hi":"असाधारण यात्रा को समृद्ध और सभी के लिए सुलभ बनाना"},
        {"en":"Our Founding Vision","mr":"आमचा मूळ संकल्प","hi":"हमारा मूल संकल्प"},
        {"en":"Rooted in Mumbai • Respected Worldwide","mr":"मुंबैकरांचा विश्वास • जगभरात नावलौकिक","hi":"मुंबई में जड़ें • दुनिया भर में सम्मानित"},
        {"en":"Rooted in Mumbai &bull; Respected Worldwide","mr":"मुंबैकरांचा विश्वास • जगभरात नावलौकिक","hi":"मुंबई में जड़ें • दुनिया भर में सम्मानित"},
        {"en":"About Dream Travelkar","mr":"ड्रीम ट्रॅव्हलकरबद्दल","hi":"ड्रीम ट्रॅव्हलकर के बारे में"},
        {"en":"Explore All 12+ Destinations &rarr;","mr":"सर्व १२+ पर्यटन स्थळे पहा →","hi":"सभी 12+ प्रमुख गंतव्य देखें →"},
        {"en":"Explore All 12+ Destinations →","mr":"सर्व १२+ पर्यटन स्थळे पहा →","hi":"सभी 12+ प्रमुख गंतव्य देखें →"},
        {"en":"View All Destinations &rarr;","mr":"सर्व पर्यटन स्थळे पहा →","hi":"सभी गंतव्य देखें →"},
        {"en":"View All Destinations →","mr":"सर्व पर्यटन स्थळे पहा →","hi":"सभी गंतव्य देखें →"},
        {"en":"Kerala Backwaters & Munnar","mr":"केरळ बॅकवॉटर्स व मुन्नार","hi":"केरल बैकवाटर्स और मुन्नार"},
        {"en":"Bali Tropical Paradise","mr":"बाली ट्रॉपिकल नंदनवन","hi":"बाली ट्रॉपिकल पैराडाइज"},
        {"en":"Singapore & Sentosa","mr":"सिंगापूर व सेंटोसा","hi":"सिंगापुर और सेंटोसा"},
        {"en":"Signed in as","mr":"लॉगिन केले आहे","hi":"लॉग इन हैं"},
        {"en":"VIP Explorer","mr":"व्ही.आय.पी. एक्सप्लोरर","hi":"वीआईपी एक्सप्लोरर"},
        {"en":"Dashboard","mr":"डॅशबोर्ड","hi":"डैशबोर्ड"},
        {"en":"My Trips","mr":"माझ्या सहली","hi":"मेरी यात्राएं"},
        {"en":"Himachal Pradesh","mr":"हिमाचल प्रदेश","hi":"हिमाचल प्रदेश"},
        {"en":"Thailand","mr":"थायलंड","hi":"थाईलैंड"},
        {"en":"Dubai","mr":"दुबई","hi":"दुबई"},
        {"en":"Bali","mr":"बाली","hi":"बाली"},
        {"en":"Switzerland","mr":"स्वित्झर्लंड","hi":"स्विट्जरलैंड"},
        {"en":"Language","mr":"भाषा निवडा","hi":"भाषा चुनें"},
        {"en":"+91 9867807837 (Worli, Mumbai)","mr":"+९१ ९८६७८०७८३७ (वरळी, मुंबई)","hi":"+91 9867807837 (वर्ली, मुंबई)"},
        {"en":"Filter","mr":"फिल्टर करा","hi":"फिल्टर करें"},
        {"en":"Customize","mr":"कस्टमाइझ टूर","hi":"कस्टमाइज"},
        {"en":"All Types (India & World)","mr":"सर्व प्रकार (भारत व जग)","hi":"सभी प्रकार (भारत और विश्व)"},
        {"en":"All Types (India &amp; World)","mr":"सर्व प्रकार (भारत व जग)","hi":"सभी प्रकार (भारत और विश्व)"},
        {"en":"India Domestic Tours","mr":"भारतीय देशांतर्गत सहली","hi":"भारतीय घरेलू टूर्स"},
        {"en":"International Tours","mr":"आंतरराष्ट्रीय सहली","hi":"अंतरराष्ट्रीय टूर्स"},
        {"en":"Any Budget","mr":"कोणतेही बजेट","hi":"कोई भी बजट"},
        {"en":"Up to ₹20,000","mr":"₹२०,००० पर्यंत","hi":"₹20,000 तक"},
        {"en":"Up to ₹30,000","mr":"₹३०,००० पर्यंत","hi":"₹30,000 तक"},
        {"en":"Up to ₹50,000","mr":"₹५०,००० पर्यंत","hi":"₹50,000 तक"},
        {"en":"Up to ₹1,00,000","mr":"₹१,००,००० पर्यंत","hi":"₹1,00,000 तक"},
        {"en":"Search By Name / Place","mr":"नाव किंवा ठिकाणावरून शोधा","hi":"नाम या स्थान से खोजें"},
        {"en":"Tour Category","mr":"टूर श्रेणी","hi":"टूर श्रेणी"},
        {"en":"Max Budget (₹)","mr":"कमाल बजेट (₹)","hi":"अधिकतम बजट (₹)"},
        {"en":"100% Demo Booking Active","mr":"१००% डेमो बुकिंग उपलब्ध","hi":"100% डेमो बुकिंग उपलब्ध"},
        {"en":"100% Demo Booking Available","mr":"१००% डेमो बुकिंग उपलब्ध","hi":"100% डेमो बुकिंग उपलब्ध"},
        {"en":"Explore Jaipur, Jodhpur, Jaisalmer & Udaipur. Complete with heritage fort tours, Sam dunes camel safari, royal puppet shows, and authentic Marwari hospitality.","mr":"जयपूर, जोधपूर, जैसलमेर आणि उदयपूरची सफर. ऐतिहासिक किल्ले, सॅम सँड ड्युन्स उंट सफारी, राजस्थानी कठपुतळी शो आणि अस्सल मारवाडी आदरातिथ्य.","hi":"जयपुर, जोधपुर, जैसलमेर और उदयपुर का भ्रमण। ऐतिहासिक किले, सैम ड्यून्स ऊंट सफारी, शाही कठपुतली शो और प्रामाणिक मारवाड़ी आतिथ्य।"},
        {"en":"4-Star Heritage Haveli & Luxury Desert Resort","mr":"४-स्टार हेरिटेज हवेली व लक्झरी डेझर्ट रिसॉर्ट","hi":"4-स्टार हेरिटेज हवेली और लक्जरी डेजर्ट रिसॉर्ट"},
        {"en":"AC Luxury Tempo Traveler / Private Sedan with Experienced Chauffeur","mr":"वातानुकूलित लक्झरी टेम्पो ट्रॅव्हलर / अनुभवी चालकासह खाजगी कार","hi":"एसी लक्जरी टेम्पो ट्रैवलर / अनुभवी चालक के साथ निजी सेडान"},
        {"en":"Experience Munnar's rolling tea carpets, Periyar spice plantations, an overnight traditional Alleppey houseboat cruise, and the golden shores of Kovalam.","mr":"मुन्नारच्या चहाचे मळे, पेरियार मसाल्यांच्या बागा, अलेप्पी पारंपारिक हाऊसबोट मुक्काम आणि कोवलमचा नयनरम्य समुद्रकिनारा अनुभव घ्या.","hi":"मुन्नार के चाय के बागान, पेरियार मसाला बागान, अल्लेप्पी पारंपरिक हाउसबोट प्रवास और कोवलम के सुनहरे समुद्र तट का आनंद लें।"},
        {"en":"4-Star Hill Resorts & Private Deluxe Air-Conditioned Houseboat","mr":"४-स्टार हिल रिसॉर्ट्स व खाजगी डिलक्स एसी हाऊसबोट","hi":"4-स्टार हिल रिसॉर्ट्स और निजी डीलक्स वातानुकूलित हाउसबोट"},
        {"en":"Private AC Vehicle throughout the tour with English/Hindi speaking driver","mr":"संपूर्ण सहलीसाठी इंग्रजी/हिंदी भाषक चालकासह खाजगी एसी वाहन","hi":"अंग्रेजी/हिंदी भाषी चालक के साथ पूरे दौरे में निजी एसी वाहन"},
        {"en":"Explore the queen of hills Shimla, Kufri snow viewpoint, Kullu valley shawl factories, Manali Solang valley, and the world-famous Atal Tunnel.","mr":"टेकड्यांची राणी शिमला, कुफरी स्नो पॉईंट, कुलू व्हॅली शॉल फॅक्टरी, मनाली सोलांग व्हॅली आणि जगप्रसिद्ध अटल टनेलची सफर.","hi":"पहाड़ों की रानी शिमला, कुफरी स्नो व्यूप्वाइंट, कुल्लू घाटी शॉल कारखाने, मनाली सोलांग घाटी और विश्व प्रसिद्ध अटल टनल का अन्वेषण करें।"},
        {"en":"3 & 4-Star Premium Mountain View Hotels","mr":"३ व ४-स्टार प्रीमियम माउंटन व्ह्यू हॉटेल्स","hi":"3 और 4-स्टार प्रीमियम माउंटेन व्यू होटल"},
        {"en":"Comfortable AC/Heated Deluxe Vehicle for all transfers","mr":"सर्व प्रवासासाठी आरामदायक एसी/हीटेड डिलक्स वाहन","hi":"सभी यात्राओं के लिए आरामदायक एसी/हीटेड डीलक्स वाहन"},
        {"en":"Crystal turquoise waters, private luxury cruise between islands, world-famed Radhanagar Beach, Elephant Beach snorkeling, and Cellular Jail history.","mr":"पारदर्शक निळेशार पाणी, बेटांमधील खाजगी लक्झरी क्रूझ, जगप्रसिद्ध राधानगर बीच, एलिफंट बीच स्नॉर्कलिंग आणि ऐतिहासिक सेल्युलर जेल.","hi":"क्रिस्टल फ़िरोज़ा पानी, द्वीपों के बीच निजी लक्जरी क्रूज, विश्व प्रसिद्ध राधानगर बीच, एलिफेंट बीच स्नॉर्कलिंग और सेलुलर जेल का इतिहास।"},
        {"en":"4-Star Beach Resorts & Premium Port Blair Stay","mr":"४-स्टार बीच रिसॉर्ट्स व प्रीमियम पोर्ट ब्लेअर मुक्काम","hi":"4-स्टार बीच रिसॉर्ट्स और प्रीमियम पोर्ट ब्लेयर प्रवास"},
        {"en":"High-speed AC Catamaran Cruise (Makruzz/Nautika) + AC Car","mr":"हाय-स्पीड एसी कॅटामारन क्रूझ (मक्रुझ/नौटिका) + खाजगी एसी कार","hi":"हाई-स्पीड एसी कटमरैन क्रूज (मक्रुज/नौटिका) + एसी कार"},
        {"en":"A tribute to Chhatrapati Shivaji Maharaj's coastal naval heritage. Sindhudurg Fort, scuba at Malvan, Ganpatipule beach temple, and authentic Konkani hospitality.","mr":"छत्रपती शिवाजी महाराजांच्या सागरी आरमाराला वंदन. सिंधुदुर्ग किल्ला, मालवण स्कूबा डायव्हिंग, गणपतीपुळे मंदिर आणि अस्सल कोकणी आदरातिथ्य.","hi":"छत्रपति शिवाजी महाराज की नौसेना धरोहर को नमन। सिंधुदुर्ग किला, मालवण में स्कूबा, गणपतिपुले मंदिर और प्रामाणिक कोंकणी आतिथ्य।"},
        {"en":"Premium Beachfront Konkani Eco-Resorts","mr":"प्रीमियम बीचफ्रंट कोकणी इको-रिसॉर्ट्स","hi":"प्रीमियम बीचफ्रंट कोंकणी इको-रिसॉर्ट्स"},
        {"en":"AC Pushback Coach / Private Vehicle","mr":"वातानुकूलित पुशबॅक कोच / खाजगी वाहन","hi":"एसी पुशबैक कोच / निजी वाहन"},
        {"en":"Deluxe houseboat stay on Dal Lake, romantic Shikara ride, high-altitude Gulmarg Gondola ride, Betaab valley in Pahalgam, and saffron fields.","mr":"दल लेकवर डिलक्स हाऊसबोट मुक्काम, रोमँटिक शिकारा राईड, गुलमर्ग गोंडोला राईड, पहलगाममधील बेताब व्हॅली आणि केशर शेतीची सफर.","hi":"डल झील पर डीलक्स हाउसबोट प्रवास, रोमांटिक शिकारा की सवारी, गुलमर्ग गोंडोला की सवारी, पहलगाम में बेताब घाटी और केसर के खेत।"},
        {"en":"4-Star Hotels & Premium Handcrafted Cedar Houseboat","mr":"४-स्टार हॉटेल्स व प्रीमियम हँडक्राफ्टेड देवदार हाऊसबोट","hi":"4-स्टार होटल और प्रीमियम नक्काशीदार देवदार हाउसबोट"},
        {"en":"Heated AC Private Innova / Tempo Traveler","mr":"हीटेड एसी खाजगी इनोव्हा / टेम्पो ट्रॅव्हलर","hi":"हीटेड एसी निजी इनोवा / टेम्पो ट्रैवलर"},
        {"en":"Our best-selling international tour! Coral Island speed boat ride with Indian lunch, Alcazar Cabaret Show, Golden Buddha temple, and Chao Phraya cruise.","mr":"आमची सर्वाधिक लोकप्रिय आंतरराष्ट्रीय सहल! भारतीय जेवणासह कोरल आयलंड स्पीडबोट राईड, अल्काझार शो, गोल्डन बुद्ध मंदिर आणि चाओ फ्राया क्रूझ.","hi":"हमारा सबसे लोकप्रिय अंतरराष्ट्रीय टूर! भारतीय भोजन के साथ कोरल आइलैंड स्पीडबोट राइड, अलकज़ार शो, गोल्डन बुद्धा मंदिर और चाओ फ्राया क्रूज़।"},
        {"en":"4-Star Hotels with Daily Indian Breakfast Options","mr":"दररोज भारतीय नाश्ता पर्यायासह ४-स्टार हॉटेल्स","hi":"दैनिक भारतीय नाश्ते के विकल्प के साथ 4-स्टार होटल"},
        {"en":"AC Luxury Coach with English-speaking licensed guide","mr":"इंग्रजी भाषक परवानाधारक गाईडसह एसी लक्झरी कोच","hi":"अंग्रेजी भाषी लाइसेंस प्राप्त गाइड के साथ एसी लक्जरी कोच"},
        {"en":"Burj Khalifa 124th floor observatory, 4x4 desert dune bashing with barbecue dinner, Marina Dhow cruise, Miracle Garden, and Dubai Mall fountain show.","mr":"बुर्ज खलिफा १२४ व्या मजल्यावरील वेधशाळा, बार्बेक्यू जेवणासह ४x४ डेझर्ट सफारी, मरिना धो क्रूझ, मिरॅकल गार्डन आणि दुबई मॉल फाउंटन शो.","hi":"बुर्ज खलीफा 124वीं मंजिल वेधशाला, बारबेक्यू डिनर के साथ 4x4 डेजर्ट सफारी, मरीना धो क्रूज़, मिरेकल गार्डन और दुबई मॉल फाउंटेन शो।"},
        {"en":"4-Star Deluxe City Hotel (Downtown / Deira / Al Barsha)","mr":"४-स्टार डिलक्स सिटी हॉटेल (डाउनटाउन / डेरा / अल बर्शा)","hi":"4-स्टार डीलक्स सिटी होटल (डाउनटाउन / डेरा / अल बरशा)"},
        {"en":"AC Tourist Coach & 4x4 Land Cruisers for Safari","mr":"एसी टुरिस्ट कोच आणि सफारीसाठी ४x४ लँड क्रूझर्स","hi":"एसी टूरिस्ट कोच और सफारी के लिए 4x4 लैंड क्रूजर"},
        {"en":"Private pool villa stay, iconic Aloha Ubud jungle swing, sacred Tanah Lot temple at sunset, Uluwatu fire dance, and Nusa Penida island speedboat tour.","mr":"खाजगी पूल व्हिला मुक्काम, अलोहा उबुद जंगल स्विंग, सूर्यास्ताच्या वेळी तनाह लोट मंदिर, उलुवातु फायर डान्स आणि नुसा पेनिडा बेट स्पीडबोट टूर.","hi":"निजी पूल विला प्रवास, अलोहा उबुद जंगल स्विंग, सूर्यास्त के समय तानाह लोट मंदिर, उलुवातु फायर डांस और नुसा पेनिडा द्वीप स्पीडबोट टूर।"},
        {"en":"4N 4-Star Resort + 2N Private Luxury Pool Villa","mr":"४ रात्री ४-स्टार रिसॉर्ट + २ रात्री खाजगी लक्झरी पूल व्हिला","hi":"4 रातें 4-स्टार रिसॉर्ट + 2 रातें निजी लक्जरी पूल विला"},
        {"en":"Private AC Car with dedicated English-speaking Balinese driver-guide","mr":"स्थानिक इंग्रजी भाषक ड्रायव्हर-गाईडसह खाजगी एसी कार","hi":"समर्पित अंग्रेजी भाषी बालिनी चालक-गाइड के साथ निजी एसी कार"},
        {"en":"Top of Europe - Jungfraujoch cogwheel railway, revolving Rotair cable car to Mt. Titlis, Lake Lucerne cruise, and the fairytale landscapes of Interlaken.","mr":"टॉप ऑफ युरोप - जुंगफ्राउजॉक कॉगव्हील रेल्वे, रोतेर केबल कारने माउंट टिटलिस, लेक ल्युसर्न क्रूझ आणि इंटरलाकेनची मनमोहक दृश्ये.","hi":"टॉप ऑफ यूरोप - जंगफ्राउजोच कॉगव्हील रेलवे, माउंट टिटलिस रोटेयर केबल कार, लेक ल्यूसर्न क्रूज और इंटरलेकन के परीकथा जैसे दृश्य।"},
        {"en":"4-Star Swiss Heritage Hotels","mr":"४-स्टार स्विस हेरिटेज हॉटेल्स","hi":"4-स्टार स्विस हेरिटेज होटल"},
        {"en":"Swiss Travel Pass (Unlimited Trains, Boats & Buses across Switzerland)","mr":"स्विस ट्रॅव्हल पास (संपूर्ण स्वित्झर्लंडमध्ये अमर्यादित ट्रेन, बोट आणि बस प्रवास)","hi":"स्विस ट्रैवल पास (पूरे स्विट्जरलैंड में असीमित ट्रेन, नाव और बस यात्रा)"},
        {"en":"Universal Studios thrills, iconic Gardens by the Bay Flower Dome & Cloud Forest, Night Safari, and Sentosa cable car ride.","mr":"युनिव्हर्सल स्टुडिओज, गार्डन्स बाय द बे फ्लॉवर डोम व क्लाऊड फॉरेस्ट, नाईट सफारी आणि सेंटोसा केबल कार राईड.","hi":"यूनिवर्सल स्टूडियोज, गार्डन्स बाय द बे फ्लावर डोम और क्लाउड फॉरेस्ट, नाइट सफारी और सेंटोसा केबल कार की सवारी।"},
        {"en":"4-Star Hotel near Orchard Road or Clarke Quay","mr":"ऑर्चर्ड रोड किंवा क्लार्क क्वे जवळ ४-स्टार हॉटेल","hi":"ऑर्चर्ड रोड या क्लार्क क्वे के पास 4-स्टार होटल"},
        {"en":"AC Tourist Coach & MRT Pass included","mr":"एसी टुरिस्ट कोच आणि एमआरटी पास समाविष्ट","hi":"एसी टूरिस्ट कोच और एमआरटी पास शामिल"},
        {"en":"5-star Ha Long Bay overnight cruise with kayaking through limestone caves, lantern boat in ancient Hoi An, and Ba Na Hills Golden Hand Bridge.","mr":"५-स्टार हा लाँग बे ओव्हरनाईट क्रूझ, चुनखडीच्या गुहांमधून कयाकिंग, प्राचीन होई आन मधील कंदील बोट आणि बा ना हिल्स गोल्डन हँड ब्रिज.","hi":"5-स्टार हा लोंग बे ओवरनाइट क्रूज, चूना पत्थर की गुफाओं में कायाकिंग, प्राचीन होई आन में लालटेन बोट और बा ना हिल्स गोल्डन हैंड ब्रिज।"},
        {"en":"4-Star Boutique Hotels & 5-Star Luxury Bay Cruise","mr":"४-स्टार बुटीक हॉटेल्स आणि ५-स्टार लक्झरी बे क्रूझ","hi":"4-स्टार बुटीक होटल और 5-स्टार लक्जरी बे क्रूज"},
        {"en":"Private AC Vehicle & Domestic Flight Hanoi to Da Nang","mr":"खाजगी एसी वाहन आणि हनोई ते दा नांग देशांतर्गत विमान प्रवास","hi":"निजी एसी वाहन और हनोई से दा नांग घरेलू उड़ान"},
        {"en":"Kerala Backwaters, Munnar Hills & Kovalam Serenade","mr":"केरळ बॅकवॉटर्स, मुन्नार हिल्स व कोवलम सेरेनेड","hi":"केरल बैकवाटर्स, मुन्नार हिल्स और कोवलम सेरेनेड"},
        {"en":"Kerala Backwaters, Munnar Hills &amp; Kovalam Serenade","mr":"केरळ बॅकवॉटर्स, मुन्नार हिल्स व कोवलम सेरेनेड","hi":"केरल बैकवाटर्स, मुन्नार हिल्स और कोवलम सेरेनेड"},
        {"en":"Heaven on Earth - Kashmir Valley & Gulmarg Gondola","mr":"पृथ्वीवरील स्वर्ग - काश्मीर खोरे व गुलमर्ग गोंडोला","hi":"धरती का स्वर्ग - कश्मीर घाटी और गुलमर्ग गोंडोला"},
        {"en":"Heaven on Earth – Kashmir Valley & Gulmarg Gondola","mr":"पृथ्वीवरील स्वर्ग - काश्मीर खोरे व गुलमर्ग गोंडोला","hi":"धरती का स्वर्ग - कश्मीर घाटी और गुलमर्ग गोंडोला"},
        {"en":"Heaven on Earth - Kashmir Valley &amp; Gulmarg Gondola","mr":"पृथ्वीवरील स्वर्ग - काश्मीर खोरे व गुलमर्ग गोंडोला","hi":"धरती का स्वर्ग - कश्मीर घाटी और गुलमर्ग गोंडोला"},
        {"en":"Enchanting Dubai Futuristic Extravaganza","mr":"मोहमयी दुबई आधुनिक भव्य सहल","hi":"मंत्रमुग्ध दुबई आधुनिक भव्य टूर"},
        {"en":"Tropical Bali Honeymoon & Ubud Sanctuary Retreat","mr":"उष्णकटिबंधीय बाली हनीमून व उबुद सॅन्क्चुअरी रिट्रीट","hi":"ट्रॉपिकल बाली हनीमून और उबुद सैंक्चुअरी रिट्रीट"},
        {"en":"Tropical Bali Honeymoon &amp; Ubud Sanctuary Retreat","mr":"उष्णकटिबंधीय बाली हनीमून व उबुद सॅन्क्चुअरी रिट्रीट","hi":"ट्रॉपिकल बाली हनीमून और उबुद सैंक्चुअरी रिट्रीट"},
        {"en":"Scenic Switzerland Alpine Wonders & Jungfraujoch","mr":"नयनरम्य स्वित्झर्लंड आल्प्स सौंदर्य व जुंगफ्राउजॉक","hi":"नयनाभिराम स्विट्जरलैंड आल्प्स सौंदर्य और जंगफ्राउजोच"},
        {"en":"Scenic Switzerland Alpine Wonders &amp; Jungfraujoch","mr":"नयनरम्य स्वित्झर्लंड आल्प्स सौंदर्य व जुंगफ्राउजॉक","hi":"नयनाभिराम स्विट्जरलैंड आल्प्स सौंदर्य और जंगफ्राउजोच"},
        {"en":"Spectacular Singapore & Sentosa Island Fantasy","mr":"भव्य सिंगापूर व सेंटोसा बेट फँटसी","hi":"शानदार सिंगापुर और सेंटोसा द्वीप फैंटेसी"},
        {"en":"Spectacular Singapore &amp; Sentosa Island Fantasy","mr":"भव्य सिंगापूर व सेंटोसा बेट फँटसी","hi":"शानदार सिंगापुर और सेंटोसा द्वीप फैंटेसी"},
        {"en":"Mystical Vietnam - Hanoi, Ha Long Bay & Da Nang Hand Bridge","mr":"रहस्यमयी व्हिएतनाम - हनोई, हा लाँग बे व दा नांग हँड ब्रिज","hi":"रहस्यमयी वियतनाम - हनोई, हा लोंग बे और दा नांग हैंड ब्रिज"},
        {"en":"Mystical Vietnam – Hanoi, Ha Long Bay & Da Nang Hand Bridge","mr":"रहस्यमयी व्हिएतनाम - हनोई, हा लाँग बे व दा नांग हँड ब्रिज","hi":"रहस्यमयी वियतनाम - हनोई, हा लोंग बे और दा नांग हैंड ब्रिज"},
        {"en":"Mystical Vietnam - Hanoi, Ha Long Bay &amp; Da Nang Hand Bridge","mr":"रहस्यमयी व्हिएतनाम - हनोई, हा लाँग बे व दा नांग हँड ब्रिज","hi":"रहस्यमयी वियतनाम - हनोई, हा लोंग बे और दा नांग हैंड ब्रिज"}
    ];

    /**
     * Text Normalizer for comparison and phrase matching
     */
    const norm = (s) => (s || '')
        .replace(/[\u201C\u201D\u2018\u2019"]/g, '')
        .replace(/&ndash;|–/g, '-')
        .replace(/&amp;/g, '&')
        .replace(/&bull;|•/g, '•')
        .replace(/&copy;|©/g, '©')
        .replace(/\s+/g, ' ')
        .trim();

    /**
     * Get Current Active Language code (mr, en, or hi)
     */
    function getCurrentLanguage() {
        let saved = localStorage.getItem(STORAGE_KEY);
        if (!saved || !DICTIONARY[saved]) {
            // Default to Marathi if user started with मी मावळा, else English
            saved = 'mr';
        }
        return saved;
    }

    /**
     * Set Language, persist to storage, and apply to DOM
     */
    function setLanguage(lang) {
        if (!DICTIONARY[lang]) lang = 'en';

        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        // 1. Update Header Trigger Labels & Active Checkmarks
        updateLanguageSelectorUI(lang);

        // 2. Translate elements with data-i18n attributes
        applyDataAttributes(lang);

        // 3. Scan & translate DOM text matching known phrases
        translateKnownPhrases(lang);

        // 4. Translate dynamic destinations & packages in memory if data exists
        translateDynamicContent(lang);

        // 5. Dispatch Custom Event for external scripts (chatbot, bookings, packages)
        window.dispatchEvent(new CustomEvent('dtLanguageChanged', { detail: { lang } }));
    }

    /**
     * Update Language Selector dropdown and drawer pills UI
     */
    function updateLanguageSelectorUI(lang) {
        // Desktop Trigger Button Label
        const triggerLabel = document.querySelector('.current-lang-label');
        if (triggerLabel) {
            if (lang === 'mr') triggerLabel.textContent = 'मी मावळा';
            else if (lang === 'hi') triggerLabel.textContent = 'हिन्दी';
            else triggerLabel.textContent = 'English';
        }

        // Desktop Dropdown Options Active State
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            }
        });

        // Mobile Drawer Pills Active State
        document.querySelectorAll('.drawer-lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Apply translations to data-i18n and data-i18n-placeholder elements
     */
    function applyDataAttributes(lang) {
        const dict = DICTIONARY[lang];
        if (!dict) return;

        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // If element contains child icons or badges, replace only the text node
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + dict[key]));
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });
    }

    /**
     * Translate known phrases across standard DOM text nodes
     */
    function translateKnownPhrases(lang) {
        if (!PHRASE_MAP || !PHRASE_MAP.length) return;

        // Skip translation inside script, style, textarea, input, code elements
        const ignoreTags = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'NOSCRIPT']);
        const filterReject = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_REJECT : 2;
        const filterAccept = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_ACCEPT : 1;
        const filterSkip = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_SKIP : 3;
        const showText = typeof NodeFilter !== 'undefined' ? NodeFilter.SHOW_TEXT : 4;

        if (!document.body || typeof document.createTreeWalker !== 'function') return;

        const walker = document.createTreeWalker(
            document.body,
            showText,
            {
                acceptNode: function (node) {
                    if (!node.parentElement || ignoreTags.has(node.parentElement.tagName)) {
                        return filterReject;
                    }
                    const trimmed = node.nodeValue.trim();
                    if (trimmed.length > 1) {
                        return filterAccept;
                    }
                    return filterSkip;
                }
            },
            false
        );

        const nodesToUpdate = [];
        while (walker.nextNode()) {
            nodesToUpdate.push(walker.currentNode);
        }

        const norm = (s) => (s || '')
            .replace(/[\u201C\u201D\u2018\u2019"]/g, '')
            .replace(/&ndash;|–/g, '-')
            .replace(/&amp;/g, '&')
            .replace(/&bull;|•/g, '•')
            .replace(/\s+/g, ' ')
            .trim();

        nodesToUpdate.forEach(node => {
            const currentVal = node.nodeValue;
            const currentNorm = norm(currentVal);
            if (!currentNorm) return;

            for (let i = 0; i < PHRASE_MAP.length; i++) {
                const item = PHRASE_MAP[i];
                if (!item || !item.en) continue;
                // Check if normalized current text matches English, Marathi, or Hindi version
                if (currentNorm === norm(item.en) || currentNorm === norm(item.mr) || currentNorm === norm(item.hi)) {
                    let replacement = item[lang] || item.en;
                    if (replacement && norm(replacement) !== currentNorm) {
                        // Preserve leading/trailing whitespace and quotes if originally present
                        const leadingSpace = currentVal.match(/^\s*/)[0];
                        const trailingSpace = currentVal.match(/\s*$/)[0];
                        const hasStartQuote = /^["“]/.test(currentVal.trim());
                        const hasEndQuote = /["”]$/.test(currentVal.trim());

                        if (hasStartQuote && !replacement.startsWith('"') && !replacement.startsWith('“')) {
                            replacement = '"' + replacement;
                        }
                        if (hasEndQuote && !replacement.endsWith('"') && !replacement.endsWith('”')) {
                            replacement = replacement + '"';
                        }

                        node.nodeValue = leadingSpace + replacement + trailingSpace;
                    }
                    break;
                }
            }
        });

        // Also translate form input and textarea placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            const curPh = norm(el.placeholder);
            if (!curPh) return;
            for (let i = 0; i < PHRASE_MAP.length; i++) {
                const item = PHRASE_MAP[i];
                if (!item || !item.en) continue;
                if (curPh === norm(item.en) || curPh === norm(item.mr) || curPh === norm(item.hi)) {
                    el.placeholder = item[lang] || item.en;
                    break;
                }
            }
        });
    }

    /**
     * Translate dynamic destinations cards or package cards in the DOM
     */
    function translateDynamicContent(lang) {
        // Translate destination card titles
        document.querySelectorAll('.dest-card, .dest-package-row-card').forEach(card => {
            const titleLink = card.querySelector('h3, h4 a, h4');
            if (!titleLink) return;

            const text = titleLink.textContent.trim();
            // Check against DESTINATIONS_I18N
            for (const key in DESTINATIONS_I18N) {
                const d = DESTINATIONS_I18N[key];
                if (text === d.en.name || text === d.mr.name || text === d.hi.name) {
                    titleLink.textContent = d[lang].name;
                    break;
                }
            }
        });
    }

    /**
     * Helper to get translated string by key
     */
    function t(key, defaultText) {
        const lang = getCurrentLanguage();
        if (DICTIONARY[lang] && DICTIONARY[lang][key]) {
            return DICTIONARY[lang][key];
        }
        return defaultText || key;
    }

    /**
     * Translate any given text into specified or current language using PHRASE_MAP
     */
    function translateText(text, lang) {
        if (!text) return '';
        if (!lang) lang = getCurrentLanguage();
        const curNorm = norm(text);
        if (!curNorm) return text;
        for (let i = 0; i < PHRASE_MAP.length; i++) {
            const item = PHRASE_MAP[i];
            if (!item || !item.en) continue;
            if (curNorm === norm(item.en) || curNorm === norm(item.mr) || curNorm === norm(item.hi)) {
                return item[lang] || item.en;
            }
        }
        return text;
    }

    /**
     * Initialize Language System
     */
    function init() {
        const initialLang = getCurrentLanguage();

        // Bind Desktop and Drawer Click Listeners
        const langTriggers = document.querySelectorAll('.lang-option, .drawer-lang-btn');
        langTriggers.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const code = btn.getAttribute('data-lang');
                if (code) {
                    setLanguage(code);

                    // Close desktop nav dropdowns if open
                    document.querySelectorAll('.dropdown-open, .nav-lang-dropdown, .has-dropdown, .nav-account-dropdown').forEach(el => {
                        el.classList.remove('dropdown-open');
                    });
                    document.querySelectorAll('.lang-trigger-btn, .nav-link[aria-expanded], .account-user-trigger').forEach(el => {
                        el.setAttribute('aria-expanded', 'false');
                    });

                    // Show notification
                    const langNames = { mr: 'मराठी (मी मावळा)', hi: 'हिन्दी (Hindi)', en: 'English' };
                    if (typeof StorageManager !== 'undefined' && StorageManager.showToast) {
                        StorageManager.showToast(`भाषा बदलली: ${langNames[code]}`, 'info');
                    }
                }
            });
        });

        // Apply initially
        setLanguage(initialLang);
    }

    return {
        init: init,
        setLanguage: setLanguage,
        getCurrentLanguage: getCurrentLanguage,
        t: t,
        translateText: translateText,
        translateKnownPhrases: translateKnownPhrases,
        dictionary: DICTIONARY,
        destinations: DESTINATIONS_I18N
    };
})();

// Attach to window for global access
if (typeof window !== 'undefined') {
    window.I18nManager = I18nManager;
}

// Auto-initialize when DOM is ready or immediately if already loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            I18nManager.init();
        });
    } else {
        I18nManager.init();
    }
}
