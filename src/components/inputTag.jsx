import React, {useEffect, useContext} from "react";
import { Input, Box, Tag, TagLabel, TagCloseButton, SimpleGrid } from '@chakra-ui/react';
import { StoreContext } from '../index';

const TagsInput = ({user, isExpanded}) => {
    const store = useContext(StoreContext);
    const { tag } = user;
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
          store.addUserTag(user.id, event.target.value.toLowerCase());
          event.target.value = "";
        }
    };

    const removeTags = index => {
        store.removeUserTag(user.id, index);
    };

    useEffect(() => {
          if(!user?.tag){
             user.tag = []
            }
        }, [user]);
        console.log(user);
    return (
      <>
        <Box>
          <SimpleGrid minChildWidth="80px">
            {tag.map((tag, index) => (
              <Box>
                <Tag
                  size="lg"
                  key={index}
                  rounded="full"
                  variant="solid"
                  my="2"
                  mr="4"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTags(index)} />
                </Tag>
              </Box>
            ))}
          </SimpleGrid>
          <h1>{isExpanded}</h1>
          <Input
            type="text"
            onKeyUp={(event) => addTags(event)}
            placeholder="Add a tag"
            style={{ display: `${isExpanded ? "none" : "block"}` }}
          />
        </Box>
      </>
    );
};
export default TagsInput;