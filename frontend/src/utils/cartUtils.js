export const addDecimal = (num) => (Math.round(num*100)/100).toFixed(2);

export const updateCart = (state) => {
    // Calc items price 
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item)=> 
        acc + item.price*item.qty,0));
    // Calc shipping price
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10)
    // Calc tax price
    state.taxPrice = addDecimal(Number(state.itemsPrice*(15/100)).toFixed(2));
    // Calc total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    
    return state;
}