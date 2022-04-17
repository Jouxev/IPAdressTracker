import patternBg from "./Assets/pattern-bg.png";
import IconLocation from "./Assets/icon-location.svg";
import { ReactComponent as Arrow } from "./Assets/icon-arrow.svg";

import { Map, Marker, Overlay } from "pigeon-maps";
import axios from "axios";
import { isIP } from "is-ip";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import styled from "styled-components";
import { mobile } from "./responsive";
import { useEffect, useState } from "react";
const Container = styled.main`
  width: 100vw;
`;
const SearchContainer = styled.header`
  height: 250px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: no-repeat url(${patternBg});
  background-position: top left;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Title = styled.h1`
  margin-top: 0px;
  font-weight: 500;
  color: white;
  ${mobile({
    fontSize: "20px",
  })}
`;
const SearchInputContainer = styled.div`
  display: flex;
  width: 40%;
  font-size: 24px;
  background: white;
  border-radius: 10px;
  ${mobile({
    width: "90%",
  })}
`;
const SearchInput = styled.input`
  flex: 1;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  outline: none;
  padding: 10px 20px;
  border: none;
  ${mobile({ fontSize: "14px" })}
`;
const Button = styled.button`
  border: none;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  background: var(--verydarkgray);
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${mobile({
    width: "70px",
  })}
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  width: 60%;
  position: absolute;
  border-radius: 20px;
  bottom: -150px;
  z-index: 99 !important;
  padding: 20px 40px;
  -webkit-box-shadow: 2px 4px 17px -1px rgba(0, 0, 0, 0.78);
  box-shadow: 2px 4px 17px -1px rgba(0, 0, 0, 0.78);
  ${mobile({
    flexDirection: "column",
    width: "80%",
    padding: "10px 20px",
    textAlign: "center",
    bottom: "-160px",
  })}
`;
const MapContianer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const IPAdress = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({
    margin: "5px 0px",
  })}
`;
const Location = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({
    margin: "5px 0px",
  })}
`;
const Timezone = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({
    margin: "5px 0px",
  })}
`;
const ISP = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({
    margin: "0",
  })}
`;
const BorderLeft = styled.hr`
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  min-height: 80px;
  max-height: 100%;
  margin: 0;
  border: none;
  border-left: 1px solid rgb(156 163 175 / 0.5);
  height: 0;
  color: inherit;
  border-top-width: 1px;
  align-self: center;
  ${mobile({
    display: "none",
  })}
`;

const InfoTitle = styled.p`
  font-size: 10px;
  font-weight: 700;
  color: var(--darkgray);
  text-transform: uppercase;
  ${mobile({
    fontSize: "8px",
  })}
`;
const InfoContent = styled.h2`
  ${mobile({
    fontSize: "14px",
    margin: "0",
  })}
`;

function App() {
  const [Ip, setIp] = useState("");
  const [searchIp, setsearchIp] = useState("");
  const [Loading, setLoading] = useState(false);
  const [coord, setcoord] = useState({
    lat: "0",
    lng: "0",
  });
  // ipAdress validator

  const getIP = () => {
    if (isIP(searchIp) || searchIp === "") {
      setLoading(true);
      axios
        .get(
          "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_7XNSNG0I47oQ8cTtZcMc0smDvMDn8&ipAddress=" +
            searchIp
        )
        .then((res) => {
          setLoading(false);
          setIp(res.data);
          console.log(res.data);
          setcoord({
            lat: res.data.location.lat,
            lng: res.data.location.lng,
          });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    } else {
      Swal.fire({
        title: "Invalid IP",
        text: "Please double check IP ADRESS ",
        timer: 2500,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getIP();
  }, []);

  return (
    <div id="root">
      <Container id="root">
        <SearchContainer>
          <Title> IP Adress Tracker </Title>
          <SearchInputContainer>
            <SearchInput
              placeholder="Search for any ip Adress or domain "
              onChange={(e) => setsearchIp(e.target.value)}
              value={searchIp}
            />
            <Button onClick={() => getIP()}>
              <Arrow />
            </Button>
          </SearchInputContainer>
          <LocationInfo>
            <IPAdress>
              <InfoTitle> IP Adress </InfoTitle>
              <InfoContent>
                {Loading ? (
                  <ReactLoading
                    type="spin"
                    color={"#000000"}
                    width={32}
                    height={32}
                    className="loading"
                  />
                ) : Ip.ip ? (
                  Ip.ip
                ) : (
                  "--"
                )}{" "}
              </InfoContent>
            </IPAdress>
            <BorderLeft />
            <Location>
              <InfoTitle> Location </InfoTitle>
              <InfoContent>
                {Loading ? (
                  <ReactLoading
                    type="spin"
                    color={"#000000"}
                    width={32}
                    height={32}
                    className="loading"
                  />
                ) : Ip.location ? (
                  Ip.location.region +
                  " " +
                  Ip.location.city +
                  ", " +
                  Ip.location.country
                ) : (
                  "--"
                )}{" "}
              </InfoContent>
            </Location>
            <BorderLeft />
            <Timezone>
              <InfoTitle> Timezone </InfoTitle>
              <InfoContent>
                {Loading ? (
                  <ReactLoading
                    type="spin"
                    color={"#000000"}
                    width={32}
                    height={32}
                    className="loading"
                  />
                ) : Ip.location ? (
                  Ip.location.timezone
                ) : (
                  "--"
                )}
              </InfoContent>
            </Timezone>
            <BorderLeft />
            <ISP>
              <InfoTitle> ISP</InfoTitle>
              <InfoContent>
                {Loading ? (
                  <ReactLoading
                    type="spin"
                    color={"#000000"}
                    width={32}
                    height={32}
                    className="loading"
                  />
                ) : Ip.isp ? (
                  Ip.isp
                ) : (
                  "--"
                )}
              </InfoContent>
            </ISP>
          </LocationInfo>
        </SearchContainer>
        <MapContianer>
          <Map center={[coord.lat, coord.lng]} defaultZoom={18}>
            <Overlay anchor={[coord.lat, coord.lng]} offset={[120, 79]}>
              <img src={IconLocation} height={60} alt="" />
            </Overlay>
          </Map>
        </MapContianer>
      </Container>
    </div>
  );
}

export default App;
