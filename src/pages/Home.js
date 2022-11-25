import { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const value = useContext(AuthContext);
  console.log({ value });

  const [showLoginForm, setShowLoginForm] = useState(true);

  return <div>{showLoginForm ? <LoginForm /> : <RegisterForm />}</div>;
};

export default Home;
