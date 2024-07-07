import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, PartyPopperIcon, UserCheck2Icon, UserIcon, UserRoundX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import cm from '@/public/images/cm.jpg'
import rl from '@/public/images/rl.jpg'
import tf from '@/public/images/tf.jpg'
import WorkLocationTrends from "./work-location-trends";

export default function EmployeesStats(){
    const totalEmployees = 100;
    const employeesPresent = 80;
    const employeesPresentPercentage = (employeesPresent/totalEmployees)* 100;
    return (
    <>
    <div className="grid lg:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
                    Total Employees
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
               <div className="flex gap-2">
                 <UserIcon/>
                 <div className="text-5xl font-bold">{totalEmployees}</div>
               </div>
               <div>
                 <Button size="xs" asChild>
                   <Link href="/dashboard/employees">
                    View all
                   </Link>
                 </Button>
               </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
                 Employees Present
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
               <div className="flex gap-2">
                {employeesPresentPercentage > 75 ?
                 <UserCheck2Icon/> : <UserRoundX/>}
                 <div className="text-5xl font-bold">{employeesPresent}</div>
               </div>
               <div>
                 <Button size="xs" asChild>
                   <Link href="/dashboard/employees">
                    View all
                   </Link>
                 </Button>
               </div>
            </CardContent>
            <CardFooter>
                {employeesPresentPercentage > 75 ?
                <span className="text-xs text-green-500 flex gap-1 items-center">
                <BadgeCheckIcon/>
               {employeesPresentPercentage}% of Employees are present
                </span> : <span className="text-xs text-red-500 flex gap-1 items-center">
                <AlertTriangleIcon/>
               Only {employeesPresentPercentage}% of Employees are present
                </span>}
            </CardFooter>
            </Card>
        <Card className="border-blue-500 flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
                Employee of the month
                </CardTitle>
              <CardContent className="flex gap-2 items-center">
                 <Avatar>
                    <Image src={cm} alt="Employee of the month avatar"/>
                    <AvatarFallback>
                        CM
                    </AvatarFallback>
                 </Avatar>
                 <span className="text-2xl">Colin Murray!</span>
              </CardContent>
              <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
                <span className="text-xs text-yellow-500 flex gap-1 items-center">
                <PartyPopperIcon/>
                <span>Congratulations!!!!</span>
                </span>
             </CardFooter>
            </CardHeader>
            </Card>
    </div>
    <Card className="my-4">
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <LaptopIcon/>
             <span>Employee Work Location Trends</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <WorkLocationTrends/>
        </CardContent>
    </Card>
   </>
    )

}