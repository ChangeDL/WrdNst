import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user, isDarkMode }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button-tag" onClick={openMenu}>
        {isDarkMode ? <i class="fa-solid fa-user" style={{ color: "white" }}></i> : <i class="fa-solid fa-user" ></i>
        }
      </button >
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>
              {isDarkMode ? <button className="stats-button-profile-button" style={{ color: "white" }}>Stats</button> : <button className="stats-button-profile-button">Stats</button>}
            </div>
            <div>
              {isDarkMode ? <button className="buttons-with-no-background" style={{ color: "white" }} onClick={handleLogout}>Log Out</button> : <button className="buttons-with-no-background" onClick={handleLogout}>Log Out</button>}
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
