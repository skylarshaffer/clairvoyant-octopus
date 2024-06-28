import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="">
      <div className="">
        <h3>Uh oh, we could not find the page you were looking for!</h3>
        <Link to="/" className="">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
