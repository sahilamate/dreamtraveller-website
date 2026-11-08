/**
 * Dream Travelkar - Floating AI Travel Assistant Chatbot
 * Multi-Language Interactive Conversational Guidance (Marathi, Hindi, English).
 */

const Chatbot = {
    state: {
        step: 0,
        data: {
            destination: '',
            date: '',
            guests: '2',
            name: '',
            phone: ''
        }
    },

    getLang() {
        return typeof I18nManager !== 'undefined' ? I18nManager.getCurrentLanguage() : 'mr';
    },

    init() {
        this.createChatWidget();
        this.bindEvents();
        
        window.addEventListener('dtLanguageChanged', () => {
            this.updateWidgetLanguage();
        });
    },

    createChatWidget() {
        if (document.getElementById('dt-chatbot-launcher')) return;

        const lang = this.getLang();

        // Launcher Button
        const launcher = document.createElement('div');
        launcher.id = 'dt-chatbot-launcher';
        launcher.className = 'dt-chatbot-launcher';
        launcher.setAttribute('title', lang === 'mr' ? 'ड्रीम ट्रॅव्हलकर असिस्टंट' : (lang === 'hi' ? 'ड्रीम ट्रॅव्हलकर सहायक' : 'Dream Travelkar Travel Assistant'));
        launcher.innerHTML = `<i class="fa fa-comments"></i>`;
        document.body.appendChild(launcher);

        const subTitle = lang === 'mr' ? 'ट्रॅव्हल असिस्टंट &bull; ऑनलाइन' : (lang === 'hi' ? 'यात्रा सहायक &bull; ऑनलाइन' : 'AI Travel Assistant &bull; Online');
        const greeting = lang === 'mr' ? 'नमस्कार! ड्रीम ट्रॅव्हलकरमध्ये आपले स्वागत आहे. आपल्याला पुढील सहलीसाठी कुठे जायला आवडेल?' : (lang === 'hi' ? 'नमस्ते! ड्रीम ट्रॅव्हलकर में आपका स्वागत है। आप आगे कहाँ यात्रा करना पसंद करेंगे?' : 'Hello! Welcome to Dream Travelkar. Where would you love to travel next?');
        const placeholder = lang === 'mr' ? 'पर्यटन स्थळ किंवा प्रश्न टाईप करा...' : (lang === 'hi' ? 'गंतव्य स्थान या प्रश्न लिखें...' : 'Type destination or question...');

        const quick1 = lang === 'mr' ? 'राजस्थान' : (lang === 'hi' ? 'राजस्थान' : 'Rajasthan');
        const quick2 = lang === 'mr' ? 'केरळ' : (lang === 'hi' ? 'केरल' : 'Kerala');
        const quick3 = lang === 'mr' ? 'हिमाचल' : (lang === 'hi' ? 'हिमाचल' : 'Himachal');
        const quick4 = lang === 'mr' ? 'थायलंड' : (lang === 'hi' ? 'थाईलैंड' : 'Thailand');
        const quick5 = lang === 'mr' ? 'ड्रीम कोकण (मी मावळा)' : (lang === 'hi' ? 'ड्रीम कोंकण' : 'Dream Konkan');

        // Chat Window
        const win = document.createElement('div');
        win.id = 'dt-chatbot-window';
        win.className = 'dt-chatbot-window';
        win.innerHTML = `
            <div class="dt-chatbot-header">
                <div class="dt-chatbot-title">
                    <div class="dt-chatbot-avatar">
                        <i class="fa fa-plane"></i>
                    </div>
                    <div>
                        <h4>Dream Travelkar</h4>
                        <span id="dt-chatbot-sub">${subTitle}</span>
                    </div>
                </div>
                <button type="button" class="dt-chatbot-close" id="dt-chatbot-close-btn">&times;</button>
            </div>
            <div class="dt-chatbot-messages" id="dt-chatbot-messages">
                <!-- Initial Bot Message -->
                <div class="chat-bubble chat-bubble-bot">
                    <span id="dt-chatbot-greeting-text">${greeting}</span>
                    <div class="chat-quick-replies" id="dt-chatbot-quick-replies">
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Rajasthan')">${quick1}</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Kerala')">${quick2}</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Himachal')">${quick3}</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Thailand')">${quick4}</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Konkan')">${quick5}</button>
                    </div>
                </div>
            </div>
            <div class="dt-chatbot-input-area">
                <input type="text" id="dt-chatbot-input" class="dt-chatbot-input" placeholder="${placeholder}" autocomplete="off">
                <button type="button" id="dt-chatbot-send-btn" class="dt-chatbot-send-btn">
                    <i class="fa fa-paper-plane"></i>
                </button>
            </div>
        `;
        document.body.appendChild(win);
    },

    updateWidgetLanguage() {
        const lang = this.getLang();
        const subEl = document.getElementById('dt-chatbot-sub');
        const inputEl = document.getElementById('dt-chatbot-input');
        const launcher = document.getElementById('dt-chatbot-launcher');

        if (subEl) {
            subEl.innerHTML = lang === 'mr' ? 'ट्रॅव्हल असिस्टंट &bull; ऑनलाइन' : (lang === 'hi' ? 'यात्रा सहायक &bull; ऑनलाइन' : 'AI Travel Assistant &bull; Online');
        }
        if (inputEl) {
            inputEl.placeholder = lang === 'mr' ? 'पर्यटन स्थळ किंवा प्रश्न टाईप करा...' : (lang === 'hi' ? 'गंतव्य स्थान या प्रश्न लिखें...' : 'Type destination or question...');
        }
        if (launcher) {
            launcher.setAttribute('title', lang === 'mr' ? 'ड्रीम ट्रॅव्हलकर असिस्टंट' : (lang === 'hi' ? 'ड्रीम ट्रॅव्हलकर सहायक' : 'Dream Travelkar Travel Assistant'));
        }
    },

    bindEvents() {
        const launcher = document.getElementById('dt-chatbot-launcher');
        const win = document.getElementById('dt-chatbot-window');
        const closeBtn = document.getElementById('dt-chatbot-close-btn');
        const sendBtn = document.getElementById('dt-chatbot-send-btn');
        const input = document.getElementById('dt-chatbot-input');

        if (launcher && win) {
            launcher.addEventListener('click', () => {
                win.classList.toggle('active');
                if (win.classList.contains('active') && input) {
                    setTimeout(() => input.focus(), 200);
                }
            });
        }

        if (closeBtn && win) {
            closeBtn.addEventListener('click', () => win.classList.remove('active'));
        }

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.handleUserSubmit());
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleUserSubmit();
                }
            });
        }
    },

    handleQuickReply(text) {
        this.addMessage(text, 'user');
        this.processResponse(text);
    },

    handleUserSubmit() {
        const input = document.getElementById('dt-chatbot-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.addMessage(text, 'user');
        this.processResponse(text);
    },

    addMessage(text, sender = 'bot', customHTML = '') {
        const messagesContainer = document.getElementById('dt-chatbot-messages');
        if (!messagesContainer) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-bubble-${sender}`;
        bubble.innerHTML = text + (customHTML ? `<div>${customHTML}</div>` : '');
        messagesContainer.appendChild(bubble);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    processResponse(input) {
        const lower = input.toLowerCase();
        const lang = this.getLang();

        // Check state steps if user is in an active lead capture flow
        if (this.state.step === 1) {
            this.state.data.date = input;
            this.state.step = 2;
            const msg = lang === 'mr' ? 'छान! आपल्यासोबत किती प्रवासी प्रवास करणार आहेत? (उदा. २ व्यक्ती किंवा ४ जणांचे कुटुंब):' : (lang === 'hi' ? 'बढ़िया! आपके साथ कितने यात्री यात्रा करेंगे? (जैसे 2 व्यक्ति या 4 का परिवार):' : 'Great! How many guests or travellers will be accompanying you? (e.g., 2 adults, family of 4):');
            setTimeout(() => {
                this.addMessage(msg);
            }, 500);
            return;
        }

        if (this.state.step === 2) {
            this.state.data.guests = input;
            this.state.step = 3;
            const msg = lang === 'mr' ? 'समजले! कृपया आपले पूर्ण नाव आणि व्हॉट्सॲप संपर्क क्रमांक द्या जेणेकरून आमचे सहल तज्ज्ञ आपले सानुकूल कोटेशन तयार करू शकतील:' : (lang === 'hi' ? 'समझ गया! कृपया अपना पूरा नाम और व्हाट्सएप संपर्क नंबर दें ताकि हमारे विशेषज्ञ व्यक्तिगत कोटेशन भेज सकें:' : 'Understood! Please provide your Full Name and WhatsApp Contact Number so our travel expert can prepare the personalized quote:');
            setTimeout(() => {
                this.addMessage(msg);
            }, 500);
            return;
        }

        if (this.state.step === 3) {
            // Save lead
            this.state.data.name = input;
            this.state.step = 0; // reset

            if (typeof StorageManager !== 'undefined') {
                const saved = StorageManager.saveEnquiry({
                    name: input,
                    email: "bot_lead@dreamtravelkar.com",
                    phone: input,
                    destination: this.state.data.destination || "Holiday Tour",
                    travelDate: this.state.data.date || "Upcoming",
                    travellers: parseInt(this.state.data.guests, 10) || 2,
                    budget: "Standard",
                    status: "New",
                    notes: `Chatbot Lead capture (${lang}). Destination: ${this.state.data.destination}. Travel Date: ${this.state.data.date}. Guests: ${this.state.data.guests}. Details: ${input}`,
                    source: "AI Assistant"
                });

                const thankMsg = lang === 'mr' ? `खूप खूप धन्यवाद! आपला चौकशी संदर्भ क्रमांक <strong>${saved.id}</strong> आहे. आमची वरळी मुंबई टीम लवकरच आपल्याशी सविस्तर नियोजनासह संपर्क साधेल.` : (lang === 'hi' ? `बहुत धन्यवाद! आपका पूछताछ संदर्भ संख्या <strong>${saved.id}</strong> है। हमारी वर्ली मुंबई टीम जल्द ही आपसे संपर्क करेगी।` : `Thank you so much! Your inquiry reference is <strong>${saved.id}</strong>. Our Worli head office team will reach out with itinerary options.`);

                setTimeout(() => {
                    this.addMessage(thankMsg);
                }, 500);
            }
            return;
        }

        // Conversational Keywords
        if (lower.includes('rajasthan') || lower.includes('राजस्थान')) {
            this.state.data.destination = 'Rajasthan';
            this.state.step = 1;
            const text = lang === 'mr' ? 'राजस्थान खूपच सुंदर आहे! आमचा <strong>रॉयल राजस्थान मारवाड सर्किट</strong> (९ दिवस/८ रात्री) ₹२५,०००/व्यक्तीपासून सुरू होतो, ज्यामध्ये जयपूर, जोधपूर, जैसलमेर वाळवंट शिबिर आणि उदयपूरचा समावेश आहे.' : (lang === 'hi' ? 'राजस्थान अद्भुत है! हमारा <strong>रॉयल राजस्थान मारवाड़ सर्किट</strong> (9 दिन/8 रातें) ₹25,000/व्यक्ति से शुरू होता है, जिसमें जयपुर, जोधपुर, जैसलमेर रेगिस्तान और उदयपुर शामिल हैं।' : 'Rajasthan is magical! Our <strong>Royal Rajasthan Marwad Circuit</strong> (9D/8N) starts at ₹25,000/person, covering Jaipur, Jodhpur, Jaisalmer desert camps, and Lake Pichola in Udaipur.');
            const prompt = lang === 'mr' ? 'आपण कोणत्या महिन्यात किंवा तारखांना प्रवास करण्याचे नियोजन करत आहात?' : (lang === 'hi' ? 'आप किस महीने या तारीखों में यात्रा करने की योजना बना रहे हैं?' : 'Which month or travel dates are you considering?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:8px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        } else if (lower.includes('kerala') || lower.includes('केरल') || lower.includes('केरळ')) {
            this.state.data.destination = 'Kerala';
            this.state.step = 1;
            const text = lang === 'mr' ? 'देवभूमी केरळ ही आमची विशेष सहल आहे! आमची <strong>केरळ बॅकवॉटर्स व मुन्नार</strong> सहल (१० दिवस/९ रात्री) अलेप्पी खाजगी हाऊसट सह ₹२१,९९९/व्यक्तीपासून उपलब्ध आहे.' : (lang === 'hi' ? 'ईश्वर का अपना घर केरल हमारी विशेषता है! हमारी <strong>केरल बैकवाटर्स और मुन्नार</strong> यात्रा (10 दिन/9 रातें) अलेप्पी हाउसबोट स्टे के साथ ₹21,999/व्यक्ति से शुरू होती है।' : "Kerala God's Own Country is one of our specialty tours! Our <strong>Kerala Backwaters & Munnar Serenade</strong> (10D/9N) starts at ₹21,999/person with private Alleppey houseboat stay.");
            const prompt = lang === 'mr' ? 'आपण कोणत्या महिन्यात प्रवास करू इच्छिता?' : (lang === 'hi' ? 'आप किस महीने में यात्रा करना चाहते हैं?' : 'What travel dates or season are you looking at?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:8px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        } else if (lower.includes('himachal') || lower.includes('manali') || lower.includes('shimla') || lower.includes('हिमाचल') || lower.includes('मनाली')) {
            this.state.data.destination = 'Himachal Pradesh';
            this.state.step = 1;
            const text = lang === 'mr' ? 'हिमाचल स्नो आणि व्हॅली पॅनोरमा (९ दिवस/८ रात्री) शिमला, कुफरी स्नो व्ह्यू, सोलंग व्हॅली आणि अटल टनेलसह ₹१८,९९९/व्यक्तीपासून सुरू होते.' : (lang === 'hi' ? 'हिमाचल स्नो और वैली पैनोरमा (9 दिन/8 रातें) शिमला, कुफरी स्नो व्यू, सोलांग वैली और अटल टनल सहित ₹18,999/व्यक्ति से शुरू होता है।' : 'Himachal Snow & Valley Panorama (9D/8N) starts at ₹18,999/person including Shimla, Kufri snow viewpoint, Solang valley, and Atal tunnel.');
            const prompt = lang === 'mr' ? 'आपण कधी प्रवास करण्याचा विचार करत आहात?' : (lang === 'hi' ? 'आपकी यात्रा की संभावित तारीख क्या है?' : 'When do you plan to travel?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:8px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        } else if (lower.includes('thailand') || lower.includes('bangkok') || lower.includes('pattaya') || lower.includes('थाईलैंड') || lower.includes('थायलंड')) {
            this.state.data.destination = 'Thailand';
            this.state.step = 1;
            const text = lang === 'mr' ? 'आमचे सर्वात लोकप्रिय आंतरराष्ट्रीय पॅकेज <strong>बँकॉक व पट्टाया आयलँड कार्निव्हल</strong> (६ दिवस/५ रात्री) कोरल आयलँड स्पीडबोट आणि भारतीय भोजनासह ₹२३,९९९/व्यक्तीपासून उपलब्ध आहे!' : (lang === 'hi' ? 'हमारा लोकप्रिय अंतरराष्ट्रीय पैकेज <strong>बैंकॉक और पटाया आइलैंड कार्निवल</strong> (6 दिन/5 रातें) कोरल द्वीप स्पीडबोट और भारतीय भोजन के साथ ₹23,999/व्यक्ति से उपलब्ध है!' : 'Our best-selling international package is <strong>Magical Bangkok & Pattaya Island Carnival</strong> (6D/5N) starting at ₹23,999/person with Coral Island speedboat and Indian meals!');
            const prompt = lang === 'mr' ? 'आपण कोणत्या तारखांचा विचार करत आहात?' : (lang === 'hi' ? 'आप किन तारीखों पर विचार कर रहे हैं?' : 'What dates or month are you planning?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:8px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        } else if (lower.includes('konkan') || lower.includes('sindhudurg') || lower.includes('tarkarli') || lower.includes('कोकण') || lower.includes('कोंकण')) {
            this.state.data.destination = 'Dream Konkan';
            this.state.step = 1;
            const text = lang === 'mr' ? 'ड्रीम कोकण ही आमची स्वाभिमानाची हेरिटेज सहल आहे! छत्रपती शिवाजी महाराजांचा वारसा असलेला सिंधुदुर्ग जलदुर्ग, तारकर्ली स्कुबा डायव्हिंग आणि गणपतीपुळे मंदिर केवळ ₹१२,५००/व्यक्तीपासून.' : (lang === 'hi' ? 'ड्रीम कोंकण हमारी प्रमुख हेरिटेज यात्रा है! छत्रपति शिवाजी महाराज की ऐतिहासिक धरोहर सिंधुदुर्ग किला, तारकरली स्कूबा डाइविंग और गणपतिपुले बीच मात्र ₹12,500/व्यक्ति से।' : 'Dream Konkan is our signature heritage tour! Explore Sindhudurg Sea Fort (छत्रपती शिवाजी महाराज वारसा), Tarkarli scuba diving & Ganpatipule beach temple starting from ₹12,500/person.');
            const prompt = lang === 'mr' ? 'आपण कोणत्या तारखेला जायला इच्छुक आहात?' : (lang === 'hi' ? 'आप कब जाना चाहते हैं?' : 'What are your preferred dates?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:8px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('package') || lower.includes('किंमत') || lower.includes('दर') || lower.includes('दाम')) {
            const pageLinkText = lang === 'mr' ? 'पॅकेजेस पृष्ठ' : (lang === 'hi' ? 'पैकेज पेज' : 'Packages page');
            const desc = lang === 'mr' ? `आमचे टूर पॅकेजेस कोकण हेरिटेजसाठी ₹१२,५०० पासून ते स्वित्झर्लंड आल्प्स मोहिमेसाठी ₹१,२५,००० पर्यंत आहेत. आपण आमची सर्व १२+ पॅकेजेस <a href="packages.html" style="color:var(--color-ocean); text-decoration:underline; font-weight:600;">${pageLinkText}</a> वर पाहू शकता.` : (lang === 'hi' ? `हमारे पैकेज कोंकण के लिए ₹12,500 से लेकर स्विट्जरलैंड के लिए ₹1,25,000 तक हैं। आप हमारे सभी 12+ पैकेज <a href="packages.html" style="color:var(--color-ocean); text-decoration:underline; font-weight:600;">${pageLinkText}</a> पर देख सकते हैं।` : `Our packages range from ₹12,500 for Konkan heritage tours up to ₹1,25,000 for Swiss Alps expeditions. You can view all 12+ verified packages on our <a href="packages.html" style="color:var(--color-ocean); text-decoration:underline; font-weight:600;">Packages page</a>.`);
            setTimeout(() => {
                this.addMessage(
                    desc,
                    'bot',
                    `<div class="chat-quick-replies">
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Rajasthan')">Rajasthan (₹25k)</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Kerala')">Kerala (₹22k)</button>
                        <button class="chat-quick-btn" onclick="Chatbot.handleQuickReply('Thailand')">Thailand (₹24k)</button>
                    </div>`
                );
            }, 500);
        } else if (lower.includes('contact') || lower.includes('address') || lower.includes('phone') || lower.includes('office') || lower.includes('संपर्क') || lower.includes('पत्ता') || lower.includes('कार्यालय')) {
            const hOffice = lang === 'mr' ? 'ड्रीम ट्रॅव्हलकर मुख्य कार्यालय:' : (lang === 'hi' ? 'ड्रीम ट्रॅव्हलकर मुख्य कार्यालय:' : 'Dream Travelkar Head Office:');
            const hPhone = lang === 'mr' ? 'फोन:' : (lang === 'hi' ? 'फोन:' : 'Phone:');
            const hEmail = lang === 'mr' ? 'ईमेल:' : (lang === 'hi' ? 'ईमेल:' : 'Email:');
            setTimeout(() => {
                this.addMessage(
                    `<strong>${hOffice}</strong><br>
                    BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli, Mumbai - 400018<br>
                    <strong>${hPhone}</strong> +91 9867807837 / +91 9821871072<br>
                    <strong>${hEmail}</strong> info@dreamtravelkar.com`,
                    'bot'
                );
            }, 500);
        } else {
            // General query response
            this.state.data.destination = input;
            this.state.step = 1;
            const text = lang === 'mr' ? `उत्कृष्ट निवड! आम्ही ${input} साठी खास खाजगी व कौटुंबिक सहलींचे आयोजन करतो.` : (lang === 'hi' ? `शानदार पसंद! हम ${input} के लिए विशेष कस्टमाइज और पारिवारिक यात्राओं का आयोजन करते हैं।` : `Wonderful choice! We organize customized group and private tours to ${input}.`);
            const prompt = lang === 'mr' ? 'आपण प्रवासासाठी कोणत्या तारखा किंवा महिना निवडणार आहात?' : (lang === 'hi' ? 'आप किस महीने या तारीखों में यात्रा करना चाहते हैं?' : 'What travel dates or month are you looking to depart?');
            setTimeout(() => {
                this.addMessage(text, 'bot', `<p style="margin:6px 0 0 0; font-weight:600;">${prompt}</p>`);
            }, 500);
        }
    }
};

// Initialize Chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Chatbot.init();
});
