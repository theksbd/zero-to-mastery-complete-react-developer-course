import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart
} from '../../store/user/userAction';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignInForm.scss';

/* No longer used, I have migrated to Redux-saga, keep this for reference */
// import {
//   signInAuthUserWithEmailAndPassword,
//   signInWithGooglePopup
// } from '../../utils/firebase/firebase';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup(); /* No longer used, I have migrated to Redux-saga, keep this for reference */
    dispatch(googleSignInStart());
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
      /* No longer used, I have migrated to Redux-saga, keep this for reference */
      // await signInAuthUserWithEmailAndPassword(email, password);

      dispatch(emailSignInStart(email, password));
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
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
