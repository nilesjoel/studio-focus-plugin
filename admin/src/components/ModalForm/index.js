import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//I18n
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
// Strapi UI system
import {
  ModalLayout,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@strapi/design-system/ModalLayout';
import { Breadcrumbs, Crumb } from '@strapi/design-system/Breadcrumbs';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';

import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { TextInput } from '@strapi/design-system/TextInput';

import { Textarea } from '@strapi/design-system/Textarea';
import {
  LoadingIndicatorPage,
} from '@strapi/helper-plugin';

import { useEntryContext, useEntryUpdate } from "../../contexts/EntryContext";

import StudioTags from '../Tag';
export const ModalForm = ({ entry, onToggle, onSave }) => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    innerEntry, setInnerEntry,
    innerEntryTags, setInnerEntryTags
  } = useEntryUpdate();

  const { modalMode } = useEntryContext();

  useEffect(() => {
    switch (modalMode) {
      case "edit":
        setInnerEntry(entry);
        setInnerEntryTags(entry.tags)
        break;
      case "create":
        setInnerEntry({});
        setInnerEntryTags([])
        break;
    }

    setIsLoading(false);
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SAVING IS TAKING PLACE", { innerEntry })
    setIsSaving(true);
    onSave({ ...innerEntry, tags: innerEntryTags });
    setIsSaving(false);
    onToggle();
  };

  return (
    <ModalLayout onClose={onToggle} labelledBy="title">
      <ModalHeader>
        <Breadcrumbs label={"Header Title"}>
          <Crumb>
            {modalMode==='edit'? formatMessage({
              id: getTrad('plugin.entry.modal.edit.title'),
              defaultMessage: 'Entry Edit',
            }) : formatMessage({
              id: getTrad('plugin.entry.modal.create.title'),
              defaultMessage: 'Entry Create',
            })}
          </Crumb>
        </Breadcrumbs>
      </ModalHeader>
      {isLoading ? (<LoadingIndicatorPage />)
        :
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Box >



              <Box paddingBottom={7}>
                <Typography variant="beta" as="h2">
                  {formatMessage({
                    id: getTrad('plugin.entry.modal.details'),
                    defaultMessage: 'Entry Details',
                  })
                  }
                </Typography>
              </Box>
              <Box>
              <Typography variant="pi">
                  {formatMessage({
                    id: getTrad('plugin.entry.modal.content.tag.label'),
                    defaultMessage: 'Entry Details',
                  })
                  }
                </Typography><StudioTags />
              </Box>
              <Box>
                <Flex direction={"column"} alignItems={"stretch"}>
                  <Box paddingTop={4}>
                    <TextInput
                      placeholder={formatMessage({
                        id: getTrad('plugin.entry.modal.content.title.placeholder'),
                        defaultMessage: 'Title Placeholder',
                      })}
                      label={formatMessage({
                        id: getTrad('plugin.entry.modal.content.title.label'),
                        defaultMessage: 'Title Label',
                      })} name="content"
                      hint={formatMessage({
                        id: getTrad('plugin.entry.modal.content.title.hint'),
                        defaultMessage: 'Title Hint',
                      })}
                      value={innerEntry.title}
                      onChange={(e) => {
                        setInnerEntry({ ...innerEntry, title: e.target.value });
                        console.log(innerEntry)
                      }}>
                    </TextInput>
                  </Box>
                  <Box paddingTop={4}>
                    <Textarea
                      placeholder={formatMessage({
                        id: getTrad('plugin.entry.modal.content.text.placeholder'),
                        defaultMessage: 'Entry Content Placeholder',
                      })}
                      label={formatMessage({
                        id: getTrad('plugin.entry.modal.content.text.label'),
                        defaultMessage: 'Entry Content Label',
                      })} name="content"
                      hint={formatMessage({
                        id: getTrad('plugin.entry.modal.content.text.hint'),
                        defaultMessage: 'Entry Content Hint',
                      })}
                      value={innerEntry.text}
                      onChange={(e) => {
                        setInnerEntry({ ...innerEntry, text: e.target.value });
                      }}>
                    </Textarea>
                  </Box>
{/* 
                  <Flex justifyContent="flex-start" gap={2} paddingTop={4}>
                    {innerEntryTags && innerEntryTags.length > 0 && innerEntryTags.map((tag, idx) => <Box key={idx} padding={4} background="neutral100"><Typography variant="sigma" textColor={"secondary600"}>{tag.name}</Typography></Box>)}
                  </Flex> */}

                </Flex>
              </Box>
            </Box>

          </ModalBody>
          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={onToggle} type="button">
                {formatMessage({
                  id: 'app.components.Button.cancel',
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endActions={
              <Button type="submit" value="Submit" loading={isSaving}>
                Save
              </Button>
            }
          />
        </form>
      }
    </ModalLayout>
  );
};

ModalForm.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
};