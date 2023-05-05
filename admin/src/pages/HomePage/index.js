import React, { memo, useState, useEffect, useContext } from 'react';

import { EntryProvider } from "../../contexts/EntryContext";
import EntryComponent from '../../contexts/EntryComponent'

const HomePage = () => {

  return (
    <EntryProvider>
      <EntryComponent></EntryComponent>
    </EntryProvider>
  )
}

export default memo(HomePage);