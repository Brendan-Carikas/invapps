import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/app/dashboards/dashboard1",
  },
  {
    title: "Plans",
    icon: AccountBalanceWalletOutlinedIcon,
    href: "/app/billing",
  },
  {
    title: "My Billing",
    icon: AccountBalanceIcon,
    href: "/app/my-billing",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    href: "/app/settings",
  },
];

export default Menuitems;
