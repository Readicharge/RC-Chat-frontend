import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
	const toast = useToast();
	const currentUser = useRecoilValue(userAtom); // logged in user
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

	const copyURL = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL).then(() => {
			toast({
				title: "Success.",
				status: "success",
				description: "Profile link copied.",
				duration: 3000,
				isClosable: true,
			});
		});
	};

	return (
		<VStack gap={4} alignItems={"start"}>
			<Flex justifyContent={"space-between"} w={"full"}>
				<Box>
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{user.name}
					</Text>
					
					<Flex gap={2} alignItems={"center"} style={{backgroundColor:"rgba(6, 6, 30, 0.57)", marginTop:10 , padding:10, borderRadius:17}}>
						<Text fontSize={"sm"}>@{user.username}</Text>
						<Text fontSize={"md"} bg={"#96d232"} color={"#05061E"} bold p={1} borderRadius={12}>
						{user.user_type}
						</Text>
					</Flex>
				</Box>
				<Box>
					{user.profilePic && (
						<Avatar
							name={user.name}
							src={user.profilePic}
							size={{
								base: "lg",
								md: "2xl",
							}}
						/>
					)}
					{!user.profilePic && (
						<Avatar
							name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "lg",
								md: "2xl",
							}}
						/>
					)}
				</Box>
				<Flex>
				
				<Box className='icon-container'>
					<Menu>
						<MenuButton>
							<CgMoreO size={24} cursor={"pointer"} />
						</MenuButton>
						<Portal>
							<MenuList bg={"gray.dark"}>
								<MenuItem bg={"gray.dark"} onClick={copyURL}>
									Copy link
								</MenuItem>
							</MenuList>
						</Portal>
					</Menu>
				</Box>
			</Flex>
			</Flex>

			<Text>{user.bio}</Text>

			{currentUser?._id === user._id && (
				<Link as={RouterLink} to='/update'>
					<Button size={"sm"}>Update Profile</Button>
				</Link>
			)}
			{currentUser?._id !== user._id && (
				<Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
					{following ? "Disconnect" : "Connect"}
				</Button>
			)}
			<Flex w={"full"} justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text color={"gray.light"}>{user.followers.length} Connections</Text>
					<Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
					<Link color={"gray.light"}>ReadiCharge.com</Link>
				</Flex>
			
			</Flex>

			<Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				
			</Flex>
		</VStack>
	);
};

export default UserHeader;
