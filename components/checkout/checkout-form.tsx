"use client";

import { useState } from "react";

import Link from "next/link";

import { createCheckoutSession } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/ui/date-selector";
import { ErrorModal } from "@/components/ui/error-modal";
import { dietaryRestrictionOptions, eventDates } from "@/utils/constant/const";
import {
  countryCodes,
  defaultCountryCodeId,
} from "@/utils/constant/country-codes";

function isPastEventDate(id: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(id).getTime() < today.getTime();
}

function getDefaultEventDateId() {
  const upcoming = eventDates.find((date) => !isPastEventDate(date.id));
  return (upcoming ?? eventDates[eventDates.length - 1]).id;
}

export function CheckoutForm() {
  const [selectedDate, setSelectedDate] = useState(getDefaultEventDateId);
  const [hasAllergies, setHasAllergies] = useState<"yes" | "no" | null>(null);
  const [showPastDateError, setShowPastDateError] = useState(false);

  const handleDateChange = (id: string) => {
    if (isPastEventDate(id)) {
      setShowPastDateError(true);
      return;
    }
 
    setSelectedDate(id);
  };

  return (
    <form action={createCheckoutSession} className="mt-10 flex flex-col gap-8">
      <input type="hidden" name="eventDate" value={selectedDate} />

      <fieldset className="flex flex-col gap-4">
        <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
          Your details
        </legend>

        <label className="flex flex-col gap-2 font-sans text-sm text-primary">
          <span className="text-neutral">Full name</span>
          <input
            type="text"
            name="customerName"
            required
            placeholder="Jane Doe"
            className="border border-primary/20 bg-transparent px-3 py-2 text-sm text-primary placeholder:text-neutral/50 focus:border-secondary focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 font-sans text-sm text-primary">
          <span className="text-neutral">Phone number</span>
          <div className="flex gap-2">
            <select
              name="countryCode"
              defaultValue={defaultCountryCodeId}
              aria-label="Country code"
              className="border border-primary/20 bg-transparent px-2 py-2 text-sm text-primary focus:border-secondary focus:outline-none"
            >
              {countryCodes.map((country) => (
                <option
                  key={country.id}
                  value={country.dialCode}
                  className="bg-tertiary"
                >
                  {country.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              required
              placeholder="900 000 000"
              className="flex-1 border border-primary/20 bg-transparent px-3 py-2 text-sm text-primary placeholder:text-neutral/50 focus:border-secondary focus:outline-none"
            />
          </div>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
          Which date works for you?
        </legend>
        <DateSelector
          options={eventDates}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
          Dietary restrictions
        </legend>

        <div className="flex flex-col gap-2">
          {dietaryRestrictionOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 font-sans text-sm text-primary"
            >
              <input
                type="checkbox"
                name="dietaryRestrictions"
                value={option.id}
                className="size-4 accent-secondary"
              />
              {option.label}
            </label>
          ))}
        </div>

        <label className="mt-1 flex flex-col gap-2 font-sans text-sm text-primary">
          <span className="text-neutral">Other (optional)</span>
          <input
            type="text"
            name="dietaryOther"
            placeholder="Tell us more"
            className="border border-primary/20 bg-transparent px-3 py-2 text-sm text-primary placeholder:text-neutral/50 focus:border-secondary focus:outline-none"
          />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary">
          Do you have any allergies?
        </legend>

        <div className="flex gap-3" role="radiogroup">
          {(["yes", "no"] as const).map((option) => {
            const isActive = hasAllergies === option;

            return (
              <label
                key={option}
                className={`flex-1 cursor-pointer border px-4 py-2 text-center font-sans text-sm uppercase tracking-wide transition-colors ${
                  isActive
                    ? "border-secondary bg-secondary text-tertiary"
                    : "border-primary/20 text-primary/70 hover:border-secondary/60"
                }`}
              >
                <input
                  type="radio"
                  name="hasAllergies"
                  value={option}
                  required
                  checked={isActive}
                  onChange={() => setHasAllergies(option)}
                  className="sr-only"
                />
                {option === "yes" ? "Yes" : "No"}
              </label>
            );
          })}
        </div>

        {hasAllergies === "yes" && (
          <label className="flex flex-col gap-2 font-sans text-sm text-primary">
            <span className="text-neutral">Please specify</span>
            <textarea
              name="allergyDetails"
              required
              rows={3}
              placeholder="e.g. peanuts, shellfish…"
              className="border border-primary/20 bg-transparent px-3 py-2 text-sm text-primary placeholder:text-neutral/50 focus:border-secondary focus:outline-none"
            />
          </label>
        )}
      </fieldset>

      <Button type="submit" className="w-full" loadingText="Redirecting to checkout…">
        Continue to Payment
      </Button>

      <p className="-mt-4 text-center font-sans text-xs leading-relaxed text-neutral/70">
        By continuing, you agree that we&apos;ll process your details
        (including dietary/allergy information, if provided) as described
        in our{" "}
        <Link
          href="/privacy-policy"
          className="text-primary underline underline-offset-4 hover:text-secondary"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <ErrorModal
        open={showPastDateError}
        title="That date has already happened"
        message="This experience date is in the past. Please choose one of the upcoming dates to continue with your reservation."
        onClose={() => setShowPastDateError(false)}
      />
    </form>
  );
}
