import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import { UserContext } from '../../Context/UserContext'
import CryptoJS from 'crypto-js';

function Login() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);

    const { signInUser } = useContext(UserContext);

    const handleDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted'); // Check if this message appears in the console
    
        const form = event.target; // Use event.target to access the form
        let user = {
            email: email, // Use state variable directly
            password: password // Use state variable directly
        };
        console.log(user); 
        fetch('http://localhost:3001/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                let respMessage = data.message;
                let user = data.user;
                if (respMessage === "success") {
                    signInUser(user, data.token);
                    navigate("/dash");
                }
                else {
                    //TODO: display error message
                    setErrorList(data.errors);
                    handleDialogueOpen();
                }
            });
    };

    const signUpClicked = () => {
        navigate("/signup");
    }





    const lool = '3124a6239bb15aca9f697f2d6711338f';

    let userEmail=" "
    let userName=" "
    let userId=" "
    let encryptedId=" ";

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    function encryptUserId(userId, privateKey) {
        const cipher = CryptoJS.SHA256(userId+privateKey).toString();
    
       
        return cipher;
      }
let isFacebook = false 


     const responseFacebook = response => {
        console.log(response);
        
    console.log(response);
    // Gérer la réponse de Facebook ici
    // Par exemple, extraire les informations de l'utilisateur de la réponse
    let { name, email, id } = response;
    userEmail=email;
    userName=name;
    userId=id;
    encryptedId = encryptUserId(userId, lool);
    setPassword(encryptedId);
    setEmail(userEmail);
    // Maintenant, vous pouvez utiliser ces informations comme nécessaire
    console.log('User Name:', name);
    console.log('User Email:', email);
    console.log('User ID:', id);
    let user = {
        email: userEmail, // Use state variable directly
        password: encryptedId // Use state variable directly
    };
    console.log(user); 
    fetch('http://localhost:3001/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            let respMessage = data.message;
            let user = data.user;
            if (respMessage === "success") {
                signInUser(user, data.token);
                navigate("/dash");
            }
            else {
                //TODO: display error message
                setErrorList(data.errors);
                handleDialogueOpen();
            }
        });
      }

      const loginData =(credentialResponse, response) =>{
        const credentialResponseDecoded = parseJwt(credentialResponse.credential) 
      console.log(credentialResponseDecoded);
      
    
// Gérer la réponse de Google ici pour google
        userEmail = credentialResponseDecoded.email;
        userName = credentialResponseDecoded.name;
        userId = credentialResponseDecoded.sub;
        encryptedId = encryptUserId(userId, lool);
        setPassword(encryptedId);

        setEmail(userEmail);

// Now you can use this data as needed
    console.log('User Email:', userEmail);
    console.log('User Name:', userName);
    console.log('User id:', userId);
    console.log('User password:', encryptedId);
    
        //DISPATCH LOGIN
        // Use event.target to access the form
        let user = {
            email: userEmail, // Use state variable directly
            password: encryptedId // Use state variable directly
        };
        console.log(user); 
        fetch('http://localhost:3001/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                let respMessage = data.message;
                let user = data.user;
                if (respMessage === "success") {
                    signInUser(user, data.token);
                    navigate("/dash");
                }
                else {
                    //TODO: display error message
                    setErrorList(data.errors);
                    handleDialogueOpen();
                }
            });
    
      
    };


    return (
        <div id={styles.loginBody}>
            <div className={styles.greenLayer1}>
                <div id={styles.loginFormDiv}>
                    <p>Welcome back! Please login to your account</p>
                    <form onSubmit={handleSubmit} className="col-6" name="loginForm" id="loginForm">
                        <div className='form-floating mt-3 col-12 mx-2'>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="form-control"
                            />
                            <label htmlFor="email" >Email</label>
                        </div>

                        <div className='form-floating mt-4 col-12 mx-2'>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="form-control"
                                required
                                placeholder="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='d-flex flex-column flex-md-row  mx-2 mt-5 justify-content-between'>
                            <button className='col-12 col-md-6' id={styles.loginBtn} type="submit">Login</button>
                            <button className={["col-12 col-md-6 mt-3 mt-md-0", styles.signUpBtn].join(" ")} onClick={signUpClicked} >Sign Up</button>


                            
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-wrap" style={{ marginTop: '20px' }}>
               {/* Ajouter les boutons Facebook et Google ici         <FacebookLogin 
    appId="1551519705420633"
    autoLoad={false}
    fields="name,email,id"
    onSuccess={(response) => console.log(response)}
    onProfileSuccess={responseFacebook}
    onFailure={(error) => console.log("Login loooooooool Failed"+error)}
    icon="fa-facebook"
    textButton="Login with Facebook"
   
    className="btn btn-primary m-2"
    style={styles.signUpBtnfb}
  />*/} 
      <GoogleLogin 
        buttonText="Login with Google"
        onSuccess={loginData}
        onFailure={(error) => console.log(error)}
        
       // Ajouter cette ligne pour définir la largeur minimale des boutons
      />
    </div>
                       
                    </form>
                </div>
            </div>
            <ErrorDialogueBox
                open={errorDialogueBoxOpen}
                handleToClose={handleDialogueClose}
                ErrorTitle="Login Error"
                ErrorList={errorList}
            />
        </div>
    );
}

export default Login;
