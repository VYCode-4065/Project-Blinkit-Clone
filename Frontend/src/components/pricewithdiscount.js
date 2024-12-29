export const pricewithdiscount = (price, dis) => {
    let actualAmt = Number(price);


    if (Number(dis) !== 0) {

        const discountAmt = Math.ceil((Number(price) * Number(dis)) / 100);
        actualAmt = Number(price) - discountAmt;
    }
    return actualAmt;
}