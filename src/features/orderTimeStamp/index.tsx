import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { motion } from "framer-motion"; // ✅ Make sure framer-motion is installed

// ✅ Ensures this is treated as a module
export {};

interface Status {
  id: number;
  status: {
    id: string;
    name: string;
  };
  created_at: string;
}

interface Props {
  statusHistory: Status[];
}

const OrderStatusTimeline: React.FC<Props> = ({ statusHistory }) => {
  const theme = useTheme();

  const reversedStatus = [...statusHistory].reverse();
  const isDelivered = statusHistory.some((s) => s.status.name === "Delivered");

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography fontWeight={600} mb={2}>
          Order Status
        </Typography>

        <Box>
          {reversedStatus.map((status, index) => {
            const isLast = index === reversedStatus.length - 1;
            const createdAt = new Date(status.created_at);
            const date = createdAt.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            const time = createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  position="relative"
                  sx={{ mb: 4 }} // ✅ More spacing between items
                >
                  {/* Vertical Line */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 9,
                      top: 20,
                      bottom: isLast ? "auto" : -20,
                      width: 2,
                      backgroundColor: isLast ? "transparent" : "#cfd8dc",
                    }}
                  />

                  {/* Dot */}
                  <FiberManualRecordIcon
                    fontSize="small"
                    sx={{ color: "#4caf50", mt: "3px" }}
                  />

                  {/* Text Content */}
                  <Box>
                    <Typography fontWeight={600} fontSize={15}>
                      {status.status.name}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                      {date} {time}
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            );
          })}
        </Box>
      </Paper>

      {isDelivered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography fontWeight={600} mb={1}>
              Proof of Delivery
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: 200,
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >
              <img
                src="https://i.imgur.com/9vGfYVJ.jpeg"
                alt="Proof of Delivery"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Paper>
        </motion.div>
      )}
    </>
  );
};

export default OrderStatusTimeline;
