export const AppReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_CUSTOMERS':
      return {...state, customers: action.customers}
    case 'UPDATE_CUSTOMER':
      const customerToBeUpdated = state.customers.filter(customer => customer.customerId === action.customerId)[0]
      customerToBeUpdated.status = action.status;
      return {customers: state.customers.filter(customer => customer.customerId !== action.customerId).concat([customerToBeUpdated])}
    default:
      return state;
  }
}