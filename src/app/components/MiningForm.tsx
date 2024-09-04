"use client"
import React, { useState } from 'react';

interface MiningData {
  dieselUsed: number;
  tntsUsed: number;
  electricityUsed: number;
  treesPlanted: number;
  miningTypes: MiningType[];
}

interface MiningType {
  type: string;
  coalExtracted: number;
  seam: string;
  mineDegree: string;
}

const MiningForm: React.FC = () => {
  const [data, setData] = useState<MiningData>({
    dieselUsed: 0,
    tntsUsed: 0,
    electricityUsed: 0,
    treesPlanted: 0,
    miningTypes: [],
  });

  const addMiningType = () => {
    setData({
      ...data,
      miningTypes: [...data.miningTypes, { type: '', coalExtracted: 0, seam: '', mineDegree: '' }],
    });
  };

  const handleMiningTypeChange = (index: number, field: keyof MiningType, value: string | number) => {
    const updatedMiningTypes = data.miningTypes.map((miningType, i) =>
      i === index ? { ...miningType, [field]: value } : miningType
    );
    setData({ ...data, miningTypes: updatedMiningTypes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send data to API route for MongoDB storage
    const response = await fetch('/api/saveMiningData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Data saved successfully!');
    } else {
      alert('Error saving data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount of Diesel Used (in Liters)</label>
        <input
          type="number"
          value={data.dieselUsed}
          onChange={(e) => setData({ ...data, dieselUsed: parseFloat(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of TNTs or Other Bombardments Used</label>
        <input
          type="number"
          value={data.tntsUsed}
          onChange={(e) => setData({ ...data, tntsUsed: parseFloat(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Units of Electricity Used</label>
        <input
          type="number"
          value={data.electricityUsed}
          onChange={(e) => setData({ ...data, electricityUsed: parseFloat(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Trees Planted</label>
        <input
          type="number"
          value={data.treesPlanted}
          onChange={(e) => setData({ ...data, treesPlanted: parseFloat(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mining Type(s)</label>
        {data.miningTypes.map((miningType, index) => (
          <div key={index} className="space-y-4 mb-4">
            <select
              value={miningType.type}
              onChange={(e) => handleMiningTypeChange(index, 'type', e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Mining Type</option>
              <option value="surface">Surface</option>
              <option value="tunnel">Tunnel</option>
            </select>

            <input
              type="number"
              placeholder="Coal Extracted (in tons)"
              value={miningType.coalExtracted}
              onChange={(e) => handleMiningTypeChange(index, 'coalExtracted', parseFloat(e.target.value))}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />

            <input
              type="text"
              placeholder="Seam"
              value={miningType.seam}
              onChange={(e) => handleMiningTypeChange(index, 'seam', e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />

            <input
              type="text"
              placeholder="Mine Degree"
              value={miningType.mineDegree}
              onChange={(e) => handleMiningTypeChange(index, 'mineDegree', e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMiningType}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          + Add Mining Type
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default MiningForm;
