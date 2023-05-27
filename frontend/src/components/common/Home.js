import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Owner");
  }, []);

  return <div style={{ textAlign: "center" }}>Welcome to the Website, Register or Login to Proceed</div>;
};

export default Home;
