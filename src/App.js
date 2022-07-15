import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("")
  const [usersList, setUsersList] = useState([]);

  const getNewUser = async () => {
    const { data } = await axios.get(url);
    console.log(data.results);
    setData(data.results);
    setLoading(false);
  }
  const addUser = () => {
    if (usersList.filter((e) => e.id.value === data[0].id.value).length === 0) {
      return setUsersList([...usersList, data[0]]);
    } else {
      alert("This user is already added.");
    }
  }
  // console.log(usersList);
  useEffect(() => {
    getNewUser();
  }, [])

  useEffect(() => {
    setTitle("name");
    // console.log(Object.values(data[0].name).splice(1).join(" "));
    // setValue(Object.values(data[0].name).splice(1).join(" "));
  }, [data])

if (loading) {
    return <h1 className="load">Loading.....</h1>
  }

  console.log(data[0]);
  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={data[0].picture.large} alt="random user" className="user-img" />
          <p className="user-title">My {title} is </p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={() => { setValue(Object.values(data[0].name).splice(1).join(" ")); setTitle("name") }}>
              <img src={data[0].gender === "female" ? womanSvg : manSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onMouseOver={() => { setValue(data[0].email); setTitle("email") }}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={() => { setValue(data[0].dob.age); setTitle("age") }}>
              <img src={data[0].gender === "female" ? womanAgeSvg : manAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onMouseOver={() => { setValue(data[0].location.street.name); setTitle("street") }}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onMouseOver={() => { setValue(data[0].phone); setTitle("phone") }}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password" onMouseOver={() => { setValue(data[0].login.password); setTitle("password") }}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getNewUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((e, i) => {
                return (<tr className="body-tr" key={i}>
                  <td>{Object.values(e.name).splice(1).join(" ")}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.dob.age}</td>
                </tr>)
              })}

            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
