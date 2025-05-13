"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// List of countries for the selector
const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "China",
  "Russia",
  "Mexico",
  "South Africa",
  "Nigeria",
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "Singapore",
  "South Korea",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "New Zealand",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Venezuela",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Malaysia",
  "Indonesia",
]

export default function CountrySelector() {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isClicked, setIsClicked] = useState(false) // Track if the button is clicked
  const [isPlaying, setIsPlaying] = useState(false) // Track if audio is playing
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Handle audio and click behavior
  useEffect(() => {
    // Initialize the sound
    audioRef.current = new Audio("/sounds/gawk-gawk.mp3")

    // Once audio finishes, allow the next click
    const handleAudioEnded = () => {
      setIsPlaying(false) // Set isPlaying to false when audio ends
    }

    // Add event listener when the component is mounted
    if (audioRef.current) {
      audioRef.current.onended = handleAudioEnded
    }

    return () => {
      // Cleanup the event listener when the component is unmounted
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded)
      }
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const handleClick = async () => {
    if (isPlaying) return // Prevent click if audio is still playing

    setIsPlaying(true)
    setIsClicked(true)

    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      try {
        await audioRef.current.play()
      } catch (error) {
        toast({
          title: "Sound Error",
          description: "Please enable sound in your browser settings.",
          variant: "destructive",
        })
      }
    }

    // Add click logic for the selected country
    if (!selectedCountry) {
      toast({
        title: "Error",
        description: "Please select a country",
        variant: "destructive",
      })
      return
    }

    try {
      // Get existing clicks
      const storedData = localStorage.getItem("countryClicks") || "{}"
      const countryClicks = JSON.parse(storedData)

      // Add a click for the selected country
      countryClicks[selectedCountry] = (countryClicks[selectedCountry] || 0) + 1

      // Save back to localStorage
      localStorage.setItem("countryClicks", JSON.stringify(countryClicks))

      // Notify user
      toast({
        title: "Country Selected",
        description: `Added 1 click for ${selectedCountry}`,
      })

      // Update leaderboard
      window.dispatchEvent(new Event("countryClicksUpdated"))
    } catch (error) {
      console.error("Error updating country:", error)
      toast({
        title: "Error",
        description: "Failed to update country",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    if (!selectedCountry) {
      toast({
        title: "Error",
        description: "Please select a country",
        variant: "destructive",
      })
      return
    }

    // Handle the logic for saving the country
    handleClick()
    setOpen(false)
  }

  return (
    <>
      

      {/* <button
        onClick={handleClick}
        className="rounded-full bg-purple-700 px-6 py-3 text-lg font-bold text-white hover:bg-purple-800 transition"
        disabled={isPlaying} // Disable the button while audio is playing
      >
        CLICK ME!
      </button> */}
      <button
      onClick={handleClick}
      disabled={isPlaying}
      className={`group relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-2xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none md:h-64 md:w-64 md:text-3xl ${
        isClicked ? "animate-shake scale-95" : ""
      }`}
    >
      <span className="z-10">CLICK ME!</span>
      <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"></div>
    </button>
    <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="mt-4 bg-purple-900/50 border-purple-700 hover:bg-purple-800/70"
      >
        Select Your Country
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-purple-950/90 border-purple-800">
          <DialogHeader>
            <DialogTitle>Select Your Country</DialogTitle>
            <DialogDescription>Choose your country to add it to the leaderboard</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select onValueChange={setSelectedCountry} value={selectedCountry}>
              <SelectTrigger className="bg-purple-900/50 border-purple-700">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent className="bg-purple-950 border-purple-800 max-h-80">
                {COUNTRIES.sort().map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
