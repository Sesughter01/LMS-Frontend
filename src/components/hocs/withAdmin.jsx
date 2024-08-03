import { useAuth } from "../../../context/AuthContext";
import { Redirect } from "../../../utilComponents/Redirect";

export default function withAdmin(Component) {
  let Wrapper = (props) => {
    let {
      state: { isAuthenticated, isAdmin },
    } = useAuth();

    if (isAuthenticated && isAdmin) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  return Wrapper;
}
