import { Button } from "@/components/ui/button";

type ResidentListButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};
export default function ResidentListButton(props: ResidentListButtonProps) {
  return (
    <Button
      className={`rounded-2xl bg-[#4452d6] font-light` + " " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
