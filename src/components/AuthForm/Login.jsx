import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [authInputs, setAuthInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin();

  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={14}
        value={authInputs.email}
        size={"sm"}
        onChange={(e) =>
          setAuthInputs({ ...authInputs, email: e.target.value })
        }
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fontSize={14}
          value={authInputs.password}
          size={"sm"}
          onChange={(e) =>
            setAuthInputs({ ...authInputs, password: e.target.value })
          }
        />

        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        // onClick={() => handleAuth()}
        onClick={() => login(authInputs)}
        isLoading={loading}
        disabled={loading}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
