import React from 'react';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';

import { Button } from '@strapi/design-system/Button';

import { useEntryContext, useEntryUpdate } from "./EntryContext";

const TestComponent = () => {




    const { darkTheme, allEntries } = useEntryContext();
    const { handleModalCreate, toggleTheme } = useEntryUpdate();

    const themeStyles = {
        backgroundColor: darkTheme ? "#333" : "#CCC",
        color: darkTheme ? "#CCC" : "#333",
        padding: "2rem",
        margin: "2rem"
    };



    return (


        <Box padding={4} background="neutral0" borderColor="neutral150" hasRadius={true} shadow="filterShadow">
            {/* // <Profile data={profile} />  */}
            {JSON.stringify(allEntries)}
            <Button onClick={toggleTheme}>Toggle Theme</Button>
            <div style={themeStyles}> Function Theme {JSON.stringify(allEntries)}</div>
        </Box>


    )
}

export default TestComponent;