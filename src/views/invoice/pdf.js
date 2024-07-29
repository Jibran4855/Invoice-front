const moment = require('moment');

// Function to generate HTML content for the invoice
let generateInvoiceHtml = (data) => {

    return (
        <div className="invoice-container">
            <table className="invoice-table">
                <tr>
                    <td style={{ width: '50%' }}>
                        <div>
                            <img
                                className="invoice-logo"
                                src={require('../../assets/img/brand/logo.png').default}
                                alt="Logo"
                            />
                            <h1 className="invoice-title">
                                {data.createdByUser.invoiceTitle || 'No Title'}
                            </h1>
                        </div>
                    </td>
                    <td>
                        <div>
                            <h1 className="invoice-header">{data.invoiceType.toUpperCase()}</h1>
                            <table className="invoice-header-table">
                                <tbody>
                                    <tr>
                                        <th className="invoice-header-th">REFERENCE:</th>
                                        <td className="invoice-header-td">{data.invoiceNumber}</td>
                                    </tr>
                                    <tr>
                                        <th className="invoice-header-th">BILLING DATE:</th>
                                        <td className="invoice-header-td">
                                            {moment(data.issueDate).format('DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="invoice-header-th">DUE DATE:</th>
                                        <td className="invoice-header-td">
                                            {moment(data.dueDate).format('DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>

            <table className="info-table">
                <tr style={{ fontSize: '14px' }}>
                    <th className="info-table-th">OUR INFORMATION</th>
                    <th className="info-table-th">BILLING TO</th>
                    <th className="info-table-th">SHIPPING TO</th>
                </tr>
                <tr style={{ fontSize: '14px' }}>
                    <th className="info-table-td">{data.createdByUser.fullname}</th>
                    <th className="info-table-td">{data.customer.name}</th>
                    <th className="info-table-td">{data.customer.shipping.name}</th>
                </tr>
                <tr>
                    <td className="info-table-td">{data.createdByUser.email ?? '-'}</td>
                    <td className="info-table-td">{data.customer.addressOne ?? '-'}</td>
                    <td className="info-table-td">{data.customer.shipping.addressOne ?? '-'}</td>
                </tr>
                <tr>
                    <td className="info-table-td">{data.createdByUser.phone ?? '-'}</td>
                    <td className="info-table-td">{data.customer.addressTwo ?? '-'}</td>
                    <td className="info-table-td">{data.customer.shipping.addressTwo ?? '-'}</td>
                </tr>
                <tr>
                    <td className="info-table-td"></td>
                    <td className="info-table-td">{data.customer.town ?? '-'}</td>
                    <td className="info-table-td">{data.customer.shipping.town ?? '-'}</td>
                </tr>
                <tr>
                    <td className="info-table-td"></td>
                    <td className="info-table-td">{data.customer.country ?? '-'}</td>
                    <td className="info-table-td">{data.customer.shipping.country ?? '-'}</td>
                </tr>
                <tr>
                    <td className="info-table-td"></td>
                    <td className="info-table-td">{data.customer.postcode ?? '-'}</td>
                    <td className="info-table-td">{data.customer.shipping.postcode ?? '-'}</td>
                </tr>
                <tr>
                    <td className="info-table-td"></td>
                    <td className="info-table-td">Phone: {data.customer.phone ?? '-'}</td>
                    <td className="info-table-td"></td>
                </tr>
            </table>

            <table className="product-table" id='my-table'>
                <thead>
                    <tr>
                        <th className="product-table-th" >PRODUCT</th>
                        <th className="product-table-th">QUANTITY</th>
                        <th className="product-table-th">VAT</th>
                        <th className="product-table-th">PRICE</th>
                        <th className="product-table-th">DISCOUNT</th>
                        <th className="product-table-th">TOTAL</th>
                    </tr>
                </thead>

                {/* Product Listing */}
                <tbody>
                    {productListing(data)}
                </tbody>
                {/* Total */}
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="total-section">Total</th>
                        <th className="total-section">Rs. {data.total.subTotal}</th>
                    </tr>
                    <tr>
                        <td rowSpan="2">
                            {/* <p className="invoice-status">{data.invoiceStatus.toUpperCase()}</p> */}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="total-section">Discount</th>
                        <th className="total-section">Rs. {data.total.discount}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="total-section">Shipping</th>
                        <th className="total-section">Rs. {data.shippingAmount}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="total-section">TAX/VAT 10%</th>
                        <th className="total-section">Rs. {data.total.tax}</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th className="total-due">Total Due</th>
                        <th className="total-due">Rs. {data.total.total}</th>
                    </tr>
                </tfoot>
            </table>

            <table className="customer-notes">
                <tr>
                    <th>CUSTOMER NOTES</th>
                </tr>
                <tr>
                    <td>{data.additionalNote || 'none'}</td>
                </tr>
            </table>
            <table className='mt-50'>

            </table>
        </div>

    )
};

// Function to product list from HTML
let productListing = (data) => {
    return data.products.map((element, index) => (
        <tr key={index} className="product-row">
            <td className="product-cell"><b>{element.name}</b></td>
            <td className="product-cell">{element.quantity}</td>
            <td className="product-cell">Rs. {data.isTaxEnable ? ((element.price * element.quantity) * 0.1) : 0}</td>
            <td className="product-cell">Rs. {element.price}</td>
            <td className="product-cell">Rs. {element.discountAmount ? element.discountAmount : 0}</td>
            <td className="product-cell">Rs. {element.total}</td>
        </tr>
    ));
};

export {
    generateInvoiceHtml,
};