// components/Icons.tsx
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from "react-icons/fi";
import { RiLockPasswordLine, RiInfoCardLine } from "react-icons/ri";
import { FaUserEdit, FaRegEdit  } from "react-icons/fa";
import { MdDelete, MdPersonSearch, MdOutlineCleaningServices } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";

export const ArrowDown = () => <IoIosArrowDown />;
export const Search = () => <FiSearch/>;
export const PersonSearch = () => <MdPersonSearch />;
export const PackageSearch = () => <LuPackageSearch />;
export const LockPassword = () => <RiLockPasswordLine/>;
export const InfoCard = () => <RiInfoCardLine />;
export const UserEdit = () => <FaUserEdit />;
export const RegEdit = () => <FaRegEdit />;
export const Delete = () => <MdDelete />;
export const Clean = () => <MdOutlineCleaningServices />;
