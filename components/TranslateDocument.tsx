"use client";

import * as Y from "yjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
import { startTransition, useState, useTransition } from "react";


type Language = 
    |   "english"
    |   "spanish"
    |   "portuguese"
    |   "french"
    |   "german"
    |   "chinese"
    |   "arabic"
    |   "hindi"
    |   "russian"
    |   "japanese"
    |   "tamil";

const languages: Language[] = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
    "tamil",

];


function TranslateDocument({doc }: {doc :Y.Doc }) {
    const [isOpen , setIsOpen]= useState(false);
    const [summary,setSummary]=useState("");
    const [question,setQuestion]=useState("");
    const [language,setLanguage]=useState<string>("");
    const [isPending,startTransition]=useTransition();


    const handleAskQuestion = async (e:React.FormEvent)=>{
        e.preventDefault();

        startTransition(async () =>{

        })
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant="outline">
         <DialogTrigger>Invite</DialogTrigger>
    </Button>
<DialogContent>
<DialogHeader>
  <DialogTitle>Invite a User to collaborate!</DialogTitle>
  <DialogDescription>
    Enter the email of the user you want to invite.
  </DialogDescription>
</DialogHeader>
<form className="flex gap-2" onSubmit={handleAskQuestion}>
    <Input 
    type="email"
    placeholder="Email"
    className="w-full"
    onChange={(e)=>setEmail(e.target.value)}
    />
    <Button type="submit" disabled={!language || isPending}>
        {isPending ? "Translating..." : "Translate"}
    </Button>
</form>
</DialogContent>
</Dialog>
  )
}

export default TranslateDocument