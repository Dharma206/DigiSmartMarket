import React, { useEffect, useState } from "react";
import {
  getMarketVendor,
  getProfile,
  putEditProfile,
  putRestPassword,
} from "../../serviceApis/loginapi";
import { useAuth } from "../../context/AuthProvider";
import {  Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import {  FaEnvelope, FaRegArrowAltCircleRight, FaRegUserCircle, FaThLarge, FaStore, FaHardHat } from "react-icons/fa"; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.scss";
import FarmNotesLogo from "../../assets/logoDigi.png"; // Adjust the path as needed
import ItemList from "../../components/markets/MarketListing";
// Adjust the path as needed
import EditProfileModal from "../../components/edit-profile.modal";
import ResetPasswordModal from "../../components/reset-password";
import AddItemModal from "../../components/add-market-modal/add-market-modal";
import VendorRequestModal from "../../components/vendor/VendorRequestModal";
import { toast } from "react-toastify";
import MarketAdminRoute from "../../routes/MarketAdminRoute";
import VendorRouter from "../../routes/VendorRoute";
import MarketLabourerDash from "../MarketLabourerDash";
import AdminDashboard from "../AdminDashboard";
import AdminRoute from "../../routes/AdminRoute";
import AdminLabourer from "../AdminLabourer";

const Dashboard = () => {
  const { logout } = useAuth();
  const user = localStorage.getItem("user");
  const userProfile = user ? JSON.parse(user) : null;

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [vendorRequestModal,setVendorModal]=useState(false)

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);
  const handleSecurityModalClose = () => setShowSecurityModal(false);
  const handleSecurityModalShow = () => setShowSecurityModal(true);

  const handleProfile = async () => {
    try {
      const userData = await getProfile();
      setProfile(userData);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const handleRequestModal=()=>{setVendorModal(true)}



  const handleSaveProfile = async (profileData) => {
    try {
      const response = await putEditProfile({
        userName: profileData.userName, // Corrected typo here
        phoneNumber: profileData.phoneNumber,
        dateOfBirth: profileData.dateOfBirth,
        address: profileData.address,
        country: profileData.country,
        pinCode: profileData.pinCode,
      });
      console.log(response);

      await handleProfile(); 
      toast.success('Saved successfully ')
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleRestPassword = async (profileData) => {
    try {
      const response = await putRestPassword({
        email: profile?.email,
        password: profileData?.password,
        confirmPassword: profileData?.confirmPassword,
      });
      console.log(response);
      handleOffcanvasClose();
      await handleProfile();
      setShowSecurityModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="dashboard">
      <Navbar bg="light" fluid  collapseOnSelect expand="lg" >
        <Container >
          <Navbar.Brand href="#">
            <img src={FarmNotesLogo} alt="FarmNotes Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <div className="sidebar">
            <ul>
              <li>
                <NavLink
                  to="/dashboard/items"
                  className="sidebar-link"
                >
                  <FaThLarge className="sidebar-icon" /> Dashboard
                </NavLink>
              </li>
          {userProfile?.role==='MarketAdmin'&& <>  <li>
                <NavLink
                 onClick={handleModalShow}

                  className="sidebar-link"
                >
                  <FaStore  className="sidebar-icon" /> Markets
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="sidebar-link"
                  onClick={handleRequestModal}
                >
                  <FaEnvelope className="sidebar-icon" /> Requests
                </NavLink>
              </li></> }

              {userProfile?.role==='Admin'&&<>
                <li>
                <Link

                to='labourer'
                  className="sidebar-link"
                >
                  <FaHardHat  className="sidebar-icon" /> Labourer's
                </Link>
              </li>
              </>}

            </ul>
          </div>
        </Nav>
        <Nav>
          <div className="sidebar">
        <ul >
              <li>
                <NavLink

                  onClick={handleProfileModalShow}
                >
                  <FaRegUserCircle className="sidebar-icon" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={logout}
                >
                  <FaRegArrowAltCircleRight className="sidebar-icon" /> Logout
                </NavLink>
              </li>
              </ul>
              </div>
        </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  { showModal&&   <AddItemModal
        show={showModal}
        handleClose={handleModalClose}
        userProfile={userProfile}
      />}

      {vendorRequestModal&&<VendorRequestModal show={vendorRequestModal} handleClose={()=>{setVendorModal(false)}}/>}
   {showProfileModal&&   <EditProfileModal
        show={showProfileModal}
        handleClose={handleProfileModalClose}
        profile={profile}
        handleSave={handleSaveProfile}
      />}
      <ResetPasswordModal
        show={showSecurityModal}
        handleClose={handleSecurityModalClose}
        profile={profile}
        handleSave={handleRestPassword}
      />
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route index element={<Navigate to="items" />} />
          {userProfile?.role==='MarketAdmin'&&  <Route path='items' element={<MarketAdminRoute><ItemList showModal={showModal} vendorRequestModal={vendorRequestModal}/></MarketAdminRoute>} />}
           {userProfile?.role==='MarketVendor'&& <Route path='items'  element={<VendorRouter><MarketLabourerDash/></VendorRouter>}/>}
           {userProfile?.role==='Admin'&&<>
           <Route path='items'  element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
            </>}
            <Route path='labourer'  element={<AdminRoute><AdminLabourer/></AdminRoute>}/>

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
