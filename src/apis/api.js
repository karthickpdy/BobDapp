import * as constants from '../utils/constants'

export const initiateAadharVerification = (customerId, aadharNumber) => {
  return fetch(`${constants.API_SERVICE_URL}/api/aadhar/initiate-verification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({customerId, aadharNumber})
  }).then(response => {
    return response.json()
  }).then(response => {
    return response;
  }).catch(e => {
    return JSON.parse(e)
  })
}


export const verifyOTP = (customerId, aadharNumber, OTP) => {
  return fetch(`${constants.API_SERVICE_URL}/api/aadhar/verify-otp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({customerId, aadharNumber, OTP})
  }).then(response => {
    return response.json()
  }).then(response => {
    return response;
  }).catch(e => {
    return JSON.parse(e)
  })
}


export const getCustomer = (customerId) => {
  return fetch(`${constants.API_SERVICE_URL}/api/bob/customer-details`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'Customer_Id': customerId})
  }).then(response => {
    return response.json()
  }).then(response => {
    return response;
  }).catch(e => {
    return JSON.parse(e)
  })
}