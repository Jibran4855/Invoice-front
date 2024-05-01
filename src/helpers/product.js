const productsCalculation = (products, shipping, tax) => {
    try {

        let subTotal = 0;
        let discount = 0;
        let total = 0;
        let tax_vat = 0;

        products.forEach(element => {
            subTotal += +element.total
            discount += +element?.discountAmount ? +element?.discountAmount : 0
        });

        total = subTotal;
        total += +shipping;

        tax_vat = tax ? total * (10 / 100) : 0

        total = total + tax_vat

        return { subTotal, discount, total: total.toFixed(2), tax: tax_vat.toFixed(2) }
    } catch (error) {
        return { subTotal: 0, discount: 0, total: 0, tax: 0 }
    }
}

const productPriceSymbol = () => {
    return 'Rs.'
}

export {
    productsCalculation,
    productPriceSymbol
}