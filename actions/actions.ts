"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
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
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
        userId:sessionClaims?.email,
        role:"owner",
        createAt:new Date(),
        roomId:docRef.id,
    })

    return {docId:docRef.id};
}

export  async function deleteDocument(roomId:string){
    auth().protect(); // Ensure the user is authenticated

    console.log("deleteDocument",roomId);

    try{
        // delete the document reference itself

        await adminDb.collection("documents").doc(roomId).delete();

        const query = await adminDb
        .collectionGroup("rooms")
        .where("roomId","==",roomId)
        .get();

        const batch =adminDb.batch();

        //delete the room reference in the user's collecion for every user in th room

        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        });

        await batch.commit();

        //delete the room in liveblocks
        await liveblocks.deleteRoom(roomId);

        return {success:true};
    }catch(error){
        console.error(error);
        return {success:false};
    }
}