// SPDX-License-Identifier: MIT

//Payment Voucher Contract Address: 0x45989363ECd1ecCcC762639067F15603dA0a5537

pragma solidity ^0.8.0;

contract PaymentVoucher {
    uint public voucherCounter = 0;
    uint public draftCounter = 0;
    uint public approvedDraftsCounter = 0;
    uint public paidVouchersCounter = 0;
    mapping(uint => Voucher) public vouchers;
    mapping(uint => Draft) public drafts;
    event DraftCreated(
        uint DraftId,
        string nameOfGoods,
        string nameOfVendor,
        string reason,
        uint AmountToBePaid,
        bool approved,
        bool created
    );
    event DraftApproved(
        uint DraftId,
        string nameOfGoods,
        string nameOfVendor,
        string reason,
        uint AmountToBePaid,
        bool approved,
        bool created
    );
    event VoucherCreated(
        uint id,
        uint toBePaid,
        address payable Vendor,
        string _nameOfVendor,
        string _nameOfGoods,
        bool Paid,
        bool created
    );
    event VoucherPaid(
        uint id,
        uint toBePaid,
        address payable Vendor,
        string _nameOfVendor,
        string _nameOfGoods,
        bool Paid,
        bool created,
        uint timePaid
    );

    //address public solicitor;
    address public VC;
    address public Bursar;
    address public ECU; // expenditure control unit (raises voucher)
    //address public Audit; //verifies voucher(may not need this unit)

    struct Draft {
        uint DraftId;
        string nameOfGoods;
        string nameOfVendor;
        address payable Vendor;
        string reason;
        uint AmountToBePaid;
        bool approved;
        bool created;
    }

    struct Voucher {
        uint id;
        uint draftId;
        uint toBePaid;
        address payable Vendor;
        string nameOfVendor;
        string nameOfGoods;
        bool Paid;
        bool created;
        uint timePaid;
    }

    constructor() payable {
        VC = msg.sender;
    }

    //appoint Staff
    function appointStaff(address _bursar, address _ecu) public {
        //ensure that only the VC can call this function
        require(
            msg.sender == VC,
            "Only the Vice-Chanscellor can appoint Staff"
        );
        Bursar = _bursar;
        ECU = _ecu;
    }

    //COMPLETE
    function createDraft(
        address payable _vendor,
        string memory _nameOfGoods,
        string memory _nameOfVendor,
        string memory _reason,
        uint _toBePaid
    ) public {
        //ensure that the address calling this function isn't same as vendor
        require(_vendor != msg.sender, "You can't create a draft");
        //ensure that the vendor address is not empty
        require(_vendor != address(0), "Please give a Valid Address");
        //ensure that the amount to be paid is valid
        require(_toBePaid > 0, "Invalid Amount");
        //ensure that the draft has not already been created & approved
        require(!drafts[draftCounter].created, "Already Created");
        require(!drafts[draftCounter].approved, "Already Approved");
        //create draft
        drafts[draftCounter] = Draft(
            draftCounter,
            _nameOfGoods,
            _nameOfVendor,
            _vendor,
            _reason,
            _toBePaid,
            false,
            true
        );
        emit DraftCreated(
            draftCounter,
            _nameOfGoods,
            _nameOfVendor,
            _reason,
            _toBePaid,
            false,
            true
        );
        //increment draft count
        draftCounter++;
    }

    function approveDraft(uint _id) public {
        Draft storage _draft = drafts[_id];
        //make sure that you can't approve an invalid draft
        require(_draft.DraftId >= 0, "This is an invalid draft");
        //make sure only the VC can approve drafts
        require(msg.sender == VC, "Only the VC can approve drafts");
        //make sure that the draft has been created
        require(_draft.created == true, "Not created");
        //make sure that he draft has not already been approved
        require(!_draft.approved, "This draft has already been approved");
        //update the draft
        drafts[_id] = Draft(
            _draft.DraftId,
            _draft.nameOfGoods,
            _draft.nameOfVendor,
            _draft.Vendor,
            _draft.reason,
            _draft.AmountToBePaid,
            true,
            true
        );

        //emit event
        emit DraftApproved(
            _draft.DraftId,
            _draft.nameOfGoods,
            _draft.nameOfVendor,
            _draft.reason,
            _draft.AmountToBePaid,
            true,
            true
        );
        //increment approved draft counter
        approvedDraftsCounter++;
    }

    //COMPLETE
    function createVoucher(uint _draftId) public {
        //create an instance of Voucher
        Voucher storage _voucher = vouchers[voucherCounter];
        //create an instance of Draft
        Draft storage _draft = drafts[_draftId];
        // require (drafts[_draftId] = _draft, "invalid draft");
        //only ECU can create a voucher
        require(
            msg.sender == ECU || msg.sender == Bursar,
            "only the Expenditure Control Unit or Bursar can create a Voucher"
        );
        //ensure that the draft has been approved
        require(_draft.approved == true, "Invalid Draft ID");
        //ensure that the voucher has not already been paid for
        require(!_voucher.Paid, "This Voucher has already been paid for");
        // ensure that the voucher is not duplicated
        require(!vouchers[_draftId].created, "Already created");
        //Pass Draft Values to Voucher Values
        _voucher.nameOfGoods = _draft.nameOfGoods;
        _voucher.nameOfVendor = _draft.nameOfVendor;
        _voucher.toBePaid = _draft.AmountToBePaid;
        _voucher.Vendor = _draft.Vendor;
        _voucher.draftId = _draft.DraftId;
        //create voucher
        vouchers[voucherCounter] = Voucher(
            voucherCounter,
            _voucher.draftId,
            _voucher.toBePaid,
            _voucher.Vendor,
            _voucher.nameOfVendor,
            _voucher.nameOfGoods,
            false,
            true,
            0
        );
        //trigger event
        emit VoucherCreated(
            voucherCounter,
            _voucher.toBePaid,
            _voucher.Vendor,
            _voucher.nameOfVendor,
            _voucher.nameOfGoods,
            false,
            true
        );
        //increment voucher count
        voucherCounter++;
    }

    //COMPLETE
    function payforGoods(uint _id) public payable {
        // fetch the voucher
        Voucher storage _voucher = vouchers[_id];
        //fetch the Vendor
        address payable _vendor = _voucher.Vendor;
        //make sure only the treasury division can pay
        require(msg.sender == Bursar, "Only the bursar can make payments");
        // //make sure the Voucher is valid
        require(_voucher.id >= 0, "This is not a valid Voucher");
        // make sure the bursary has enough funds
        require(
            address(this).balance >= _voucher.toBePaid,
            "Sorry, the bursary has insufficient funds"
        );
        //make sure the voucher has not been paid for
        require(!_voucher.Paid, "This Voucher has already been paid for");

        // transfer the money to the vendor
        _vendor.transfer(_voucher.toBePaid);
        //Update the Voucher
        vouchers[_id] = Voucher(
            _id,
            _voucher.draftId,
            _voucher.toBePaid,
            _vendor,
            _voucher.nameOfVendor,
            _voucher.nameOfGoods,
            true,
            true,
            block.timestamp
        );
        //Trigger an event
        emit VoucherPaid(
            _voucher.id,
            _voucher.toBePaid,
            _vendor,
            _voucher.nameOfVendor,
            _voucher.nameOfGoods,
            _voucher.Paid,
            _voucher.created,
            block.timestamp
        );
        //increase the paid vouchers counter
        paidVouchersCounter++;
    }

    //returns all vouchers
    function getAllVouchers() public view returns (Voucher[] memory) {
        Voucher[] memory ret = new Voucher[](voucherCounter);
        for (uint i = 0; i < voucherCounter; i++) {
            Voucher storage voucher = vouchers[i];
            ret[i] = voucher;
        }
        return ret;
    }

    //return all drafts
    function getAllDrafts() public view returns (Draft[] memory) {
        Draft[] memory ret = new Draft[](draftCounter);
        for (uint i = 0; i < draftCounter; i++) {
            Draft storage draft = drafts[i];
            ret[i] = draft;
        }
        return ret;
    }

    function bursaryBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() public {
        require(msg.sender == VC, "only the VC can withdraw");
        uint256 amount = address(this).balance;
        (bool sent, ) = VC.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getUnApprovedDrafts() public view returns (Draft[] memory) {
        uint draftCount = draftCounter;
        uint unApprovedDraftCount = draftCounter - approvedDraftsCounter;
        uint currentIndex = 0;

        Draft[] memory items = new Draft[](unApprovedDraftCount);
        for (uint i = 0; i < draftCount; i++) {
            if (drafts[i].approved == false) {
                uint currentId = i;
                Draft storage currentItem = drafts[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //get approved Drafts
    function getApprovedDrafts() public view returns (Draft[] memory) {
        uint draftCount = draftCounter;
        uint uncreatedVoucherCount = approvedDraftsCounter - voucherCounter;
        uint currentIndex = 0;

        Draft[] memory approvedDrafts = new Draft[](uncreatedVoucherCount);

        for (uint i = 0; i < draftCount; i++) {
            if (drafts[i].approved == true && vouchers[i].created == false) {
                uint currentId = i;
                Draft storage currentItem = drafts[currentId];
                approvedDrafts[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return approvedDrafts;
    }

    function getUnPaidVouchers() public view returns (Voucher[] memory) {
        uint voucherCount = voucherCounter;
        uint unPaidVoucherCount = voucherCounter - paidVouchersCounter;
        uint currentIndex = 0;

        Voucher[] memory items = new Voucher[](unPaidVoucherCount);
        for (uint i = 0; i < voucherCount; i++) {
            if (vouchers[i].Paid == false) {
                uint currentId = i;
                Voucher storage currentItem = vouchers[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //get paid vouchers
    function getPaidVouchers() public view returns (Voucher[] memory) {
        uint voucherCount = voucherCounter;
        uint currentIndex = 0;

        Voucher[] memory paidVouchers = new Voucher[](paidVouchersCounter);
        for (uint i = 0; i < voucherCount; i++) {
            if (vouchers[i].Paid == true) {
                uint currentId = i;
                Voucher storage currentItem = vouchers[currentId];
                paidVouchers[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return paidVouchers;
    }
}
