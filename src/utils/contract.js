import getWeb3 from './getWeb3'
import CustomerKyc from '../../build/contracts/CustomerKyc.json'
const contract = require('truffle-contract')
const customerKyc = contract(CustomerKyc)



export function populateCustomers(web3,cb) {
    return new Promise( function( resolve, reject ) { 
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