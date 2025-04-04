"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AddStorageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStorageDialog({ open, onOpenChange }: AddStorageDialogProps) {
  const [storageType, setStorageType] = useState<"cold" | "general">("cold")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Storage Unit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="town" className="text-right">
              Town
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select town" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nakuru">Nakuru</SelectItem>
                <SelectItem value="eldoret">Eldoret</SelectItem>
                {/* Add more towns as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={storageType} onValueChange={(value: "cold" | "general") => setStorageType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cold">Cold Storage</SelectItem>
                <SelectItem value="general">General Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {storageType === "cold" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="temperature" className="text-right">
                Temperature
              </Label>
              <Input id="temperature" className="col-span-3" placeholder="e.g., -5°C" />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacity
            </Label>
            <Input id="capacity" className="col-span-3" placeholder="e.g., 1000 kg" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Storage Unit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

