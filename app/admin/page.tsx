"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Save, Trash2 } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface CountryData {
  country: string
  clicks: number
  isEditing: boolean
}

const ALL_COUNTRIES = [
  "United States",
  "India",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "China",
  "Italy",
  "Russia",
  "Mexico",
  "Spain",
  "South Korea",
  "Netherlands",
  "Turkey",
  "Sweden",
  "Switzerland",
  "Argentina",
  // Add more as needed...
]

export default function AdminDashboard() {
  const [countries, setCountries] = useState<CountryData[]>([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [newClicks, setNewClicks] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const loadCountryData = () => {
      const storedData = localStorage.getItem("countryClicks") || "{}"
      const countryClicks = JSON.parse(storedData)

      const countryArray = Object.entries(countryClicks).map(([country, clicks]) => ({
        country,
        clicks: clicks as number,
        isEditing: false,
      }))

      countryArray.sort((a, b) => b.clicks - a.clicks)
      setCountries(countryArray)
    }

    loadCountryData()
  }, [])

  const saveChanges = () => {
    const countryClicks = countries.reduce((acc, { country, clicks }) => {
      acc[country] = clicks
      return acc
    }, {} as Record<string, number>)

    localStorage.setItem("countryClicks", JSON.stringify(countryClicks))
    window.dispatchEvent(new Event("countryClicksUpdated"))

    toast({
      title: "Changes Saved",
      description: "The leaderboard has been updated.",
    })
  }

  const toggleEdit = (index: number) => {
    setCountries((prev) =>
      prev.map((country, i) => (i === index ? { ...country, isEditing: !country.isEditing } : country)),
    )
  }

  const updateClicks = (index: number, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setCountries((prev) => prev.map((country, i) => (i === index ? { ...country, clicks: numValue } : country)))
  }

  const deleteCountry = (index: number) => {
    setCountries((prev) => prev.filter((_, i) => i !== index))
  }

  const addNewCountry = () => {
    if (!selectedCountry) {
      toast({
        title: "Error",
        description: "Please select a country",
        variant: "destructive",
      })
      return
    }

    const clicksValue = Number.parseInt(newClicks) || 0

    if (countries.some((c) => c.country.toLowerCase() === selectedCountry.toLowerCase())) {
      toast({
        title: "Error",
        description: "This country already exists in the leaderboard",
        variant: "destructive",
      })
      return
    }

    setCountries((prev) => [...prev, { country: selectedCountry, clicks: clicksValue, isEditing: false }])

    setSelectedCountry("")
    setNewClicks("")

    toast({
      title: "Country Added",
      description: `Added ${selectedCountry} with ${clicksValue} clicks`,
    })
  }

  const usedCountries = new Set(countries.map((c) => c.country))

  return (
    <div className="space-y-4 p-32">
      <h2 className="text-xl font-bold text-black">Manage Country Clicks</h2>
      <div className="rounded-lg border border-purple-800 bg-purple-950/80 p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="flex-1 rounded-md border border-purple-700 bg-purple-900/50 p-2 text-white"
          >
            <option value="">Select a country</option>
            {ALL_COUNTRIES.map((country) => (
              <option key={country} value={country} disabled={usedCountries.has(country)}>
                {country}
              </option>
            ))}
          </select>
          <Input
            placeholder="Clicks"
            type="number"
            value={newClicks}
            onChange={(e) => setNewClicks(e.target.value)}
            className="w-full sm:w-32"
          />
          <Button onClick={addNewCountry} className="gap-2">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>

        {countries.length > 0 ? (
          <>
            <Table className="mt-4 p-10">
              <TableHeader className="bg-purple-900/50">
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="w-24 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countries.map((country, index) => (
                  <TableRow key={`${country.country}-${index}`} className="hover:bg-purple-900/30 transition-colors">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell>{country.country}</TableCell>
                    <TableCell className="text-right">
                      {country.isEditing ? (
                        <Input
                          type="number"
                          value={country.clicks}
                          onChange={(e) => updateClicks(index, e.target.value)}
                          className="w-24 text-right bg-purple-900/50 border-purple-700"
                        />
                      ) : (
                        formatNumber(country.clicks)
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleEdit(index)}>
                          {country.isEditing ? <Save className="h-4 w-4" /> : <span className="text-xs">Edit</span>}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCountry(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex justify-end">
              <Button onClick={saveChanges} className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-4 flex h-32 items-center justify-center text-center text-purple-300">
            <p>No countries added yet. Add a country to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
