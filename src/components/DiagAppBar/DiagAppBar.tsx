import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  Divider,
} from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
import { CsvUploader } from "../CsvUploader/CsvUploader"

export const DiagAppBar = ({
  selectedPage,
  pages,
  onPageChange,
}: {
  selectedPage: string
  pages: string[]
  onPageChange: (page: string) => void
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const open = Boolean(menuAnchor)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget)
  }

  const handleMenuClose = () => setMenuAnchor(null)
  return (
    <AppBar position="static" sx={{ backgroundColor: "#005eb8", boxShadow: 3 }}>
      <Toolbar
        about="test"
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalShippingIcon sx={{ mr: 1, color: "white" }} />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            CPT Diagnostics Tool
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {pages.map((page, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => onPageChange(page)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover effect
                },
                // Highlight the selected page button
                backgroundColor:
                  selectedPage === page
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
              }}
            >
              {page}
            </Button>
          ))}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="textSecondary">
                Upload Tools
              </Typography>
              <Divider sx={{ my: 1 }} />
              <CsvUploader />
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
