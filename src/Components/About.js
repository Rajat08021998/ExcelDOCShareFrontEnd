import React from "react";
import { useSpring, animated } from "react-spring";
import TabsHeading from "./tabHeading";
import { ReactComponent as AboutIcon } from "./../images/infoIcon.svg";
const About = () => {
  // Animations for page elements
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1, padding: "10px" });
  const slideUp = useSpring({
    from: { transform: "translateY(30px)" },
    to: { transform: "translateY(0)" },
  });

  return (
    <animated.div style={fade}>
      <div style={{ padding: "10px" }}>
        <TabsHeading text={"About"} icon={AboutIcon} />
      </div>
      <h1>About Our App</h1>
      <animated.p style={slideUp}>
        Welcome to our application, where managing Excel documents becomes a
        breeze! Our platform is designed to simplify the process of handling
        Excel files, making it easy for users to upload, edit, and share their
        data securely within the application.
      </animated.p>

      <h2>Features</h2>
      <animated.p style={slideUp}>
        With our app, you can enjoy the following features:
      </animated.p>
      <ul>
        <animated.li style={slideUp}>
          Upload Excel Documents: Easily upload your Excel files to our
          platform, allowing you to access them from anywhere and at any time.
        </animated.li>
        <animated.li style={slideUp}>
          Insert and Delete Rows: Modify your Excel data effortlessly by
          inserting new rows or deleting existing ones.
        </animated.li>
        <animated.li style={slideUp}>
          Share with Others: Collaborate seamlessly with your team by sharing
          your Excel documents with other users inside our application. No need
          to worry about version control or email attachments!
        </animated.li>
        {/* Add more features here if applicable */}
      </ul>

      <h2>How It Works</h2>
      <animated.p style={slideUp}>
        Our application is built with user-friendliness and efficiency in mind.
        Here's how you can get started:
      </animated.p>
      <ol>
        <animated.li style={slideUp}>
          Create an Account: Sign up for an account on our platform. If you
          already have an account, simply log in.
        </animated.li>
        <animated.li style={slideUp}>
          Upload Your Excel Document: Once logged in, navigate to the upload
          section and select the Excel file you want to manage.
        </animated.li>
        <animated.li style={slideUp}>
          Manage Your Data: After the upload, you can view, edit, and manipulate
          your data using our intuitive interface. Insert or delete rows as
          needed to keep your information up-to-date.
        </animated.li>
        <animated.li style={slideUp}>
          Share and Collaborate: If you're working with a team, you can easily
          share the document with other users in the application. They'll be
          able to view and edit the data in real-time, enhancing collaboration
          and teamwork.
        </animated.li>
      </ol>

      <h2>Security and Privacy</h2>
      <animated.p style={slideUp}>
        We understand the importance of data security and privacy. Rest assured
        that your uploaded Excel documents are protected with the highest
        security standards. Only authorized users with shared access can view or
        edit your documents. We never share your data with third parties, and
        our servers are equipped with the latest security measures to keep your
        information safe.
      </animated.p>
      <animated.p style={slideUp}>
        Thank you for choosing our application to manage your Excel documents.
        We hope you find our platform user-friendly, efficient, and a valuable
        addition to your workflow!
      </animated.p>
    </animated.div>
  );
};

export default About;
