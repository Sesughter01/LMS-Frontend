import { useAuth } from "../../../context/AuthContext";
import { Redirect } from "../../../utilComponents/Redirect";

export default function withSuperAdmin(Component) {
  let Wrapper = (props) => {
    let {
      state: { isAuthenticated, isSuperAdmin },
    } = useAuth();

    if (isAuthenticated && isSuperAdmin) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  return Wrapper;
}
