import { useAuth0 } from "@auth0/auth0-react";

const Index = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="index">
      <div className="hero-heading">
        <h1>Your No.1 App for Jotting stuff Down</h1>
        <button
          className="signup-btn"
          onClick={() => {
            loginWithRedirect({
              appState: { returnTo: "/notes" }, // Specify the route to redirect after login
            });
          }}
        >
          Get Started
        </button>
      </div>
      <img src="/notes.png" />
    </main>
  );
};

export default Index;
