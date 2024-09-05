"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { z, ZodFormattedError } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

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
        seamDegree: "",
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
  const [errors, setErrors] = useState<MineErrors[]>([]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const mineResults = mines.map((mine) => MineSchema.safeParse(mine));
        if (mineResults.every((result) => result.success)) {
          console.log(
            "All mines are valid",
            mineResults.map((r) => r.data)
          );
          setErrors([]);
          // TODO: SUBMIT HERE
        } else {
          console.log("Some mines are invalid", mineResults);
          setErrors(
            mineResults.map(
              (result) =>
                (result.error?.format() || { _errors: [] }) as MineErrors
            )
          );
        }
      }}
    >
      <div className="mx-auto my-4 max-w-[800px] rounded-md border p-4">
        <h1 className="text-xl font-medium">Create Mine</h1>
        {mines.map((mine, index) => (
          <MineForm
            key={index}
            mine={mine}
            setMines={setMines}
            errors={errors[index] || {}}
            mineIndex={index}
          />
        ))}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="gap-1 px-2"
            onClick={(e) => {
              e.preventDefault();
              setMines((prevMines) => [
                ...prevMines,
                {
                  openCast: true,
                  fugitiveEmissions: {
                    coalMined: 0,
                    seamDegree: "",
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
            }}
          >
            <PlusIcon className="size-6" />
            <span>Add Mine</span>
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </form>
  );
}

function MineForm({
  mine,
  setMines,
  mineIndex,
  errors,
}: {
  mine: Mine;
  setMines: React.Dispatch<React.SetStateAction<Mine[]>>;
  mineIndex: number;
  errors: MineErrors;
}) {
  const seamDegreeOptions = [1, 2, 3].map((i) => ({
    label: `Seam Degree ${i}`,
    value: `${i}`,
  }));
  const MineDegreeOptions = [1, 2, 3].map((i) => ({
    label: `Seam Degree ${i}`,
    value: `${i}`,
  }));

  return (
    <div key={mineIndex} className="border-b pb-4 pt-8 first-of-type:pt-4">
      <div className="flex items-center justify-between">
        <h2>Mine {mineIndex + 1}</h2>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:text-destructive"
          onClick={(e) => {
            e.preventDefault();
            setMines((prevMines) => {
              const newMines = [...prevMines];
              newMines.splice(mineIndex, 1);
              return newMines;
            });
          }}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
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
        {errors.openCast && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.openCast._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fugitiveEmissions: {
                  ...newMines[mineIndex].fugitiveEmissions,
                  coalMined: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.fugitiveEmissions?.coalMined && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fugitiveEmissions?.coalMined._errors}
          </span>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Seam Degree</Label>
        <Select
          value={mine.fugitiveEmissions.seamDegree || undefined}
          onValueChange={(e) => {
            setMines((prevMines) => {
              const newMines = [...prevMines];
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fugitiveEmissions: {
                  ...newMines[mineIndex].fugitiveEmissions,
                  seamDegree: e,
                },
              };
              return newMines;
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seam Degree" />
          </SelectTrigger>
          <SelectContent>
            {seamDegreeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.fugitiveEmissions?.seamDegree && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fugitiveEmissions?.seamDegree._errors}
          </span>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Mine Degree</Label>
        <Select
          value={mine.fugitiveEmissions.mineDegree || undefined}
          onValueChange={(e) => {
            setMines((prevMines) => {
              const newMines = [...prevMines];
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fugitiveEmissions: {
                  ...newMines[mineIndex].fugitiveEmissions,
                  mineDegree: e,
                },
              };
              return newMines;
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seam Degree" />
          </SelectTrigger>
          <SelectContent>
            {MineDegreeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.fugitiveEmissions?.mineDegree && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fugitiveEmissions?.mineDegree._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fuelUsage: {
                  ...newMines[mineIndex].fuelUsage,
                  excavation: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.fuelUsage?.excavation && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fuelUsage?.excavation._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fuelUsage: {
                  ...newMines[mineIndex].fuelUsage,
                  transportation: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />{" "}
        {errors.fuelUsage?.transportation && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fuelUsage?.transportation._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                fuelUsage: {
                  ...newMines[mineIndex].fuelUsage,
                  equipments: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.fuelUsage?.equipments && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fuelUsage?.equipments._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                electricityUsage: {
                  ...newMines[mineIndex].electricityUsage,
                  equipments: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.electricityUsage?.equipments && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.electricityUsage?.equipments._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                electricityUsage: {
                  ...newMines[mineIndex].electricityUsage,
                  others: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.electricityUsage?.others && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.electricityUsage?.others._errors}
          </span>
        )}
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
              newMines[mineIndex] = {
                ...newMines[mineIndex],
                explosivesUsage: {
                  ...newMines[mineIndex].explosivesUsage,
                  weight: Number(e.target.value),
                },
              };
              return newMines;
            });
          }}
        />
        {errors.explosivesUsage?.weight && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.explosivesUsage?.weight._errors}
          </span>
        )}
      </FormGroup>
    </div>
  );
}

function FormGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10ch,auto] items-center py-4">
      {children}
    </div>
  );
}
