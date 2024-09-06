"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useTransition } from "react";
import {
  MineDataType,
  MineDataErrorsType,
  MineErrorsType as MineErrors,
  MineType as Mine,
  MineDataSchema,
  MineSchema,
} from "@/schema/zod/MineData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { saveMineData } from "@/actions/saveMineData";

export default function CreateMineForm() {
  const [submitting, startSubmitting] = useTransition();
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 365);
  const [mineData, setMineData] = useState<MineDataType>({
    from: fromDate.toISOString().slice(0, 10),
    to: toDate.toISOString().slice(0, 10),
    mines: [
      {
        openCast: true,
        fugitiveEmissions: {
          coalMined: 0,
          degree: null,
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
    ],
  });
  const [mineErrors, setMineErrors] = useState<MineErrors[]>([]);
  const [mineDataErrors, setMineDataErrors] = useState<MineDataErrorsType>({
    _errors: [],
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const mineDataResult = MineDataSchema.safeParse(mineData);
        const mineResults = mineData.mines.map((mine) =>
          MineSchema.safeParse(mine)
        );
        if (
          mineDataResult.success &&
          mineResults.every((result) => result.success)
        ) {
          console.log(
            "All mines are valid",
            mineResults.map((r) => r.data)
          );
          setMineErrors([]);
          setMineDataErrors({ _errors: [] });
          startSubmitting(async () => {
            try {
              await saveMineData(mineDataResult.data);
            } catch (error) {
              console.log(error);
            }
          });
        } else {
          console.log("Some mines are invalid", mineResults);
          setMineDataErrors(
            mineDataResult.error?.format() as MineDataErrorsType
          );
          setMineErrors(
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
        <FormGroup>
          <Label>From</Label>
          <Input
            type="date"
            value={mineData.from}
            onChange={(e) => {
              setMineData((prevData) => ({
                ...prevData,
                from: e.target.value,
              }));
            }}
          />
          {mineDataErrors.from && (
            <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
              {mineDataErrors.from._errors}
            </span>
          )}
        </FormGroup>
        <FormGroup>
          <Label>To</Label>
          <Input
            type="date"
            value={mineData.to}
            onChange={(e) => {
              setMineData((prevData) => ({
                ...prevData,
                to: e.target.value,
              }));
            }}
          />
          {mineDataErrors.to && (
            <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
              {mineDataErrors.to._errors}
            </span>
          )}
        </FormGroup>
        {mineData.mines.map((mine, index) => (
          <MineForm
            key={index}
            mine={mine}
            setMine={(
              index: number,
              newMine: Partial<Mine>,
              deleteMine?: boolean
            ) => {
              setMineData((prevData) => {
                const newMines = [...prevData.mines];
                if (deleteMine) {
                  newMines.splice(index, 1);
                } else {
                  newMines[index] = { ...newMines[index], ...newMine };
                }
                return { ...prevData, mines: newMines };
              });
            }}
            errors={mineErrors[index] || {}}
            mineIndex={index}
          />
        ))}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="gap-1 px-2"
            onClick={(e) => {
              e.preventDefault();
              setMineData((prevMineData) => ({
                ...prevMineData,
                mines: [
                  ...prevMineData.mines,
                  {
                    openCast: true,
                    fugitiveEmissions: {
                      coalMined: 0,
                      degree: null,
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
                ],
              }));
            }}
          >
            <PlusIcon className="size-6" />
            <span>Add Mine</span>
          </Button>
          <Button disabled={submitting}>
            {submitting ? "Submitting..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function MineForm({
  mine,
  setMine,
  mineIndex,
  errors,
}: {
  mine: Mine;
  setMine: (
    index: number,
    newMine: Partial<Mine>,
    deleteMine?: boolean
  ) => void;
  mineIndex: number;
  errors: MineErrors;
}) {
  return (
    <div key={mineIndex} className="border-b pb-4 pt-8 first-of-type:pt-4">
      <div className="flex items-center justify-between">
        <h2>Mine {mineIndex + 1}</h2>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:text-destructive"
          onClick={(e) => {
            e.preventDefault();
            setMine(mineIndex, {}, true);
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
            setMine(mineIndex, { openCast: e === "open-cast" });
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
            setMine(mineIndex, {
              fugitiveEmissions: {
                ...mine.fugitiveEmissions,
                coalMined: Number(e.target.value),
              },
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
        <Label>Degree</Label>
        <Select
          value={mine.fugitiveEmissions.degree || undefined}
          onValueChange={(e) => {
            setMine(mineIndex, {
              fugitiveEmissions: {
                ...mine.fugitiveEmissions,
                degree:
                  (e as
                    | "seam-degree-I"
                    | "seam-degree-II"
                    | "seam-degree-III"
                    | "mine-degree-I"
                    | "mine-degree-II"
                    | "mine-degree-III") || null,
              },
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Degree" />
          </SelectTrigger>
          <SelectContent>
            {[
              "seam-degree-I",
              "seam-degree-II",
              "seam-degree-III",
              "mine-degree-I",
              "mine-degree-II",
              "mine-degree-III",
            ].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.fugitiveEmissions?.degree && (
          <span className="col-start-2 mt-1 text-sm leading-none text-destructive">
            {errors.fugitiveEmissions?.degree._errors}
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
            setMine(mineIndex, {
              fuelUsage: {
                ...mine.fuelUsage,
                excavation: Number(e.target.value),
              },
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
            setMine(mineIndex, {
              fuelUsage: {
                ...mine.fuelUsage,
                transportation: Number(e.target.value),
              },
            });
          }}
        />
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
            setMine(mineIndex, {
              fuelUsage: {
                ...mine.fuelUsage,
                equipments: Number(e.target.value),
              },
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
            setMine(mineIndex, {
              electricityUsage: {
                ...mine.electricityUsage,
                equipments: Number(e.target.value),
              },
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
            setMine(mineIndex, {
              electricityUsage: {
                ...mine.electricityUsage,
                others: Number(e.target.value),
              },
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
            setMine(mineIndex, {
              explosivesUsage: {
                ...mine.explosivesUsage,
                weight: Number(e.target.value),
              },
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
    <div className="grid items-center gap-2 py-4 sm:grid-cols-[15ch,auto]">
      {children}
    </div>
  );
}
