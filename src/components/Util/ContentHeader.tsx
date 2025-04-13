import { Grid, Typography } from "@mui/material"

export const ContentHeader = ({
  text,
  children,
}: {
  text: string
  children?: React.ReactNode
}) => (
  <Grid
    container
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundColor: "rgba(128,128,128,0.5)",
      p: 1,
      pl: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="subtitle1" sx={{ mr: children ? "auto" : "" }}>
      {text}
    </Typography>
    {children}
  </Grid>
)
