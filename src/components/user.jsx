import React, {useState, useEffect, useContext} from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Image, Input, Flex, Spacer, Box, Container, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import TagsInput from './inputTag';
import { StoreContext } from '../index';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const UsersList = ()  => {
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const store = useContext(StoreContext);
    let users = toJS(store.users);
    if (name || tag) {
        users = toJS(store.filteredUsers);
    }

    const handleNameInputChange = (event) => {
      setName(event.target.value);
      const filteredUsersList = toJS(store.users).filter(({ name }) => {
        const lowerCaseName = name.toLowerCase();
        return lowerCaseName.includes(event.target.value.toLocaleLowerCase());
      });
      store.setFilteredUsers(filteredUsersList);
    };

  const selectedTags = (user,tags) => {
    user.tag = tags;
  };

  const handleTagInputChange = (event) => {
      setTag(event.target.value)
    const inputValue = event.target.value.toLowerCase();
    console.log(toJS(store.users));
    const filteredUsersList = toJS(store.users).filter(({ tag }) =>  {
        console.log(tag, inputValue);
        return tag.some((word) => word.includes(inputValue))
    });
    store.setFilteredUsers(filteredUsersList);
  }
    useEffect(() => {
        const fetchData = async () => {
            await store.setUsers();
        }
        fetchData();
      }, [store]);
      console.log(toJS(store.filteredUsers), toJS(store.users));

  return (
    <Container maxW="container.lg">
      <Box>
        <Input
          value={name}
          onChange={handleNameInputChange}
          placeholder="search by name"
          focusBorderColor="blue.300"
          size="lg"
          width="50%"
        />
        <Input
          value={tag}
          onChange={handleTagInputChange}
          placeholder="search by tag"
          focusBorderColor="blue.300"
          size="lg"
          width="50%"
        />
      </Box>
      {users.map((user) => (
        <Accordion allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <Flex justifyContent="space-between">
                  <Flex p="4">
                    <Box p="4" textAlign="left">
                      <Flex>
                        <Box mr="10">
                          <Image
                            borderRadius="full"
                            boxSize="150px"
                            src="https://bit.ly/dan-abramov"
                            alt="Dan Abramov"
                          />
                        </Box>
                        <Spacer />
                        <Box>
                          <Heading as="h1" size="lg">
                            {user.name}
                          </Heading>
                          <Box mt="5">
                            <Text as="samp">Username: {user.username}</Text>
                          </Box>
                          <Box>
                            <Text as="samp">Email: {user.email}</Text>
                          </Box>
                          <Box>
                            <Text as="samp">Website: {user.website}</Text>
                          </Box>
                          <Box>
                            <Text as="samp">
                              Company Name: {user.company.name}
                            </Text>
                          </Box>

                          <TagsInput isExpanded={isExpanded} user={user} selectedTags={selectedTags} />
                          <AccordionPanel pb={4} pl={0}>
                            <Box>
                              <Box>
                                <Text as="samp">
                                  Street: {user.address.street}
                                </Text>
                              </Box>
                              <Box>
                                <Text as="samp">
                                  Suite: {user.address.suite}
                                </Text>
                              </Box>
                              <Box>
                                <Text as="samp">City: {user.address.city}</Text>
                              </Box>
                              <Box>
                                <Text as="samp">
                                  Zipcode: {user.address.zipcode}
                                </Text>
                              </Box>
                            </Box>
                          </AccordionPanel>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                  <AccordionButton
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="auto"
                  >
                    {isExpanded ? (
                      <MinusIcon mt="10" fontSize="12px" />
                    ) : (
                      <AddIcon mt="10" fontSize="12px" />
                    )}
                  </AccordionButton>
                </Flex>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </Container>
  );
}

export default observer(UsersList);