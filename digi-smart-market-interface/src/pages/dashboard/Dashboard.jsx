import React, { useEffect, useState } from "react";
import {
  getProfile,
  putEditProfile,
} from "../../serviceApis/loginapi";
import { useAuth } from "../../context/AuthProvider";
import {  Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import {  FaEnvelope, FaRegArrowAltCircleRight, FaRegUserCircle, FaThLarge, FaStore, FaHardHat, FaUserTie, FaUsers, FaLeaf } from "react-icons/fa"; // Import icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.scss";
import FarmNotesLogo from "../../assets/logoDigi.png"; // Adjust the path as needed
import ItemList from "../../components/markets/MarketListing";
// Adjust the path as needed
import EditProfileModal from "../../components/edit-profile.modal";
import AddItemModal from "../../components/add-market-modal/add-market-modal";
import VendorRequestModal from "../../components/vendor/VendorRequestModal";
import { toast } from "react-toastify";
import MarketAdminRoute from "../../routes/MarketAdminRoute";
import VendorRouter from "../../routes/VendorRoute";
import MarketLabourerDash from "../MarketLabourerDash";
import AdminDashboard from "../AdminDashboard";
import AdminRoute from "../../routes/AdminRoute";
import AdminLabourer from "../AdminLabourer";
import MarketVendorProduces from "../../components/vendor/MarketVendorProduces";
import AdminVendors from "../../components/admin/AdminVendors";
import AdminYards from "../../components/admin/AdminYards";
import LabourerList from "../../components/admin/LabourerList";
import ProducesList from "../../components/admin/producesList";


const Dashboard = () => {
  const { logout } = useAuth();
  const user = localStorage.getItem("user");
  const userProfile = user ? JSON.parse(user) : null;

  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [vendorRequestModal,setVendorModal]=useState(false)



  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);


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
        userName: profileData.userName,
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
            
          {userProfile?.role==='MarketAdmin'&& <> 
            <li>
                <NavLink
                  to="/dashboard/all"
                  className="sidebar-link"
                >
                  <FaThLarge className="sidebar-icon" /> Dashboard
                </NavLink>
              </li>
          
           <li>
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

                to='all'
                  className="sidebar-link"
                >
                  <FaUserTie  className="sidebar-icon" /> Market Admins
                </Link>
              </li>
              <li>
                <Link

                to='market-vendors'
                  className="sidebar-link"
                >
                  <FaUsers  className="sidebar-icon" /> Market Vendors
                </Link>
              </li>
              <li>
                <Link

                to='market-yards'
                  className="sidebar-link"
                >
                  <FaStore  className="sidebar-icon" /> Market Yards
                </Link>
              </li>
              <li>
                
                <Link

                to='produces-list'
                  className="sidebar-link"
                >
                  <FaLeaf  className="sidebar-icon" /> Produces
                </Link>
              </li>
                <li>
                <Link

                to='labourers-list'
                  className="sidebar-link"
                >
                  <FaHardHat  className="sidebar-icon" /> Labourer's
                </Link>
              </li>
              </>}
              {userProfile?.role==='MarketVendor'&&<>
                <li>
                <NavLink
                  to="/dashboard/all"
                  className="sidebar-link"
                >
                  <FaLeaf className="sidebar-icon" /> Produces
                </NavLink>
              </li>
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
      <div className="main-content">
        <div className="content">
          <Routes>
            <Route index path='**' element={<Navigate to="all" />} />
          {userProfile?.role==='MarketAdmin'&&  <Route path='all' element={<MarketAdminRoute><ItemList showModal={showModal} vendorRequestModal={vendorRequestModal}/></MarketAdminRoute>} />}
           {userProfile?.role==='MarketVendor'&&<><Route path='all'  element={<VendorRouter><MarketVendorProduces/></VendorRouter>}/> <Route path='labourer'  element={<VendorRouter><MarketLabourerDash/></VendorRouter>}/></>}
           {userProfile?.role==='Admin'&&<>
           <Route path='all'  element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
           <Route path='market-vendors'  element={<AdminRoute><AdminVendors/></AdminRoute>}/>
           <Route path='market-yards'  element={<AdminRoute><AdminYards/></AdminRoute>}/>
           <Route path='produces-list'  element={<AdminRoute><ProducesList/></AdminRoute>}/>
           <Route path='labourers-list'  element={<AdminRoute><LabourerList/></AdminRoute>}/>
            </>}
            <Route path='labourer'  element={<AdminRoute><AdminLabourer/></AdminRoute>}/>
            <Route path="*" element={<Navigate to="all" replace />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
