pragma solidity ^0.4.2;

contract CustomerKyc {
    
    event AuditLog(string content,address indexed doer,uint timestamp);
    
    enum Status { NOT_VERIFIED,OTP_SENT,VERIFIED }
    
    struct Customer {
        uint id;
        string name;
        string aadharNumber;
        Status status;
    }

    mapping (uint => Customer) public customers;

    function addCustomer(uint _id,string _name) {        
        customers[_id] = Customer(_id,_name,"",Status.NOT_VERIFIED);
        AuditLog("Customer Created",msg.sender,now);    
    }


    function markOTPsent(uint _id){
        customers[_id].status = Status.OTP_SENT;
        AuditLog("OTP Sent",msg.sender,now);    
    }

    function verifyAadhar(uint _id){
        customers[_id].status = Status.VERIFIED;
        AuditLog("Aadhar Verified",msg.sender,now);    
    }
    
    function isAadharVerified(uint _id) returns(bool) {
        AuditLog("Aadhar Verification Request raised",msg.sender,now);    
        return customers[_id].status == Status.VERIFIED;
    }    
}
