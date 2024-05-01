import React, { useState, useEffect } from "react";
import {
    Input
} from "reactstrap";

import ProductsTable from "../tables/productsTable";
import InvoiceModal from "../Modals/invoiceModal";
import { productPriceSymbol } from "../../helpers/product";

function TableRows({ rows, tableRowRemove, onValUpdate, openSelectProductModal }) {
    return rows.map((rowsData, index) => {

        const { name, quantity, price, discount, subTotal, total, _id } = rowsData;

        return (
            <tr key={index}>
                <td className="d-flex align-items-center p-2">
                    <i class="fa fa-times-circle" onClick={() => tableRowRemove(index)}></i>
                    <Input
                        bsSize="sm"
                        className="form-control mr-1 ml-1"
                        placeholder="Enter Product Name OR Description"
                        type="text"
                        value={name}
                        onChange={(event) => onValUpdate(index, event)}
                        name="name"
                    />
                    or
                    <span className="cursor-pointer ml-1" onClick={() => { openSelectProductModal(index) }}>
                        select a product
                    </span>
                </td>
                <td className="p-2">
                    <Input
                        bsSize="sm"
                        className="form-control mr-1"
                        type="number"
                        value={quantity}
                        onChange={(event) => onValUpdate(index, event)}
                        name="quantity"
                    />
                </td>
                <td className="p-2">
                    <div className="input-group-merge input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text pt-0 pb-0 pr-0">
                                {productPriceSymbol()}
                            </span>
                        </div>
                        <Input
                            bsSize="sm"
                            type="number"
                            value={price}
                            onChange={(event) => onValUpdate(index, event)}
                            name="price"
                        />
                    </div>
                </td>
                <td className="p-2">
                    <Input
                        bsSize="sm"
                        placeholder="Enter % OR value (ex: 10% or 10.50)"
                        type="text"
                        value={discount}
                        onChange={(event) => onValUpdate(index, event)}
                        name="discount"
                    />
                </td>
                <td className="p-2">
                    <div className="input-group-merge input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text pt-0 pb-0 pr-0">
                                {productPriceSymbol()}
                            </span>
                        </div>
                        <Input
                            className="pl-1"
                            disabled={true}
                            bsSize="sm"
                            type="number"
                            value={total}
                            onChange={(event) => onValUpdate(index, event)}
                            name="total"
                        />
                    </div>
                </td>
            </tr>
        );
    });
}

const initialData = {
    name: "",
    quantity: 1,
    price: 0,
    discount: "",
    subTotal: 0,
    total: 0
};

function Table({
    modalType,
    products,
    setModalType,
    setInvoiceProductData,
    resetProducts,
    setResetProducts,
    invoiceProductData,
    isEdit = false,
    setIsEdit
}) {
    const [rows, initRow] = useState([initialData]);
    const [clickedIndex, setClickedIndex] = useState(0);

    const addRowTable = () => {
        initRow([...rows, initialData]);
    };

    const tableRowRemove = (index) => {

        if (rows.length === 1) {
            return false;
        }

        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
    };

    const updateProTotal = (data, index) => {

        const { subTotal, discountAmount, total } = calculateProductRowTotal(data[index]);

        data[index].subTotal = subTotal;
        data[index].total = total;
        data[index].discountAmount = discountAmount;
    }

    const calculateProductRowTotal = (pro) => {
        const { quantity, price, discount } = pro;

        let discountValue = discount;
        let calVal = 0;
        let proAmount = price * quantity;
        let proDisc = 0;

        if (discount && discount.endsWith('%')) {
            discountValue = discount.slice(0, -1) / 100;
            proDisc = ((price * quantity) * discountValue).toFixed(2);
            calVal = proAmount - proDisc;
        } else {

            if (isNaN(+discount)) {
                discountValue = 0;
            }

            proDisc = discountValue;
            calVal = proAmount - proDisc;
        }

        if (calVal < 0) {
            calVal = proAmount;
        }

        return { subTotal: proAmount, discountAmount: proDisc, total: calVal.toFixed(2) };
    }

    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        let data = [...rows];
        data[i] = { ...data[i], [name]: value };

        updateProTotal(data, i)
        initRow(data);
    };

    const handleSelectProduct = (selectedPro) => {
        let data = [...rows];
        data[clickedIndex] = { ...selectedPro, quantity: 1 };

        updateProTotal(data, clickedIndex)
        initRow(data);
        setModalType("")
    }

    const openSelectProductModal = (index) => {
        setClickedIndex(index)
        setModalType('product')
    }

    useEffect(() => {
        if (isEdit) {
            if (invoiceProductData && invoiceProductData.length > 0) {
                initRow([...invoiceProductData, initialData]);
                setIsEdit(false)
            }
        } else {
            setInvoiceProductData(rows)
        }
    }, [rows, invoiceProductData]);

    // useEffect(() => {
    //     setInvoiceProductData(rows)
    // }, [rows]);

    useEffect(() => {
        if (resetProducts) {
            initRow([initialData])
            setResetProducts(false);
        }
    }, [resetProducts]);

    return (
        <>
            <table className="table table-striped table-bordered table-responsive">
                <thead>
                    <tr className="table-active">
                        <td className="add-product-btn-box" width="400">
                            <i className="fa fa-plus-square mr-1" aria-hidden="true" onClick={addRowTable}></i>
                            <h4>Product</h4>
                        </td>
                        <td width="50">
                            <h4>Qty</h4>
                        </td>
                        <td width="100">
                            <h4>Price</h4>
                        </td>
                        <td width="300">
                            <h4>Discount</h4>
                        </td>
                        <td width="100">
                            <h4>Sub Total</h4>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <TableRows
                        rows={rows}
                        tableRowRemove={tableRowRemove}
                        onValUpdate={onValUpdate}
                        openSelectProductModal={openSelectProductModal}
                    />
                </tbody>
            </table>

            <InvoiceModal
                isOpen={(modalType === 'product')}
                hideModal={() => { setModalType("") }}
                title={"Select an Existing Product"}
            >
                {modalType === 'product' && <ProductsTable
                    data={products}
                    isHandleSelectEnable={true}
                    handleSelect={handleSelectProduct}
                />}
            </InvoiceModal>
        </>
    );
}
export default Table;