import { getAllTags } from "@/lib/tags";

export async function generateStaticParams() {
  const tags = await getAllTags();

  return;
}
