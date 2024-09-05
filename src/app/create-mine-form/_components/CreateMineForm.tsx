"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z, ZodFormattedError } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FugitiveEmissionsSchema = z.object({
  coalMined: z.number(),
  seamDegree: z.string().nullable(),
  mineDegree: z.string().nullable(),
});

const FuelUsageSchema = z.object({
  excavation: z.number(),
  transportation: z.number(),
  equipments: z.number(),
});

const ElectricityUsageSchema = z.object({
  equipments: z.number(),
  others: z.number(),
});

const ExplosivesUsageSchema = z.object({
  weight: z.number(),
});

const MineSchema = z.object({
  openCast: z.boolean(),
  fugitiveEmissions: FugitiveEmissionsSchema,
  fuelUsage: FuelUsageSchema,
  electricityUsage: ElectricityUsageSchema,
  explosivesUsage: ExplosivesUsageSchema,
});

// Infer TypeScript types from Zod schemas
type Mine = z.infer<typeof MineSchema>;
type MineErrors = ZodFormattedError<Mine>;

export default function CreateMineForm() {
  const [mines, setMines] = useState<Mine[]>([
    {
      openCast: true,
      fugitiveEmissions: {
        coalMined: 0,
        seamDegree: null,
        mineDegree: null,
      },
      fuelUsage: {
        excavation: 0,
        transportation: 0,
        equipments: 0,
      },
      electricityUsage: {
        equipments: 0,
        others: 0,
      },
      explosivesUsage: {
        weight: 0,
      },
    },
  ]);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {mines.map((mine, index) => (
        <div key={index} className="max-w-[500px]">
          <div className="mt-8 flex items-center justify-between">
            <h2>Mine {index + 1}</h2>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:text-destructive"
            >
              Remove
            </Button>
          </div>
          <FormGroup>
            <Label>Mine Type</Label>
            <Select
              value={mine.openCast ? "open-cast" : "underground"}
              onValueChange={(e) => {
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    openCast: e === "open-cast",
                  };
                  return newMines;
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Mine Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open-cast">Open Cast</SelectItem>
                <SelectItem value="underground">Underground</SelectItem>
              </SelectContent>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Coal Mined</Label>
            <Input
              value={mine.fugitiveEmissions.coalMined || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fugitiveEmissions: {
                      ...newMines[index].fugitiveEmissions,
                      coalMined: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Seam Degree</Label>
            <Input
              type="text"
              value={mine.fugitiveEmissions.seamDegree ?? ""}
              onChange={(e) => {
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fugitiveEmissions: {
                      ...newMines[index].fugitiveEmissions,
                      seamDegree: e.target.value,
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Mine Degree</Label>
            <Input
              type="text"
              value={mine.fugitiveEmissions.mineDegree ?? ""}
              onChange={(e) => {
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fugitiveEmissions: {
                      ...newMines[index].fugitiveEmissions,
                      mineDegree: e.target.value === "" ? null : e.target.value,
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Excavation</Label>
            <Input
              value={mine.fuelUsage.excavation || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fuelUsage: {
                      ...newMines[index].fuelUsage,
                      excavation: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Transportation</Label>
            <Input
              value={mine.fuelUsage.transportation || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fuelUsage: {
                      ...newMines[index].fuelUsage,
                      transportation: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Equipments</Label>
            <Input
              value={mine.fuelUsage.equipments || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    fuelUsage: {
                      ...newMines[index].fuelUsage,
                      equipments: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Equipments</Label>
            <Input
              value={mine.electricityUsage.equipments || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    electricityUsage: {
                      ...newMines[index].electricityUsage,
                      equipments: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Others</Label>
            <Input
              value={mine.electricityUsage.others || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    electricityUsage: {
                      ...newMines[index].electricityUsage,
                      others: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Weight</Label>
            <Input
              value={mine.explosivesUsage.weight || ""}
              placeholder="0"
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;
                setMines((prevMines) => {
                  const newMines = [...prevMines];
                  newMines[index] = {
                    ...newMines[index],
                    explosivesUsage: {
                      ...newMines[index].explosivesUsage,
                      weight: Number(e.target.value),
                    },
                  };
                  return newMines;
                });
              }}
            />
          </FormGroup>
        </div>
      ))}
    </form>
  );
}

function FormGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10ch,auto] items-center py-4">
      {children}
    </div>
  );
}
