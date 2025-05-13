"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Germany",
  "Australia",
  "France",
  "Japan",
  "China",
  "Brazil",
]

interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Select Country</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white text-black">
          <SelectValue placeholder="Choose a country" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountrySelector
