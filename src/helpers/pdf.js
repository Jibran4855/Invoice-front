import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LOGO from '../assets/img/brand/logo.png'
const moment = require('moment');

class InvoiceGenerator {
    constructor(data) {
        this.doc = new jsPDF();
        this.y = 20;
        this.data = data
    }

    setText(text, x, y, size = 9, font = 'helvetica', style = 'normal', margin = 0, align = 'left') {
        this.doc.setFontSize(size);
        this.doc.setFont(font, style);

        if (align === 'right') {
            const pageWidth = this.doc.internal.pageSize.getWidth();

            // Measure the width of the text
            const textWidth = this.doc.getTextWidth(text);

            // Calculate the x-coordinate to align the text to the right
            x = pageWidth - textWidth - margin;
        }


        this.doc.text(text, x, y);
    }

    addLogo() {
        this.doc.addImage(LOGO, 'PNG', 20, 15, 32, 24);
    }

    addInvoiceHeader() {
        this.setText(this.data.invoiceType.toUpperCase(), 20, this.y, 20, 'helvetica', 'bold', this.y, 'right');
        this.y += 5;
    }

    addInvoiceDetails() {
        const details = [
            { label: 'REFERENCE:', value: this.data?.invoiceNumber?.toString(), x: 0, margin: 0 },
            { label: 'BILLING DATE:', value: moment(this.data.issueDate).format('DD/MM/YYYY'), x: 0, margin: 0 },
            { label: 'DUE DATE:', value: moment(this.data.dueDate).format('DD/MM/YYYY'), x: 0, margin: 0 }
        ];

        details.forEach(detail => {
            this.y += 5;
            this.setText(detail.label, detail.x, this.y, 9, 'helvetica', 'bold', 40, 'right');
            this.setText(detail.value, detail.x, this.y, 9, 'helvetica', 'normal', 20, 'right');
        });
    }

    addCompanyTitle() {
        this.y += 10;
        this.setText(this.data.createdByUser.invoiceTitle || 'No Title', 20, this.y, 20, 'helvetica', 'bold');
    }

    addAddressInformation() {
        this.y += 20;
        const sections = [
            {
                title: 'OUR INFORMATION',
                x: 20,
                info: [
                    this.data.createdByUser.fullname,
                    this.data.createdByUser.email ?? '-',
                    this.data.createdByUser?.phone?.toString() ?? '-',
                ],
                infoXPOS: 20,
            },
            {
                title: 'BILLING TO',
                x: 20,
                info: [
                    this.data.customer.name,
                    this.data.customer.addressOne ?? '-',
                    this.data.customer.addressTwo ?? '-',
                    this.data.customer.country ?? '-',
                    this.data.customer.postcode ?? '-',
                    this.data.customer?.phone?.toString() ?? '-',
                ],
                infoXPOS: 90,
            },
            {
                title: 'SHIPPING TO',
                x: 10,
                info: [
                    this.data.customer.shipping.name,
                    this.data.customer.shipping.addressOne ?? '-',
                    this.data.customer.shipping.addressTwo ?? '-',
                    this.data.customer.shipping.town ?? '-',
                    this.data.customer.shipping.country ?? '-',
                    this.data.customer.shipping.postcode ?? '-',
                    this.data.customer?.shipping?.phone?.toString() ?? '-',
                ],
                infoXPOS: 150,
            }
        ];

        sections.forEach((section, index) => {
            this.setText(section.title, section.x + (index * 70), this.y, 10, 'helvetica', 'bold');
        });

        this.y += 2;
        this.doc.line(20, this.y, this.doc.internal.pageSize.getWidth() - 20, this.y);

        let temXPOS = this.y;
        sections.forEach((section, index) => {
            this.y = temXPOS;
            section.info.forEach((address, index1) => {
                this.y += 7;
                if (index1 === 0) { 
                    this.setText(address, section.infoXPOS, this.y, 10, 'helvetica', 'bold');
                }else{
                    this.setText(address, section.infoXPOS, this.y);
                }
            });
        });

        this.y += 10;
    }

    createInvoiceTable() {
        this.doc.autoTable({
            html: '#my-table',
            startY: this.y,
            margin: { horizontal: 20 },
            didDrawPage: (data) => {
                this.y = data.cursor.y;
            },
            didParseCell: (data) => {
                if (((data.section === 'head' && data.row.index === 0) || data.section === 'body') && data.column.index === 0) {
                    data.cell.styles.halign = 'left';
                    data.cell.styles.fontStyle = 'bold';
                } else {
                    data.cell.styles.halign = 'center';
                }

                data.cell.styles.fontSize = 9;

                if (data.section === 'head') {
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.textColor = 'black';
                }

                if (data.section === 'body' || (data.section === 'foot' && data.cell.raw.innerHTML)) {
                    data.cell.styles.fillColor = '#d3d3d3';
                }

                if (data.section === 'foot' && data.cell.raw.innerHTML && data.row.index === data.table.foot.length - 1) {
                    data.cell.styles.fillColor = '#000';
                    data.cell.styles.textColor = '#fff';
                }
            },
            theme: 'plain'
        });
    }

    addInvoiceStatus() {
        this.doc.setFontSize(15);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(this.data.invoiceStatus.toUpperCase(), 30, this.y - 15, { angle: 45 });
    }

    addCustomerNotes() {
        this.y += 20;
        this.setText('CUSTOMER NOTES', 20, this.y, 10, 'helvetica', 'bold');

        this.y += 3;
        this.doc.line(20, this.y, this.doc.internal.pageSize.getWidth() - 20, this.y);

        this.y += 5;
        this.setText(this.data.additionalNote || 'none', 20, this.y);
    }

    downloadPDF() {
        this.doc.save(`invoice-${this.data.invoiceNumber}.pdf`);
    }

    previewPDF() {
        window.open(this.doc.output('bloburl'));
    }

    generate() {
        this.addLogo();
        this.addInvoiceHeader();
        this.addInvoiceDetails();
        this.addCompanyTitle();
        this.addAddressInformation();
        this.createInvoiceTable();
        this.addInvoiceStatus();
        this.addCustomerNotes();

        this.downloadPDF();
    }
}

export { InvoiceGenerator };