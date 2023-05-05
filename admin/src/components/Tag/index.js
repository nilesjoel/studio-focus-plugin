import React from 'react';

import { ActionLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { Tag } from '@strapi/design-system/Tag';
import { Box } from '@strapi/design-system/Box';

import { Flex } from '@strapi/design-system/Flex';
import Plus from '@strapi/icons/Plus';
import Trash from '@strapi/icons/Trash';
import { Typography } from '@strapi/design-system/Typography';

import { useEntryContext, useEntryUpdate } from "../../contexts/EntryContext";

const StudioTags = () => {

    const { allTags, addInnerEntryTag, removeInnerEntryTag,
        selectedTags, innerEntryTags, setInnerEntryTags } = useEntryUpdate();

    const isSelectedTag = (id) => {
        let contains = false;
        innerEntryTags && innerEntryTags.length > 0 && innerEntryTags.forEach((tag) => {
            // console.log({ tag }, tag.id === id)
            if (tag.id === id) contains = true;
            return;
        })

        return contains;
    }
    return (
        <><Box>
            <Flex
                direction="row"
                wrap="wrap"
                justifyContent="space-between">
                {allTags.map((data, index) =>
                    <Flex
                        justifyContent={'space-between'}
                        paddingTop={2}
                        key={index}>
                        <Tag key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                isSelectedTag(data.id) ?
                                    removeInnerEntryTag(data) :
                                    addInnerEntryTag(data);
                            }}
                            icon={
                                isSelectedTag(data.id) ?
                                    <Trash aria-hidden={true} /> :
                                    <Plus aria-hidden={true} />
                            }>
                            <Typography variant="sigma" textColor={isSelectedTag(data.id) ? "secondary500":"neutral300"}>
                                {`${data.name}`}
                            </Typography>
                        </Tag>
                    </Flex>)
                }
            </Flex>
        </Box>
        </>
    )
}


export default StudioTags;