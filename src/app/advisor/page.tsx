"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowRight,
  Bot,
  DollarSign,
  LineChart,
  PieChart,
  Plus,
  Send,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Recommendation = {
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: string
}

export default function FinancialAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial advisor. I can help you optimize your spending habits and provide personalized financial advice. What would you like to know today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFinancialInput, setShowFinancialInput] = useState(false)
  const [financialData, setFinancialData] = useState({
    income: "",
    housing: "",
    transportation: "",
    food: "",
    utilities: "",
    entertainment: "",
    savings: "",
    debt: "",
    goals: "",
  })
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content:
          "I'd be happy to help you optimize your spending habits. To provide personalized advice, I'll need some information about your current financial situation. Would you like to share some details about your income and expenses?",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setShowFinancialInput(true)
    }, 1000)
  }

  const handleFinancialDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFinancialData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFinancialDataSubmit = () => {
    setIsLoading(true)

    // Simulate processing and generating recommendations
    setTimeout(() => {
      // Generate mock recommendations based on the data
      const newRecommendations: Recommendation[] = [
        {
          title: "Reduce dining out expenses",
          description:
            "Based on your food budget, you could save approximately 20% by cooking at home more frequently and limiting restaurant visits to once a week.",
          impact: "high",
          category: "Food",
        },
        {
          title: "Optimize streaming subscriptions",
          description:
            "Review your entertainment subscriptions and consider rotating services instead of subscribing to multiple platforms simultaneously.",
          impact: "medium",
          category: "Entertainment",
        },
        {
          title: "Increase retirement contributions",
          description:
            "With your current savings rate, you could benefit from increasing your retirement contributions by 3% to maximize employer matching.",
          impact: "high",
          category: "Savings",
        },
        {
          title: "Refinance high-interest debt",
          description:
            "Consider consolidating or refinancing your high-interest debt to reduce monthly payments and total interest paid.",
          impact: "high",
          category: "Debt",
        },
        {
          title: "Implement the 50/30/20 budget rule",
          description:
            "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for better financial balance.",
          impact: "medium",
          category: "Budgeting",
        },
      ]

      setRecommendations(newRecommendations)

      const aiResponse: Message = {
        role: "assistant",
        content:
          "Thank you for sharing your financial information. I've analyzed your data and generated personalized recommendations to help optimize your spending habits. Check out the 'Recommendations' tab to see my suggestions.",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setShowFinancialInput(false)
    }, 2000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-blue-400"
      default:
        return "text-purple-400"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <TrendingUp className="h-5 w-5" />
      case "medium":
        return <LineChart className="h-5 w-5" />
      case "low":
        return <TrendingDown className="h-5 w-5" />
      default:
        return <LineChart className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">AI Financial Advisor</h1>
          <p className="text-purple-200">
            Get personalized recommendations to optimize your spending habits and achieve your financial goals
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-purple-800/30">
              <TabsTrigger value="chat" className="data-[state=active]:bg-purple-900/30">
                Chat
              </TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-purple-900/30">
                Financial Data
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-900/30">
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <Card className="border-purple-800/20 bg-black text-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-purple-400" />
                    Financial Advisor Chat
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Ask questions about your finances and get personalized advice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] overflow-y-auto space-y-4 mb-4 pr-2">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-purple-600 text-white"
                              : "bg-purple-900/30 border border-purple-800/30 text-purple-100"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-purple-900/30 border border-purple-800/30">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"></div>
                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></div>
                            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {showFinancialInput && (
                    <Card className="mb-4 border-purple-800/20 bg-purple-900/10 text-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Share Your Financial Information</CardTitle>
                        <CardDescription className="text-purple-200 text-xs">
                          This helps me provide more accurate recommendations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => {
                            const aiResponse: Message = {
                              role: "assistant",
                              content: "Great! Please go to the 'Financial Data' tab to enter your information.",
                            }
                            setMessages((prev) => [...prev, aiResponse])
                            setShowFinancialInput(false)
                          }}
                          className="w-full bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Enter Financial Data
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      className="bg-purple-600 text-white hover:bg-purple-700"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="mt-4">
              <Card className="border-purple-800/20 bg-black text-white">
                <CardHeader>
                  <CardTitle>Your Financial Information</CardTitle>
                  <CardDescription className="text-purple-200">
                    Enter your financial details to receive personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="income" className="text-purple-100">
                          Monthly Income
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <DollarSign className="h-4 w-4 text-purple-400" />
                          </div>
                          <Input
                            id="income"
                            name="income"
                            type="number"
                            placeholder="5000"
                            value={financialData.income}
                            onChange={handleFinancialDataChange}
                            className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="housing" className="text-purple-100">
                          Housing Expenses
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <DollarSign className="h-4 w-4 text-purple-400" />
                          </div>
                          <Input
                            id="housing"
                            name="housing"
                            type="number"
                            placeholder="1500"
                            value={financialData.housing}
                            onChange={handleFinancialDataChange}
                            className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="expenses" className="border-purple-800/20">
                        <AccordionTrigger className="text-purple-100 hover:text-purple-200">
                          Additional Expenses
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="transportation" className="text-purple-100">
                                Transportation
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="transportation"
                                  name="transportation"
                                  type="number"
                                  placeholder="400"
                                  value={financialData.transportation}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="food" className="text-purple-100">
                                Food & Groceries
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="food"
                                  name="food"
                                  type="number"
                                  placeholder="600"
                                  value={financialData.food}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="utilities" className="text-purple-100">
                                Utilities
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="utilities"
                                  name="utilities"
                                  type="number"
                                  placeholder="200"
                                  value={financialData.utilities}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="entertainment" className="text-purple-100">
                                Entertainment
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="entertainment"
                                  name="entertainment"
                                  type="number"
                                  placeholder="300"
                                  value={financialData.entertainment}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="savings" className="border-purple-800/20">
                        <AccordionTrigger className="text-purple-100 hover:text-purple-200">
                          Savings & Debt
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="savings" className="text-purple-100">
                                Monthly Savings
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="savings"
                                  name="savings"
                                  type="number"
                                  placeholder="500"
                                  value={financialData.savings}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="debt" className="text-purple-100">
                                Monthly Debt Payments
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <DollarSign className="h-4 w-4 text-purple-400" />
                                </div>
                                <Input
                                  id="debt"
                                  name="debt"
                                  type="number"
                                  placeholder="800"
                                  value={financialData.debt}
                                  onChange={handleFinancialDataChange}
                                  className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="space-y-2">
                      <Label htmlFor="goals" className="text-purple-100">
                        Financial Goals
                      </Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        placeholder="Describe your short and long-term financial goals..."
                        value={financialData.goals}
                        onChange={handleFinancialDataChange}
                        className="min-h-[100px] bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleFinancialDataSubmit}
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Recommendations
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <Card className="border-purple-800/20 bg-black text-white">
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription className="text-purple-200">
                    Based on your financial data, here are tailored suggestions to optimize your spending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendations.length > 0 ? (
                    <div className="space-y-4">
                      <div className="mb-4">
                        <Label className="text-purple-100 mb-2 block">Filter by Category</Label>
                        <Select defaultValue="all">
                          <SelectTrigger className="bg-black/50 border-purple-800/30 text-white focus:border-purple-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-800/30">
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Savings">Savings</SelectItem>
                            <SelectItem value="Debt">Debt</SelectItem>
                            <SelectItem value="Budgeting">Budgeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {recommendations.map((recommendation, index) => (
                        <Card key={index} className="border-purple-800/20 bg-black/50">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                              <div className={`flex items-center ${getImpactColor(recommendation.impact)}`}>
                                {getImpactIcon(recommendation.impact)}
                                <span className="ml-1 text-xs font-medium">
                                  {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)}{" "}
                                  Impact
                                </span>
                              </div>
                            </div>
                            <CardDescription className="text-purple-300 text-xs">
                              Category: {recommendation.category}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-purple-200">{recommendation.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <PieChart className="mx-auto h-12 w-12 text-purple-400 opacity-50 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No Recommendations Yet</h3>
                      <p className="text-purple-200 mb-4">
                        Enter your financial information in the "Financial Data" tab to receive personalized
                        recommendations.
                      </p>
                      <Button
                    variant="outline"
                    className="border-purple-600 text-purple-200 hover:bg-purple-900/20"
                    onClick={() => {
                        const element = document.querySelector('[data-state="inactive"][value="data"]') as HTMLElement | null;
                        element?.click(); // Ahora TypeScript reconoce que element puede tener .click()
                    }}
                    >
                    <Plus className="mr-2 h-4 w-4" />
                    Enter Financial Data
                    </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

