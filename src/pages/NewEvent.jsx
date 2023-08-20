import {
  Box,
  Select,
  Input,
  Checkbox,
  Stack,
  Button,
  Center,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

export const NewEvent = () => {
  const users = useLoaderData();
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
        <Heading>New event</Heading>
      </Center>

      <Center>
        <Box w={"500px"} borderRadius="lg" bg={"gray.200"} p={4} m={4}>
          <Form method="post" id="new-event-form">
            <Stack spacing={4}>
              <Select name="createdBy" placeholder="Select user">
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <Input name="title" placeholder="Title" />
              <Input name="description" placeholder="Description" />

              <Input name="image" placeholder="Image url" />

              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox onChange={checkSports} name="sports" value={sports}>
                  Sports
                </Checkbox>
                <Checkbox onChange={checkGames} name="games" value={games}>
                  Games
                </Checkbox>
                <Checkbox
                  onChange={checkRelaxation}
                  name="relaxation"
                  value={relaxation}
                >
                  Relaxation
                </Checkbox>
              </Stack>
              <Input name="location" placeholder="Location" />
              <Input
                name="startTime"
                placeholder="Select Date and Time"
                type="datetime-local"
              />
              <Input
                name="endTime"
                placeholder="Select Date and Time"
                type="datetime-local"
              />
              <Button
                type="submit"
                onClick={() =>
                  toast({
                    title: "Successfully created a new event.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                }
              >
                Save
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
  const categorySports = Number(data.get("sports"));
  const categoryGames = Number(data.get("games"));
  const categoryRelaxation = Number(data.get("relaxation"));

  const categoriesArray = [categoryGames, categorySports, categoryRelaxation];
  const filterCategoriesArray = categoriesArray.filter((e) => {
    return e !== 0;
  });

  const submission = {
    createdBy: Number(data.get("createdBy")),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    categoryIds: filterCategoriesArray,
    location: data.get("location"),
    startTime: data.get("startTime"),
    endTime: data.get("endTime"),
  };
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(submission),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};
