// @ts-ignore
import { createContext, useState, ReactNode, useContext } from "react";

interface DrawerContextType {
  openLoginDrawer: boolean;
  setOpenLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  closeLoginDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);

  const closeLoginDrawer = () => {
    setOpenLoginDrawer(false);
  };

  return (
    <DrawerContext.Provider
      value={{ openLoginDrawer, setOpenLoginDrawer, closeLoginDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
