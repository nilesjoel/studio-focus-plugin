import React, { useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import EntriesAPIHandler from "../services/entry";
import TagsAPIHandler from "../services/tag";

import {
  // BaseHeaderLayout,
  ContentLayout,
  // TwoColsLayout,
  HeaderLayout,
  // ActionLayout,
  Layout,
} from '@strapi/design-system/Layout';
// import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';

// import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
// import { Typography } from '@strapi/design-system/Typography';

// import { Button } from '@strapi/design-system/Button';
// import Pencil from '@strapi/icons/Pencil';
// import Trash from '@strapi/icons/Trash';
// import Plus from '@strapi/icons/Plus';
// import Apps from '@strapi/icons/Apps';
// import Cross from '@strapi/icons/Cross';
// import Check from '@strapi/icons/Check';
// import { Flex } from '@strapi/design-system/Flex';
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../utils/getTrad';
import { Box } from '@strapi/design-system/Box';

import { useNotification } from '@strapi/helper-plugin';


const EntryContext = React.createContext();
const EntryUpdateContext = React.createContext();

export function useEntryContext() {
  return useContext(EntryContext);
}
export function useEntryUpdate() {
  return useContext(EntryUpdateContext);
}

export function EntryProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  const toggleNotification = useNotification();

  // Entries
  const [allEntries, setAllEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(1)
  // Tags
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set([]));

  const [innerEntry, setInnerEntry] = useState("");
  const [innerEntryTags, setInnerEntryTags] = useState("");
  //-----------------------------------------------------
  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  const [results, setResults] = useState([]);
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  //-----------------------------------------------------

  useEffect(async () => {

    // Define Entries
    const entriesData = await EntriesAPIHandler.getAllEntries();
    setAllEntries(entriesData);

    // Define Tags
    const tagsData = await TagsAPIHandler.getAllTags();



    setAllTags(tagsData);
  }, [selectedEntry])



  const handleSubmit = async () => {
    setIsAnalysisRunning(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsAnalysisRunning(false);
      setIsLoading(false);
      setResults([
        {
          id: 1,
          title: "Article",
          text: "name",
          help: ""
        },
        {
          id: 2,
          title: "Article",
          text: "description",
          help: ""
        },
        {
          id: 3,
          title: "Restaurant",
          text: "name",
          help: ""
        },
        {
          id: 4,
          title: "Restaurant",
          text: "description",
          help: ""
        }
      ]);
    }, 1000);
  };


  // Plugin Settings Page
  const configure = () => {
    push(`/settings/${pluginId}/`);
  };


  const handleDelete = async (entry) => {
    console.log("DELETE", { entry })

    const entryDeleteData = await EntriesAPIHandler.deleteEntry(entry);
    console.log("Entry Reset", { entryDeleteData })

    if (entryDeleteData && allEntries.length > 0) {

      let entryItems = allEntries.filter(item => item.id !== entryDeleteData.id);

      setAllEntries(entryItems);

    }
  }

  const handleSave = async (result) => {

    switch (modalMode) {
      case "edit":

        console.log("SAVE RESULT", { result })
        const entryEditData = await EntriesAPIHandler.updateEntry(result);
        console.log({entryEditData})
        let entryItems = allEntries.filter(item => item.id === entryEditData.id);
        const updatedEntryItems = allEntries.map(obj => obj.id === entryEditData.id ? entryEditData : obj)

        if (entryItems && entryItems.length > 0) {
          setAllEntries(updatedEntryItems)
          toggleNotification({
            type: 'success',
            message: { id: getTrad("plugin.entry.table.edit.save.message") },
          });
        }
        else {
          toggleNotification({
            type: 'error',
            message: { id: getTrad("plugin.entry.table.edit.save.error") },
          });
        }
        break;
      case "create":

        try {
          const entryCreateData = await EntriesAPIHandler.createEntry(result);

          setAllEntries([...allEntries, entryCreateData]);

          toggleNotification({
            type: 'success',
            message: { id: getTrad("plugin.entry.table.edit.create.message") },
          });

        } catch (err) {
          toggleNotification({
            type: 'error',
            message: { id: getTrad("plugin.entry.table.edit.create.error") },
          });

        }



        break;
    }

  }

  const handleModalEdit = (row) => {
    setSelectedRow(row);
    // let unionTags = [];
    // allTags.forEach((tag) => {
    //   if (row.tags.forEach((selectedTag) => {
    //     if (tag.id === selectedTag.id) {
    //       console.log("FOUND THIS IS SELECTED", tag);
    //       unionTags[tag.id] = { ...tag, selected: true };
    //     } else {
    //       console.log("NOT FOUND", tag.id, selectedTag.id)
    //       unionTags[tag.id] = { ...tag, selected: false };
    //     }

    //   }));
    // });
    // setAllTags(unionTags)
    
    setModalMode("edit");
    console.log("ALL TAGS",
      { allTags }, "SELECTED TAGS:", { selectedTags });
    setIsModalOpen(prev => !prev);
  };

  const handleModalCreate = () => {
    console.log("Handle Create");
    setSelectedRow(undefined);
    setModalMode("create");
    setIsModalOpen(prev => !prev)
  }



  const addInnerEntryTag = (tag) => {
    console.log({innerEntryTags })
    innerEntryTags && innerEntryTags.length > 0 ? setInnerEntryTags([...innerEntryTags, tag]): setInnerEntryTags([tag]);
    
    console.log("CLICK SELECT", {innerEntryTags})
    return innerEntryTags;
  }
  const removeInnerEntryTag = (tag) => {

    const updatedInnerEntryTags = innerEntryTags.filter((innerTag)=> innerTag.id !== tag.id);
    
    setInnerEntryTags([...updatedInnerEntryTags])
    console.log("REMOVE Entry TAG", {updatedInnerEntryTags})
  }
  const entryContext = {
    param: "value",
    handleSubmit,
    configure,
    allEntries,
    setAllEntries,
    selectedEntry,
    setSelectedEntry,
    darkTheme,
    isModalOpened, setIsModalOpen,
    modalMode,
    selectedRow, setSelectedRow
  }

  const entryUpdateContext = {
    handleSave,
    handleModalEdit,
    handleModalCreate,
    toggleTheme,
    handleDelete,
    allTags,
    selectedTags,
    setSelectedTags,
    addInnerEntryTag,
    removeInnerEntryTag,
    innerEntry, setInnerEntry,
    innerEntryTags, setInnerEntryTags
  }
  return (
    <EntryContext.Provider value={entryContext}>
      <EntryUpdateContext.Provider value={entryUpdateContext}>
        {children}
      </EntryUpdateContext.Provider>
    </EntryContext.Provider>
  );
}
