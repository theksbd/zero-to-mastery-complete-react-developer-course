import { useState } from 'react';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignUpForm.scss';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/userAction';

/* No longer used, I have migrated to Redux-saga, keep this for reference */
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth
// } from '../../utils/firebase/firebase';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      /* No longer used, I have migrated to Redux-saga, keep this for reference */
      // const response = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // createUserDocumentFromAuth(response.user, { displayName });

      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Email is already in use');
      } else {
        console.log(`Error signing up ${err.message}`);
      }
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>I don't have an account</h2>
      <span>Create your own account now</span>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label='Display Name'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

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

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
