"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  income: z.string().min(1, "Income is required"),
  expenses: z.string().min(1, "Expenses are required"),
  savings: z.string().min(1, "Savings are required"),
  goals: z.string().min(1, "Financial goals are required"),
  riskTolerance: z.enum(["low", "medium", "high"]),
})

export default function FinanceForm() {
  const [advice, setAdvice] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      expenses: "",
      savings: "",
      goals: "",
      riskTolerance: "medium",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = ""
    setAdvice(result)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your Financial Information</CardTitle>
          <CardDescription>Please provide your financial details to get personalized advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income</FormLabel>
                    <FormControl>
                      <Input placeholder="5000" {...field} />
                    </FormControl>
                    <FormDescription>Enter your monthly income in dollars.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Expenses</FormLabel>
                    <FormControl>
                      <Input placeholder="3000" {...field} />
                    </FormControl>
                    <FormDescription>Enter your total monthly expenses in dollars.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="savings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Savings</FormLabel>
                    <FormControl>
                      <Input placeholder="10000" {...field} />
                    </FormControl>
                    <FormDescription>Enter your current savings in dollars.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Buy a house, save for retirement, start a business" {...field} />
                    </FormControl>
                    <FormDescription>Describe your short-term and long-term financial goals.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskTolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose your investment risk tolerance level.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Get Financial Advice</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {advice && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Financial Advice</CardTitle>
            <CardDescription>Based on the information you provided, here's our AI-generated advice:</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{advice}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

