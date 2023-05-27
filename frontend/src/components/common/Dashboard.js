import BuyerOrders from "../buyers/BuyerOrders"
import VendorOrders from "../vendors/VendorOrders"
import Grid from "@mui/material/Grid";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const usertype = JSON.parse(localStorage.getItem('User')).usertype;
    const handleMenuPage = () => {
        if(usertype == "vendor")
            navigate("./vendormenu");
        else
            navigate("./buyermenu");
    }
    const handleOrder = () => {
        if(usertype == "vendor")
            navigate("./vendororders");
        else
            navigate("./buyerorders");
    }
    

    const images = [
        {
            url: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/15/09/breakfast-istock.jpg',
            title: 'Food Menu',
            width: '50%',
        },
        {
            url: 'https://englishtribuneimages.blob.core.windows.net/gallary-content/2020/3/Desk/2020_3$largeimg_1568488820.jpeg',
            title: 'Orders',
            width: '50%',
        },
    ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 870,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    return (
        <div>
            <Grid container justifyContent="center" align={"center"} spacing={1}>
                <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                            {images.map((image, i) => (
                                <ImageButton
                                    focusRipple
                                    key={image.title}
                                    style={{
                                        width: image.width,
                                        height: image.height
                                    }}
                                    onClick={i == 0 ? handleMenuPage : handleOrder}
                                >
                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                    <Image>
                                        <Typography
                                            component="span"
                                            variant="button"
                                            color="inherit"
                                            sx={{
                                                position: 'relative',
                                                fontSize: 'Large',
                                                p: 5,
                                                pt: 2,
                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                            }}
                                        >
                                            {image.title}
                                            <ImageMarked className="MuiImageMarked-root" />
                                        </Typography>
                                    </Image>
                                </ImageButton>
                            ))}
                        </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
