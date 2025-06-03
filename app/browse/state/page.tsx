import { getPoliticians } from "@/lib/actions"
import { BrowseByStateClient } from "@/app/browse/state/client"

export default async function BrowseByStatePage() {
  const politicians = await getPoliticians()
  return <BrowseByStateClient politicians={politicians} />
}
