import React , {useState, useEffect}  from 'react'
import {InputLabel , Select , MenuItem, Button , Grid , Typography} from "@material-ui/core"
import {useForm, FormProvider} from "react-hook-form"
import FormInput from "../FormInput"
import {Link} from 'react-router-dom';
import {commerce} from "../../../lib/commerce"

const AddressForm = ({checkoutToken , next}) => {
    const [shippingCountries ,setshippingCountries] = useState([])
    const [shippingCountry ,setshippingCountry] = useState("")
    const [shippingSubdivisons ,setshippingSubdivisons] = useState([])
    const [shippingSubdivison ,setshippingSubdivison] = useState("")
    const [shippingOptions ,setshippingOptions] = useState([])
    const [shippingOption ,setshippingOption] = useState("")
    const methods = useForm()

    const countries  = Object.entries(shippingCountries).map(([code , name]) => ({id: code, label:name }))
    const subdivisons  = Object.entries(shippingSubdivisons).map(([code , name]) => ({id: code, label:name }))
    const options = shippingOptions.map((sO) => ({ id : sO.id , label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries  = async(checkoutTokenId) =>{

            const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
            setshippingCountries(countries)
            setshippingCountry(Object.keys(countries)[0])

    }
    const fetchSubdivisons  = async(countryCode) =>{
            const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
            setshippingSubdivisons(subdivisions)
            setshippingSubdivison(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutToken, country , region = null) =>{
                const options = await commerce.checkout.getShippingOptions(checkoutToken, {country , region})

                setshippingOptions(options)
                setshippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {

    if(shippingCountry)  fetchSubdivisons(shippingCountry)

    }, [shippingCountry])

    useEffect(() => {

        if(shippingSubdivison) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivison)

    }, [shippingSubdivison])

    return (
        <>
            <Typography variant = "h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit = {methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivison, shippingOption}) )} >
                    <Grid container spacing = {3}>
                            <FormInput  name = "FirstName" label ="FirstName" />
                            <FormInput  name = "LastName" label ="LastName" />
                            <FormInput  name = "Address" label ="Address" />
                            <FormInput  name = "Email" label ="Email" />
                            <FormInput  name = "City" label ="City" />
                            <FormInput  name = "zip" label ="Zip / Postal code" />
     
              
                    <Grid item xs  = {12} sm = {6}>
                                    <InputLabel>Shipping Country</InputLabel>

                                    <Select value = {shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
                                        {countries.map((country) =>(
                                        <MenuItem key = {country.id} value ={country.id}>
                                           {country.label}
                                        </MenuItem>
                                        ))}
                                    </Select>
                    </Grid>
                    <Grid item xs  = {12} sm = {6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                                 <Select value = {shippingSubdivison} fullWidth onChange={(e) => setshippingSubdivison(e.target.value)}>
                                        {subdivisons.map((subdivison) =>(
                                        <MenuItem key = {subdivison.id} value ={subdivison.id}>
                                           {subdivison.label}
                                        </MenuItem>
                                        ))}
                                    </Select>
                    </Grid>
                    <Grid item xs  = {12} sm = {6}>
                                    <InputLabel>Shipping Options</InputLabel>
                                    <Select value = {shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                                        {options.map((Option) =>(
                                            <MenuItem key = {Option.id} value ={Option.id}>
                                               {Option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                       </Grid>
                       <br/>
                       <div style = {{display:'flex' , justifyContent: 'space-between'}}>
                                    <Button  component = {Link}  to = "/cart" variant = "outlined">Back to Cart</Button>
                                    <Button  type ="submit" variant = "contained" color = "primary"> Next</Button>
                       </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
