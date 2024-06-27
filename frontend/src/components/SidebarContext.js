// SidebarContext.js
import React, { createContext, useState } from 'react';

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
