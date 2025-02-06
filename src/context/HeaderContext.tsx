import React, { createContext, useContext, useState } from "react";

interface HeaderContextType {
  anchorElUser: HTMLElement | null;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

// Create Context
const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// Context Provider Component
export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <HeaderContext.Provider
      value={{ anchorElUser, handleOpenUserMenu, handleCloseUserMenu }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

// Custom Hook to use HeaderContext
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
