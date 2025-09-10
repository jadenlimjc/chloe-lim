"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CarouselContext = React.createContext<UseEmblaCarouselType | null>(null)

function useCarousel() {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("useCarousel must be used within <Carousel>")
    return context
}

const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = React.useRef<() => void | null>(null);
  
    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

export function Carousel({ className, children, options, ...props }: React.HTMLAttributes<HTMLDivElement> & { options?: Parameters<typeof useEmblaCarousel>[0] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        ...options,
        loop: true,

    })

    useInterval(() => {
        if (emblaApi) {
          emblaApi.scrollNext();
        }
      }, 5000);

    return (
        <CarouselContext.Provider value={[emblaRef, emblaApi]}>
            <div className={cn("relative group", className)} {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

export function CarouselContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const [emblaRef] = useCarousel()
    return (
        <div ref={emblaRef} className="overflow-hidden">
            <div className={cn("flex -ml-4", className)} {...props}>
                {children}
            </div>
        </div>
    )
}

export function CarouselItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3", className)} {...props}>
            {children}
        </div>
    )
}

export function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [, emblaApi] = useCarousel()

    const handlePrev = React.useCallback(() => {
        if (!emblaApi) return
        if (emblaApi.canScrollPrev()) {
            emblaApi.scrollPrev()
        } else {
            const lastIndex = emblaApi.scrollSnapList().length - 1
            emblaApi.scrollTo(lastIndex)
        }
    }, [emblaApi])

    return (
        <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={cn(
                "absolute -left-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center rounded-full border bg-background size-10 shadow transition-opacity opacity-0 group-hover:opacity-100 hover:bg-muted focus:opacity-100",
                className
            )}
            {...props}
        >
            <ChevronLeft className="w-5 h-5" />
        </button>
    )
}

export function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [, emblaApi] = useCarousel()

    const handleNext = React.useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
      }, [emblaApi])

    return (
        <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={cn(
                "absolute -right-4 top-1/2 -translate-y-1/2 z-10 grid place-items-center rounded-full border bg-background size-10 shadow transition-opacity opacity-0 group-hover:opacity-100 hover:bg-muted focus:opacity-100",
                className
            )}
            {...props}
        >
            <ChevronRight className="w-5 h-5" />
        </button>
    )
} 