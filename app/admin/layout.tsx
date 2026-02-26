import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Menu from "@/components/shared/header/menu";
import { MainNav } from "./main-nav";
import AdminSearch from '@/components/shared/admin/admin-search';
export default async function AdminLayout({
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
            <div className="ml-auto flex items-center ">
              {/* <MainNav className="mx-6" /> */}
              {/* <div className="ml-8">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[60px] sm:w-[100px] md:w-[100px] lg:w-[240px]"
                />
              </div> */}
              <AdminSearch />
              <MainNav className="mx-6" />
              <Menu />
            </div>
          </div>
        </header>
        <div className="wrapper flex-1 space-y-4 p-8 pt-6 ">{children}</div>
      </div>
    </>
  );
}
