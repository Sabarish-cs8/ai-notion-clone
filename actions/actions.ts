"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument(){
    auth().protect();
    


    //Here "sessionClaim"<=in our clerk website their is one session option we set some credentials so we get that 

    const {sessionClaims}=await auth();


    //adding new document in firebase admin

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title:"New Doc"
    })

    await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
        userId:sessionClaims?.email!,
        role:"owner",
        createAt:new Date(),
        roomId:docRef.id,
    })

    return {docId:docRef.id};
}