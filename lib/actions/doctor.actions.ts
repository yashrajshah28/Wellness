'use server';

import { ID, Query } from "node-appwrite";
import { DATABASE_ID, DOCTOR_COLLECTION_ID, BUCKET_ID, ENDPOINT, PROJECT_ID, databases, storage } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// Function to add a new doctor
export const addDoctor = async ({ profilePicture, ...doctor }: AddDoctorParams) => {
    try {
        let file;

        // If there's a profile picture, upload it to storage
        if (profilePicture) {
            const inputFile = InputFile.fromBuffer(
                profilePicture.get('blobFile') as Blob,
                profilePicture.get('fileName') as string,
            );
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        // Create a new document in the doctors collection
        const newDoctor = await databases.createDocument(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!, // Collection ID for doctors
            ID.unique(),
            {
                profilePictureId: file?.$id || null,
                profilePictureUrl: file 
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`
                    : null,
                ...doctor
            }
        );

        console.log({ newDoctor });
        return parseStringify(newDoctor);
    } catch (error) {
        console.log("Error adding doctor:", error);
    }
};

// Function to retrieve a doctor's data by their ID
export const getDoctor = async (doctorId: string) => {
    try {
        const doctor = await databases.getDocument(DATABASE_ID!, DOCTOR_COLLECTION_ID!, doctorId);
        return parseStringify(doctor);
    } catch (error) {
        console.log("Error fetching doctor:", error);
    }
};

// Function to list doctors based on specific criteria or all doctors
export const listDoctors = async (criteria: Record<string, string | string[]> = {}) => {
    try {
        // Filter out undefined or empty criteria values
        const queries = Object.keys(criteria)
            .filter(key => criteria[key] !== undefined && criteria[key] !== null)
            .map(key => Query.equal(key, Array.isArray(criteria[key]) ? criteria[key] : [criteria[key]]));

        const doctors = await databases.listDocuments(DATABASE_ID!, DOCTOR_COLLECTION_ID!, queries);
        return parseStringify(doctors.documents);
    } catch (error) {
        console.log("Error listing doctors:", error);
    }
};
