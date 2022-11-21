import { useState } from "react";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { auth } from '../firebase';

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');


  const signin = () => {
  
    if (mynumber === "" || mynumber.length < 10) return;
    let verify = new auth.RecaptchaVerifier('recaptcha-container');
    auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
        setfinal(result);
        alert("code sent")
        setshow(true);
    })
        .catch((err) => {
            alert(err);
            window.location.reload()
        });
}

// Validate OTP
const ValidateOtp = () => {
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
        // success
    }).catch((err) => {
        alert("Wrong code");
    })
}
  return (
    <CoverLayout
      image={curved9}
    >

      <SoftBox component="form" role="form" >
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
            Phone Number
            </SoftTypography>
          </SoftBox>
         <SoftBox >
         <SoftInput
         required
         value={mynumber} onChange={(e) => { 
          setnumber(e.target.value) }}
         placeholder="9975357855"
         />
         </SoftBox>
         <SoftBox mt={4}>
         <div id="recaptcha-container"></div>
         </SoftBox>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
        <SoftTypography id="recaptcha-container">
        <SoftButton
        
        onClick={signin}
         fullWidth style={{backgroundColor:"#0B2F8A",color:"white",boxShadow:"0px 8px 24px -2px rgba(11, 47, 138, 0.6)",borderRadius:"16px"}}>
          Request OTP
          </SoftButton>
        </SoftTypography>
          
        </SoftBox>
        <div style={{ display: show ? "block" : "none" }}>
        <input type="text" placeholder={"Enter your OTP"}
            onChange={(e) => { setotp(e.target.value) }}></input>
        <br /><br />
        <button onClick={ValidateOtp}>Verify</button>
    </div>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              style={{color:'#0B2F8A'}}
              fontWeight="medium"
            >
              Register
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
