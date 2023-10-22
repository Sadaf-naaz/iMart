import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
position: fixed;
left: 0;width: 100%;top: 0;z-index:1000;

    height: 30px;
    background-color:teal ;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    /* position: fixed; */
`
const Announcement = () => {
    
  return (
    <Container>
      Super Deal Free Shipping on Orders Over $50
    </Container>
  )
}

export default Announcement
