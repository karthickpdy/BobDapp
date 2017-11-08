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
    case 'ADD_EXTERNAL_REQUEST':
      return {...state, external_requests: state.external_requests.concat([action.external_request])}
    case 'UPDATE_EXTERNAL_REQUEST':
      const externalRequestToUpdate = state.external_requests.filter(request => request.aadharNumber === action.aadharNumber)[0]
      externalRequestToUpdate.status = action.external_request.status;
      return {external_requests: state.external_requests.filter(request => request.aadharNumber !== action.aadharNumber).concat([externalRequestToUpdate])}
    case 'ERROR':
      return {...state, error: action.error}
    default:
      return state;
  }
}