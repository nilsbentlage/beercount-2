import React from "react";

function Splashscreen(props) {
  function AutoLogin(props) {
    const user = props.user.uid;
    console.log(user);

    async function forward() {
      user && (window.location.href = "/home");
    }
    forward();
    setTimeout(function () {
      window.location.href = "/signin";
    }, 5000);
  }

  React.useEffect(() => {
    AutoLogin(props);
  }, [props]);

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
