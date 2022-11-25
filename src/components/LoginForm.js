import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react';
import * as yup from 'yup';
import { login } from '../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';

const validationSchema = yup.object().shape({
  // email: yup.string().email('Please enter a valid e-mail!').required('Required Field'),

  password: yup
    .string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .required('No password provided.'),
});

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      console.log(values);
      const { email, password } = values;
      const token = await login(email, password);

      if (!token) {
        setLoginError(true);
        return;
      } 
      dispatch(loginUser({token, rememberMe}));
      navigate('/products');
    },
  });

  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box pt={10}>
          <Box textAlign='center'>
            <Heading>Login</Heading>
          </Box>
          <Box my={5} textAlign='left'>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt='5'>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <Button colorScheme='yellow' mt='5' width='full' type='submit'>
                Login
              </Button>
              <Checkbox onChange={() => setRememberMe((prev) => !prev)} value={rememberMe}>
                Remember Me
              </Checkbox>
            </form> <br/>
            <Link to='/registerForm'>
            <Button colorScheme='purple' >Register</Button> </Link> <br/><br/>
            <Box>{loginError && <div><Alert status='error'>
  <AlertIcon />
  <AlertTitle>You have entered incorrectly. Please try again!</AlertTitle></Alert></div>}</Box>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default LoginForm;
