import React from "react"
import { cn } from "@/lib/utils" // make sure you have cn set up!

const Bentogird = () => {
  const Card = ({
    className,
    children,
  }: {
    className?: string
    children: React.ReactNode
  }) => {
    return <div className={cn("bg-white p-4", className)}>{children}</div>
  }

  return (
    <div className="max-w-7xl border-neutral-200 bg-gray-100 mx-auto border-x min-h-screen">
      <div className="grid grid-cols-2 gap-4 p-4">
        <Card>Card 1</Card>
        <Card className="bg-blue-100">Card 2</Card>
      </div>
      <p className="text-center mt-6">Hello world</p>
    </div>
  )
}

export default Bentogird
