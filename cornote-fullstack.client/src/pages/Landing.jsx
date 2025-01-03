import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/notes",
      },
    });
  };

  return (
    <main className="index">
      <div className="hero-heading">
        <h1>Your No.1 App for Jotting stuff Down</h1>
        <button
          className="signup-btn"
          onClick={handleLogin}
        >
          Get Started
        </button>
      </div>
      <img src="/notes.png" />
    </main>
  );
};

export default Landing;
