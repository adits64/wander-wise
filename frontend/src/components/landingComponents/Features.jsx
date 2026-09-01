import { InfoIcon, MapPinned, Plane, Users, Wallet, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const Features = () => {

  const [age, setAge] = useState(10);

  const featuresData = [
    {
      icon: MapPinned,
      title: "Smart Itineraries",
      description: "Build organized travel plans with destinations, activities, schedules, and recommendations in one place."
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Coordinate trips with friends, share updates, assign tasks, and manage decisions collaboratively."
    },
    {
      icon: Wallet,
      title: "Expense Tracking",
      description: "Monitor travel budgets, record shared expenses, split costs fairly, and avoid overspending."
    },
    {
      icon: Plane,
      title: "Booking Manager",
      description: "Keep flights, accommodations, and reservations organized with quick access throughout your journey."
    }
  ]

  return (
    <section className='px-20 py-32'>
      <div>
        <h2 onClick={() => { setAge(age + 1); console.log(age) }} className='text-2xl md:text-3xl lg:text-5xl font-bold mb-24 text-center'>Features age is: {age}</h2>
      </div>

      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline">Enable</Button>
        </AlertAction>
      </Alert>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
          featuresData.map((feature, index) => {
            return (
              <div key={index} className="border border-gray-300 p-4 rounded-lg bg-blue-100">
                <feature.icon className='h-10 w-10 text-blue-700 ' />

                <h3 className="text-xl font-medium my-2">{feature.title}</h3>

                <p>{feature.description}</p>

                <Button variant="outline">Hello</Button>
              </div>
            )
          })
        }
      </div>


    </section>
  )
}

export default Features