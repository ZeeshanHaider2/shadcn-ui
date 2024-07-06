import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, BadgeCheckIcon, UserCheck2Icon, UserIcon, UserRoundX } from "lucide-react";
import Link from "next/link";

export default function EmployeesStats(){
    const totalEmployees = 100;
    const employeesPresent = 60;
    const employeesPresentPercentage = (employeesPresent/totalEmployees)* 100;
    return (
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
        <Card className="border-blue-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
                Employee of the month
                </CardTitle>
            </CardHeader></Card>
    </div>
    )
}