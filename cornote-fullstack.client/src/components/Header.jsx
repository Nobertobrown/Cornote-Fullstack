import { OfflineBolt } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated, logout } = useAuth0();
  
  return (
    <header>
      <h1>
        <OfflineBolt style={{ fontSize: "2rem", color: "#fff" }} />
        Keeper
      </h1>
      {isAuthenticated && (
        <button className="login-btn" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
