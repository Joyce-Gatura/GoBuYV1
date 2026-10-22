import prisma from "../config/prisma.js";
import { stkPush } from "../services/mpesaService.js";

export const initiateStkPush = async (req, res) => {
  try {
    const {
      orderId,
      phoneNumber,
      amount,
      accountReference,
      transactionDescription,
    } = req.body;

    // Validate required fields
    if (!orderId || !phoneNumber || !amount) {
      return res.status(400).json({
        message: "Order ID, phone number and amount are required.",
      });
    }

    // Find the order
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // Make sure order belongs to logged-in user
    if (order.userId !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to pay for this order.",
      });
    }

    // Make sure order is still pending
    if (order.status !== "Pending") {
      return res.status(400).json({
        message: `Order is already ${order.status}.`,
      });
    }

    // Initiate STK Push
    const response = await stkPush({
      phoneNumber,
      amount,
      accountReference: accountReference || order.id,
      transactionDescription:
        transactionDescription || "GoBuy payment",
    });

    // Save CheckoutRequestID
    if (response.CheckoutRequestID) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          checkoutRequestId: response.CheckoutRequestID,
        },
      });
    }

    res.status(200).json({
      message: "STK Push initiated successfully",
      data: response,
    });

  } catch (error) {
    console.error("STK Push controller error:", error);

    res.status(500).json({
      message: error.message || "Failed to initiate STK Push",
    });
  }
};


export const mpesaCallback = async (req, res) => {
  try {
    console.log("M-Pesa Callback Received:");
    console.log(JSON.stringify(req.body, null, 2));

    const callbackData = req.body?.Body?.stkCallback;

    if (!callbackData) {
      return res.json({
        ResultCode: 0,
        ResultDesc: "Accepted",
      });
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = callbackData;

    // Find the GoBuy order using CheckoutRequestID
    const order = await prisma.order.findUnique({
      where: {
        checkoutRequestId: CheckoutRequestID,
      },
    });

    if (!order) {
      console.error(
        "Order not found for CheckoutRequestID:",
        CheckoutRequestID
      );

      return res.json({
        ResultCode: 0,
        ResultDesc: "Accepted",
      });
    }

    // PAYMENT SUCCESSFUL
    if (ResultCode === 0) {
      let receiptNumber = null;

      if (CallbackMetadata?.Item) {
        const receiptItem = CallbackMetadata.Item.find(
          (item) => item.Name === "MpesaReceiptNumber"
        );

        receiptNumber = receiptItem?.Value || null;
      }

      // Update order status
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: "Paid",
        },
      });

      // Reduce stock
      for (const item of await prisma.orderItem.findMany({
        where: {
          orderId: order.id,
        },
      })) {
        await prisma.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      console.log("Payment successful!");
      console.log("Order:", order.id);
      console.log("M-Pesa Receipt:", receiptNumber);

    } else {
      // PAYMENT FAILED
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: "Failed",
        },
      });

      console.log("M-Pesa payment failed:");
      console.log(ResultDesc);
    }

    res.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
    });

  } catch (error) {
    console.error("M-Pesa callback error:", error);

    res.status(500).json({
      ResultCode: 1,
      ResultDesc: "Failed",
    });
  }
};