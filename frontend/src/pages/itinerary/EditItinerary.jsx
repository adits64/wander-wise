import ItineraryForm from '@/components/shared/ItineraryForm';
import useApi from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

const EditItinerary = () => {

    const { tripId, itineraryId } = useParams();

    const {data, error, loading} = useApi(`/${tripId}/itineraries/${itineraryId}`);

    if(loading){
        return <Loader2 className='animate-spin' />
    }

    const newData = {
        ...data,
        date: data.date.split("T")[0]
    }
    
  return (
    <div>
        <ItineraryForm itineraryData={newData} />
    </div>
  )
}

export default EditItinerary