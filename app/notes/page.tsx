import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NotesPageProps {
  searchParams?: {
    page?: string;
    q?: string;
  };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const page = await Number(searchParams?.page || "1");
  const query = (await searchParams?.q) || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, query }],
    queryFn: () => fetchNotes(page, query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialPage={page} initialQuery={query} />
    </HydrationBoundary>
  );
}
