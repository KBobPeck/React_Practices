
const reducer = (state, action) => {

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  if (action.type === 'REMOVE') {
    const itemcart = state.cart
    const newCart = itemcart.filter((item) => item.id !== action.payload)
    console.log(itemcart, newCart);
    return { ...state, cart: newCart }
  }

  if (action.type === 'INCREASE') {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === 'DECREASE') {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount - 1 }
      }
      return cartItem
    }).filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }

  if (action.type === 'GET_TOTALS') {
    const { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
      const { amount, price } = cartItem
      cartTotal.total += amount * price
      cartTotal.amount += amount
      return cartTotal
    }, {
      total: 0,
      amount: 0
    })

    return { ...state, total, amount }
  }

  if(action.type === 'LOADING'){
    return {...state, loading: true}
  }
  if(action.type === 'DISPLAY_ITEMS'){
    return {...state, cart:action.payload, loading: false}
  }

  return state
}

export default reducer