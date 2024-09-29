import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";

const ScrollToTop = () => {
  return (
    // zoom de feha in lazem tkoon true 3shan tzhr al button smooth
    // useScrollTrigger de btrg3 true 3and al scroll { threshold: 100 }
    <Zoom in={useScrollTrigger({ threshold: 100 })}>
      <Fab
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        variant="extended"
        size="small"
        sx={{ position: "fixed", bottom: 33, right: 33 }}
        color="primary"
        aria-label="scroll-top"
      >
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
