import React, { useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../Responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../redux/apiCalls';
import PersonIcon from '@mui/icons-material/Person';


const Container = styled.div`
position: fixed;
left: 0;width: 100%;top: 30px;z-index:1000;
background-color: white;
height:60px;
box-shadow: 0 3px 6px 0 rgba(0,0,0,.1);
${mobile({ height: "50px" })}
/* position: fixed; */
`
const Wrapper = styled.div`
padding:10px 20px;
display:flex;
justify-content:space-between;
align-items: center;
${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Language = styled.span`
font-size:14px;
cursor: pointer;
${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
border: 1px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.input`
border:none;
${mobile({ width: "50px" })}
`
const Center = styled.div`
flex: 1;
`
const Logo = styled.div`
flex:1;
text-align: center;
font-size: 35px;
${mobile({ fontSize: "20px" })}
`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: "2", justifyContent: "center" })}
`
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;

color: black;
&:hover{font-size:16px;}
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser)
    const [search, setSearch] = useState("")
    const navigate=useNavigate();
  

    const handleClick = () => {
        Logout(dispatch);
    };

    const handleSearch=()=>{
        navigate(`/search?searchQuery=${search}`);
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                        
                            <button onClick={handleSearch} style={{ "border": "none", "background": "none" ,"cursor":"pointer"}}>
                            <SearchIcon style={{ color: "gray", fontSize: '16px' }} />
                            </button>
                        
                    </SearchContainer>
                </Left>
                <Center><Logo>iMart</Logo></Center>
                <Right>
                    {!user ?
                        <>
                            <Link to='/register'> <MenuItem>Register</MenuItem></Link>
                            <Link to='/login'><MenuItem>Login</MenuItem></Link>
                        </> :
                        <>
                        <MenuItem><button onClick={handleClick} style={{
                            "background": "none", "border": "none", "cursor": "pointer"
                        }}>LogOut</button></MenuItem>
                        <Link to='/order'><MenuItem><PersonIcon/></MenuItem></Link>

                        </>
                    }
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>

        </Container>
    )
}

export default Navbar
