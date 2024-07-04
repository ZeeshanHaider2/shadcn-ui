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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PasswordInput } from "@/components/ui/password-input";

const accountTypeSchema =z.object({
    accountType: z.enum(["personal","company"]),
    companyName:z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
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
const passwordSchema = z.object({
    password:z.string().min(8, "password must contain at least 8 characters").refine((password)=>{
        //must contain 1 special and 1 uppercase character
          return /^(?=.*[!@#$%^&*]).*$/.test(password);
      },"Password must contain 1 special character and 1 uppercase letter"),
      passwordConfirm:z.string()
}).superRefine((data,ctx)=> {
    if(data.password !== data.passwordConfirm){
       ctx.addIssue({
           code: z.ZodIssueCode.custom,
           path: ["passwordConfirm"],
           message: "Password do not match",
       });
    }
})
const baseSchema = z.object({
    email: z.string().email(),
    dob: z.date().refine((date)=> {
     const today = new Date();
     const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
     );
     return date <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),
    
})

const formSchema = baseSchema.and(passwordSchema).and(accountTypeSchema);
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

const dobFromDate = new Date();
dobFromDate.setFullYear(dobFromDate.getFullYear()-120);
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
                    {!!field.value ? format(field.value, "PPP") : <span>Pick A date </span>}
                       <CalendarIcon/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                    <Calendar mode="single" 
                    defaultMonth={field.value} 
                    selected={field.value}
                    onSelect={field.onChange}
                    fixedWeeks
                    weekStartsOn={1}
                    fromDate={dobFromDate}
                    toDate={new Date()}
                    //disabled={(date)=>{
                      //return date.getDay()=== 0 || date.getDay()=== 6
                    //}}
                    captionLayout="dropdown-buttons"
                    />
                    
                </PopoverContent>
              </Popover>
              <FormControl>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="........" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="........"  
                {...field} />
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

//Note: Shadcn Ui calandar  is simply  a rapper around React day picker component