/**
 * Dream Travelkar - Enquiries & CRM Controller
 * Handles customer enquiry submissions, validations, and CRM lead operations.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Customized Tour Form Handler (customize-tour.html or on homepage)
    const customTourForm = document.getElementById('custom-tour-form');
    if (customTourForm) {
        customTourForm.addEventListener('submit', handleCustomTourSubmission);
    }

    // 2. Contact Page Form Handler (contact.html or footer talk-to-us)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }

    // 3. Newsletter Subscription Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
});

/**
 * Handle Customized Tour Form Submission
 */
function handleCustomTourSubmission(e) {
    e.preventDefault();
    if (typeof StorageManager === 'undefined') return;

    const name = document.getElementById('cust-name') ? document.getElementById('cust-name').value.trim() : '';
    const email = document.getElementById('cust-email') ? document.getElementById('cust-email').value.trim() : '';
    const phone = document.getElementById('cust-phone') ? document.getElementById('cust-phone').value.trim() : '';
    const destination = document.getElementById('cust-destination') ? document.getElementById('cust-destination').value.trim() : '';
    const travelDate = document.getElementById('cust-date') ? document.getElementById('cust-date').value : '';
    const travellers = document.getElementById('cust-travellers') ? parseInt(document.getElementById('cust-travellers').value, 10) : 2;
    const budget = document.getElementById('cust-budget') ? document.getElementById('cust-budget').value : 'Standard';
    const preferences = document.getElementById('cust-preferences') ? document.getElementById('cust-preferences').value.trim() : '';
    const requirements = document.getElementById('cust-requirements') ? document.getElementById('cust-requirements').value.trim() : '';

    if (!name || !email || !phone || !destination) {
        StorageManager.showToast('Please fill in all required fields (Name, Email, Phone, Destination).', 'error');
        return;
    }

    const fullNotes = `Travel Preferences: ${preferences}. Additional Requirements: ${requirements}. Budget: ${budget}.`;

    const enquiryRecord = {
        name: name,
        email: email,
        phone: phone,
        destination: destination,
        travelDate: travelDate,
        travellers: travellers,
        budget: budget,
        status: "New",
        followUpDate: getNextDayDateString(),
        notes: fullNotes,
        source: "Customized Tour Page"
    };

    const saved = StorageManager.saveEnquiry(enquiryRecord);

    // Save as customer if not exists
    let existingCust = StorageManager.getCustomers().find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!existingCust) {
        StorageManager.saveCustomer({
            name: name,
            email: email,
            phone: phone,
            city: "Mumbai",
            totalBookings: 0,
            totalSpent: 0,
            status: "New Lead"
        });
    }

    // Reset form
    e.target.reset();

    StorageManager.showToast(`Thank you ${name}! Your customized holiday enquiry (${saved.id}) has been recorded. Our Dream Travelkar planning specialist will reach out shortly.`, 'success');

    // Display confirmation on page if feedback container exists
    const feedbackBox = document.getElementById('enquiry-confirmation-box');
    if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
            <div style="background:#dcfce7; border:1px solid #86efac; border-radius:var(--radius-md); padding:20px; color:#166534; margin-top:20px;">
                <h4 style="margin:0 0 6px 0;"><i class="fa fa-check-circle"></i> Enquiry Submitted Successfully!</h4>
                <p style="margin:0; font-size:0.92rem;">
                    Enquiry Reference: <strong>${saved.id}</strong>. We will contact you at <strong>${phone}</strong> within 2 business hours.
                </p>
            </div>
        `;
    }
}

/**
 * Handle Contact Form Submission
 */
function handleContactFormSubmission(e) {
    e.preventDefault();
    if (typeof StorageManager === 'undefined') return;

    const name = document.getElementById('contact-name') ? document.getElementById('contact-name').value.trim() : '';
    const email = document.getElementById('contact-email') ? document.getElementById('contact-email').value.trim() : '';
    const phone = document.getElementById('contact-phone') ? document.getElementById('contact-phone').value.trim() : '';
    const destination = document.getElementById('contact-destination') ? document.getElementById('contact-destination').value.trim() : 'General Inquiry';
    const message = document.getElementById('contact-message') ? document.getElementById('contact-message').value.trim() : '';

    if (!name || !email || !phone) {
        StorageManager.showToast('Please provide your name, email and contact number.', 'error');
        return;
    }

    const saved = StorageManager.saveEnquiry({
        name: name,
        email: email,
        phone: phone,
        destination: destination,
        travelDate: "Flexible",
        travellers: 2,
        budget: "Not Specified",
        status: "New",
        followUpDate: getNextDayDateString(),
        notes: `Customer Message: ${message}`,
        source: "Contact Page"
    });

    e.target.reset();
    StorageManager.showToast(`Thank you ${name}! Your inquiry (${saved.id}) was received. Our Worli, Mumbai team will contact you soon.`, 'success');
}

/**
 * Handle Newsletter Subscription
 */
function handleNewsletterSubmission(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        if (typeof StorageManager !== 'undefined') {
            StorageManager.showToast(`Thank you! ${emailInput.value} has been subscribed to Dream Travelkar's exclusive holiday offers.`, 'success');
        }
        e.target.reset();
    }
}

/**
 * Utility to get tomorrow's date string YYYY-MM-DD
 */
function getNextDayDateString() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
}
