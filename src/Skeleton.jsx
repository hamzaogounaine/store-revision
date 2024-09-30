import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[210px]" />
        <Skeleton className="h-3 w-[220px]" />
        <Skeleton className="h-3 w-[230px]" />
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-5 w-[100px]" />
        <Skeleton className="h-10 w-[100px] mt-10" />
      </div>
    </div>
  )
}
