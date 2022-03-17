import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const NavLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon
  },
  {
    name: "Grupos",
    path: "/dashboard/grupos",
    icon: GroupIcon
  },
  {
    name: "Empresas",
    path: "/dashboard/empresas",
    icon: CorporateFareIcon
  },
  {
    name: "Premiados",
    path: "/dashboard/premiados",
    icon: PersonIcon
  },
]

export default NavLinks;
