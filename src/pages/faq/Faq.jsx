import React, { useState } from "react";
import { Data } from "./Data";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background: #fff;
`;

const Container = styled.div`
  position: absolute;
  top: 10%;
  box-shadow: 2px 10px 20px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
  background: #fff;
  color: #111;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  text-align: center;
  cursor: pointer;
  p {
    padding: 1rem;
    font-size: 1.3rem;
  }
  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  background: #fff;
  color: #111;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 35px;
  align-items: left;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  p {
    font-size: 18px;
  }
`;

const Faq = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: "#111", size: "25px" }}>
      <AccordionSection>
        <Container>
          <>
            <h3 className="ListTitle">Frequently Asked Questions</h3>
          </>
          {Data.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <p>{item.question}</p>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <p>{item.answer}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Faq;
