import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { InstagramLogo } from "../../assets/constants";

const Navbar = () => {
  return (
    <Container
      maxW={"container.lg"}
      my={4}
      mx={"auto"}
      w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
    >
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        {/* <Image
          src="/logo.png"
          h={20}
          display={{ base: "none", sm: "block" }}
          cursor={"pointer"}
        /> */}
        <Box
          as="span"
          // h={20}
          display={{ base: "none", sm: "inline" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Box>

        <Flex gap={4}>
          <Link to="/auth">
            <Button colorScheme={"blue"} size={"sm"}>
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant={"outline"} size={"sm"}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
