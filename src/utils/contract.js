import getWeb3 from './getWeb3'
import CustomerKyc from '../../build/contracts/CustomerKyc.json'
const contract = require('truffle-contract')
const customerKyc = contract(CustomerKyc)



export const populateCustomers = (web3) => {
    return new Promise(( resolve, reject ) => { 
        customerKyc.setProvider(web3.currentProvider)
        var customerKycInstance 
        var that = this;
        web3.eth.getAccounts((error, accounts) => {
            customerKyc.deployed().then((instance) => {
                customerKycInstance = instance                
                return customerKycInstance.getcustomers.call()
            }).then((result) => {
                Promise.all(
                    result.map(function (customer_id) {
                       return customerKycInstance.getStatus.call(customer_id.toNumber()).then(function(res){
                            return {"customerId" : customer_id.toNumber(),"status":res} 
                       })
                    })
                ).then(function(res){             
                    resolve(res)        
                })
            })
        })
    })
}

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


export const verifyAadhar = (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.verifyAadhar(customer_id,{from:defaultAccount})
        }).then((result) => {        
            resolve(result)
        })        
    })
}

export const isAadharVerified = (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.isAadharVerified.call(customer_id)
        }).then((result) => {        
            resolve(result)
        })        
    })
}

export const getStatus = (customer_id,web3) => {
    return new Promise(( resolve, reject ) => {         
        getInstance(web3).then(([instance,defaultAccount]) =>{                        
            return instance.getStatus.call(customer_id)
        }).then((result) => {        
            resolve(result)
        })        
    })
}