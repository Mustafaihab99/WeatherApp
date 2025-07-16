// import mui component
import Typography from "@mui/material/Typography";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MaterialUISwitch } from "./MuiSwitch";
// Hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// Styles
import "../Styles/cardStyle.css";
// Global Variables
let cancelAxios = null;
const countriesDetails = {
  Cairo: {
    long: 31.477898,
    lat: 30.005493,
  },
  Giza: {
    long: 31.208853,
    lat: 30.013056,
  },
  Alexandria: {
    long: 29.924526,
    lat: 31.205753,
  },
  London: {
    long: -0.118092,
    lat: 51.509865,
  },
  Paris: {
    long: 2.349014,
    lat: 48.864716,
  },
  Moscow: {
    long: 37.618423,
    lat: 55.751244,
  },
  NewYork: {
    long: -73.93524,
    lat: 40.73061,
  },
  Seoul: {
    long: 127.024612,
    lat: 37.5326,
  },
};
// Card Component
export default function Card() {
    
    // UseStates
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("Cairo");
  const [checked, setChecked] = useState(true);
  const { t, i18n } = useTranslation();
  const [temp, setTemp] = useState({
    maxTemp: null,
    minTemp: null,
    desc: "",
    image: "",
  });

//   useEffect for Api
  useEffect(() => {
    const lat = countriesDetails[city].lat;
    const long = countriesDetails[city].long;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b25cc5f6f91e81e4206060f3108b4c0c`,
        {
          cancelToken: new axios.CancelToken((cancel) => {
            cancelAxios = cancel;
          }),
        }
      )
      .then(function (response) {
        const maxTemp = Math.round(response.data.main.temp_max - 272.15);
        const minTemp = Math.round(response.data.main.temp_min - 272.15);
        const iconCode = response.data.weather[0].icon;
        const imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        setTemp({
          maxTemp,
          minTemp,
          desc: response.data.weather[0].description,
          image: imageUrl,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      if (cancelAxios) cancelAxios();
    };
  }, [city]);

//   Functions Handler
  function handleClickLang() {
    if (i18n.language === "ar") i18n.changeLanguage("en");
    else i18n.changeLanguage("ar");
  }
  
  const handleChange = (event) => {
    setCity(event.target.value || "");
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  function handleClickMode() {
    if (checked) {
      document.body.style.backgroundColor = "rgb(15 6 41)";
    } else {
      document.body.style.backgroundColor = "rgb(201 235 255)";
    }
  };
//   UI Design
  return (
    <>
      <div
        className="card"
        style={{
          direction: i18n.language === "ar" ? "ltr" : "rtl",
          backgroundColor: checked ? "rgb(99 178 215 / 57%)" : "#050554",
          boxShadow: checked ? "0px 3px 10px #1e5f74" : "0px 4px 14px #120953",
        }}>
        {/* Top */}

        <div
          className="topinfo"
          dir="ltr"
          style={{
            alignItems: "end",
            flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
          }}>
          <Typography
            variant="h3"
            style={{ color: checked ? "black" : "white" }}>
            {t(city)}
          </Typography>
          <Button
            onClick={handleClickOpen}
            style={{
              color: checked ? "black" : "white",
              border: checked
                ? "2px solid rgb(4 29 62 / 55%)"
                : "2px solid rgba(255, 255, 255, 0.26)",
            }}>
            {t("Choose City")}
          </Button>
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>All Cities</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel htmlFor="demo-dialog-native">City</InputLabel>
                  <Select
                    native
                    value={city}
                    onChange={handleChange}
                    input={
                      <OutlinedInput label="Age" id="demo-dialog-native" />
                    }>
                    <option aria-label="None" value="" />
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Paris">Paris</option>
                    <option value="London">London</option>
                    <option value="NewYork">New York</option>
                    <option value="Seoul">Seoul</option>
                    <option value="Moscwo">Moscow</option>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>
          <div></div>
        </div>
        <hr />
        {/* Middle Info */}
        <div className="midinfo">
          {/* Temp */}
          <div className="left">
            <WbCloudyIcon />
          </div>
          {/* Degree & Desc */}
          <div className="right">
            {/* degree and status */}
            <div className="degree">
              <img src={temp.image || null} alt="degree" />
              <Typography
                variant="h2"
                style={{ color: checked ? "black" : "white" }}>
                {temp.maxTemp}
              </Typography>
            </div>
            {/* desc */}
            <Typography
              variant="h6"
              style={{ color: checked ? "black" : "white" }}>
              {t(temp.desc)}
            </Typography>
            <div className="numbers">
              <Typography
                variant="h6"
                style={{ color: checked ? "black" : "white" }}>
                {t("Min")} : {temp.minTemp}
              </Typography>
              <Typography
                variant="h6"
                style={{ color: checked ? "black" : "white" }}>
                |
              </Typography>
              <Typography
                variant="h6"
                style={{ color: checked ? "black" : "white" }}>
                {t("Max")} : {temp.maxTemp}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* Language change button & Dark Mode*/}
      <div className="btns">
        <Button
          onClick={handleClickLang}
          style={{ color: checked ? "black" : "white", fontWeight: "bold" }}>
          {t("Arabic")}
        </Button>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              defaultChecked
              onClick={() => {
                setChecked(!checked);
                handleClickMode();
              }}
            />
          }
        />
      </div>
    </>
  );
}
