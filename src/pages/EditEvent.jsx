import React from "react";
import {
  Heading,
  Box,
  Button,
  Stack,
  Input,
  Select,
  Checkbox,
  Center,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, redirect, Form } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(
    `http://localhost:3000/events/${params.editEventId}`
  );
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EditEvent = () => {
  const { event, users } = useLoaderData();

  const [sports, setSports] = useState();
  const [games, setGames] = useState();
  const [relaxation, setRelaxation] = useState();

  const toast = useToast();

  const checkSports = (e) => {
    if (e.target.checked) {
      setSports(1);
    } else {
      setSports();
    }
  };

  const checkGames = (e) => {
    if (e.target.checked) {
      setGames(2);
    } else {
      setGames();
    }
  };

  const checkRelaxation = (e) => {
    if (e.target.checked) {
      setRelaxation(3);
    } else {
      setRelaxation();
    }
  };

  return (
    <>
      <Center>
        <Heading>Edit event</Heading>
      </Center>
      <Center>
        <Box w={"500px"} borderRadius="lg" bg={"gray.200"} p={4} m={4}>
          <Form
            value={event.id}
            name="form"
            key={event.id}
            method="patch"
            id="new-event-form"
          >
            <HStack p={4}>
              <p>Event_id:</p>
              <Input defaultValue={event.id} name="eventId" />
            </HStack>

            <Stack spacing={4}>
              <Select
                defaultValue={event.createdBy}
                name="createdBy"
                placeholder="Select user"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <Input
                defaultValue={event.title}
                name="title"
                placeholder="Title"
              />
              <Input
                defaultValue={event.description}
                name="description"
                placeholder="Description"
              />

              <Input
                defaultValue={event.image}
                name="image"
                placeholder="Image url"
              />

              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox name="sports" onChange={checkSports} value={sports}>
                  Sports
                </Checkbox>
                <Checkbox name="games" onChange={checkGames} value={games}>
                  Games
                </Checkbox>
                <Checkbox
                  name="relaxation"
                  onChange={checkRelaxation}
                  value={relaxation}
                >
                  Relaxation
                </Checkbox>
              </Stack>

              <Input
                defaultValue={event.location}
                name="location"
                placeholder="Location"
              />
              <Input
                defaultValue={event.startTime}
                name="startTime"
                placeholder="Select Date and Time"
                type="datetime-local"
              />
              <Input
                defaultValue={event.endTime}
                name="endTime"
                placeholder="Select Date and Time"
                type="datetime-local"
              />
              <Button
                bg="tomato"
                onClick={() =>
                  toast({
                    title: "Event has been successfully edited.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                }
                type="submit"
              >
                Edit
              </Button>
            </Stack>
          </Form>
        </Box>
      </Center>
    </>
  );
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const eventId = Number(data.get("eventId"));

  const categorySports = Number(data.get("sports"));
  const categoryGames = Number(data.get("games"));
  const categoryRelaxation = Number(data.get("relaxation"));

  const categoriesArray = [categoryGames, categorySports, categoryRelaxation];
  const filterCategoriesArray = categoriesArray.filter((e) => {
    return e !== 0;
  });

  const updatedSubmission = {
    createdBy: Number(data.get("createdBy")),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    categoryIds: filterCategoriesArray,
    location: data.get("location"),
    startTime: data.get("startTime"),
    endTime: data.get("endTime"),
  };

  const updatedEvent = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedSubmission),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);

  return redirect(`/event/${updatedEvent}`);
};
