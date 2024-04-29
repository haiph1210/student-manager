import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Link} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './footer.scss';
import Divider from "@mui/material/Divider";

export default function Footer(props) {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
            <div className={'d-flex justify-content-center flex-column align-items-center '}>
                <div className="footer-container">
                    <BottomNavigation value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="Facebook"
                            value="facebook"
                            icon={<FacebookIcon/>}
                            component={Link}
                            to={props.facebook}
                        />
                        <BottomNavigationAction
                            label="Instagram"
                            value="Instagram"
                            icon={<InstagramIcon/>}
                            component={Link}
                            to={props.instagram}
                        />
                        <BottomNavigationAction
                            label="Twitter"
                            value="Twitter"
                            icon={<TwitterIcon/>}
                            component={Link}
                            to={props.twitter}
                        />
                        <BottomNavigationAction
                            label="YouTube"
                            value="YouTube"
                            icon={<YouTubeIcon/>}
                            component={Link}
                            to={props.youtube}
                        />
                    </BottomNavigation>

                </div>
                <Divider/>
                <div className="custom-text-footer">
                    <p className="m-lg-3">Copyright © 2024.</p>
                    <p className="m-lg-3">Portfolio Created By {props.name}</p>
                </div>
            </div>
        </>
    );
}
