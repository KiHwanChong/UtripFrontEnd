import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/icon/logo-header.svg';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown';

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropdown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center p-16 px-120 bg-gray-10">
      <Link href="/" className="">
        <Image src={logo} alt="홈으로 가기" width={78} height={39} />
      </Link>
      <nav className="flex items-center gap-16 mobile:gap-20 mobile:text-14">
        <Link href="/signin" className="px-20 py-5 bg-gray-70 text-white rounded-s">
          로그인
        </Link>
        <div className="flex items-center gap-10 relative">
          <div onClick={handleDropdown} className="cursor-pointer">
            {!dropDown ? (
              <ChevronDownIcon className="w-20 h-20 text-gray-78" />
            ) : (
              <ChevronUpIcon className="w-20 h-20 text-gray-78" />
            )}

            {dropDown && <Dropdown setDropDown={setDropDown} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
