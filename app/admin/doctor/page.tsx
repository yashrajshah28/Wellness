import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Doctors } from "@/constants/index";
import { Button } from "@/components/ui/button";

const doctorList = () => {
  return (
    <div className="mx-auto max-w-7xl p-6 space-y-14">
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
      <div>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href="/admin/doctor/addDoctor">
            Add New Doctor
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Doctors.map((doctor) => (
          <div
            key={doctor.name}
            className="doctor-card group relative border rounded-lg p-6 bg-gray shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out"
          >
            <Image
              src={doctor.image}
              width={80}
              height={80}
              alt={doctor.name}
              className="rounded-full border-4 border-blue-500"
            />
            <p className="mt-4 text-xl font-semibold text-center text-white-800">
              {doctor.name}
            </p>
            <p className="text-sm text-center text-white-600">Specialization</p>
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <p className="text-blue-700 text-base font-semibold">
                View Profile
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default doctorList;
