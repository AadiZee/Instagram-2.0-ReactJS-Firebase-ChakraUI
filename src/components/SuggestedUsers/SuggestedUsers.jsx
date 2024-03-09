import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import SuggestedHeader from "./SuggestedHeader";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";

const SuggestedUsers = () => {
  // const suggestedUsers = [
  //   {
  //     fullName: "Cesar Tickle",
  //     followers: [1, 2, 3],
  //     profilePicURL: "https://bit.ly/dan-abramov",
  //   },
  //   {
  //     fullName: "Papa Slinga",
  //     followers: [1, 2, 3, 4, 5, 6, 7],
  //     profilePicURL: "https://bit.ly/ryan-florence",
  //   },
  //   {
  //     fullName: "Luthor Ice",
  //     followers: [1, 2],
  //     profilePicURL: "https://bit.ly/code-beast",
  //   },
  // ];

  const { isLoading, suggestedUsers } = useGetSuggestedUser();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {!isLoading && suggestedUsers.length > 0 && (
        <>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
          >
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
              Suggested for you
            </Text>
            <Text
              fontSize={12}
              fontWeight={"bold"}
              _hover={{ color: "gray.400" }}
              cursor={"pointer"}
            >
              See All
            </Text>
          </Flex>
          {suggestedUsers.map((user, index) => (
            <SuggestedUser key={`${index}-${user.name}`} user={user} />
          ))}
        </>
      )}

      <Box alignSelf={"start"} fontSize={12} color={"gray.500"} mt={5}>
        © 2023 Built By{" "}
        <Link
          href="https://github.com/AadiZee"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          Aadi Zee
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
