import { Outlet, Link } from 'react-router-dom';

export function Header() {
  return (
    <section>
      <header>
        <nav className="container">
          <ul className="">
            <li className="logo">
              <Link to="/" className="">
                <h2>graph-test</h2>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </section>
  );
}
