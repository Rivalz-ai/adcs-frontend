import { Box, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
import { SubmitResult } from "./types";

interface SubmitResultDisplayProps {
  result: SubmitResult;
}

export default function SubmitResultDisplay({
  result,
}: SubmitResultDisplayProps) {
  return (
    <Box mt={6} p={4} borderRadius="md" bg="#0C0E12" border="1px solid #23262E">
      <Alert
        status={result.success ? "success" : "error"}
        bg="#0C0E12"
        border="1px solid #23262E"
        color={result.success ? "#49B267" : "#FF453A"}
      >
        <AlertIcon />
        {result.message}
      </Alert>

      {result.success && result.data && (
        <Box mt={4}>
          <Box bg="#0C0E12" p={3} borderRadius="md" border="1px solid #23262E">
            <pre style={{ color: "#49B267" }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </Box>
        </Box>
      )}
    </Box>
  );
}
