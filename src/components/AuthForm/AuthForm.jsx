import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
// import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [authInputs, setAuthInputs] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const navigate = useNavigate();

  // const handleAuth = () => {
  //   console.log("AuthInputs => ", authInputs);
  //   if (isLogin) {
  //     if (
  //       !authInputs.email ||
  //       authInputs.email.trim() === "" ||
  //       !authInputs.password ||
  //       authInputs.password.trim() === ""
  //     ) {
  //       alert("Fill all data!");
  //       return;
  //     }
  //     setAuthInputs({
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     });
  //     navigate("/");
  //   } else {
  //     if (
  //       !authInputs.email ||
  //       authInputs.email.trim() === "" ||
  //       !authInputs.password ||
  //       authInputs.password.trim() === "" ||
  //       !authInputs.confirmPassword ||
  //       authInputs.confirmPassword.trim() === ""
  //     ) {
  //       alert("Fill all data!");
  //       return;
  //     }
  //     setAuthInputs({
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     });
  //     setIsLogin(true);
  //   }
  // };

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            src="/logo-white.png"
            h={24}
            cursor={"pointer"}
            alt="Instagram"
          />

          {/* <Input
            placeholder="Email"
            type="email"
            fontSize={14}
            value={authInputs.email}
            onChange={(e) =>
              setAuthInputs({ ...authInputs, email: e.target.value })
            }
          />
          <Input
            placeholder="Password"
            type="password"
            fontSize={14}
            value={authInputs.password}
            onChange={(e) =>
              setAuthInputs({ ...authInputs, password: e.target.value })
            }
          />
          {!isLogin && (
            <Input
              placeholder="Confirm Password"
              type="password"
              fontSize={14}
              value={authInputs.confirmPassword}
              onChange={(e) =>
                setAuthInputs({
                  ...authInputs,
                  confirmPassword: e.target.value,
                })
              }
            />
          )} */}

          {/* <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
            // onClick={() => handleAuth()}
          >
            {isLogin ? "Login" : "Sign up"}
          </Button> */}

          {isLogin ? <Login /> : <Signup />}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          {/* <Flex
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image src="/google.png" w={5} alt="Google" />
            <Text mx={2} color={"blue.500"}>
              Login with Google.
            </Text>
          </Flex> */}

          <GoogleAuth prefix={isLogin ? "Login" : "Sign up"} />
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            cursor={"pointer"}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            color={"blue.500"}
          >
            {isLogin ? "Sign up" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
