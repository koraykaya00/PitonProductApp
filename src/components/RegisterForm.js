import React, { useState } from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import './styles.module.css';
import { register } from '../services/user.service';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid e-mail!').required('Required Field'),

  password: yup
    .string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .required('No password provided.'),
  // passwordMax: yup.string().min(20, 'Your password must be a maximum of 20 characters.').required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match.')
    .required(),
});
function RegisterForm() {
  const [registerError, setRegisterError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone,setPhone]=useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      console.log(values);
      const token = await register(values.name, values.password, values.email);
      if (!token) {
        setRegisterError(true);
        return;
      }
      dispatch(loginUser({ token, rememberMe: false }));
      navigate('/products');
    },
  });
  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box pt={10}>
          <Box textAlign='center'>
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5} textAlign='left'>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name='name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Surname</FormLabel>
                <Input
                  type='text'
                  name='surname'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                as ={InputMask} mask="+\90(5**) ***-**-**" maskChar={null}
                  htmlFor='phone'
                  name='phone'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone} />

              </FormControl>
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

              <FormControl mt='5'>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name='passwordConfirm'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
              </FormControl>

              <Button colorScheme='yellow' mt='5' width='full' type='submit'>
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default RegisterForm;
