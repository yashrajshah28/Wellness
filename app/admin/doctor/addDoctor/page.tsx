import DoctorForm from "@/components/forms/DoctorForm";
import Link from "next/link";
import Image from "next/image";

const addDoctor = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="Logo"
            className="h-8 w-fit"
          />
        </Link>
        <Link href="/admin/doctor">
          <p className="text-16-semibold">Doctors List</p>
        </Link>
        
        <Link href="/admin" className="cursor-pointer">
          <p className="text-16-semibold">Admin Dashboard</p>
        </Link>
      </header>
        <DoctorForm/>
    </div>
  );
};

export default addDoctor;
