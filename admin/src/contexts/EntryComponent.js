import React, { memo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import pluginId from "../pluginId";
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../utils/getTrad'
import {
    LoadingIndicatorPage,
} from '@strapi/helper-plugin';

import { useEntryContext, useEntryUpdate } from "./EntryContext";

import { TwoColsLayout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography'

import { ContentLayout, HeaderLayout, Layout } from '@strapi/design-system/Layout';
//Strapi Design-System components
import { Main } from '@strapi/design-system/Main';
import { Button } from "@strapi/design-system/Button";
import Play from "@strapi/icons/Play";
import Cog from "@strapi/icons/Cog";
import Pencil from '@strapi/icons/Pencil';
import { EntryTable } from '../components/EntryTable';
import StudioTags from '../components/Tag';

import { Flex } from '@strapi/design-system/Flex';
import { SimpleMenu, MenuItem } from '@strapi/design-system/SimpleMenu'
import CarretDown from '@strapi/icons/CarretDown';
export default function EntryComponent() {





    const { darkTheme, allEntries } = useEntryContext();
    const { handleModalCreate, toggleTheme, allTags } = useEntryUpdate();



    const [isLoading, setIsLoading] = useState(false);
    // const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
    // const [results, setResults] = useState([]);
    const { formatMessage } = useIntl();
    const { push } = useHistory();

    const configure = () => {
        push(`/settings/${pluginId}/`);
    };


    return (
        <Main labelledBy="title" aria-busy={isLoading}>

            <HeaderLayout
                id="title"
                title={formatMessage({ id: getTrad("plugin.homepage.title") })}
                subtitle={formatMessage({ id: getTrad("plugin.homepage.subtitle") })}
                primaryAction={
                    <>
                        {/* <Button
                        onClick={handleSubmit}
                        startIcon={<Play />}
                        size="L"
                        disabled={isLoading || isAnalysisRunning}
                        loading={isAnalysisRunning}
                    >
                        {formatMessage({
                            id: getTrad(
                                isAnalysisRunning
                                    ? "plugin.entry.analysisPending"
                                    : "plugin.entry.runAnalysis"
                            ),
                        })}
                    </Button> */}

                        <Button onClick={(e) => {
                            e.preventDefault();
                            handleModalCreate();
                        }} startIcon={<Pencil />}>
                            {formatMessage({ id: getTrad("plugin.entry.create") })}
                        </Button></>
                }
                secondaryAction={
                    <>

                        <Button variant="tertiary" onClick={configure} startIcon={<Cog />}>
                            {formatMessage({ id: getTrad("plugin.entry.settings") })}
                        </Button>

                    </>
                }
            >
            </HeaderLayout>
            <ContentLayout>
                {isLoading ? (
                    <LoadingIndicatorPage />
                ) : (
                    <Layout>
                        {/* <Flex direction="row">
                            <SimpleMenu label="Filter" icon={<CarretDown />}>
                                <MenuItem>All</MenuItem>
                                <MenuItem>Updated</MenuItem>
                                <MenuItem>Created</MenuItem>
                                <MenuItem>Tags</MenuItem>
                            </SimpleMenu>
                        </Flex> */}


                        <Box>
                            <TwoColsLayout startCol={<Box>
                                <EntryTable data={allEntries}></EntryTable>
                            </Box>} endCol={<Box padding={4}>
                                <Typography variant="beta" as="h2">
                                    {formatMessage({
                                        id: getTrad('plugin.entry.tags.title'),
                                        defaultMessage: 'Tags',
                                    })
                                    }
                                </Typography>
                                <Flex direction={"column"} alignItems="stretch" justifyContent="flex-start" gap={2} paddingTop={4}>
                                    {allTags && allTags.length > 0 && allTags.map((tag, idx) => <Box key={idx} padding={4} background="neutral100"><Typography variant="sigma" >{tag.name}</Typography></Box>)}
                                </Flex>
                            </Box>} />
                        </Box>
                    </Layout>
                )}
            </ContentLayout>

        </Main>
    );
}

// const EntriesList = () => {

//   var entryDataContext = React.useContext(entryContext);

//   console.log({ entryDataContext })

//   const { allEntries } = entryDataContext;
//   console.log({ allEntries })
//   return (
//     <>

    //   <Box padding={4} background="neutral0" borderColor="neutral150" hasRadius={true} shadow="filterShadow">
    //     {/* <Profile data={profile} /> */}{JSON.stringify(allEntries)}
    //   </Box>
//     </>
//   )
// }