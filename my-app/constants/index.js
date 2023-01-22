export const abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "DraftId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nameOfGoods",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nameOfVendor",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "AmountToBePaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    name: "DraftApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "DraftId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nameOfGoods",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nameOfVendor",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "AmountToBePaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    name: "DraftCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toBePaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "Vendor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_nameOfVendor",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_nameOfGoods",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "Paid",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    name: "VoucherCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toBePaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "Vendor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_nameOfVendor",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_nameOfGoods",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "Paid",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "created",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timePaid",
        type: "uint256",
      },
    ],
    name: "VoucherPaid",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "Bursar",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ECU",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VC",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bursar",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ecu",
        type: "address",
      },
    ],
    name: "appointStaff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "approveDraft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "approvedDraftsCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bursaryBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_vendor",
        type: "address",
      },
      {
        internalType: "string",
        name: "_nameOfGoods",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nameOfVendor",
        type: "string",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_toBePaid",
        type: "uint256",
      },
    ],
    name: "createDraft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_draftId",
        type: "uint256",
      },
    ],
    name: "createVoucher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "draftCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "drafts",
    outputs: [
      {
        internalType: "uint256",
        name: "DraftId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "nameOfGoods",
        type: "string",
      },
      {
        internalType: "string",
        name: "nameOfVendor",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "Vendor",
        type: "address",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "AmountToBePaid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllDrafts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "DraftId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "AmountToBePaid",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct PaymentVoucher.Draft[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllVouchers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "draftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toBePaid",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "bool",
            name: "Paid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timePaid",
            type: "uint256",
          },
        ],
        internalType: "struct PaymentVoucher.Voucher[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getApprovedDrafts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "DraftId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "AmountToBePaid",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct PaymentVoucher.Draft[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaidVouchers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "draftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toBePaid",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "bool",
            name: "Paid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timePaid",
            type: "uint256",
          },
        ],
        internalType: "struct PaymentVoucher.Voucher[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUnApprovedDrafts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "DraftId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "AmountToBePaid",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct PaymentVoucher.Draft[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUnPaidVouchers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "draftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "toBePaid",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "Vendor",
            type: "address",
          },
          {
            internalType: "string",
            name: "nameOfVendor",
            type: "string",
          },
          {
            internalType: "string",
            name: "nameOfGoods",
            type: "string",
          },
          {
            internalType: "bool",
            name: "Paid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timePaid",
            type: "uint256",
          },
        ],
        internalType: "struct PaymentVoucher.Voucher[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paidVouchersCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "payforGoods",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "voucherCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "vouchers",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "draftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toBePaid",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "Vendor",
        type: "address",
      },
      {
        internalType: "string",
        name: "nameOfVendor",
        type: "string",
      },
      {
        internalType: "string",
        name: "nameOfGoods",
        type: "string",
      },
      {
        internalType: "bool",
        name: "Paid",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "timePaid",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const PAYMENT_VOUCHER_CONTRACT_ADDRESS =
  "0x45989363ECd1ecCcC762639067F15603dA0a5537";
