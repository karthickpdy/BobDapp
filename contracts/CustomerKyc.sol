pragma solidity ^0.4.2;

contract CustomerKyc {
    
    event AuditLog(string content,address indexed doer,uint indexed customer_id,uint timestamp);
    
    enum Status { NOT_VERIFIED,OTP_SENT,VERIFIED }
    enum ExternalRequestStatus { PENDING,APPROVED }

    struct Customer {
        uint id;        
        string aadharNumber;
        Status status;
    }

    struct ExternalRequest {
        string aadharNumber;
        string requestor;
        ExternalRequestStatus status;
    }
    
    mapping (uint => Customer) public customers;
    mapping (string => Customer)  aadhar_mapping;
    
    mapping (uint => ExternalRequest) public external_requests;
    
    
    
    uint[] public customer_ids;


    function addCustomer(uint _id,string _aadharNumber) {        
        customers[_id] = Customer(_id,_aadharNumber,Status.NOT_VERIFIED);
        aadhar_mapping[_aadharNumber] = customers[_id];
        customer_ids.push(_id);
        AuditLog("Customer Created",msg.sender,_id,now);    
    }


    function markOTPsent(uint _id) {
        customers[_id].status = Status.OTP_SENT;
        AuditLog("OTP Sent",msg.sender,_id,now);    
    }
    
    function unverifyAadhar(uint _id) {
        customers[_id].status = Status.NOT_VERIFIED;
        AuditLog("Aadhar Verified",msg.sender,_id,now);    
    }

    function verifyAadhar(uint _id) {
        customers[_id].status = Status.VERIFIED;
        AuditLog("Aadhar Verified",msg.sender,_id,now);    
    }
    
    function isAadharVerified(uint _id) constant returns(bool) {
        AuditLog("Aadhar Verification Request raised",msg.sender,_id,now);    
        return customers[_id].status == Status.VERIFIED;
    }    
    
    function getcustomers() constant returns(uint[]) {
        return customer_ids;
    }
    
    function getStatus(uint _id) constant returns(string) {        
        if(customers[_id].status == Status.VERIFIED) {
            return "VERIFIED";
        } else if(customers[_id].status == Status.OTP_SENT) {
            return "OTP_SENT";
        }  else if(customers[_id].status == Status.NOT_VERIFIED) {
            return "NOT_VERIFIED";
        } else {
            return "INVALID";
        }                
    }
    
    
    function createExternalRequest(string aadharNumber,string requestor) returns(string){
        ExternalRequest memory e = ExternalRequest(aadharNumber,requestor,ExternalRequestStatus.PENDING);
        if(aadhar_mapping[aadharNumber].id != 0){
            external_requests[aadhar_mapping[aadharNumber].id] = e;
            return "Request is being processed";
        }
        else
            return "Aadhar Not Present";
            
        
    }
    
        
    function getRequestStatus(string aadharNumber) constant returns(string) {        
        Customer memory c = aadhar_mapping[aadharNumber];
        ExternalRequest memory  e = external_requests[c.id];
        if(e.status == ExternalRequestStatus.PENDING) {
            return "Request Pending";
        } else {
            return getStatus(c.id);
        }
    }
}
