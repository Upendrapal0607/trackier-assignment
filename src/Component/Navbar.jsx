"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Input,
  MenuGroup,
} from "@chakra-ui/react";
import { PiProjectorScreenFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContextValue } from "../RootContext/ContectProvider";

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Link key={children.path} to={children.path}>
        {children.link}
      </Link>
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, userDetaild, HandleLogOut } = ProjectContextValue();
  const Links = isAuth
    ? [
        { link: "Projects", path: "/project" },
        { link: "Task Boards", path: "/task" },
      ]
    : [];
  const navigate = useNavigate();
  const [topFive, setTopFive] = useState([
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
  ]);

  return (
    <>
      <Box className="sticky top-0" style={{
        zIndex:10,
      }} bg={"gray.900"} color={"white"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            mr={4}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              onClick={() => navigate("/")}
              className="flex gap-2 items-center cursor-pointer"
            >
              <PiProjectorScreenFill className="font-bold text-2xl text-green-500" />
              <Text
                fontWeight={"bold"}
                className="text-2xl text-green-500"
                ml={2}
              >
                TRACKIER
              </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.link}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Box display={{ base: "none", md: "flex" }}>
              <Menu>
                {topFive.map((item, index) => (
                  <MenuButton
                    as={Button}
                    key={index}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={item} />
                  </MenuButton>
                ))}
              </Menu>
            </Box>

            {!isAuth ? (
              <Link to={"/login"}>
                <Button className="ml-4">Login</Button>
              </Link>
            ) : (
              <Menu>
                <MenuButton colorScheme="blue" as={Button} ml={4}>
                  Profile
                </MenuButton>
                <MenuList color={"black"}>
                  <MenuGroup title={userDetaild?.name}>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                  <Button onClick={HandleLogOut} className="ml-4">
                    LOG OUT
                  </Button>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink onClick={isOpen ? onClose : onOpen} key={link.path}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
