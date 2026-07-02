import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { listResident } from "../../data";
export type Resident = {
  id: string;
  name: string;
  room: string;
  status: string;
  dob: string;
  paperSource: string;
  gender: string;
  administrate: string;
};

export type TableResidentProp = {
  data?: Resident[];
};
export default function TableResident(props: TableResidentProp) {
  const [data, setData] = useState<Resident[]>([]);
  useEffect(() => {
    setData(listResident);
  }, []);

  function getStatusClass(status: string) {
    switch (status) {
      case "Discharged":
        return "bg-gray-400";

      case "Pending":
        return "bg-orange-600";

      default:
        return "bg-green-500";
    }
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="bg-[#4452d6] ">
          <TableRow>
            <TableHead className="w-[100px] text-left text-white">
              Name
            </TableHead>
            <TableHead className="w-[100px] text-left  text-white">
              ResID
            </TableHead>
            <TableHead className="text-left  text-white">Room</TableHead>
            <TableHead className="text-left  text-white">Status</TableHead>
            <TableHead className="text-left  text-white">DOB</TableHead>
            <TableHead className="text-left  text-white">
              Paper Source
            </TableHead>
            <TableHead className="text-left  text-white">Gender</TableHead>
            <TableHead className="text-left  text-white">
              Administrate
            </TableHead>
            <TableHead className="text-left  text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell className="font-medium text-left">
                {resident.name}
              </TableCell>

              <TableCell className="text-left">{resident.id}</TableCell>

              <TableCell className="text-left">{resident.room}</TableCell>

              <TableCell>
                <Button
                  className={`text-left rounded-2xl ${getStatusClass(resident.status)}`}
                >
                  {resident.status}
                </Button>
              </TableCell>

              <TableCell className="text-left">{resident.dob}</TableCell>

              <TableCell className="text-left">
                {resident.paperSource}
              </TableCell>

              <TableCell className="text-left">{resident.gender}</TableCell>

              <TableCell className="text-left">
                {resident.administrate}
              </TableCell>

              <TableCell className="text-left">
                <Button className="rounded-2xl bg-[#4452d6] font-light">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
