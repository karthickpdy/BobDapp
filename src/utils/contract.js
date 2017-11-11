import CustomerKyc from '../../build/contracts/CustomerKyc.json'
const contract = require('truffle-contract')
const customerKyc = contract(CustomerKyc)


export const getInstance = (web3) => {
    return new Promise(( resolve, reject ) => { 
        customerKyc.setProvider(web3.currentProvider)
        web3.eth.getAccounts((error, accounts) => {
            customerKyc.deployed().then((instance) =>{                
                resolve([instance,accounts[0]])
            })
        })
    })
}


export const populateCustomers = (web3) => {
    return new Promise(( resolve, reject ) => { 
        customerKyc.setProvider(web3.currentProvider)
        var customerKycInstance         
        
        getInstance(web3).then(([instance,defaultAccount]) =>{   
            customerKycInstance = instance                
            return customerKycInstance.getcustomers.call()
        }).then((result) => {
            console.log("populateCustomers call",result)
            Promise.all(
                result.map(function (customer_id) {
                   return customerKycInstance.getStatus.call(customer_id.toNumber()).then(function(res){
                        return customerKycInstance.isRequestPending.call(customer_id.toNumber()).then(function(pending_status){
                            return {"customerId" : customer_id.toNumber(),"status":res,"pending_status":pending_status} 
                        })
                   })
                })
            ).then(function(res){             
                resolve(res)        
            })
        })
        
    })
}


export const verifyAadhar = async (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.verifyAadhar(customer_id,{from:defaultAccount})
        }).then((result) => {        
            resolve(result)
        })        
    })
}


export const markOTPsent = async (customer_id, web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.markOTPsent(customer_id,{from:defaultAccount})
        }).then((result) => {        
            resolve(result)
        })        
    })
}

export const isAadharVerified = async (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.isAadharVerified.call(customer_id)
        }).then((result) => {        
            resolve(result)
        })        
    })
}

export const getStatus = async (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.getStatus.call(customer_id)
        }).then((result) => {        
            resolve(result)
        })        
    })
}



export const addCustomer = async (customer_id,aadharNumber,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{
            console.log(customer_id,aadharNumber)                        
            return instance.addCustomer(customer_id, aadharNumber, {from:defaultAccount,gas:2000000})
        }).then((result) => {        
            resolve(result)
        })        
    })
}


export const getEventLogs = async (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            instance.AuditLog({customer_id:customer_id},{fromBlock: 0, toBlock: 'latest'}).get(function(err,res) {
               console.log("Logger",res);         
               resolve(res)
            });   
        })        
    })
}

export const approveExternalRequest = async (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.approveExternalRequest(customer_id,{from:defaultAccount})
        }).then((result) => {        
            resolve(result)
        })        
    })
}

export const createExternalRequest = async (aadharNumber,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.createExternalRequest(aadharNumber,"IOB",{from:defaultAccount,gas:2000000})
        }).then((result) => {        
            resolve(result)
        })        
    })
}


export const getExternalRequestStatus = async (aadharNumber,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.getRequestStatus.call(aadharNumber)
        }).then((result) => {        
            resolve(result)
        })        
    })
}