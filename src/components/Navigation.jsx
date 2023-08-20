import React from "react";
import { Link } from "react-router-dom";
import { Button, Center, HStack } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <>
      <Center>
        <HStack p={4}>
          <Button bg="tomato">
            <Link to="/">Events</Link>
          </Button>
          <Button bg="tomato">
            <Link to="/event/new">New Event</Link>
          </Button>
        </HStack>
      </Center>
    </>
  );
};
