import { IconType } from "react-icons";
import { FaDollarSign, FaMoneyBillWave, FaMoneyCheckAlt, FaRegUser, FaUserAlt, FaShoppingBag, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAssignmentInd, MdSupervisorAccount, MdSwapHoriz } from "react-icons/md";
import Accountmanagement from "../../SidebarStaff/Accountmanagement";

export const menu = [
  {
    title: "Profile",
    href: '/profile'
  },
];
export interface IRole {
  name: string,
  icon: any,
  route: string,
  component: any,
}

export const roleStaff: IRole[] = [
  {
    name: "Quản lý khách hàng",
    icon: <FaRegUser />,
    route: "/bank/staff/customer-management",
    component: <Accountmanagement />
  },
  {
    name: "Quản lý tài khoản",
    icon: <MdSupervisorAccount />,
    route: "/bank/staff/account-management",
    component: <Accountmanagement />
  },
  {
    name: "Xem bảng Lương",
    icon: <FaRegUser />,
    route: "/bank/staff/salary",
    component: <Accountmanagement />
  },
]

export const roleCustomer: IRole[] = [
  {
    name: "Quản lý tài khoản",
    icon: <MdSupervisorAccount />,
    route: "/bank/customer/account",
    component: <Accountmanagement />
  },
  {
    name: "Chuyển tiền",
    route: "/bank/customer/pay",
    icon: <FaMoneyBillWave />,
    component: <Accountmanagement />
  },
  {
    name: "Lịch sử giao dịch",
    route: "/bank/customer/history",
    icon: <MdSwapHoriz />,
    component: <Accountmanagement />
  },
  {
    name: "Cập nhật thông tin",
    route: "/bank/customer/update",
    icon: <MdAssignmentInd />,
    component: <Accountmanagement />
  },
]

export const roleAdmin: IRole[] = [
  {
    name: "Quản lý Nhân viên",
    icon: <FaUserAlt />,
    route: "/bank/admin",
    component: <Accountmanagement />
  },
  {
    name: "Quản lý Khách hàng",
    icon: <FaShoppingBag />,
    route: "/bank/admin/customer",
    component: <Accountmanagement />
  },
  {
    name: "Quản lý Giao Dịch",
    icon: <FaRegMoneyBillAlt />,
    route: "/bank/admin/transaction",
    component: <Accountmanagement />
  },
  {
    name: "Quản lý Gói tiết kiệm",
    icon: <FaDollarSign />,
    route: "/bank/admin/package",
    component: <Accountmanagement />
  },
]