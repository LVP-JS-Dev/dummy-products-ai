import { Spinner } from "@dummy-products/ui-kit";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center pt-8">
      <Spinner label="Загрузка" size="lg" />
    </div>
  );
}
