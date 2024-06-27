import React, { useEffect, useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { getMarkets, requestAccess, signUp } from "../../serviceApis/loginapi";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:""
  });
  const [error, setError] = useState("");
  const [marketsData,setMarketsData]=useState([])
  const [marketId,setMarketId]=useState(null)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRequestAccess = async (data) => {
  
    try {
      const userData = await requestAccess(data);
      toast.success('Created account succesfully');
      navigate("/login");
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  const handleSignUp = async () => {
    const { userName, email, password, confirmPassword,role } = formData;
    console.log("form->",formData)
    if (!userName || !email || !password || !confirmPassword || !role || (role==='MarketVendor'&&!marketId)) {
      setError("Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userData = await signUp({ userName, email, password, confirmPassword,role });
      if(role === 'MarketVendor'){
          handleRequestAccess({userId:userData?.userId,marketId:marketId})
      }else{
        toast.success('Created account succesfully');
        navigate("/login");
      }
   
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };



  const handleMarkets = async () => {
    try {
      const userData = await getMarkets();
      setMarketsData(userData?.rows);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleMarkets();
  }, []);

  return (
    <div className="auth-container">
      <div className="log-form">
        <h2>Create an account</h2>
        <form>
          <input
            type="text"
            name="userName"
            title="UserName"
            placeholder="UserName"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            title="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

           <Form.Select name='role'    onChange={handleChange} value={formData?.role ||''} className="mb-3" aria-label="Default select example">
            <option>Select Role </option>
            <option value="MarketVendor">MarketVendor</option>
            <option value="MarketAdmin">MarketAdmin</option>
          </Form.Select>

       {formData?.role==='MarketVendor'&&  
         <Form.Select name='marketId' onChange={(e)=>{
          console.log("first",e?.target)
          setMarketId(e.target.value)}}    value={marketId ||''} className="mb-3" aria-label="Default select example">
            <option>Select Market</option>
            {marketsData?.length&& marketsData?.map(item=> <option key={item?.id} value={item?.id}>{item?.marketName}</option>)}
          </Form.Select>
          }
          <input
            type="password"
            name="password"
            title="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            title="Confirm Password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-danger">{error}</p>}
          <button type="button" className="button-wrapper" onClick={handleSignUp}>
            Sign Up
          </button>
          <Link to="/login" className="forgot">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
