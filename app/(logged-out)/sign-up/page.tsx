"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

const formSchema = z.object({
    email: z.string().email(),
    accountType: z.enum(["personal","company"]),
    companyName:z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    dob: z.date().refine((date)=> {
     const today = new Date();
     const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
     );
     return date <= eighteenYearsAgo;
    }, "You must be atleast 18 years old")
}).superRefine((data,ctx)=> {
    if(data.accountType==="company" && !data.companyName){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,  
          path: ["companyName"],
          message:"Company name is required"
        })
    }
    if(data.accountType==="company" && (!data.numberOfEmployees || data.numberOfEmployees<1)){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,  
          path: ["numberOfEmployees"],
          message:"Number of Employees is required"
        })
    }
})
export default function signupPage(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
        }
        
});
const handleSubmit = () =>{
    console.log("kkk")
};
const accountType= form.watch("accountType");
    
return(
    <>
        <PersonStandingIcon size={50}/>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    Sign up
                </CardTitle>
                <CardDescription>
                    Sign up for a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@xyz.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
        control={form.control}
         name="accountType"
         render={({field})=>(
            <FormItem>
                <FormLabel>
                    Account type
                </FormLabel>
                <Select onValueChange={field.onChange}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an account type"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="personal">
                            Personal
                        </SelectItem>
                        <SelectItem value="company">
                           Company
                        </SelectItem>
                    </SelectContent>
                </Select>
              <FormMessage/>
            </FormItem>
         )}
        />
        {accountType === "company" && (
        <>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfEmployees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employees</FormLabel>
              <FormControl>
                <Input placeholder="Employees" type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
         )}
         <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col pt-2">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="normal-case flex  justify-between pr-1">
                       <span>Pick A date </span>
                       <CalendarIcon/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
              </Popover>
              <FormControl>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
            SIGN UP
        </Button>
       </form>
                </Form>
            </CardContent>
            <CardFooter className="justify-between">
                <small>Already have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </CardFooter>
        </Card>
        </>

    )

}

