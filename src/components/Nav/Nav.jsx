import './Nav.css';

function Nav({ config }) {
  const { cinema, navigation } = config;

  return (
    <nav className="nav">
      <div className="nav-container">
        <a href="#" className="nav-logo">{cinema.name.toUpperCase()}</a>
        <ul className="nav-links">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="nav-link">{item.label}</a>
            </li>
          ))}
          {/*<li>*/}
          {/*  <a href="#tickets" className="nav-cta">Buy Tickets</a>*/}
          {/*</li>*/}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
