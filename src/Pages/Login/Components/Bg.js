import React from "react";
import classes from "./Bg.module.css";
import TypeWriterEffect from "react-typewriter-effect";
// import TypeWriterEffect from 'react-typewriter-effect';
import PartialCode from "./Shape";
import logo from "../../../images/iitpkd_logo.jpg";
function Bg() {
  return (
    <>
      <section className={classes.pt1}>
        <PartialCode className={classes.back} />
        <div className={classes.typing}>
          <TypeWriterEffect
            textStyle={{
              fontWeight: 500,
              color: "black",
            }}
            startDelay={1000}
            cursorColor="black"
            multiText={["TA Allocation Portal"]}
            multiTextDelay={1500}
            typeSpeed={110}
            multiTextLoop={true}
          />
        </div>
      </section>
      <img src={logo} alt="College_Logo" className={` ${classes.logo}`} />
    </>
  );
}

export default Bg;
