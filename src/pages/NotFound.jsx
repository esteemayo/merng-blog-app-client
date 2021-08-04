import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='main'>
      <div className='error'>
        <div className='error__title'></div>
        <h2 className='heading-secondary heading-secondary--error'>
          Sorry! We can't seem to find the page you were looking for. Please
          head back to
          <span>
            <Link to='/'> our homepage</Link>
          </span>
        </h2>
        <h2 className='error__emoji'>😢 🤯 😰</h2>
        <h2 className='not-found'>Page not found</h2>
      </div>
    </main>
  );
};

export default NotFound;
