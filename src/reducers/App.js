export const AppReducer = (state = {customers: [], error: ''}, action) => {
  switch(action.type) {
    case 'LOAD_CUSTOMERS':
      return {...state, customers: action.customers}
    case 'ADD_CUSTOMER':
      return {...state, customers: state.customers.concat([action.customer])}
    case 'UPDATE_CUSTOMER':    
      const customerToBeUpdated = state.customers.filter(customer => customer.customerId === action.customerId)[0]
      customerToBeUpdated.status = action.status;
      return {customers: state.customers.filter(customer => customer.customerId !== action.customerId).concat([customerToBeUpdated])}
    case 'UPDATE_EXTERNAL_REQUEST':
      return {...state,external_requests: action.results}
    case 'RELOAD_LOGS':
      return {...state,logs:action.logs}
    case 'ERROR':
      return {...state, error: action.error}
    default:
      return state;
  }
}