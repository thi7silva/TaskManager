import { NavLink } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, to }) => {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        selected: 'bg-brand-primary/15 text-brand-primary',
        unselected: 'text-brand-dark-blue',
      },
    },
  });

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? 'selected' : 'unselected' })
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;
