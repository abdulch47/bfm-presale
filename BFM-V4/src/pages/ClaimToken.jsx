import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import ConnectWalletButton from "../components/button/ConnectWalletButton";
import DownCounter from "../components/countdown/Countdown";
import { useAccount } from "wagmi";

const ClaimToken = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const { address: addressData, isConnected } = useAccount();
  console.log("address.....", addressData);
  //   const [walletAddress, setWalletAddress] = useState("");
  //   const [shortWalletAddress, setShortWalletAddress] = useState("");

  //   useEffect(() => {
  //     if (isConnected) {
  //       let first = addressData.slice(0, 4);
  //       let last = addressData.slice(-4);
  //       setWalletAddress(first + "..." + last);

  //       let first2 = addressData.slice(0, 2);
  //       let last2 = addressData.slice(-2);
  //       setShortWalletAddress(first2 + "..." + last2);
  //     }
  //   }, [isConnected, addressData]);
  return (
    <Box sx={{ background: "#000000", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container sx={{ my: 12 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px 0px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "20px",
                  md: "40px",
                },
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Benefit Mine Dashboard
            </Typography>
            {/* <Typography
              sx={{
                fontSize: { xs: "14px", md: "18px" },
                textAlign: { xs: "center", md: "left" },
                color: "#fff",
              }}
            >
              Connect Wallet To Check Your Holdings.
            </Typography> */}
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                textAlign: { xs: "center", md: "left" },
                color: "#fff",
              }}
            >
              NOTE: $Benefit Mine tokens will be available for claim once
              presale has finished.
            </Typography>
            <Box
              sx={{
                // maxWidth: "350px",
                display: "flex",
                justifyContent: { xs: "center", md: "left" },
              }}
            >
              <ConnectWalletButton />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={7} sx={{ mt: { xs: 5, md: 0 } }}>
            <Box
              sx={{
                background:
                  "linear-gradient(187deg, rgba(151,107,226,1) 0%, rgba(66,59,101,1) 35%, rgba(0,0,0,1) 100%)",
                // height: "400px",
                borderRadius: "20px",
                boxShadow: 2,
                border: "2px solid #2C2743",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                gap: "30px 0px",
              }}
            >
              <Box>
                {addressData ? (
                  <>
                    {!matches ? (
                      <>
                        <Typography>
                          {addressData.slice(0, 4)}.....{addressData.slice(-4)}{" "}
                        </Typography>
                      </>
                    ) : (
                      <Typography>{addressData}</Typography>
                    )}
                  </>
                ) : (
                  ""
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: "20px",
                    md: "30px",
                  },
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                PRESALE - <span style={{ color: "#F79B20" }}>SOLD OUT </span>
                <br /> $19.3 Million Raised
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{ my: 3, fontSize: "18px", fontWeight: "bold" }}
                >
                  Claimable Tokens:{" "}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    // justifyContent: "space-around",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px 20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #825FC4",
                      p: { xs: 1, md: 2 },
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Phase 1
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Next Claimable
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}> Date</Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        12/3/2023
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                        Persent %
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>10%</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #825FC4",
                      p: { xs: 1, md: 2 },
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Phase 2
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Next Claimable
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}> Date</Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        12/3/2023
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        12/3/2023
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        12/3/2023
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                        Persent %
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>10%</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #825FC4",
                      p: { xs: 1, md: 2 },
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Phase 3
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        Next Claimable
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        34785.98
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}> Date</Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        12/3/2023
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                        Persent %
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>10%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: { xs: "space-around", md: "space-between" },
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "2px solid #825FC4",
                    p: { xs: 1, md: 2 },
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "15px",
                        md: "20px",
                      },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Your Holdings
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "15px" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    4356 BFM
                  </Typography>
                </Box>
              </Box>

              <Typography>Claim Tokens comming soon.</Typography>

              <Button
                sx={{
                  background:
                    "linear-gradient(97deg, rgba(151,107,226,1) 0%, rgba(66,59,101,1) 35%, rgba(0,0,0,1) 100%)",
                  borderRadius: "10px",
                  p: 1,
                  maxWidth: "320px",
                  width: "100%",
                  color: "#fff",
                  border: "2px solid #2C2743",

                  fontSize: "18px",
                  fontWeight: "600",
                  "&:hover": {
                    background:
                      "linear-gradient(97deg, rgba(0,0,0,1) 0%, rgba(66,59,101,1) 54%, rgba(151,107,226,1) 100%)",

                    fontSize: "18px",
                    fontWeight: "600",
                  },
                }}
              >
                Claim Tokens
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default ClaimToken;
