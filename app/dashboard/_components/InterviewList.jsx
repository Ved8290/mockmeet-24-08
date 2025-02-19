"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/db';
import { aiInterview } from '../../../utils/schema';
import ICard from "./ICard";
import { desc } from 'drizzle-orm';

 
function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(aiInterview)
        .where(aiInterview.userEmail, '=', user?.primaryEmailAddress)
        .orderBy(desc(aiInterview.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error('Error fetching interview list:',error);
    }
  };

  return (
    <div>
      <h2 className='font-medium text-2xl'>Previous Mock Interviews :</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3'>
     {interviewList&&interviewList.map((interview,  index)=> (
        <ICard interview={interview} key={index} />
        
      ))}

     </div>
    </div>
  );
}

export default InterviewList;
