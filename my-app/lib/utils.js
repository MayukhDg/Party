import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import qs from 'query-string'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formUrlQuery({ params, key, value }) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}


