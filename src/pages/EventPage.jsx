import React from "react";
import {
  Heading,
  Box,
  Button,
  Stack,
  HStack,
  Center,
  Image,
} from "@chakra-ui/react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <Heading>Event page</Heading>
      </Center>
      <Center>
        <Box boxShadow="2xl" w={"600px"} borderRadius="xl" p={4} m={4}>
          <Image
            width="600px"
            src={event.image}
            alt={event.title}
            objectFit="cover"
            borderTopRadius="xl"
            paddingBottom={4}
          />

          <h2>{event.title}</h2>

          <p>{event.description}</p>
          <p>Start time: {event.startTime}</p>
          <p>End time: {event.endTime}</p>

          <p>{users.find((user) => user.id === event.createdBy).name}</p>
          <HStack>
            <p>Categories:</p>
            {event.categoryIds.map((categoryId) => (
              <p key={categoryId.id}>
                {categories.find((category) => categoryId === category.id).name}
              </p>
            ))}
          </HStack>

          <Stack paddingTop={4} direction="row" spacing={4} align="center">
            <Button bg="tomato">
              <Link to={`/event/edit/${event.id}`}>Edit</Link>
            </Button>
            <Button
              bg="tomato"
              onClick={() => {
                fetch(`http://localhost:3000/events/${event.id}`, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Something went wrong");
                    }
                    navigate("/");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Center>
    </>
  );
};
