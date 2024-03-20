import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import footerLogo from '../asset/hackernews-footer.svg';

function Footer() {
    return (
        <AppBar position="sticky" sx={{ top: 'auto', bottom: 0, backgroundColor: '#FBC91B', boxShadow: '0px -3px 28px 0px #00000014', height: '99px' }}>
            <Toolbar sx={{ justifyContent: 'center', height: '99px' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <img src={footerLogo} alt="Vector" style={{ width: '166px', height: '19px' }} data-testid="footer-logo" />
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
