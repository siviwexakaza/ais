import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
}
