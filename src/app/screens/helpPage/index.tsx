import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{}}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={"table_list"}
              >
                <Tab label={String(t("help.terms"))} value={"1"} />
                <Tab label={String(t("help.faq"))} value={"2"} />
                <Tab label={String(t("help.contact"))} value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel value={"1"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>{t("help.contactUs")}</span>
                      <p>{t("help.fill")}</p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label>{t("help.name")}</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={String(t("help.namePh"))}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>{t("help.email")}</label>
                        <input
                          type={"text"}
                          name={"memberEmail"}
                          placeholder={String(t("help.emailPh"))}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>{t("help.message")}</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={String(t("help.messagePh"))}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          {t("help.send")}
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
