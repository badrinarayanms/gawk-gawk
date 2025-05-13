"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatNumber } from "@/lib/utils"

type CountryData = {
  country: string
  clicks: number
}

export default function Leaderboard() {
  const [countries, setCountries] = useState<CountryData[]>([])

  useEffect(() => {
    const loadCountryData = () => {
      const storedData = localStorage.getItem("countryClicks") || "{}"
      const countryClicks = JSON.parse(storedData)

      const countryArray = Object.entries(countryClicks).map(([country, clicks]) => ({
        country,
        clicks: clicks as number,
      }))

      countryArray.sort((a, b) => b.clicks - a.clicks)
      setCountries(countryArray)
    }

    // Initial load
    loadCountryData()

    // Update on localStorage or custom event
    const handleChange = () => loadCountryData()
    window.addEventListener("storage", handleChange)
    window.addEventListener("countryClicksUpdated", handleChange)

    return () => {
      window.removeEventListener("storage", handleChange)
      window.removeEventListener("countryClicksUpdated", handleChange)
    }
  }, [])

  if (countries.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-purple-800 bg-purple-950/80 p-6 text-center text-purple-300">
        <p>No clicks recorded yet. Be the first to click the button!</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-purple-800 bg-purple-950/80">
      <Table>
        <TableHeader className="bg-purple-900/50">
          <TableRow>
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.map((country, index) => (
            <TableRow key={country.country} className="hover:bg-purple-900/30 transition-colors">
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell>{country.country}</TableCell>
              <TableCell className="text-right">{formatNumber(country.clicks)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
