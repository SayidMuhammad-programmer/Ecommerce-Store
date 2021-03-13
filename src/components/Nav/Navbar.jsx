import React from 'react'
import {AppBar, Toolbar, IconButton , Badge, MenuItem, Menu , Typography} from '@material-ui/core'
import  {ShoppingCart} from '@material-ui/icons'
import  useStyles from "./styles"
import Logo from "../../assets/Goku.png"
import {Link, useLocation} from 'react-router-dom';

function Navbar({ totalItem }) {

    const classes = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position = "fixed" className = {classes.appBar} color = "inherit">

            <Toolbar>
                
                    <IconButton component = {Link } to = "/">
               <Typography variant = "h6" className = {classes.title} color ="inherit">
                   <img src = {Logo} alt = "Commerce.js" height = "25px" className = {classes.image} />
                   YRN
               </Typography>
               </IconButton>
                 <div className = {classes.grow} />
                      { location.pathname === "/" && (

            
               <div className = {classes.button}>

                   <IconButton component = {Link } to = "/cart" aria-label = "Show cart items" color = "inherit">
                            <Badge badgeContent = {totalItem} color = {'secondary'}>
                                <ShoppingCart/>
                            </Badge>
                   </IconButton>
               </div>)}
            </Toolbar>

            </AppBar>
        </>
    )
}

export default Navbar
