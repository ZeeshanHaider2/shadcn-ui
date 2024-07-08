import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, ListChecksIcon, PartyPopperIcon, PieChartIcon, StarIcon, UserCheck2Icon, UserIcon, UserRoundX, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import cm from '@/public/images/cm.jpg'
import rl from '@/public/images/rl.jpg'
import tf from '@/public/images/tf.jpg'
import {  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TeamDistributionChart from "./team-distribution-chart";



const teamLeaders = [
    {
      firstName: "Colin",
      lastName: "Murray",
      avatar: cm,
    },
    {
      firstName: "Tom",
      lastName: "Phillips",
    },
    {
      firstName: "Liam",
      lastName: "Fuentes",
    },
    {
      firstName: "Tina",
      lastName: "Fey",
      avatar: tf,
    },
    {
      firstName: "Katie",
      lastName: "Johnson",
    },
    {
      firstName: "Tina",
      lastName: "Jones",
    },
    {
      firstName: "Amy",
      lastName: "Adams",
    },
    {
      firstName: "Ryan",
      lastName: "Lopez",
      avatar: rl,
    },
    {
      firstName: "Jenny",
      lastName: "Jones",
    },
  ];
  

export default function TeamsStats(){
    
    return (
    <>
    <div className="grid lg:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
                    Total Teams
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
               <div className="flex gap-2">
                 <UsersIcon/>
                 <div className="text-5xl font-bold">9</div>
               </div>
               <div>
                 <Button size="xs" asChild>
                   <Link href="/dashboard/teams">
                    View all
                   </Link>
                 </Button>
               </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between">
                 <span>Team Leaders</span>
                 <StarIcon className="text-yellow-500 items-center"/>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
               {teamLeaders.map(teamLeader => (
                 <TooltipProvider key={`${teamLeader.firstName}${teamLeader.lastName}`}>
                   <Tooltip>
                     <TooltipTrigger asChild>
                      <Avatar>
                        {!!teamLeader.avatar &&
                        <Image src={teamLeader.avatar} alt={`${teamLeader.firstName}${teamLeader.lastName} avatar`}/>    
                        }
                        <AvatarFallback>
                            {teamLeader.firstName[0]}
                            {teamLeader.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                     </TooltipTrigger>
                     <TooltipContent>
                     {teamLeader.firstName}{teamLeader.lastName}
                     </TooltipContent>
                   </Tooltip>
                 </TooltipProvider>
               ))}
            </CardContent>
            
            </Card>
        <Card >
            <CardHeader className="pb-2">
            <CardTitle className="text-base flex justify-between">
                 <span>Team distribution</span>
                 <PieChartIcon />
                </CardTitle>
                </CardHeader>
              <CardContent >
                <TeamDistributionChart/>
              </CardContent>
            </Card>
    </div>
    <Card className="my-4">
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <ListChecksIcon/>
             <span>Support tickets resolved</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          Line grapgh
        </CardContent>
    </Card>
   </>
    )

}