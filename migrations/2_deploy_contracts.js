var CustomerKyc = artifacts.require("./CustomerKyc.sol");

module.exports = function(deployer) {
	var customer_ids = [435723112,437725114, 476764153, 483771160, 487775164]
	var aadharNumbers = ["124536987225","64536987225", "114536987225", "24536987225", "84536987225"]
  	
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
