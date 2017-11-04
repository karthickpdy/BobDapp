export const initiateAadharVerification = (customerId, aadharNumber) => {
  return fetch(`http://127.0.0.1:8082/api/aadhar/initiate-verification`, {
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
  return fetch(`http://127.0.0.1:8082/api//aadhar/verify-otp`, {
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