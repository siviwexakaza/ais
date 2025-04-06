import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Spinner />
      </div>
    </div>
  );
}
