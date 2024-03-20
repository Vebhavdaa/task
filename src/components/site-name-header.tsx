import { AppBar, Toolbar, Typography } from '@mui/material';
import headerlogo from '../asset/hackernews-header.svg';

function SiteNameHeader() {
  return (
    <AppBar position="sticky" data-testid="site-name-header" style={{ backgroundColor: '#ffffff', boxShadow: '0px 3px 28px 0px #00000014' }}>
      <Toolbar>
        <Typography variant="h6" component="div" className="site-name">
          <img src={headerlogo} alt="headerlogo" className="header-logo" />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default SiteNameHeader;
