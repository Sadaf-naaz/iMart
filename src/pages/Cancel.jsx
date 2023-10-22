import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container=styled.div`
    display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
 
`;
const SuccessBox=styled.div`
    background-color: red; 
  color: #fff; 
  font-size: 24px; 
  padding: 20px;
  border-radius: 5px;
`;
const Msg=styled.h3`
    
`;
const MsgPara=styled.h3`
margin-top: 20px;
/* font-size: 10px; */
`;


const Cancel= ()=>{
    const navigate=useNavigate();

    setTimeout(function() {
        navigate("/")
      }, 5000);

    return (
        <Container>
            <SuccessBox>
                <Msg>Cancelled</Msg>
            </SuccessBox>
            <MsgPara>Your order was not placed. Please try again.</MsgPara>
        </Container>
    )
};

export default Cancel;