"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
export default function login(){
    return(
    <>
        <PersonStandingIcon size={50}/>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    Login
                </CardTitle>
                <CardDescription>
                    Login to proceed
                </CardDescription>
            </CardHeader>
            <CardContent>
                Login form
            </CardContent>
            <CardFooter className="justify-between">
                <small>Don't have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/sign-up">
                        Sign up
                    </Link>
                </Button>
            </CardFooter>
        </Card>
        </>

    )

}