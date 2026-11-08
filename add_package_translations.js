const fs = require('fs');

const packagePhrases = [
    // Filter controls & buttons
    { en: "Filter", mr: "फिल्टर करा", hi: "फिल्टर करें" },
    { en: "Customize", mr: "कस्टमाइझ टूर", hi: "कस्टमाइज" },
    { en: "All Types (India & World)", mr: "सर्व प्रकार (भारत व जग)", hi: "सभी प्रकार (भारत और विश्व)" },
    { en: "All Types (India &amp; World)", mr: "सर्व प्रकार (भारत व जग)", hi: "सभी प्रकार (भारत और विश्व)" },
    { en: "India Domestic Tours", mr: "भारतीय देशांतर्गत सहली", hi: "भारतीय घरेलू टूर्स" },
    { en: "International Tours", mr: "आंतरराष्ट्रीय सहली", hi: "अंतरराष्ट्रीय टूर्स" },
    { en: "Any Budget", mr: "कोणतेही बजेट", hi: "कोई भी बजट" },
    { en: "Up to ₹20,000", mr: "₹२०,००० पर्यंत", hi: "₹20,000 तक" },
    { en: "Up to ₹30,000", mr: "₹३०,००० पर्यंत", hi: "₹30,000 तक" },
    { en: "Up to ₹50,000", mr: "₹५०,००० पर्यंत", hi: "₹50,000 तक" },
    { en: "Up to ₹1,00,000", mr: "₹१,००,००० पर्यंत", hi: "₹1,00,000 तक" },
    { en: "Search By Name / Place", mr: "नाव किंवा ठिकाणावरून शोधा", hi: "नाम या स्थान से खोजें" },
    { en: "Tour Category", mr: "टूर श्रेणी", hi: "टूर श्रेणी" },
    { en: "Max Budget (₹)", mr: "कमाल बजेट (₹)", hi: "अधिकतम बजट (₹)" },
    { en: "100% Demo Booking Active", mr: "१००% डेमो बुकिंग उपलब्ध", hi: "100% डेमो बुकिंग उपलब्ध" },
    { en: "100% Demo Booking Available", mr: "१००% डेमो बुकिंग उपलब्ध", hi: "100% डेमो बुकिंग उपलब्ध" },

    // Package 1: Rajasthan
    {
        en: "Explore Jaipur, Jodhpur, Jaisalmer & Udaipur. Complete with heritage fort tours, Sam dunes camel safari, royal puppet shows, and authentic Marwari hospitality.",
        mr: "जयपूर, जोधपूर, जैसलमेर आणि उदयपूरची सफर. ऐतिहासिक किल्ले, सॅम सँड ड्युन्स उंट सफारी, राजस्थानी कठपुतळी शो आणि अस्सल मारवाडी आदरातिथ्य.",
        hi: "जयपुर, जोधपुर, जैसलमेर और उदयपुर का भ्रमण। ऐतिहासिक किले, सैम ड्यून्स ऊंट सफारी, शाही कठपुतली शो और प्रामाणिक मारवाड़ी आतिथ्य।"
    },
    {
        en: "4-Star Heritage Haveli & Luxury Desert Resort",
        mr: "४-स्टार हेरिटेज हवेली व लक्झरी डेझर्ट रिसॉर्ट",
        hi: "4-स्टार हेरिटेज हवेली और लक्जरी डेजर्ट रिसॉर्ट"
    },
    {
        en: "AC Luxury Tempo Traveler / Private Sedan with Experienced Chauffeur",
        mr: "वातानुकूलित लक्झरी टेम्पो ट्रॅव्हलर / अनुभवी चालकासह खाजगी कार",
        hi: "एसी लक्जरी टेम्पो ट्रैवलर / अनुभवी चालक के साथ निजी सेडान"
    },

    // Package 2: Kerala
    {
        en: "Experience Munnar's rolling tea carpets, Periyar spice plantations, an overnight traditional Alleppey houseboat cruise, and the golden shores of Kovalam.",
        mr: "मुन्नारच्या चहाचे मळे, पेरियार मसाल्यांच्या बागा, अलेप्पी पारंपारिक हाऊसबोट मुक्काम आणि कोवलमचा नयनरम्य समुद्रकिनारा अनुभव घ्या.",
        hi: "मुन्नार के चाय के बागान, पेरियार मसाला बागान, अल्लेप्पी पारंपरिक हाउसबोट प्रवास और कोवलम के सुनहरे समुद्र तट का आनंद लें।"
    },
    {
        en: "4-Star Hill Resorts & Private Deluxe Air-Conditioned Houseboat",
        mr: "४-स्टार हिल रिसॉर्ट्स व खाजगी डिलक्स एसी हाऊसबोट",
        hi: "4-स्टार हिल रिसॉर्ट्स और निजी डीलक्स वातानुकूलित हाउसबोट"
    },
    {
        en: "Private AC Vehicle throughout the tour with English/Hindi speaking driver",
        mr: "संपूर्ण सहलीसाठी इंग्रजी/हिंदी भाषक चालकासह खाजगी एसी वाहन",
        hi: "अंग्रेजी/हिंदी भाषी चालक के साथ पूरे दौरे में निजी एसी वाहन"
    },

    // Package 3: Himachal
    {
        en: "Explore the queen of hills Shimla, Kufri snow viewpoint, Kullu valley shawl factories, Manali Solang valley, and the world-famous Atal Tunnel.",
        mr: "टेकड्यांची राणी शिमला, कुफरी स्नो पॉईंट, कुलू व्हॅली शॉल फॅक्टरी, मनाली सोलांग व्हॅली आणि जगप्रसिद्ध अटल टनेलची सफर.",
        hi: "पहाड़ों की रानी शिमला, कुफरी स्नो व्यूप्वाइंट, कुल्लू घाटी शॉल कारखाने, मनाली सोलांग घाटी और विश्व प्रसिद्ध अटल टनल का अन्वेषण करें।"
    },
    {
        en: "3 & 4-Star Premium Mountain View Hotels",
        mr: "३ व ४-स्टार प्रीमियम माउंटन व्ह्यू हॉटेल्स",
        hi: "3 और 4-स्टार प्रीमियम माउंटेन व्यू होटल"
    },
    {
        en: "Comfortable AC/Heated Deluxe Vehicle for all transfers",
        mr: "सर्व प्रवासासाठी आरामदायक एसी/हीटेड डिलक्स वाहन",
        hi: "सभी यात्राओं के लिए आरामदायक एसी/हीटेड डीलक्स वाहन"
    },

    // Package 4: Andaman
    {
        en: "Crystal turquoise waters, private luxury cruise between islands, world-famed Radhanagar Beach, Elephant Beach snorkeling, and Cellular Jail history.",
        mr: "पारदर्शक निळेशार पाणी, बेटांमधील खाजगी लक्झरी क्रूझ, जगप्रसिद्ध राधानगर बीच, एलिफंट बीच स्नॉर्कलिंग आणि ऐतिहासिक सेल्युलर जेल.",
        hi: "क्रिस्टल फ़िरोज़ा पानी, द्वीपों के बीच निजी लक्जरी क्रूज, विश्व प्रसिद्ध राधानगर बीच, एलिफेंट बीच स्नॉर्कलिंग और सेलुलर जेल का इतिहास।"
    },
    {
        en: "4-Star Beach Resorts & Premium Port Blair Stay",
        mr: "४-स्टार बीच रिसॉर्ट्स व प्रीमियम पोर्ट ब्लेअर मुक्काम",
        hi: "4-स्टार बीच रिसॉर्ट्स और प्रीमियम पोर्ट ब्लेयर प्रवास"
    },
    {
        en: "High-speed AC Catamaran Cruise (Makruzz/Nautika) + AC Car",
        mr: "हाय-स्पीड एसी कॅटामारन क्रूझ (मक्रुझ/नौटिका) + खाजगी एसी कार",
        hi: "हाई-स्पीड एसी कटमरैन क्रूज (मक्रुज/नौटिका) + एसी कार"
    },

    // Package 5: Konkan
    {
        en: "A tribute to Chhatrapati Shivaji Maharaj's coastal naval heritage. Sindhudurg Fort, scuba at Malvan, Ganpatipule beach temple, and authentic Konkani hospitality.",
        mr: "छत्रपती शिवाजी महाराजांच्या सागरी आरमाराला वंदन. सिंधुदुर्ग किल्ला, मालवण स्कूबा डायव्हिंग, गणपतीपुळे मंदिर आणि अस्सल कोकणी आदरातिथ्य.",
        hi: "छत्रपति शिवाजी महाराज की नौसेना धरोहर को नमन। सिंधुदुर्ग किला, मालवण में स्कूबा, गणपतिपुले मंदिर और प्रामाणिक कोंकणी आतिथ्य।"
    },
    {
        en: "Premium Beachfront Konkani Eco-Resorts",
        mr: "प्रीमियम बीचफ्रंट कोकणी इको-रिसॉर्ट्स",
        hi: "प्रीमियम बीचफ्रंट कोंकणी इको-रिसॉर्ट्स"
    },
    {
        en: "AC Pushback Coach / Private Vehicle",
        mr: "वातानुकूलित पुशबॅक कोच / खाजगी वाहन",
        hi: "एसी पुशबैक कोच / निजी वाहन"
    },

    // Package 6: Kashmir
    {
        en: "Deluxe houseboat stay on Dal Lake, romantic Shikara ride, high-altitude Gulmarg Gondola ride, Betaab valley in Pahalgam, and saffron fields.",
        mr: "दल लेकवर डिलक्स हाऊसबोट मुक्काम, रोमँटिक शिकारा राईड, गुलमर्ग गोंडोला राईड, पहलगाममधील बेताब व्हॅली आणि केशर शेतीची सफर.",
        hi: "डल झील पर डीलक्स हाउसबोट प्रवास, रोमांटिक शिकारा की सवारी, गुलमर्ग गोंडोला की सवारी, पहलगाम में बेताब घाटी और केसर के खेत।"
    },
    {
        en: "4-Star Hotels & Premium Handcrafted Cedar Houseboat",
        mr: "४-स्टार हॉटेल्स व प्रीमियम हँडक्राफ्टेड देवदार हाऊसबोट",
        hi: "4-स्टार होटल और प्रीमियम नक्काशीदार देवदार हाउसबोट"
    },
    {
        en: "Heated AC Private Innova / Tempo Traveler",
        mr: "हीटेड एसी खाजगी इनोव्हा / टेम्पो ट्रॅव्हलर",
        hi: "हीटेड एसी निजी इनोवा / टेम्पो ट्रैवलर"
    },

    // Package 7: Thailand
    {
        en: "Our best-selling international tour! Coral Island speed boat ride with Indian lunch, Alcazar Cabaret Show, Golden Buddha temple, and Chao Phraya cruise.",
        mr: "आमची सर्वाधिक लोकप्रिय आंतरराष्ट्रीय सहल! भारतीय जेवणासह कोरल आयलंड स्पीडबोट राईड, अल्काझार शो, गोल्डन बुद्ध मंदिर आणि चाओ फ्राया क्रूझ.",
        hi: "हमारा सबसे लोकप्रिय अंतरराष्ट्रीय टूर! भारतीय भोजन के साथ कोरल आइलैंड स्पीडबोट राइड, अलकज़ार शो, गोल्डन बुद्धा मंदिर और चाओ फ्राया क्रूज़।"
    },
    {
        en: "4-Star Hotels with Daily Indian Breakfast Options",
        mr: "दररोज भारतीय नाश्ता पर्यायासह ४-स्टार हॉटेल्स",
        hi: "दैनिक भारतीय नाश्ते के विकल्प के साथ 4-स्टार होटल"
    },
    {
        en: "AC Luxury Coach with English-speaking licensed guide",
        mr: "इंग्रजी भाषक परवानाधारक गाईडसह एसी लक्झरी कोच",
        hi: "अंग्रेजी भाषी लाइसेंस प्राप्त गाइड के साथ एसी लक्जरी कोच"
    },

    // Package 8: Dubai
    {
        en: "Burj Khalifa 124th floor observatory, 4x4 desert dune bashing with barbecue dinner, Marina Dhow cruise, Miracle Garden, and Dubai Mall fountain show.",
        mr: "बुर्ज खलिफा १२४ व्या मजल्यावरील वेधशाळा, बार्बेक्यू जेवणासह ४x४ डेझर्ट सफारी, मरिना धो क्रूझ, मिरॅकल गार्डन आणि दुबई मॉल फाउंटन शो.",
        hi: "बुर्ज खलीफा 124वीं मंजिल वेधशाला, बारबेक्यू डिनर के साथ 4x4 डेजर्ट सफारी, मरीना धो क्रूज़, मिरेकल गार्डन और दुबई मॉल फाउंटेन शो।"
    },
    {
        en: "4-Star Deluxe City Hotel (Downtown / Deira / Al Barsha)",
        mr: "४-स्टार डिलक्स सिटी हॉटेल (डाउनटाउन / डेरा / अल बर्शा)",
        hi: "4-स्टार डीलक्स सिटी होटल (डाउनटाउन / डेरा / अल बरशा)"
    },
    {
        en: "AC Tourist Coach & 4x4 Land Cruisers for Safari",
        mr: "एसी टुरिस्ट कोच आणि सफारीसाठी ४x४ लँड क्रूझर्स",
        hi: "एसी टूरिस्ट कोच और सफारी के लिए 4x4 लैंड क्रूजर"
    },

    // Package 9: Bali
    {
        en: "Private pool villa stay, iconic Aloha Ubud jungle swing, sacred Tanah Lot temple at sunset, Uluwatu fire dance, and Nusa Penida island speedboat tour.",
        mr: "खाजगी पूल व्हिला मुक्काम, अलोहा उबुद जंगल स्विंग, सूर्यास्ताच्या वेळी तनाह लोट मंदिर, उलुवातु फायर डान्स आणि नुसा पेनिडा बेट स्पीडबोट टूर.",
        hi: "निजी पूल विला प्रवास, अलोहा उबुद जंगल स्विंग, सूर्यास्त के समय तानाह लोट मंदिर, उलुवातु फायर डांस और नुसा पेनिडा द्वीप स्पीडबोट टूर।"
    },
    {
        en: "4N 4-Star Resort + 2N Private Luxury Pool Villa",
        mr: "४ रात्री ४-स्टार रिसॉर्ट + २ रात्री खाजगी लक्झरी पूल व्हिला",
        hi: "4 रातें 4-स्टार रिसॉर्ट + 2 रातें निजी लक्जरी पूल विला"
    },
    {
        en: "Private AC Car with dedicated English-speaking Balinese driver-guide",
        mr: "स्थानिक इंग्रजी भाषक ड्रायव्हर-गाईडसह खाजगी एसी कार",
        hi: "समर्पित अंग्रेजी भाषी बालिनी चालक-गाइड के साथ निजी एसी कार"
    },

    // Package 10: Switzerland
    {
        en: "Top of Europe - Jungfraujoch cogwheel railway, revolving Rotair cable car to Mt. Titlis, Lake Lucerne cruise, and the fairytale landscapes of Interlaken.",
        mr: "टॉप ऑफ युरोप - जुंगफ्राउजॉक कॉगव्हील रेल्वे, रोतेर केबल कारने माउंट टिटलिस, लेक ल्युसर्न क्रूझ आणि इंटरलाकेनची मनमोहक दृश्ये.",
        hi: "टॉप ऑफ यूरोप - जंगफ्राउजोच कॉगव्हील रेलवे, माउंट टिटलिस रोटेयर केबल कार, लेक ल्यूसर्न क्रूज और इंटरलेकन के परीकथा जैसे दृश्य।"
    },
    {
        en: "4-Star Swiss Heritage Hotels",
        mr: "४-स्टार स्विस हेरिटेज हॉटेल्स",
        hi: "4-स्टार स्विस हेरिटेज होटल"
    },
    {
        en: "Swiss Travel Pass (Unlimited Trains, Boats & Buses across Switzerland)",
        mr: "स्विस ट्रॅव्हल पास (संपूर्ण स्वित्झर्लंडमध्ये अमर्यादित ट्रेन, बोट आणि बस प्रवास)",
        hi: "स्विस ट्रैवल पास (पूरे स्विट्जरलैंड में असीमित ट्रेन, नाव और बस यात्रा)"
    },

    // Package 11: Singapore
    {
        en: "Universal Studios thrills, iconic Gardens by the Bay Flower Dome & Cloud Forest, Night Safari, and Sentosa cable car ride.",
        mr: "युनिव्हर्सल स्टुडिओज, गार्डन्स बाय द बे फ्लॉवर डोम व क्लाऊड फॉरेस्ट, नाईट सफारी आणि सेंटोसा केबल कार राईड.",
        hi: "यूनिवर्सल स्टूडियोज, गार्डन्स बाय द बे फ्लावर डोम और क्लाउड फॉरेस्ट, नाइट सफारी और सेंटोसा केबल कार की सवारी।"
    },
    {
        en: "4-Star Hotel near Orchard Road or Clarke Quay",
        mr: "ऑर्चर्ड रोड किंवा क्लार्क क्वे जवळ ४-स्टार हॉटेल",
        hi: "ऑर्चर्ड रोड या क्लार्क क्वे के पास 4-स्टार होटल"
    },
    {
        en: "AC Tourist Coach & MRT Pass included",
        mr: "एसी टुरिस्ट कोच आणि एमआरटी पास समाविष्ट",
        hi: "एसी टूरिस्ट कोच और एमआरटी पास शामिल"
    },

    // Package 12: Vietnam
    {
        en: "5-star Ha Long Bay overnight cruise with kayaking through limestone caves, lantern boat in ancient Hoi An, and Ba Na Hills Golden Hand Bridge.",
        mr: "५-स्टार हा लाँग बे ओव्हरनाईट क्रूझ, चुनखडीच्या गुहांमधून कयाकिंग, प्राचीन होई आन मधील कंदील बोट आणि बा ना हिल्स गोल्डन हँड ब्रिज.",
        hi: "5-स्टार हा लोंग बे ओवरनाइट क्रूज, चूना पत्थर की गुफाओं में कायाकिंग, प्राचीन होई आन में लालटेन बोट और बा ना हिल्स गोल्डन हैंड ब्रिज।"
    },
    {
        en: "4-Star Boutique Hotels & 5-Star Luxury Bay Cruise",
        mr: "४-स्टार बुटीक हॉटेल्स आणि ५-स्टार लक्झरी बे क्रूझ",
        hi: "4-स्टार बुटीक होटल और 5-स्टार लक्जरी बे क्रूज"
    },
    {
        en: "Private AC Vehicle & Domestic Flight Hanoi to Da Nang",
        mr: "खाजगी एसी वाहन आणि हनोई ते दा नांग देशांतर्गत विमान प्रवास",
        hi: "निजी एसी वाहन और हनोई से दा नांग घरेलू उड़ान"
    }
];

let i18n = fs.readFileSync('js/i18n.js', 'utf8');

const target = '        {"en":"+91 9867807837 (Worli, Mumbai)","mr":"+९१ ९८६७८०७८३७ (वरळी, मुंबई)","hi":"+91 9867807837 (वर्ली, मुंबई)"}';
const blockToInsert = ',\n' + packagePhrases.map(p => `        ${JSON.stringify(p)}`).join(',\n');

if (!i18n.includes(target)) {
    console.error('Target not found in i18n.js');
    process.exit(1);
}

i18n = i18n.replace(target, target + blockToInsert);
i18n = i18n.replace(/,\s*\n\s*,/g, ',\n');

fs.writeFileSync('js/i18n.js', i18n, 'utf8');
console.log('Successfully added', packagePhrases.length, 'package phrases to js/i18n.js!');
