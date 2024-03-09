import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import usePostStore from "../../store/postStore";
import Caption from "../Caption/Caption";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostCounter = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const imageRef = ref(storage, `posts/${post.id}`);

      await deleteObject(imageRef);

      const userRef = doc(firestore, "users", authUser?.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      decrementPostCounter(post.id);
      deletePost(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // const comments = [
  //   {
  //     createdAt: "1 day ago",
  //     username: "paco.collins",
  //     profilePic: "/profilepic.png",
  //     text: "Some text",
  //   },
  //   {
  //     createdAt: "2 day ago",
  //     username: "hulk_pecker",
  //     profilePic: "/profilepic.png",
  //     text: "Nice pic deer",
  //   },
  //   {
  //     createdAt: "3 day ago",
  //     username: "the_official_daryl_ferrera",
  //     profilePic: "/profilepic.png",
  //     text: "Looking like a wow!",
  //   },
  // ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      name="Bailey Saint"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>

                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                      disabled={isDeleting}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>

                <Divider my={4} bg={"gray.500"} />

                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post?.caption && <Caption post={post} />}
                  {post.comments &&
                    post.comments.length > 0 &&
                    post.comments.map((comment, idx) => (
                      <Comment
                        key={idx}
                        // createdAt={comment.createdAt}
                        // username={comment.username}
                        // profilePic={comment.profilePic}
                        // text={comment.text}
                        comment={comment}
                      />
                    ))}
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                <PostFooter post={post} isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
    </>
  );
};

export default ProfilePost;
