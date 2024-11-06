"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoctor } from "@/lib/actions/doctor.actions"; // Action to add doctor to database
import { FormFieldType } from "./PatientForm"; // Reusing enum for form field types

// Define the validation schema for the doctor form
const DoctorFormValidation = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  specialization: z.string().nonempty("Specialization is required"),
});

const DoctorForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Set up form with validation
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialization: "",
    },
  });

  // Submit handler to add doctor to the database
  async function onSubmit({
    name,
    email,
    phone,
    specialization,
  }: z.infer<typeof DoctorFormValidation>) {
    setIsLoading(true);
    try {
      const doctorData = { name, email, phone, specialization };
      const doctor = await addDoctor(doctorData);

      if (doctor) router.push("/admin/doctor"); // Redirect to doctors list page
    } catch (error) {
      console.log("Error adding doctor:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Add a New Doctor 👨‍⚕️</h1>
          <p className="text-dark-700">Fill in the details to add a new doctor to the system.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Doctor's Full Name"
          placeholder="Doctor's name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="doctor@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(123) 456-7890"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="specialization"
          label="Specialization"
          placeholder="Cardiology"
          iconSrc="/assets/icons/user.svg"
          iconAlt="specialization"
        />

        <SubmitButton isLoading={isLoading}>Add Doctor</SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorForm;
