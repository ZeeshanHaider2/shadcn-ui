import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, ListChecksIcon, PartyPopperIcon, UserCheck2Icon, UserIcon, UserRoundX, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import cm from '@/public/images/cm.jpg'
import rl from '@/public/images/rl.jpg'
import tf from '@/public/images/tf.jpg'


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
                <CardTitle className="text-base">
                 Team Leaders
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
               
            </CardContent>
            
            </Card>
        <Card >
            <CardHeader className="pb-2">
                <CardTitle className="text-base">
              Team Distribution
                </CardTitle>
                </CardHeader>
              <CardContent className="flex gap-2 items-center"></CardContent>
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