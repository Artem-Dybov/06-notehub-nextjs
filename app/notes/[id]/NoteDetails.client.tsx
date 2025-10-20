// 'use client';

// import { useQuery } from "@tanstack/react-query";
// import { fetchNoteById } from "@/lib/api";
// import { Note } from "@/types/note";
// import css from './NoteDetails.module.css'

// type Props = {
//   id: string
// }

// export default function NoteDetailsClient({id}: Props) {
   
// const { data, isLoading, isError, } = useQuery<Note>({
//         queryKey: ['note', id],
//         queryFn: () => fetchNoteById(id),
//       refetchOnMount: false,
//     });

//     if (isLoading) return <p>Loading, please wait...</p>;
//   if (isError) return <p>Something went wrong.</p>;
//   if (!data) return <p>Note not found</p>

//     return (
//         <div className={css.container}>
// 	<div className={css.item}>
// 	  <div className={css.header}>
//                     <h2>{data.title}</h2>
// 	  </div>
//                 <p className={css.content}>{data.content}</p>
//                 <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
// 	</div>
// </div>
//     );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import css from "../../main.module.css";
import type { Note } from "../../../types/note";

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId.toString()),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}