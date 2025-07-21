import React from "react";
import { Box, Skeleton, Card, CardContent, CardMedia } from "@mui/material";

const ProductSkimmer = () => {
  const skeletonArray = Array.from({ length: 6 });

  return (
    <Box sx={{ p: 2, backgroundColor: "#f1f5f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width="30%" height={30} />
      </Box>

      {/* Search + Filter */}
      <Box display="flex" gap={1} mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={40} width="100%" />
      </Box>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        {/* LEFT SIDE: Product Cards */}
        <Box flex={2} display="flex" flexDirection="column" gap={2}>
          {skeletonArray.map((_, index) => (
            <Card key={index} variant="outlined" sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <CardMedia>
                <Skeleton variant="rectangular" width={90} height={90} sx={{ borderRadius: 1 }} />
              </CardMedia>
              <CardContent sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="30%" height={18} />
                <Skeleton variant="text" width="90%" height={18} />
              </CardContent>
              <Box textAlign="center" px={2}>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="rectangular" width={100} height={36} sx={{ mt: 1 }} />
              </Box>
            </Card>
          ))}
        </Box>

        {/* RIGHT SIDE: Cart Placeholder */}
        <Box flex={1} sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductSkimmer;
