'use client'
import Link from "next/link";
import { FaClipboardList, FaHardHat, FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="p-4 pr-0 mt-5 mr-0 flex flex-col gap-2">
      <Link href={'/'} className={pathname==='/' ? "activeNavItem" : "inactiveNavItem"}>
        <FaHome />
        Home
      </Link>
      <Link href={'/Projects'} className={pathname.includes('Projects') ? "activeNavItem" : "inactiveNavItem"}>
        <FaHardHat />
        Projects
      </Link>
      <Link href={'/Orders'} className={pathname.includes('Orders') ? "activeNavItem" : "inactiveNavItem"}>
        <AiOutlineUnorderedList />
        Orders
      </Link>
      <Link href={'/Suppliers'} className={pathname.includes('Suppliers') ? "activeNavItem" : "inactiveNavItem"}>
        <FaShoppingCart />
        Suppliers
      </Link>
      <Link href={'/Entities'} className={pathname.includes('Entities') ? "activeNavItem" : "inactiveNavItem"}>
        <FaUsers />
        Entities
      </Link>
      <Link href={'/PurchaseReq'} className={pathname.includes('PurchaseReq') ? "activeNavItem" : "inactiveNavItem"}>
        <FaClipboardList />
        PR
      </Link>
    </div>
  );
};

export default Navbar;
