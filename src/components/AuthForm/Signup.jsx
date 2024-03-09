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
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const [authInputs, setAuthInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

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
      <Input
        placeholder="Username"
        type="text"
        fontSize={14}
        value={authInputs.username}
        size={"sm"}
        onChange={(e) =>
          setAuthInputs({ ...authInputs, username: e.target.value })
        }
      />

      <Input
        placeholder="Full Name"
        type="text"
        fontSize={14}
        value={authInputs.fullName}
        size={"sm"}
        onChange={(e) =>
          setAuthInputs({ ...authInputs, fullName: e.target.value })
        }
      />

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
        onClick={() => signup(authInputs)}
        isLoading={loading}
        disabled={loading}
      >
        Sign up
      </Button>
    </>
  );
};

export default Signup;
