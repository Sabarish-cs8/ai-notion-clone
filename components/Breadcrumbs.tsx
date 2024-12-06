"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Fragment } from "react";
  

function Breadcrumbs() {

    const path=usePathname();
    //http://localhost:3001/doc/Jz9THApm6ef9lD3JqdFN

    const segments=path.split("/");
  return (
    <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    {segments.map((segment,index)=>{
        if(!segment) return null ;

        const href = `/${segments.slice(0,index + 1).join("/")}`;
        const isLast= index === segment.length -1 ;
        return (
            <Fragment key={segment}>
                <BreadcrumbSeparator />
            <BreadcrumbItem>
            {isLast ?(
                <BreadcrumbLink>{segment}</BreadcrumbLink>

            ):(
                <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            )}
            </BreadcrumbItem>
            </Fragment>
        )
    })}
  </BreadcrumbList>
</Breadcrumb>

  )
}

export default Breadcrumbs