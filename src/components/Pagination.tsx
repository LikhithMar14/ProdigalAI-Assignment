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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => Math.abs(currentPage - page) <= 2);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t z-50 p-4">
      <Pagination className="flex justify-center">
        <PaginationContent className="flex items-center gap-1">
          {/* Previous Button */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`${basePath}/${currentPage - 1}`} />
            </PaginationItem>
          )}

          {/* First Page & Ellipsis */}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink href={`${basePath}/1`}>1</PaginationLink>
              </PaginationItem>
              {currentPage > 4 && <PaginationEllipsis />}
            </>
          )}

          {/* Dynamic Page Numbers */}
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${basePath}/${page}`}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last Page & Ellipsis */}
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

          {/* Next Button */}
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
