/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import sitterlogo from "../PublicPicture/sitter-logo.svg";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const { logout, state, checkToken } = useAuth();
  const [ownerData, setOwnerData] = useState({});
  const [sitterData, setSitterDatta] = useState({});

  const getOwnerData = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/owners/myProfile`);
      // console.log(result);
      setOwnerData(result.data.data.data);
    } catch (error) {
      console.error("Error while fetching available pet types:", error);
    }
  };

  const getSitterData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/sitters/sitterProflie`
      );
      // console.log(result.data);
      setSitterDatta(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (state.user?.role === "pet_owner") {
        getOwnerData();
      } else if (state.user?.role === "pet_sitter") {
        getSitterData();
      }
    }
  }, [state]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleImageClick = () => {
  //   if (state.isAuthenticated) {
  //     handleClick();
  //   }
  // };

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 15px 80px;
      `}
    >
      <div
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
        css={css`
          &:hover {
            cursor: pointer;
          }
        `}
      >
        <img src={sitterlogo} alt="Sitter Logo" />
      </div>
      <div
        css={css`
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        `}
      >
        {state.isAuthenticated ? (
          <>
            <div>{ownerData.full_name || sitterData.full_name}</div>
            <img
              src={ownerData.profile_img || sitterData.profile_img}
              alt="Profile"
              css={css`
                width: 40px;
                height: 40px;
                cursor: pointer;
                border-radius: 100%;
              `}
              onClick={handleClick}
            />

            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              // PaperProps={{
              //   component: "div", // Use a div container for the Paper
              //   style: {
              //     width: "186px",
              //     height: "148px",
              //     overflow: "hidden", // Prevent scrolling
              //   },
              // }}
              // MenuProps={{
              //   disableScrollLock: true, // Disable the Scroll Lock
              // }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/owner/${state.user.id}/profile`);
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/owner/${state.user.id}/yourPet`);
                  handleClose();
                }}
              >
                Your Pet
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/owner/${state.user.id}/bookingHistory`);
                  handleClose();
                }}
              >
                History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div
            css={css`
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        )}

        <div>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => {
              navigate("/list");
            }}
            css={css`
              background-color: #ff7037;
              font-family: "Satoshi", sans-serif;
              font-weight: 700;
              font-size: 16px;
              text-align: center;
              color: white;
              font-size: 12px;
              padding: 10px; /* Adjust padding for responsiveness */
              border-radius: 20px; /* Adjust border-radius for responsiveness */
              transition: background-color 0.3s ease;
              text-transform: none;

              &:hover {
                color: black;
              }
              padding: 12px 24px 12px 24px;
              border-radius: 99px;
              border: none;
              cursor: pointer;
              margin-left: 20px;
              gap: 8px;
            `}
          >
            Find A Pet Sitter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
