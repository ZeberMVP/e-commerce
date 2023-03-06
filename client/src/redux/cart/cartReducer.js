import { GET_ALL_PRODUCTS, ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, INCREASE_SIZE, DECREASE_SIZE, DELETE_CART } from './cartTypes'

const INITIAL_STATE = {
    numberItems: 0,
    cartItems: [],
    _products: []
}

function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                _products: action.payload
            }

        case ADD_CART:
            if (state.numberItems === 0) {
                let cart = {
                    product_name: action.payload.product_name,
                    relevance: action.payload.relevance,
                    quantity: 1,
                    size: 40,
                    image: action.payload.image,
                    price: action.payload.price,
                }
                state.cartItems.push(cart);
            } else {
                let check = false;
                state.cartItems.forEach((item, i) => {
                    if (item.id === action.payload.id) {
                        state.cartItems[i].quantity++;
                        check = true;
                    }

                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        title: action.payload.title,
                        quantity: 1,
                        category: action.payload.category,
                        image: action.payload.image,
                        price: action.payload.price,
                        description: action.payload.description
                    }
                    state.cartItems.push(_cart);
                }
            }
            return {
                ...state,
                numberItems: state.numberItems + 1
            }

        case INCREASE_QUANTITY:
            state.cartItems[action.payload].quantity++;
            return {
                ...state,
                cartItems: state.cartItems,
                numberItems: state.numberItems + 1
            }

        case DECREASE_QUANTITY:
            let qty = state.cartItems[action.payload].quantity;
            if (qty > 1) {
                state.cartItems[action.payload].quantity--;
                return {
                    ...state,
                    cartItems: state.cartItems,
                    numberItems: state.numberItems - 1

                }
            } else {
                state.cartItems[action.payload].quantity = 0;
                return {
                    ...state,
                    cartItems: state.cartItems.filter(item => item.id !== state.cartItems[action.payload].id),
                    numberItems: state.numberItems - 1

                }
            }

        case INCREASE_SIZE:
            let size = state.cartItems[action.payload].size;
            if (size < 47) {
                state.cartItems[action.payload].size++;
                return {
                    ...state,
                    cartItems: state.cartItems,
                    size: state.size + 1
                }
            } else {
                break;
            }

        case DECREASE_SIZE:
            if (size > 37) {
                state.cartItems[action.payload].size--;
                return {
                    ...state,
                    cartItems: state.cartItems,
                    size: state.size - 1
                }
            } else {
                break
            }

        case DELETE_CART:
            let quantity_ = state.cartItems[action.payload].quantity;
            return {
                ...state,
                numberItems: state.numberItems - quantity_,
                cartItems: state.cartItems.filter(item => item.id !== state.cartItems[action.payload].id)
            }

        default:
            return state;
    }
}

export default cartReducer;