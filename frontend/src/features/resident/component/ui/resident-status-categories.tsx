import { Button } from "@/components/ui/button";

type ResidentStatusCategoriesProps = {
  id?: string;
  name?: string;
};
export default function ResidentStatusCategories(
  props: ResidentStatusCategoriesProps,
) {
  return (
    <div>
      <Button className={`rounded-2xl bg-[#4452d6]`}>All</Button>
      <Button
        className={`rounded-2xl bg-white border-2 border-solid border-gray-400 text-gray-500`}
      >
        XXX
      </Button>
      <Button
        className={`rounded-2xl bg-white border-2 border-solid border-gray-400 text-gray-500`}
      >
        YYY
      </Button>
      <Button
        className={`rounded-2xl bg-white border-2 border-solid border-gray-400 text-gray-500`}
      >
        ZZZ
      </Button>
    </div>
  );
}
