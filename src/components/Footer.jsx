const Footer = () => {
  const year = new Date();

  return (
    <footer className='footer'>
      <p>
        &copy; {year.getFullYear()}. All rights reserved. Design by Emmanuel
        Adebayo&trade;
      </p>
    </footer>
  );
};

export default Footer;
