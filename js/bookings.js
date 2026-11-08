/**
 * Dream Travelkar - Bookings & Printable Invoice Controller
 * Handles booking summaries, simulated payment state updates, and invoice printing.
 */

const BookingController = {
    /**
     * Show professional printable invoice modal
     */
    showInvoiceModal(bookingId) {
        if (typeof StorageManager === 'undefined') return;

        const booking = StorageManager.getBookingById(bookingId);
        if (!booking) {
            StorageManager.showToast('Booking record not found.', 'error');
            return;
        }

        const settings = StorageManager.getSettings();

        let modal = document.getElementById('dt-invoice-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'dt-invoice-modal';
            modal.className = 'dt-modal-backdrop';
            document.body.appendChild(modal);
        }

        const invoiceNo = 'INV-' + booking.id.replace('BK-', '');
        const todayStr = StorageManager.formatDate(booking.createdAt || new Date());
        const travelDateStr = StorageManager.formatDate(booking.travelDate);

        modal.innerHTML = `
            <div class="dt-modal-content" style="max-width: 780px;">
                <div class="dt-modal-header no-print">
                    <h3 class="dt-modal-title"><i class="fa fa-file-text-o"></i> Travel Booking Voucher & Invoice</h3>
                    <button class="dt-modal-close">&times;</button>
                </div>
                
                <div class="dt-modal-body" id="invoice-print-area">
                    <div class="invoice-container">
                        <!-- Invoice Header -->
                        <div class="invoice-header">
                            <div class="invoice-company-info">
                                <h2>${settings.companyName || 'Dream Travelkar'}</h2>
                                <p style="color:var(--color-gold); font-weight:600; font-size:0.8rem; margin-bottom:4px;">
                                    ${settings.tagline || 'Discover the World. Create Memories That Last Forever.'}
                                </p>
                                <p>${settings.address || 'BDD Block No. 46/7, Dr. G.M.Bhosale Marg, Worli Mumbai - 400018'}</p>
                                <p>Tel: ${settings.phonePrimary || '+91 9867807837'} | Email: ${settings.emailPrimary || 'info@dreamtravelkar.com'}</p>
                                <p>Website: www.dreamtravelkar.com</p>
                            </div>
                            <div class="invoice-meta-box">
                                <h3>BOOKING INVOICE</h3>
                                <p><strong>Invoice #:</strong> ${invoiceNo}</p>
                                <p><strong>Booking Ref:</strong> ${booking.id}</p>
                                <p><strong>Date Issued:</strong> ${todayStr}</p>
                                <p><strong>Status:</strong> <span class="badge ${booking.bookingStatus === 'Confirmed' ? 'badge-confirmed' : 'badge-followup'}">${booking.bookingStatus}</span></p>
                            </div>
                        </div>

                        <!-- Bill To & Travel Meta -->
                        <div class="invoice-details-grid">
                            <div style="background:#f8fafc; padding:16px; border-radius:var(--radius-md); border:1px solid #e2e8f0;">
                                <strong style="text-transform:uppercase; font-size:0.75rem; color:#64748b; display:block; margin-bottom:6px;">Billed To / Primary Traveller:</strong>
                                <h4 style="margin:0 0 4px 0; font-size:1.1rem; color:var(--color-navy);">${booking.customerName}</h4>
                                <p style="margin:0 0 2px 0;">Email: ${booking.customerEmail}</p>
                                <p style="margin:0;">Phone: ${booking.customerPhone}</p>
                            </div>

                            <div style="background:#f8fafc; padding:16px; border-radius:var(--radius-md); border:1px solid #e2e8f0;">
                                <strong style="text-transform:uppercase; font-size:0.75rem; color:#64748b; display:block; margin-bottom:6px;">Tour & Itinerary Schedule:</strong>
                                <p style="margin:0 0 4px 0;"><strong>Departure Date:</strong> ${travelDateStr}</p>
                                <p style="margin:0 0 4px 0;"><strong>Total Travellers:</strong> ${booking.travellers} Person(s)</p>
                                <p style="margin:0;"><strong>Payment Plan:</strong> ${booking.paymentMethod || 'Partial Advance'}</p>
                            </div>
                        </div>

                        <!-- Itemized Table -->
                        <table class="invoice-table">
                            <thead>
                                <tr>
                                    <th>Description / Tour Service</th>
                                    <th>Quantity</th>
                                    <th>Rate (₹)</th>
                                    <th style="text-align:right;">Total (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>${booking.packageName}</strong><br>
                                        <small style="color:#64748b;">Includes 4-star stay, daily breakfast & dinners, private transfers, and sightseeing</small>
                                        ${booking.specialRequests ? `<br><small style="color:var(--color-ocean);"><strong>Notes:</strong> ${booking.specialRequests}</small>` : ''}
                                    </td>
                                    <td>${booking.travellers}</td>
                                    <td>₹${Math.round(booking.totalAmount / booking.travellers).toLocaleString('en-IN')}</td>
                                    <td style="text-align:right; font-weight:600;">₹${Number(booking.totalAmount).toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Summary Table -->
                        <table class="invoice-summary-table">
                            <tr>
                                <td>Gross Tour Cost:</td>
                                <td style="text-align:right; font-weight:600;">₹${Number(booking.totalAmount).toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td>GST & State Tourism Taxes:</td>
                                <td style="text-align:right; color:#16a34a; font-weight:600;">Included</td>
                            </tr>
                            <tr>
                                <td>Advance Paid (Demo Token):</td>
                                <td style="text-align:right; color:#16a34a; font-weight:700;">- ₹${Number(booking.advancePaid || 0).toLocaleString('en-IN')}</td>
                            </tr>
                            <tr class="total-row">
                                <td>Balance Due:</td>
                                <td style="text-align:right; color:var(--color-navy);">₹${Number(booking.remainingAmount || 0).toLocaleString('en-IN')}</td>
                            </tr>
                        </table>

                        <!-- Footer Note -->
                        <div class="invoice-footer-note">
                            <p style="margin:0 0 4px 0;"><strong>Important Demonstration Notice:</strong> This is a frontend demonstration voucher for Dream Travelkar. No financial settlement has occurred.</p>
                            <p style="margin:0;">For trip modifications, please call Dream Travelkar support at ${settings.phonePrimary || '+91 9867807837'}. Safe travels!</p>
                        </div>
                    </div>
                </div>

                <div class="dt-modal-footer no-print">
                    <button type="button" class="btn btn-sm btn-outline-navy dt-modal-close">Close</button>
                    <button type="button" class="btn btn-sm btn-gold" onclick="window.print()">
                        <i class="fa fa-print"></i> Print / Save as PDF
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }
};

window.BookingController = BookingController;
