import BuyerProfile from "../buyers/BuyerProfile"
import VendorProfile from "../vendors/VendorProfile"
import Grid from "@mui/material/Grid";

const Profile = (props) => {
  const usertype = JSON.parse(localStorage.getItem('User')).usertype;

  return(
  <div>
    <Grid container justifyContent="center" align={"center"} spacing={1}>
    <Grid item xs={12}>
      {usertype == "buyer" && (
        <BuyerProfile />
        )}
    </Grid>
    <Grid item xs={12}>
    {usertype == "vendor" && (
      <VendorProfile />
      )}
    </Grid>
    </Grid>
  </div>
  );
};

export default Profile;
