import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useAccount } from "wagmi";

const ReferalLink = () => {
  const [alertState, setAlertState] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // New state for copy status
  const { address, isConnected } = useAccount();

  const handleCopy = () => {
    if (address) {
      setAlertState({
        open: true,
        message: "Copied",
        severity: "success",
      });
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000); // Set copy status to true
    } else {
      setAlertState({
        open: true,
        message: "Connect Your Wallet.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        mx: "auto",
        py: 1,
        mt: { xs: 5, md: 10 },
        px: 5,
        background: "#F79B20",
        borderRadius: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: { xs: "13px", md: "20px" },
        }}
      >
        Referral Link:{" "}
        {address
          ? window.location.origin +
            "/?ref=" +
            address?.slice(0, 6) +
            "..." +
            address?.slice(-4)
          : "Connect Wallet"}
        <CopyToClipboard
          text={address ? window.location.origin + "/?ref=" + address : ""}
          onCopy={handleCopy}
        >
          <Tooltip title={isCopied ? "Copied" : "Copy"} placement="top">
            <IconButton
              disableRipple={true}
              sx={{
                background: "transparent",
                "&:hover": { background: "transparent" },
              }}
            >
              {isCopied ? (
                <>
                  <DoneAllIcon
                    sx={{
                      fontSize: "28px",
                      color: "#ffffff",
                      "&:hover": { color: "#9A6975" },
                    }}
                  />
                </>
              ) : (
                <CopyAllIcon
                  sx={{
                    fontSize: "28px",
                    color: "#ffffff",
                    "&:hover": { color: "#9A6975" },
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      </Typography>
    </Box>
  );
};

export default ReferalLink;
