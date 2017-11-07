var CustomerKyc = artifacts.require("./CustomerKyc.sol");

module.exports = function(deployer) {
	var customer_ids = [435723112,436724113,437725114,438726115]
	var aadharNumbers = ["1","2","3","4"]
  	
  	deployer.deploy(CustomerKyc);
  
	deployer.then(function() {
		CustomerKyc.deployed().then(function(instance){
			for(let i=0;i<customer_ids.length;i++){
		  		// console.log("here")
				instance.addCustomer(customer_ids[i],aadharNumbers[i]).then((res) => {
					console.log(res)
				})
			}	
		 })
	})
};
