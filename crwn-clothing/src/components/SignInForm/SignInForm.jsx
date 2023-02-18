import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import './SignInForm.scss';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const handleSubmitForm = async e => {
    e.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          alert('User not found!');
          break;
        case 'auth/wrong-password':
          alert('Wrong password! Please try again.');
          break;
        case 'auth/too-many-requests':
          alert(
            'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.'
          );
          break;
        default:
          console.log(
            `Error signing in with email and password ${err.message}`
          );
      }
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label='Email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
