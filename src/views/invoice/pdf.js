const moment = require('moment');

// Function to generate HTML content for the invoice
let generateInvoiceHtml = (data) => {

    const htmlContent = `
                <div style="color:black;margin-top: 50px;padding: 0 5%;">

                <table style="color:black;width: 100%;">
                    <tr>
                        <td style="width:50%;">
                            <div>
                                <h1>${data.createdByUser.invoiceTitle ? data.createdByUser.invoiceTitle : "No Title"}</h1>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h1 style="text-align: right;">${data.invoiceType.toUpperCase()} </h1>
                                <table style="font-size:12px;width: 100%;">
                                    <tbody>
                                        <tr>
                                            <th style="text-align: left;">REFERENCE:</th>
                                            <td style="text-align: right;">${data.invoiceNumber}</td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: left;">BILLING DATE:</th>
                                            <td style="text-align: right;">${moment(data.issueDate).format('DD/MM/YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: left;">DUE DATE:</th>
                                            <td style="text-align: right;">${moment(data.dueDate).format('DD/MM/YYYY')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
        
                <table style="margin-top: 50px;font-size:12px;width: 100%;">
                    <tr style="text-align: left;font-size:14px;">
                        <th style="border-bottom: 2px solid;">OUR INFORMATION</th>
                        <th style="border-bottom: 2px solid;">BILLING TO</th>
                        <th style="border-bottom: 2px solid;">SHIPPING TO</th>
                    </tr>
                    <tr style="text-align: left;font-size:14px;">
                        <th style="padding: 10px 0;" class="our_name">${data.createdByUser.fullname}</th>
                        <th style="padding: 10px 0;" class="cus_name">${data.customer.name}</th>
                        <th style="padding: 10px 0;" class="ship_name">${data.customer.shipping.name}</th>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_add_1"></td>
                        <td style="padding: 5px 0;" class="cus_add_1">${data.customer.addressOne ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_add_1">${data.customer.shipping.addressOne ?? "-"}</td>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_add_2"></td>
                        <td style="padding: 5px 0;" class="cus_add_2">${data.customer.addressTwo ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_add_2">${data.customer.shipping.addressTwo ?? "-"}</td>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_town"></td>
                        <td style="padding: 5px 0;" class="cus_town">${data.customer.town ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_town">${data.customer.shipping.town ?? "-"}</td>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_country"></td>
                        <td style="padding: 5px 0;" class="cus_country">${data.customer.country ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_country">${data.customer.shipping.country ?? "-"}</td>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_postcode"></td>
                        <td style="padding: 5px 0;" class="cus_postcode">${data.customer.postcode ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_postcode">${data.customer.shipping.postcode ?? "-"}</td>
                    </tr>
                    <tr style="text-align: left;color: #555555;">
                        <td style="padding: 5px 0;" class="our_phone"></td>
                        <td style="padding: 5px 0;" class="cus_phone">Phone: ${data.customer.phone ?? "-"}</td>
                        <td style="padding: 5px 0;" class="ship_phone"></td>
                    </tr>
                </table>
        
                <table style="margin-top: 50px;font-size:12px;width: 100%;">
                    <tr style="text-align: left">
                        <th style="border-bottom: 2px solid; padding: 10px 5px;">PRODUCT</th>
                        <th style="border-bottom: 2px solid; text-align: center;">AMOUNT</th>
                        <th style="border-bottom: 2px solid; text-align: center;">VAT</th>
                        <th style="border-bottom: 2px solid; text-align: center;">PRICE</th>
                        <th style="border-bottom: 2px solid; text-align: center;">DISCOUNT</th>
                        <th style="border-bottom: 2px solid; text-align: center;">TOTAL</th>
                    </tr>
                    <!-- Product Listing -->
                    ${productListing(data)}
                   
        
                    <!-- Total -->
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th style="text-align: center;padding: 10px 0;background: lightgray;">Total</th>
                        <th style="text-align: center;background: lightgray;">Rs. ${data.total.subTotal}</th>
                    </tr>
                    <tr>
                        <td rowspan="2">
                            <p style="  
                            font-size: 35px;
                            font-weight: 700;
                            border: 2px solid;
                            padding: 5px;
                            transform: rotate(340deg);
                            display: inline-block;">${data.invoiceStatus.toUpperCase()} </p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th style="text-align: center;padding: 10px 0;background: lightgray;">Discount</th>
                        <th style="text-align: center;background: lightgray;">Rs. ${data.total.discount}</th>
                    </tr>
                    <tr>
                        <!-- <td></td> -->
                        <td></td>
                        <td></td>
                        <td></td>
                        <th style="text-align: center;padding: 10px 0;background: lightgray;">Shipping</th>
                        <th style="text-align: center;background: lightgray;">Rs. ${data.shippingAmount}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th style="text-align: center;padding: 10px 0;background: lightgray;">TAX/VAT 10%</th>
                        <th style="text-align: center;background: lightgray;">Rs. ${data.total.tax}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th style="text-align: center;padding: 10px 0;background: black;color:white;">Total Due</th>
                        <th style="text-align: center;background: black;color:white;">Rs. ${data.total.total}</th>
                    </tr>
                </table>
        
                <table style="margin-top: 50px;font-size:12px;width: 100%;">
                    <tr style="text-align: left;color: #555555;">
                        <th style="border-bottom: 2px solid;padding: 10px 0;">CUSTOMER NOTES</th>
                    </tr>
                    <tr>
                        <td>${data.additionalNote ? data.additionalNote : 'none'}</td>
                    </tr>
                </table>
                <table style="margin-top: 50px;font-size:12px;width: 100%;">
                
                </table>
            </div>
        
        `;

    return htmlContent;
};

// Function to generate PDF from HTML
let generatePdf = (htmlContent) => {
    // return new Promise((resolve, reject) => {
    //     htmlToPdf.create(htmlContent).toStream((err, pdfStream) => {
    //         if (err) {
    //         reject(err);
    //         } else {
    //             resolve(pdfStream);
    //         }
    //     });
    // });
};

// Function to product list from HTML
let productListing = (data) => {

    var htmlProductList = ``;

    data.products.forEach(element => {
        htmlProductList += `
        <tr style="background: lightgray;">
            <td style="padding: 10px 5px;"><b>${element.name}</b></td>
            <td style="text-align: center;">${element.quantity}</td>
            <td style="text-align: center;">Rs. ${data.isTaxEnable ? ((element.price * element.quantity) * 0.1) : 0}</td>
            <td style="text-align: center;">Rs. ${element.price}</td>
            <td style="text-align: center;">Rs. ${element.discountAmount ? element.discountAmount : 0}</td>
            <td style="text-align: center;">Rs. ${element.total}</td>
        </tr>
    `;
    });

    return htmlProductList;
};


export {
    generateInvoiceHtml,
};