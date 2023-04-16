import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/homePage/header";
import MaidSignup from "./components/authentication/maidAuth/maidSignup";
import CustomerSignup from "./components/authentication/customerAuth/customerSignup";
import CustomerLogin from "./components/authentication/customerAuth/customerLogin";
import MaidLogin from "./components/authentication/maidAuth/maidLogin";
import MaidForgotPassword from "./components/authentication/maidAuth/maidForgotPassword";
import CustomerForgotPassword from "./components/authentication/customerAuth/customerForgotPassword";
import MaidResetPassword from "./components/authentication/maidAuth/maidResetPassword";
import CustomerResetPassword from "./components/authentication/customerAuth/customerResetPassword";
import CustomerProfile from "./components/customer/myProfile";
import EditCustomerProfile from "./components/customer/editProfile";
import CustomerReviews from "./components/customer/myReviews";
import CustomerBookings from "./components/customer/myBookings";
import MaidProfile from "./components/maid/myProfile";
import EditMaidProfile from "./components/maid/editProfile";
import MaidBookings from "./components/maid/myWorks";
import MaidReviews from "./components/maid/myReviews";
import Home from "./pages/homepage";
import FindMaids from "./pages/findMaidsPage";
import MaidDetail from "./pages/maidDetail";
import Checkout from "./pages/checkoutPage";
import Footer from "./components/homePage/footer";

function App() {
  const [customer, setcustomer] = React.useState({});
  const [maid, setmaid] = React.useState({});

  return (
    <>
      <div className="App">
        <Navbar
          maid={maid}
          customer={customer}
          setcustomer={setcustomer}
          setmaid={setmaid}
        ></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          {
            //authentication routes
          }
          <Route
            path="/maidSignup"
            element={<MaidSignup setmaid={setmaid} />}
          />
          <Route
            path="/customerSignup"
            element={<CustomerSignup setcustomer={setcustomer} />}
          />
          <Route
            path="/customerLogin"
            element={<CustomerLogin setcustomer={setcustomer} />}
          />
          <Route path="/maidLogin" element={<MaidLogin setmaid={setmaid} />} />
          <Route path="/maid/forgotPassword" element={<MaidForgotPassword />} />
          <Route
            path="/customer/forgotPassword"
            element={<CustomerForgotPassword />}
          />
          <Route
            path="/maid/resetPassword/:token"
            element={<MaidResetPassword setmaid={setmaid} />}
          />
          <Route
            path="/customer/resetPassword/:token"
            element={<CustomerResetPassword setcustomer={setcustomer} />}
          />
          {
            //Customer Data Routes
          }
          <Route
            path="/customer/profile"
            element={<CustomerProfile customer={customer} />}
          />
          <Route
            path="/customer/updateProfile"
            element={
              <EditCustomerProfile
                customer={customer}
                setcustomer={setcustomer}
              />
            }
          />
          <Route
            path="/customer/bookings"
            element={<CustomerBookings customer={customer} />}
          />
          <Route
            path="/customer/reviews"
            element={<CustomerReviews customer={customer} />}
          />
          {
            //Maid Data Routes
          }
          <Route path="/maid/profile" element={<MaidProfile maid={maid} />} />
          <Route
            path="/maid/updateProfile"
            element={<EditMaidProfile maid={maid} setmaid={setmaid} />}
          />
          <Route path="/maid/bookings" element={<MaidBookings maid={maid} />} />
          <Route path="/maid/reviews" element={<MaidReviews maid={maid} />} />
          {
            //Customer Booking routes
          }
          <Route
            path="/findMaids"
            element={
              <FindMaids customer={customer} setcustomer={setcustomer} />
            }
          />
          <Route
            path="/maidDetails/:maidId"
            element={<MaidDetail customer={customer} />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
