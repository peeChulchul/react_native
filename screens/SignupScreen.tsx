import { createUser } from "util/auth";
import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useContext(AuthContext);

  async function signupHandelr({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Autentication failed!",
        "Could not create user. Please check your input and try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandelr} />;
}

export default SignupScreen;
