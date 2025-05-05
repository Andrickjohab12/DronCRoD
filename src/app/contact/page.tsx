"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-500 mb-8">
          We're here to help enterprise clients with their financial needs. Fill out the form below and our team will
          get back to you shortly.
        </p>

        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
            <CardTitle>Enterprise Inquiry</CardTitle>
            <CardDescription className="text-gray-200">
              Submit your business inquiry and we'll respond within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold">Thank you for your inquiry!</h3>
                <p className="text-gray-500 mt-2">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700" onClick={() => setSubmitted(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your company name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input id="contact" placeholder="Full name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="email@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your inquiry in detail..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="rounded border-gray-300" required />
                  <label htmlFor="privacy" className="text-sm text-gray-500">
                    I agree to the processing of my data according to the privacy policy
                  </label>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Submit Inquiry
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
