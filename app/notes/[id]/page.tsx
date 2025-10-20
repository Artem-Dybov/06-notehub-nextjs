// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getQueryClient } from "@/lib/tanstack";
// import { fetchNoteById } from "@/lib/api";
// import NoteDetailsClient from "./NoteDetails.client";


// type PageProps = {
//   params: Promise<{id: string}>;
// };


// export default async function NoteDetailsPage({ params }: PageProps) {
  
//     const queryClient = getQueryClient();
//     const {id} = await params;
  
      
//     await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//   });

    
//     return (
//         <HydrationBoundary state={dehydrate(queryClient)}>
//             <NoteDetailsClient id={id} />
//         </HydrationBoundary>
//     );
// }

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { HydrationBoundary } from "@tanstack/react-query";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}