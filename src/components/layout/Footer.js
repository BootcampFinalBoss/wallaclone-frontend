import React from 'react';
import Card from 'react-bootstrap/Card';
class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <Card className="text-center">
          <Card.Footer className="text-muted">
            Wallaclone @ {new Date().getFullYear()}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
export default Footer;
