import { useAuth } from "../../../context/AuthContext";
import { Redirect } from "../../../utilComponents/Redirect";

export default function withInstructor(Component) {
  let Wrapper = (props) => {
    let {
      state: { isAuthenticated, isInstructor },
    } = useAuth();

    if (isAuthenticated && isInstructor) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  return Wrapper;
}
