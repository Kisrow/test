import { Box, Loader } from "@mantine/core";

export const Spinner = () => {
  return (
    <Box
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.5)",
        zIndex: 2,
      }}
    >
      <Loader size="sm" />
    </Box>
  );
};
