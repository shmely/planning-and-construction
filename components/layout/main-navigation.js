import Link from 'next/link';


import classes from './main-navigation.module.css';

function MainNavigation() {
  function logoutHandler() {

  }

  return (
    <header className={classes.header}>
      <Link href='/' className={classes.logo}>
        <div>ניהול פרויקטים</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/projects/'>רשימת פרויקטים</Link>
          </li>
          <li>
            <Link href='/projects/new/'>פרויקט חדש</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;