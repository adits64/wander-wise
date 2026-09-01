import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useApi from '@/hooks/useApi';
import { formatDate } from '@/lib/formatter';
import { Ellipsis, Loader2 } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const ItineraryDetails = () => {

  const { tripId } = useParams();
  const navigate = useNavigate();

  const { data, error, loading } = useApi(`/${tripId}/itineraries`);

  console.log(data)

  if (loading) {
    return <Loader2 className='animate-spin' />
  }

  const handleDelete = async (itineraryId) =>{
    try {
      const response = await api.delete(`/${tripId}/itineraries/${itineraryId}`);

      if (response.status == 200){
        toast.success("Itinerary deleted successfully");
      }else{
        toast.error( response.data.message || "Error deleting itinerary");
      }
    } catch (error) {
      console.log(error);
      toast.error( error.message || "Some error occured");
    }
  }

  return (
    <div className='px-4 md:px-8 lg:px-20 py-20'>
      <Card>
        <CardHeader>
          <CardTitle className={"text-xl font-semibold"}>Itineraries for this trip</CardTitle>
          <CardDescription>View and manage itineraries for this trip.</CardDescription>

          <CardAction>
            <Button onClick={() => { navigate(`/itinerary/add/${tripId}`) }}>Add Itinerary</Button>
          </CardAction>
        </CardHeader>

        <CardContent className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          {
            data?.length == 0 ?
              <div>No itineraries to show for this trip. Add one first.</div>
              :
              data?.map((item, index) => {
                return (
                  <Card key={item._id}>
                    <CardHeader>
                      <CardTitle>{item.title} - {formatDate(item.date)}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                      <CardAction>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
                            <Ellipsis size={16} />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem><a className="w-full" href={`/itinerary/edit/${tripId}/${item._id}`}>Edit</a></DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { handleDelete(item._id) }}>Delete</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>

                        </DropdownMenu>
                      </CardAction>
                    </CardHeader>

                    <CardContent>
                      {
                        item.activities.map((activity, activityIndex) => {
                          return (
                            <div className='border border-gray-200 p-4 rounded'>
                              <p className='text-lg font-medium'>{activity.name}</p>
                              <p>{activity.time}</p>

                              <ul className='list-disc pl-6'>
                                {
                                  activity.notes.map((note, noteIndex) => {
                                    return (
                                      <li key={noteIndex}>{note}</li>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          )
                        })
                      }
                    </CardContent>
                  </Card>
                )
              })
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default ItineraryDetails