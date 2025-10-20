
// import { fetchNotes } from "@/lib/api";
// import NotesClient from "./Notes.client";


// export default async function NotesPage() {
   
//   const initialNotes = await fetchNotes({ page: 1, perPage: 12 });
   
//     return (
//       <NotesClient initialNotes={initialNotes}/>
//   );

// }


import { QueryClient, dehydrate, Hydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['notes', 1, ''], () =>
    fetchNotes({ page: 1, perPage: 12, search: '' })
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <NotesClient />
    </Hydrate>
  );
}
