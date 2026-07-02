import * as React from "react";

import { Badge } from "@/components/ui/emar-badge";

type ClientInfoCardProps = {
  name: string;
  dob: string;
  room: string;
  id: string;
};

export function ClientInfoCard({ name, dob, room, id }: ClientInfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-[1.125rem] shadow-sm flex gap-4">
      <img
        alt={`Resident ${name}`}
        className="w-24 h-24 rounded-[1.125rem] object-cover border border-slate-200"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI8ctwtw_TUHQB8Yomr5PtOGA3fFjNtAkyFq9r7yjGjDmx-LhySbebkoop_j1qH_SSqwslxJP9SZG4DGLjMIsK-Mf7C6Kqi9LVtQiOWV81iZQh4V1FnVTrNsY7K632M8Vlc6nt12NzZ_R-pebud9am5bVUKD_omoq2cBKV-6l8uj5w-7yNVvU64nstmpYJTsVUSdfLmMFu2bKO-aTJysqbjQ30BNxoa7G3vZgqckTezdR7vyQTlGh3"
      />
      <div className="flex-1">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-sm text-slate-500">DOB: {dob}</p>
        <p className="text-sm text-slate-500">Room: {room}</p>
        <p className="text-sm text-slate-500">ID: {id}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Badge variant="danger">Allergies</Badge>
          <Badge variant="info">Fall Risk</Badge>
        </div>
      </div>
    </div>
  );
}
