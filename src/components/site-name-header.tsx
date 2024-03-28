import { AppBar, Toolbar, Typography } from '@mui/material';
import headerlogo from '../asset/hackernews-header.svg';

function SiteNameHeader() {
  return (
    <AppBar data-testid="site-appbar" position="sticky" style={{ backgroundColor: '#ffffff', boxShadow: '0px 3px 28px 0px #00000014' }}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'center' }}>
          <img src={headerlogo} alt="headerlogo" style={{width: '166px', height: '19px'}} data-testid="site-logo" />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default SiteNameHeader;
