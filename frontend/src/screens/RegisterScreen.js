import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({location, history}) =>{
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword]= useState('') 
    const [confirmPassword, setConfirmPassword]= useState('') 
    const [message, setMessage]= useState(null) 
 
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo}= userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
         }, [history, userInfo, redirect])

       const submitHandler = (e) => {
           e.preventDefault()
        // despatch register
        if(password !== confirmPassword){
            setMessage('הסיסמות לא זהות ')
        }else{
            dispatch(register(name, email, password))
        }
       }

    return (
        <FormContainer>
            <h1>הרשמה </h1>
            {message && < Message variant='danger'>{message} </Message>  }
            {error && < Message variant='danger'>{error} </Message>  }
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                  {/* name */}
            <Form.Group  controlId='name'>
                <Form.Label>name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='שם מלא'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
              </Form.Group>
              {/* email */}
            <Form.Group  controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='אימיל'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
              </Form.Group>
            {/* password */}
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='סיסמה'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            {/* confirm password */}
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='אימות סיסמה'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            {/* button sing in */}
            <Button type='submit' variant='primary'>הרשמה</Button>
            </Form>
            {/*  */}
            <Row className='py-3'>
                <Col>
                    כבר רשום?{''}
                    <Link to ={redirect ? `/login?redirect=${redirect}` : 'login'}>
                    לחץ להתחברות
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen