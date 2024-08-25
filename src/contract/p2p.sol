// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

  function transfer(address recipient, uint256 amount) external returns (bool);
}

contract P2PIntermediary {
  IERC20 public token;
  address public owner;
  uint256 public transactionCount;

  struct Transaction {
    address buyer;
    address seller;
    uint256 amount;
    bool buyerApproval;
    bool sellerApproval;
    bool ownerApproval;
    bool isCompleted;
  }

  mapping(uint256 => Transaction) public transactions;

  modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
  }

  event TransactionCreated(
    uint256 indexed transactionId,
    address indexed buyer,
    address indexed seller,
    uint256 amount
  );
  event TransactionApproved(uint256 indexed transactionId, address indexed approver);
  event TransactionCompleted(uint256 indexed transactionId);

  constructor() {
    token = IERC20(0xc2132D05D31c914a87C6611C10748AEb04B58e8F);
    owner = msg.sender;
  }

  function createTransaction(address _seller, uint256 _amount) external returns (uint256) {
    transactionCount++;
    uint256 transactionId = transactionCount;

    transactions[transactionId] = Transaction({
      buyer: msg.sender,
      seller: _seller,
      amount: _amount,
      buyerApproval: false,
      sellerApproval: false,
      ownerApproval: false,
      isCompleted: false
    });

    require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

    emit TransactionCreated(transactionId, msg.sender, _seller, _amount);

    return transactionId;
  }

  function approveTransaction(uint256 _transactionId) external {
    Transaction storage txn = transactions[_transactionId];

    require(!txn.isCompleted, "Transaction already completed");
    require(
      msg.sender == txn.buyer || msg.sender == txn.seller || msg.sender == owner,
      "Not authorized to approve"
    );

    if (msg.sender == txn.buyer) {
      txn.buyerApproval = true;
    } else if (msg.sender == txn.seller) {
      txn.sellerApproval = true;
    } else if (msg.sender == owner) {
      txn.ownerApproval = true;
    }

    emit TransactionApproved(_transactionId, msg.sender);

    uint256 approvalCount = 0;
    if (txn.buyerApproval) approvalCount++;
    if (txn.sellerApproval) approvalCount++;
    if (txn.ownerApproval) approvalCount++;

    if (approvalCount >= 2) {
      txn.isCompleted = true;
      require(token.transfer(txn.seller, txn.amount), "Transfer to seller failed");
      emit TransactionCompleted(_transactionId);
    }
  }

  function cancelTransaction(uint256 _transactionId) external {
    Transaction storage txn = transactions[_transactionId];

    require(!txn.isCompleted, "Transaction already completed");
    require(
      msg.sender == txn.buyer || msg.sender == txn.seller || msg.sender == owner,
      "Not authorized to cancel"
    );

    txn.isCompleted = true;
    require(token.transfer(txn.buyer, txn.amount), "Refund to buyer failed");
  }
}
