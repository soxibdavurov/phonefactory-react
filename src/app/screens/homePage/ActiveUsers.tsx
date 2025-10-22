import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));


export default function ActiveUsers() {
  
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
             {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                /* Bu yerda activeUsers massivini map qilib karta komponentlarini chiqaring */
                  <Card key={member.memberNick} className="card">
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={imagePath} alt={member.memberNick} loading="lazy" />
                      </AspectRatio>
                    </CardOverflow>
                    <Box className="card-detail">
                      <Typography className={"member-nickname"}>{member.memberNick}</Typography>
                    </Box>
                  </Card>
                  )
                })
              ) : (
                <Box className={"no-data"}>No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}