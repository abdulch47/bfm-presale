import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import step1 from "../assets/images/howto/2/step1.jpeg";
import step2 from "../assets/images/howto/2/step2.jpeg";
import step3 from "../assets/images/howto/2/step3.jpeg";
import step4 from "../assets/images/howto/2/step4.jpeg";
import step5 from "../assets/images/howto/2/step5.jpeg";
import step6 from "../assets/images/howto/2/step6.jpeg";
import step7 from "../assets/images/howto/2/step7.jpeg";
const StepsArray = [
  {
    step: "Step 1:",
    stepvalue: " BNB (Binance Coin) in your wallet ",
    description:
      "Before you can buy BFM tokens, you need to have BNB in your digital wallet. If you don’t have any, you can purchase BNB from popular cryptocurrency exchanges.",
    image:step1,
  },
  {
    step: "Step 2: ",
    stepvalue: "A connected wallet ",
    description:
      "Ensure you have a digital wallet that is compatible with WalletConnect. Popular options include Trust Wallet, MetaMask, etc.",
      image:step2,
  },
  {
    step: "Step 3:",
    stepvalue: "Visit the Official Website ",
    description: "Navigate to the official Benefit Mine presale website.",
    image:step3,
  },
  {
    step: "Step 4:",
    stepvalue: "Connect Your Wallet ",
    description:
      "On the homepage, look for the ‘Wallet Connect’ option or similar.Click on it and select your wallet of choice. Follow the prompts to connect your wallet to the website.",
      image:step4,
    },
  {
    step: "Step 5:",
    stepvalue: "Enter BNB Amount",
    description:
      "Once your wallet is connected, you'll see an option labeled AMOUNT'.Input the amount of BNB you wish to exchange for BFM tokens. For instance, if you want to buy $100 worth of tokens, input the BNB equivalent, such as 0.5 BNB.The website will automatically display the dollar value of the BNB amount you’ve entered.",
    image:step5,
    },
  {
    step: "Step 6:",
    stepvalue: "Check Your BFM Allocation ",
    description:
      "Below the BNB input, you'll see a section labeled 'GET AMOUNT (BFM)'.This section will automatically calculate and display the number of BFM tokens you will receive in exchange for the BNB you wish to spend.",
    image:step6,
    },
  {
    step: "Step 7",
    stepvalue: " Confirm the Purchase: (BUY BFM NOW)",
    description:
      "Once you're satisfied with the conversion, follow the prompts on the website to finalize your purchase.Ensure you review all details carefully before confirming.",
    image:step7
    },
  {
    step: "Step 8:",
    stepvalue: "Transaction Confirmation ",
    description:
      "After confirming your purchase, the transaction will be processed.Once the transaction is successful, the BFM tokens will be transferred to your connected wallet once that phase will end and once your staking time will be over.You will have to open Claim Tokens page and claim your tokens at assigned time.",
  },
];

const HowToBuy = () => {
  return (
    <Box sx={{ background: "#000000", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography
          sx={{
            fontSize: {
              xs: "20px",
              md: "40px",
            },
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          How To Buy Benefit Mine Token (BFM) Tokens: A Beginner’s Guide
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Welcome to the exciting world of Benefit Mine Finance! If you’re
          reading this, you’re probably eager to purchase your first set of BFM
          tokens. This guide will walk you step by step through the process to
          ensure it's as smooth as possible.
        </Typography>
        <Typography sx={{ mt: 5, textAlign: "center" }}>
          Welcome to this guide on how to buy Benefit Mine tokens on Uniswap!
          Follow the steps below to get started:
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box>
                {StepsArray.map((item, index) => {
                  return (
                    <Box key={index} sx={{ my: 2 }}>
                      <Typography>
                        <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                          {" "}
                          {item.step}
                        </span>{" "}
                        <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                          {item.stepvalue}
                        </span>
                      </Typography>
                      <Typography>{item.description}</Typography>
                      <div><img src={item.image}  /></div>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HowToBuy;
