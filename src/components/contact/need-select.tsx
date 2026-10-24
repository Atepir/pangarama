"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { CONTACT_FORM, NEED_OPTIONS } from "@/content/pages";
import { cn } from "@/lib/cn";

/**
 * Liste déroulante du type de besoin.
 *
 * La maquette ne montre qu’un état ouvert (frames 130:629 et 130:647) : la ligne
 * de valeur et les options y sont posées dans un panneau crème arrondi. L’état
 * fermé reprend le contrôle des autres champs ; le chevron, invisible dans le
 * prototype (glyphe absent de Manrope), est rétabli à droite du contrôle.
 */
const TRIGGER_BASE =
  "flex w-full items-center gap-2 text-left text-[16px] leading-[1.4] text-ink-deep transition-colors duration-300 ease-editorial";

const TRIGGER_CLOSED =
  "w-full border-b border-line-warm bg-transparent pb-2.5 pt-2 lg:h-[52px] lg:rounded-input lg:border lg:border-line-warm lg:bg-white lg:px-4 lg:py-3";

const TRIGGER_OPEN = "border-b border-line-warm bg-white pb-2.5 pt-2 lg:py-3";

const OPTION =
  "cursor-pointer bg-white py-3 text-[15px] leading-[1.4] lg:py-3";

type NeedSelectProps = {
  id: string;
  labelId: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

export function NeedSelect({
  id,
  labelId,
  value,
  onChange,
  invalid,
  describedBy,
  className,
}: NeedSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedIndex = NEED_OPTIONS.findIndex((option) => option.value === value);
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const listId = `${id}-listbox`;
  const valueId = `${id}-value`;
  const optionId = (index: number) => `${id}-option-${index}`;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const openList = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const closeList = (refocus = false) => {
    setOpen(false);
    if (refocus) {
      triggerRef.current?.focus();
    }
  };

  const commit = (index: number) => {
    const option = NEED_OPTIONS[index];
    if (option) {
      onChange(option.value);
    }
    closeList(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (event.key === "Enter" || event.key === " " || event.key.startsWith("Arrow")) {
        event.preventDefault();
        openList();
      }
      return;
    }

    const lastIndex = NEED_OPTIONS.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(lastIndex, index + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(0, index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(lastIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        closeList(true);
        break;
      case "Tab":
        closeList();
        break;
      default:
        break;
    }
  };

  const selectedLabel = selectedIndex >= 0 ? NEED_OPTIONS[selectedIndex]?.label : null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full",
        open &&
          "rounded-cover bg-card-cream p-[18px] shadow-[0px_12px_28px_0px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${valueId}`}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => {
          if (open) {
            closeList();
          } else {
            openList();
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(TRIGGER_BASE, open ? TRIGGER_OPEN : TRIGGER_CLOSED)}
      >
        <span
          id={valueId}
          className={cn("truncate", selectedLabel ? "text-ink-deep" : "text-body-mobile lg:text-body-soft")}
        >
          {selectedLabel ?? CONTACT_FORM.selectPlaceholder}
        </span>
        <svg
          viewBox="0 0 12 8"
          aria-hidden="true"
          className={cn(
            "ml-auto h-[6px] w-[10px] shrink-0 transition-transform duration-300 ease-editorial",
            open ? "rotate-180 text-ink-deep" : "text-body-mobile lg:text-body-soft",
          )}
        >
          <path
            d="M1 1.5 6 6.5l5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul id={listId} role="listbox" className="flex w-full flex-col">
          {NEED_OPTIONS.map((option, index) => (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={option.value === value}
              onClick={() => commit(index)}
              onPointerEnter={() => setActiveIndex(index)}
              className={cn(
                OPTION,
                index === NEED_OPTIONS.length - 1
                  ? "border border-line-warm"
                  : "border-b border-line-warm",
                index === activeIndex ? "font-semibold text-gold-ink-deep" : "text-ink-deep",
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
