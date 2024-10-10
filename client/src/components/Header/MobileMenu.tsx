// @ts-ignore
import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  MenuItem,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

// Определяем интерфейс для страницы
interface Page {
  name: string;
  path: string;
  onClick?: () => void;
}

interface MobileMenuProps {
  pages: Page[];
  menuOpen: boolean;
  menuClose: () => void;
}

export default function MobileMenu({
  pages,
  menuOpen,
  menuClose,
}: MobileMenuProps) {
  return (
    <Drawer anchor="right" open={menuOpen} onClose={menuClose}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="16px"
      >
        <Typography>Menu</Typography>
        <IconButton onClick={() => menuClose()}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ width: "360px" }}>
        {pages?.map((page) => (
          <MenuItem
            key={page.name}
            color="inherit"
            component={Link}
            to={page.path}
            onClick={() => {
              if (page.onClick) page.onClick();
              menuClose();
            }}
          >
            {page.name}
          </MenuItem>
        ))}
      </List>
    </Drawer>
  );
}
