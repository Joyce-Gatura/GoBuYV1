import axios from "axios";

// Get M-Pesa access token
const getMpesaAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;

  } catch (error) {
    console.error(
      "M-Pesa access token error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to get M-Pesa access token");
  }
};


// Generate timestamp
const getTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};


// Generate STK Push password
const generateMpesaPassword = (timestamp) => {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;

  return Buffer.from(
    `${shortcode}${passkey}${timestamp}`
  ).toString("base64");
};


// Send STK Push
// export const stkPush = async ({
//   phoneNumber,
//   amount,
//   accountReference,
//   transactionDescription,
// }) => {
//   try {
//     // Get access token
//     const accessToken = await getMpesaAccessToken();

//     // Generate timestamp
//     const timestamp = getTimestamp();

//     // Generate password
//     const password = generateMpesaPassword(timestamp);

//     // Send STK Push request
//     const response = await axios.post(
//       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//       {
//         BusinessShortCode: process.env.MPESA_SHORTCODE,

//         Password: password,

//         Timestamp: timestamp,

//         TransactionType: "CustomerPayBillOnline",

//         Amount: Number(amount),

//         PartyA: phoneNumber,

//         PartyB: process.env.MPESA_SHORTCODE,

//         PhoneNumber: phoneNumber,

//         CallBackURL: process.env.MPESA_CALLBACK_URL,

//         AccountReference: accountReference,

//         TransactionDesc: transactionDescription,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;

//   } catch (error) {
//     console.error(
//       "STK Push error:",
//       error.response?.data || error.message
//     );

//     throw new Error("Failed to initiate M-Pesa STK Push");
//   }
// };

export const stkPush = async ({
  phoneNumber,
  amount,
  accountReference,
  transactionDescription,
}) => {
  try {
    // Format Kenyan phone number
    const formattedPhone = phoneNumber
      .toString()
      .trim()
      .replace(/\s+/g, "")
      .replace(/^0/, "254")
      .replace(/^\+254/, "254");

    console.log("Original phone:", phoneNumber);
    console.log("Formatted phone:", formattedPhone);

    // Get M-Pesa access token
    const accessToken = await getMpesaAccessToken();

    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    // Generate password
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    // STK Push request
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: transactionDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("STK Push error:", error.response?.data || error.message);

    throw new Error("Failed to initiate M-Pesa STK Push");
  }
};


export default getMpesaAccessToken;