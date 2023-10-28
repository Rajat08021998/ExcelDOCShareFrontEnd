import React from "react";
import { useSpring, animated } from "react-spring";
import TabsHeading from "./tabHeading";
import { ReactComponent as AboutIcon } from "./../images/infoIcon.svg";
import * as FaIcons from "react-icons/fa";
const Contact = (props) => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1, padding: "10px" });
  const slideUp = useSpring({
    from: { transform: "translateY(30px)" },
    to: { transform: "translateY(0)" },
  });

  return (
    <animated.div style={fade}>
      <div style={{ padding: "10px" }}>
        <TabsHeading text={"Contact us"} icon={FaIcons.FaPhone} />
      </div>

      <h1>Contact Info</h1>
      <animated.p style={slideUp}>
        We value your feedback and are committed to improving our application
        continuously. If you have any questions, suggestions, or concerns,
        please feel free to reach out to our support team at
        <b> rajatjadon0802@gmail.com</b>.
      </animated.p>
    </animated.div>
  );
};

export default Contact;
