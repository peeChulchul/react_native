import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "util/auth";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  async function loginHandelr({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Autentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandelr} />;
}

export default LoginScreen;
