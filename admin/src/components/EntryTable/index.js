
import React, { useState } from 'react';
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
// Strapi UI system

import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from "@strapi/design-system/IconButton";
import Pencil from "@strapi/icons/Pencil";
import Trash from '@strapi/icons/Trash';
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { ModalForm } from "../ModalForm";


import { useEntryContext, useEntryUpdate } from "../../contexts/EntryContext";

import EntriesAPIHandler from "../../services/entry";
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
export const EntryTable = ({ data }) => {
  const { formatMessage } = useIntl();


  const {
    darkTheme,
    allEntries, setAllEntries,
    isModalOpened, setIsModalOpen,
    selectedRow, setSelectedRow
  } = useEntryContext();

  const { handleSave, handleModalEdit, handleDelete } = useEntryUpdate();
  const handleToggle = () => {
    setIsModalOpen(prev => !prev);
  }


  return (
    <>
      {data && data.length > 0 ?
        <>
          {isModalOpened && <ModalForm onToggle={handleToggle} onSave={handleSave} entry={selectedRow} />}
          <Table colCount={4} rowCount={data.length}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.entry.table.title") })}
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.entry.table.text") })}
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    {formatMessage({ id: getTrad("plugin.entry.table.tags") })}
                  </Typography>
                </Th>
                <Th>
                  <VisuallyHidden />
                </Th>
                <Th>
                  <VisuallyHidden />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => {
                return (
                  <Tr key={`contentpage-${index}`}>
                    <Td>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        {item.title}
                      </Typography>
                    </Td>
                    <Td style={{ whiteSpace: "break-spaces" }}>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        {item.text}
                      </Typography>
                    </Td><Td style={{ whiteSpace: "break-spaces" }}>
                      <Typography
                        textColor="neutral800"
                        fontWeight="inherited"
                      >
                        <Flex justifyContent="flex-start" gap={2}>
                        {item.tags && item.tags.length > 0 && item.tags.map((tag, idx)=> <Box key={idx} padding={4} background="neutral100">{tag.name}</Box>)}
                        </Flex>
                      </Typography>
                    </Td>

                    <Td>
                      <IconButton
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                        onClick={(e) => {
                          e.preventDefault();
                          handleModalEdit({ ...item });
                        }}
                      />

                    </Td>
                    <Td>
                      <IconButton
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete({ ...item });
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </> :
        <>{isModalOpened && <ModalForm onToggle={handleToggle} onSave={handleSave} entry={selectedRow} />}
          <Typography variant="omega" fontWeight="semiBold">
            {formatMessage({ id: getTrad("plugin.entry.table.nodata") })}

          </Typography>
        </>
      }
    </>
  );
};

EntryTable.defaultProps = {
  data: [],
};