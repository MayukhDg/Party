"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const CitySelector = ({allCities}) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl>
      <SelectTrigger>
        <SelectValue placeholder="Select a verified email to display" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="m@example.com">m@example.com</SelectItem>
      <SelectItem value="m@google.com">m@google.com</SelectItem>
      <SelectItem value="m@support.com">m@support.com</SelectItem>
    </SelectContent>
  </Select>
  )
}

export default CitySelector