"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import {toast} from "sonner";
import { Input } from "./ui/input";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
  

function ManageUsers() {
    const { user } = useUser();
    const room = useRoom();
    const isOwner = useOwner();
    const [isOpen,setIsOpen] = useState(false);
    const [isPending,startTransition]=useTransition();


    const [usersInRoom]=useCollection(
        user && query(collectionGroup(db,"rooms"), where("roomId","==",room.id))
    )

    const handleInvite = async (e:FormEvent)=>{
        e.preventDefault();

        const roomId = pathname.split("/").pop();
        if(!roomId) return;
              

        startTransition(async ()=>{
            const { success } = await inviteUserToDocument(roomId , email);

            if(success){
                setIsOpen(false);
                setEmail("");
                toast.success("User Added to Room successfully!");
            }else{
                toast.error("Failed to add user to room!");
            }
        })

    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
             <DialogTrigger>Users</DialogTrigger>
        </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Users with Access</DialogTitle>
      <DialogDescription>
        Below is a list of users who have access to this document.
      </DialogDescription>
    </DialogHeader>

    <hr className="my-2" />

    <div>
        {/** UsersInRoom... */}
    </div>
   
  </DialogContent>
</Dialog>

  )
}

export default ManageUsers