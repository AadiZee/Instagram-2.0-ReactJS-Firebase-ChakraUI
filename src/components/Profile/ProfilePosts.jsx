import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, []);

  // const profilePosts = [
  //   {
  //     img: "/img1.png",
  //   },
  //   {
  //     img: "/img2.png",
  //   },
  //   {
  //     img: "/img3.png",
  //   },
  //   {
  //     img: "/img4.png",
  //   },
  // ];

  const { isLoading, posts } = useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound) return <NoPostsFound />;

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(2, 2fr)",
        lg: "repeat(3, 3fr)",
        xl: "repeat(4, 4fr)",
      }}
      gap={1}
      columnGap={1}
      rowGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"} />
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.map((post) => <ProfilePost key={post.id} post={post} />)}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found🤔</Text>
    </Flex>
  );
};
