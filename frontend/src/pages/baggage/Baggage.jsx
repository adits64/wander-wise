import useApi from '@/hooks/useApi'
import { Ellipsis, Loader2 } from 'lucide-react';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from '@/api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Baggage = () => {

    const navigate = useNavigate();

  const [dependency, setDependency] = React.useState(0);

  const { data, error, loading } = useApi("/trips", {}, [dependency]);

  console.log(data);

  if (loading) {
    return <Loader2 />
  }

  const handleDelete = async (tripId) => {
    try {
      const response = await api.delete(`/trips/${tripId}`);

      if(response.status === 200){
        toast.success("Trip deleted successfully");
        setDependency(dependency + 1);
      }else{
        toast.error( response.data.message || "Error deleting trip");
      }
    } catch (error) {
      console.log(error);
      toast.error( response.data.message || "Error deleting trip");
    }
  }

  return (
    <div className="mt-20 p-20">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">Your Trips</CardTitle>
          <CardDescription>Select any one trip to show baggages.</CardDescription>

          <CardAction>
            <a href="/trips/add">
              <Button>Add Trip</Button>
            </a>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              data.length == 0
                ?
                <div>No Trips available to show</div>
                :
                data.map((trip) => {
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle>{trip.title}</CardTitle>
                        <CardDescription>{formatDate(trip.startDate)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Budget: <span>{trip.budget.total}</span></p>
                        <p>Spent: <span>{trip.budget.spent}</span></p>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={()=>{navigate(`/baggage/${trip._id}`)}} className={"w-full"}>View Baggages</Button>
                      </CardFooter>
                    </Card>
                  )
                })
            }
          </div>
        </CardContent>

        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Baggage