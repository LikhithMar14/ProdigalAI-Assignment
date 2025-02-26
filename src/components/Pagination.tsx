import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
  }
  
  export function StickyPagination({ currentPage, totalPages, basePath }: PaginationProps) {
    return (
      <div className="sticky bottom-0 left-0 w-full bg-white border-t shadow-md p-4 mt-6">
        <Pagination className="flex justify-center">
          <PaginationContent className="flex items-center gap-1">
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`${basePath}/${currentPage - 1}`} />
              </PaginationItem>
            )}
  
            {currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`${basePath}/1`}>1</PaginationLink>
                </PaginationItem>
                {currentPage > 4 && <PaginationEllipsis />}
              </>
            )}
  
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter((page) => Math.abs(currentPage - page) <= 2)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`${basePath}/${page}`}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
  
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationLink href={`${basePath}/${totalPages}`}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
  
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={`${basePath}/${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
  