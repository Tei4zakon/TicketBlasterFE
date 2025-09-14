import axios from 'axios';
import React from 'react';
import { Link } from 'react-router';
import './../css/CreateAccountPage.css';



const CreateAccountPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user.loading);
   
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: ''
  });



    const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== password2){
        console.log("Passwords don't match!")
        setError("Passwords don't match!")
    } else {
        const { fullName, email, password} = formData;
        const newUser = {fullName, email, password};
    }
    try {
        const res = await axios.post(
            "http://localhost:2741/api/v1/create-account",
            {firstName, lastName, email, password, retypePassword},
            { headers: { "Content-Type": "application/json" } },
      );
      const token = await dispatch(registerUser(newUser)).unwrap();
        await dispatch(verifyToken(token));
    } catch (err) {
      console.log(err);
      setError("Server erorr!");
    };
}


    return(
        <div id='create-account-page'>
        <h1>Create Account</h1>
        <form className='create-account' onSubmit={handleCreateAccount}>
        <p>Full Name</p>
            <input id='full-name-placeholder' 
            type='text' 
            placeholder=''
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}></input>
        <p>Email</p>
            <input id='email-placeholder'
                type='text'
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input>
        <p>Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''></input>
        <p>Re-type Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''></input>
        <p><button id='create-acc-btn'>Create Account</button></p>
        <br/>
        <br/>
        <p id='create-account'><Link to='/login'>Already have an account?</Link></p>
        </form>
        </div>
    )
}

export default CreateAccountPage;

