"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("kkk");
        router.push("/dashboard");
    };

    return (
        <>
            <PersonStandingIcon size={50} />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to proceed</CardDescription>
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
                                        <FormDescription>
                                            This is your email address for signing in.
                                        </FormDescription>
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
                                            <PasswordInput placeholder="........" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">LOGIN</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Don&apos;t have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
