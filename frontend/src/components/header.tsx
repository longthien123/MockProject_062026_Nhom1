import HamburgerButton from "./ui/hamburger-button";
import Logo from "./ui/logo";

export default function Header() {
  return (
    <div
      className=" sm:h-[60px] md:h-[70px] lg:h-[70px] xl:h-[80px] 2xl:h-[80px] flex justify-between border-1 border-solid border-b-gray-300 items-center
    sm:px-4 md:px-6 lg:px-6 xl:px-8 2xl:px-8"
    >
      <div className="flex items-center gap-3.5">
        <HamburgerButton></HamburgerButton>
        <Logo></Logo>
      </div>
      <div></div>
    </div>
  );
}
