import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        <header className="w-full border-b">
          <div className="wrapper flex-between">
            <div className="flex-start">
              <Link href="/" className="flex-start">
                <Image
                  src="/images/logo.svg"
                  alt={`${APP_NAME} logo`}
                  height={48}
                  width={48}
                  priority={true}
                />
                <span className="hidden lg:block font-bold text-2xl ml-3">
                  {APP_NAME}
                </span>
              </Link>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <MainNav className="mx-6" />
              <Menu />
            </div>
          </div>
        </header>
        {/* <div className="wrapper border-b ">
          
          <div className="flex h-16 items-center ">
            <Link href="/" className="w-22">
              <Image
                src="/images/logo.svg"
                width={48}
                height={48}
                alt={`${APP_NAME} logo`}
              />
            </Link>
            
            <div className="ml-auto flex items-center space-x-4">
              <Menu />
            </div>
          </div>
        </div> */}
        <div className="wrapper flex-1 space-y-4 p-8 pt-6 ">{children}</div>
      </div>
    </>
  );
}
