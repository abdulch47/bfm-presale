import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
const iconArraay = [
  {
    icon: <TwitterIcon />,
  },
  { icon: <TelegramIcon /> },
  { icon: <FacebookIcon /> },
  { icon: <InstagramIcon /> },
  { icon: <YouTubeIcon /> },
];

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#000000",
        minHeight: "266px",
        // border: "2px solid red",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ fontSize: "20px", color: "#fff" }}>
                About Us
              </Typography>
              <Typography sx={{ color: "#7FACB2", mt: 2, fontSize: "16px" }}>
                Benefitmine © 2022 – 2023, All Right Reserved.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3.7}>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#fff",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Connect With Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "space-evenly", md: "space-between" },
              }}
            >
              {iconArraay.map(({ icon }, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <IconButton
                      sx={{
                        borderRadius: "8px",
                        color: "#fff",
                        bgcolor: "#132441",
                        p: 1.4,
                        ":hover": {
                          bgcolor: "#1db0ff",
                          color: "#000",
                        },
                      }}
                    >
                      {icon}
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontSize: "20px",
                textAlign: { xs: "center", md: "left" },
                mt: { xs: "5px", md: "0px" },
                color: "#fff",
              }}
            >
              Contact Us
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap="10px"
              mt={2}
              mb={2.7}
            >
              <EmailIcon sx={{ color: "#1DB0FF" }} />
              <Typography
                sx={{ fontSize: "16px", color: "#a1acb2", display: "flex" }}
              >
                Support@BenefitMine.io
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap="10px"
            >
              <ChatIcon sx={{ color: "#1DB0FF" }} />
              <Typography
                sx={{ fontSize: "16px", color: "#a1acb2", display: "flex" }}
              >
                Tech Support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
