import { getPoliticians } from "@/lib/actions"
import { BrowseByOfficeClient } from "@/app/browse/office/client"

export default async function BrowseByOfficePage() {
  const politicians = await getPoliticians()
  return <BrowseByOfficeClient politicians={politicians} />
}
