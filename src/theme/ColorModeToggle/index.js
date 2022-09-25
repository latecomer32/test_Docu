import ColorModeToggle from "@theme-original/ColorModeToggle";
import React, { useState } from "react";
import { signInWithGoogle, logout, auth } from "../../theme/firebase";
import "../../css/login.css";
import Loading from "../Loading";

export default function ColorModeToggleWrapper(props) {
  console.log("theme/color/index.js");

  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  auth.onAuthStateChanged(async function (user) {
    if (user !== null) {
      setUserAuth(user);
    }

    setAuthLoading(false);
  });

  const isAllow = () => {
    return userAuth?.email;
  };

  if (authLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {isAllow() ? (
        <a
          style={{ marginRight: 15, cursor: "pointer", color: "#222222" }}
          onClick={() => logout(() => window.location.reload())}
        >
          Logout
        </a>
      ) : (
        <button
          style={{
            marginRight: 15,
            cursor: "pointer",
            color: "#222222",
            border: "0px",
            backgroundColor: "white",
            fontSize: "12pt",
          }}
          onClick={signInWithGoogle}
        >
          Login
        </button>
      )}
      <ColorModeToggle {...props} />
    </>
  );
}

{
  /* <div className="login">
<div className="login__container">
  <button
    className="login__btn login__google"
    onClick={signInWithGoogle}
  >
    Login with Google
  </button>
</div>
</div> */
}
