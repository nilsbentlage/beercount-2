import React from "react";

function Splashscreen(props) {
  function AutoLogin(props) {
    setTimeout(function() {
      props.user.uid
        ? (window.location.href = "/home")
        : (window.location.href = "/signin");
    }, 2000);
  }

  React.useEffect(() => {
    AutoLogin(props)
  }, [])

  return (
    <div
      id="Splashscreen"
      style={{
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/background.png)",
      }}
    >
      <img
        id="Splash-FG"
        src={process.env.PUBLIC_URL + "/foreground.png"}
        alt="Foreground"
      />
    </div>
  );
}

export default Splashscreen;
