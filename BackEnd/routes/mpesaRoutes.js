// import express from "express";
// import getMpesaAccessToken from "../services/mpesaService.js";
// import { initiateStkPush,mpesaCallback } from "../controllers/mpesaController.js";

// const router = express.Router();

// router.get("/test-token", async (req, res) => {
//   try {
//     const token = await getMpesaAccessToken();

//     res.json({
//       message: "M-Pesa authentication successful",
//       token: token,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// router.post("/stkpush", initiateStkPush);
// router.post("/callback", mpesaCallback);

// export default router;

import express from "express";
import getMpesaAccessToken from "../services/mpesaService.js";
import {
  initiateStkPush,
  mpesaCallback,
} from "../controllers/mpesaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test-token", async (req, res) => {
  try {
    const token = await getMpesaAccessToken();

    res.json({
      message: "M-Pesa authentication successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/stkpush", authMiddleware, initiateStkPush);

// Safaricom callback must NOT use authMiddleware
router.post("/callback", mpesaCallback);

export default router;