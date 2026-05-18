// @ts-nocheck

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { buildPaginationItems } from "@/lib/utils";

type PaginationBtnProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function PaginationBtn({ currentPage, totalPages, basePath }: PaginationBtnProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const items = buildPaginationItems({ currentPage: currentPage, totalPages, siblingCount: 1 });

  if (items.length === 0) return null;

  return (
    <Pagination className="mt-12 lg:mt-16">
      <PaginationContent className="gap-4">
        {hasPrev ? (
          <PaginationItem>
            <PaginationPrevious href={currentPage - 1 === 1 ? `${basePath}` : `${basePath}/page/${currentPage - 1}`} className="border size-10 sm:size-12 lg:size-14 rounded-xl text-secondary-foreground" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <Button variant="outline" className="border border-muted size-10 sm:size-12 lg:size-14 rounded-xl text-secondary-foreground" disabled aria-disabled>
              <ChevronLeftIcon />
              <span className="sr-only">Previous page</span>
            </Button>
          </PaginationItem>
        )}
        {items.map((item, idx) => (
          <PaginationItem key={typeof item === "number" ? item : `e-${idx}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={item === 1 ? `${basePath}` : `${basePath}/page/${item}`}
                isActive={item === currentPage}
                aria-label={`Go to page ${item}`}
                className="text-base sm:text-lg lg:text-xl font-semibold border size-10 sm:size-12 lg:size-14 data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground rounded-xl text-secondary-foreground"
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {hasNext ? (
          <PaginationItem>
            <PaginationNext href={`${basePath}/page/${currentPage + 1}`} className="border size-10 sm:size-12 lg:size-14 rounded-xl text-secondary-foreground" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <Button variant="outline" className="border border-muted size-10 sm:size-12 lg:size-14 rounded-xl text-secondary-foreground" disabled aria-disabled>
              <ChevronRightIcon />
              <span className="sr-only">Next page</span>
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
