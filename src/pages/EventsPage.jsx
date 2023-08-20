import React, { useState } from "react";
import {
  Heading,
  Box,
  HStack,
  Input,
  Center,
  Select,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, users, categories } = useLoaderData();
  const [searchParams, setSearchParams] = useState("");
  const [categoryParams, setCategoryParams] = useState(0);

  const searchHandler = (e) => {
    setSearchParams(e.target.value);
    setCategoryParams(0);
  };

  const categoryHandler = (e) => {
    setCategoryParams(Number(e.target.value));
    setSearchParams("");
  };

  const searchAndFilter = events.filter((event) => {
    if (categoryParams === 0) {
      return event.title
        .toString()
        .toLowerCase()
        .includes(searchParams.toLowerCase());
    } else {
      return event.categoryIds.includes(Number(categoryParams));
    }
  });

  return (
    <>
      <Center>
        <Heading>List of events</Heading>
      </Center>

      <Center>
        <HStack p={4}>
          <p>Search:</p>
          <Input
            value={searchParams}
            defaultValue={""}
            onChange={searchHandler}
            bg={"gray.300"}
          />
          <Select onChange={categoryHandler} name="category" defaultValue={0}>
            <option value={categoryParams}>Select user:</option>
            {categories.map((category) => (
              <option key={category.id} value={Number(category.id)}>
                {category.name}
              </option>
            ))}
          </Select>
        </HStack>
      </Center>

      <SimpleGrid p={5} spacing={5} minChildWidth="500px">
        {searchAndFilter.map((event) => (
          <Box
            boxShadow="2xl"
            w="500px"
            key={event.id}
            borderRadius="xl"
            p={4}
            m={4}
          >
            <Link to={`event/${event.id}`}>
              <Image
                width="500px"
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

              <HStack>
                <p>Categories:</p>
                {event.categoryIds.map((categoryId) => (
                  <p key={categoryId.id}>
                    {
                      categories.find((category) => categoryId === category.id)
                        .name
                    }
                  </p>
                ))}
              </HStack>
              <p>{users.find((user) => event.createdBy === user.id).name}</p>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
